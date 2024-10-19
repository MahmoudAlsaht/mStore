import { CiFacebook, CiInstagram } from "react-icons/ci";
import { MdOutgoingMail, MdWhatsapp } from "react-icons/md";
import Link from "next/link";
import { ReactNode } from "react";

export type CONTACT_US = {
  link: string;
  icon: ReactNode | string;
};

export const MEDIA_LINKS = (iconClassName?: string): CONTACT_US[] => [
  {
    link: "#",
    icon: <MdWhatsapp className={iconClassName} />,
  },
  {
    link: "#",
    icon: <CiInstagram className={iconClassName} />,
  },
  {
    link: "#",
    icon: <CiFacebook className={iconClassName} />,
  },
  {
    link: "#",
    icon: <MdOutgoingMail className={iconClassName} />,
  },
];

export default function ContactUs({
  isContactPage = false,
}: {
  isContactPage?: boolean;
}) {
  return (
    <div
      className={`container px-4 ${isContactPage ? "mt-24 w-full" : "w-10/12"}`}
    >
      <div className={`flex justify-around ${isContactPage && "flex-col"}`}>
        <div className={isContactPage ? "mb-4" : ""}>
          <h4
            className={`fonat-bold text-center ${!isContactPage ? "text-3xl" : "mb-2 text-4xl"}`}
          >
            {isContactPage ? "حساباتنا" : "للتواصل"}
          </h4>
          <div
            className={
              isContactPage
                ? "mx-auto grid w-1/3 grid-cols-2 gap-3 text-center"
                : "mb-6 mt-6"
            }
          >
            {MEDIA_LINKS(
              `mx-auto ${!isContactPage ? "size-8" : "size-12"}`,
            ).map((media) => (
              <Link
                key={media.link}
                href={media.link}
                rel="noopener noreferrer"
                target="_blank"
                className={!isContactPage ? "p-2" : ""}
              >
                <button
                  className={`align-center h-10 w-10 items-center justify-center rounded-full font-normal shadow-md outline-none focus:outline-none ${!isContactPage && "mr-2"}`}
                  type="button"
                >
                  {media.icon}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <hr className="my-10" />
      <div className="flex flex-wrap items-center justify-center md:justify-between">
        <div className="mx-auto w-full px-4 text-center md:w-4/12">
          <div
            className={`font-bold ${!isContactPage ? "text-xl" : "text-2xl"}`}
          >
            Copyright ©{" "}
            <span id="get-current-year">{new Date().getFullYear()}</span>
          </div>
          <div className={`text-md mt-0.5 ${isContactPage && "mt-6 text-2xl"}`}>
            جميع الحقوق محفوظة{" "}
            <span className="text-xl font-extrabold">mStore</span>{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
