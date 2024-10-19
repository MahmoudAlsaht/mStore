"use client";
import { Button } from "@/components/ui/button";
import { LoadingLink } from "@/app/(siteFacing)/_context/LoadingContext";
import { ArrowLeft, ArrowRight, Dot } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type ImageCarouselProps = {
  images: {
    id: string;
    path: string;
    link: string;
  }[];
};

export default function ImageCarousel({ images }: ImageCarouselProps) {
  const [targetedIndex, setTargetedIndex] = useState(0);
  const [showNavigation, setShowNavigation] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null); // Prevent firing swipe with usual touch events
    setTouchStart(e.targetTouches[0].clientX);
  };
  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe || isRightSwipe) {
      if (isRightSwipe) prevImage();

      if (isLeftSwipe) nextImage();
    }
  };

  const prevImage = () => {
    if (targetedIndex + 1 === images.length) {
      setTargetedIndex(0);
      return;
    }
    setTargetedIndex((prevIndex) => prevIndex + 1);
  };

  const nextImage = () => {
    if (targetedIndex === 0) {
      setTargetedIndex(images.length - 1);
      return;
    }
    setTargetedIndex((prevIndex) => prevIndex - 1);
  };

  const goToImage = (index: number) => {
    setTargetedIndex(index);
  };

  useEffect(() => {
    const intervalId = setInterval(async () => {
      setTargetedIndex((prevIndex) =>
        prevIndex === 0 ? images.length - 1 : prevIndex - 1,
      );
    }, 4000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <div className="container mb-6 mt-4 sm:mt-8">
      <div
        className="relative"
        onMouseOver={() => setShowNavigation(true)}
        onMouseLeave={() => setShowNavigation(false)}
      >
        {images.map((image, index) => (
          <LoadingLink href={image.link || "#"} key={image.id}>
            <div
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
              className={`${
                index !== targetedIndex && "hidden"
              } relative h-32 w-full opacity-100 transition-opacity duration-700 ease-in sm:h-52 md:h-80`}
            >
              <Image
                src={image.path.replace("/upload", "/upload/w_800") || ""}
                fill
                alt={`banner's image`}
                className="cursor-pointer rounded-2xl object-cover"
                priority
              />
            </div>
          </LoadingLink>
        ))}

        {images.length > 1 && showNavigation && (
          <legend className="hidden sm:block">
            <CarouselNavButton next onClick={nextImage} />
            <CarouselNavButton prev onClick={prevImage} />
          </legend>
        )}
        {images.length > 1 && (
          <legend className="sm:hidden">
            <CarouselNavButton next onClick={nextImage} />
            <CarouselNavButton prev onClick={prevImage} />
          </legend>
        )}
      </div>
      <br />
      {images.length >= 2 && (
        <div className="hidden items-center justify-center sm:flex">
          {images.map((image, index) => (
            <div key={image.id} onClick={() => goToImage(index)}>
              <Dot
                className={`h-10 w-10 cursor-pointer rounded-full ${
                  index !== targetedIndex && "text-black"
                }`}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function CarouselNavButton({
  next = false,
  prev = false,
  onClick,
}: {
  next?: boolean;
  prev?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      className={`${prev && "left-0"} ${
        next && "right-0"
      } absolute top-1/2 h-8 w-9 -translate-y-1/2 cursor-pointer rounded-xl bg-black/30 p-1 text-white hover:bg-black/50 hover:text-rayanPrimary-dark md:h-10 md:w-14 md:p-4`}
      variant="ghost"
      onClick={onClick}
    >
      {prev && <ArrowLeft className="size-5 md:size-8" />}
      {next && <ArrowRight className="size-5 md:size-8" />}
    </Button>
  );
}
