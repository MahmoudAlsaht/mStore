import { Image as TImage } from "@prisma/client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import Image from "next/image";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";
import { ChangeEvent, useRef, useState, useTransition } from "react";
import {
  deleteImage,
  editImage,
  addImageLink,
} from "@/app/admin/_actions/image";
import { Loader2, X } from "lucide-react";

export default function ClickableImageCard({
  image,
  imageAlt,
}: {
  image: Partial<TImage>;
  imageAlt: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [file, setFile] = useState<File | null>(null);
  const [dialogType, setDialogType] = useState("");
  const linkRef = useRef<HTMLInputElement | null>(null);
  const [open, setOpen] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleClick = () => {
    const formData = new FormData();
    formData.append("file", file as File);
    startTransition(async () => {
      await editImage(image?.id as string, formData);
      router.refresh();
    });
  };

  const handleDelete = () => {
    startTransition(async () => {
      const id = image.id as string;
      await deleteImage(id);
      setOpen(false);
      router.refresh();
    });
  };

  const handleAddLink = () => {
    startTransition(async () => {
      const link = linkRef.current?.value as string;
      const id = image.id as string;
      await addImageLink(id, link);
      setOpen(false);
      router.refresh();
    });
  };

  return (
    <Dialog open={open} onOpenChange={() => setOpen(true)}>
      <DropdownMenu>
        <div className="flex flex-col">
          <DropdownMenuTrigger asChild>
            <Image
              alt={imageAlt}
              src={image?.path?.replace("/upload", "/upload/w_100") as string}
              className="min-h-24 w-full cursor-pointer rounded-xl"
              width={100}
              height={100}
            />
          </DropdownMenuTrigger>
          {file && file?.size > 0 && (
            <Button
              disabled={isPending}
              className="mt-2"
              size="sm"
              variant="outline"
              type="button"
              onClick={handleClick}
            >
              {!isPending ? (
                "حفظ"
              ) : (
                <Loader2 className="animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light" />
              )}
            </Button>
          )}
        </div>
        <DropdownMenuContent>
          <DropdownMenuItem className="text-rayanWarning-dark">
            <label htmlFor={image.id} className="cursor-pointer">
              تعديل الصورة
            </label>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => setDialogType("addLink")}
          >
            <DialogTrigger>اضافة رابط للصورة</DialogTrigger>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer text-destructive"
            onClick={() => setDialogType("delete")}
          >
            <DialogTrigger>حذف الصورة</DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent showClose={false}>
        <Button
          onClick={() => setOpen(false)}
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
        >
          <X />
        </Button>
        <DialogHeader>
          {dialogType === "delete" && (
            <DialogTitle className="text-rayanError-dark">
              حذف الصورة
            </DialogTitle>
          )}
          {dialogType === "addLink" && <DialogTitle>اضافة رابط</DialogTitle>}
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <DialogFooter>
            {dialogType === "delete" && (
              <Button
                disabled={isPending}
                variant="outline"
                className="w-full bg-none text-destructive hover:bg-destructive hover:text-white"
                onClick={handleDelete}
              >
                {isPending ? (
                  <Loader2 className="animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light" />
                ) : (
                  "حذف"
                )}
              </Button>
            )}

            {dialogType === "addLink" && (
              <div className="grid w-full grid-cols-1">
                <div className="group relative z-0 mb-5 w-full">
                  {image.link
                    ? `الرابط الحالي للصورة: ${image.link}`
                    : "لم يتم تحديد رابط للصورة"}
                </div>
                <div className="group relative z-0 mb-5 w-full">
                  <input
                    type="text"
                    ref={linkRef}
                    id="link"
                    className="peer block w-full appearance-none border-0 border-b-2 border-gray-300 bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0 dark:border-gray-600 dark:focus:border-blue-500"
                    placeholder=""
                    defaultValue={image?.link || undefined}
                  />
                  <label
                    htmlFor="link"
                    className="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm text-gray-500 duration-300 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6 peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600 dark:text-gray-400 peer-focus:dark:text-blue-500 rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4"
                  >
                    رابط للصورة
                  </label>
                </div>
                <Button
                  disabled={isPending}
                  variant="outline"
                  className="w-full"
                  onClick={handleAddLink}
                >
                  {isPending ? (
                    <Loader2 className="animate-spin text-rayanPrimary-dark dark:text-rayanPrimary-light" />
                  ) : (
                    "اضافة"
                  )}
                </Button>
              </div>
            )}
          </DialogFooter>
        </div>
      </DialogContent>
      <input
        id={image.id}
        type="file"
        onChange={handleChange}
        className="hidden"
      />
    </Dialog>
  );
}
