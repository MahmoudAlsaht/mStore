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
    link: "https://wa.me/962791750061",
    icon: <MdWhatsapp className={iconClassName} />,
  },
  {
    link: "https://www.instagram.com/rayan.markets/",
    icon: <CiInstagram className={iconClassName} />,
  },
  {
    link: "https://web.facebook.com/rayanmarkets",
    icon: <CiFacebook className={iconClassName} />,
  },
  {
    link: "https://mail.google.com/mail/?view=cm&fs=1&to=rayan.markets@gmail.com&su=FeedBack",
    icon: <MdOutgoingMail className={iconClassName} />,
  },
];

export const OUR_LOCATIONS: CONTACT_US[] = [
  {
    link: "https://www.google.com/search?sca_esv=6cf9c2b9fed3aa1b&sca_upv=1&tbs=lf:1,lf_ui:10&tbm=lcl&sxsrf=ADLYWIK8msxu53J51OdH_ZM6U84kyKsXWg:1726154637056&q=%D8%A7%D8%B3%D9%88%D8%A7%D9%82+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D9%86&rflfq=1&num=10&sa=X&ved=2ahUKEwiO-9-P272IAxXMxAIHHeufFHMQjGp6BAglEAE&biw=1536&bih=695&dpr=1.25#rlfi=hd:;si:6962918468438604298,l,ChfYp9iz2YjYp9mCINin2YTYsdmK2KfZhkiJ2oermreAgAhaIRAAEAEYABgBIhfYp9iz2YjYp9mCINin2YTYsdmK2KfZhpIBD3Nob3BwaW5nX2NlbnRlcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOU01WQjVlakZCUlJBQg;mv:[[32.590702,35.909074499999996],[32.5076107,35.8433322]]",
    icon: "حكما",
  },
  {
    link: "https://www.google.com/search?q=%D8%A7%D8%B3%D9%88%D8%A7%D9%82+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D9%86+%D8%AD%D9%86%D9%8A%D9%86%D8%A7&sca_esv=6cf9c2b9fed3aa1b&sca_upv=1&biw=1008&bih=695&tbm=lcl&sxsrf=ADLYWIJ3AVOE0JtGIVLAqGk6QBjKSP5w4w%3A1726154641676&ei=kQfjZtfSCqiLi-gPiqSE6A8&ved=0ahUKEwiX39uR272IAxWoxQIHHQoSAf0Q4dUDCAk&uact=5&oq=%D8%A7%D8%B3%D9%88%D8%A7%D9%82+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D9%86+%D8%AD%D9%86%D9%8A%D9%86%D8%A7&gs_lp=Eg1nd3Mtd2l6LWxvY2FsIiLYp9iz2YjYp9mCINin2YTYsdmK2KfZhiDYrdmG2YrZhtinMgUQIRigATIFECEYoAFI7CRQvgVYriFwBHgAkAEAmAGJAqABwRCqAQUwLjcuNLgBA8gBAPgBAZgCD6AClxHCAgQQIxgnwgIIEAAYgAQYywHCAgkQIRigARgKGCrCAgYQABgWGB7CAggQABiABBiiBMICCRAAGIAEGBMYDcICChAAGBMYCBgNGB7CAgcQIRigARgKmAMAiAYBkgcFNC42LjWgB7cr&sclient=gws-wiz-local#rlfi=hd:;si:6243708934013720226,l,CiLYp9iz2YjYp9mCINin2YTYsdmK2KfZhiDYrdmG2YrZhtinSJrVrOKmroCACFo2EAAQARgAGAEYAiIi2KfYs9mI2KfZgiDYp9mE2LHZitin2YYg2K3ZhtmK2YbYpyoGCAIQABABkgELc3VwZXJtYXJrZXSqAUoQATIeEAEiGk70OnleN76pqp_96Jd8rWkHvprArrSVrqKlMiYQAiIi2KfYs9mI2KfZgiDYp9mE2LHZitin2YYg2K3ZhtmK2YbYpw,y,p2p6yeziEvw;mv:[[32.57909857731903,35.858191384757816],[32.578738622680966,35.857764215242184]]",
    icon: "حنينا",
  },
  {
    link: "https://www.google.com/search?sca_esv=6cf9c2b9fed3aa1b&sca_upv=1&tbs=lf:1,lf_ui:10&tbm=lcl&sxsrf=ADLYWIK8msxu53J51OdH_ZM6U84kyKsXWg:1726154637056&q=%D8%A7%D8%B3%D9%88%D8%A7%D9%82+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D9%86&rflfq=1&num=10&sa=X&ved=2ahUKEwiO-9-P272IAxXMxAIHHeufFHMQjGp6BAglEAE&biw=1536&bih=695&dpr=1.25#rlfi=hd:;si:18003272887722554214,l,ChfYp9iz2YjYp9mCINin2YTYsdmK2KfZhkj65eDTlK2AgAhaIRAAEAEYABgBIhfYp9iz2YjYp9mCINin2YTYsdmK2KfZhpIBD3Nob3BwaW5nX2NlbnRlcpoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VRdGRXWTNhVlJuRUFF;mv:[[32.590702,35.909074499999996],[32.5076107,35.8433322]]",
    icon: "المطارق",
  },
  {
    link: "https://www.google.com/search?sca_esv=6cf9c2b9fed3aa1b&sca_upv=1&tbs=lf:1,lf_ui:10&tbm=lcl&sxsrf=ADLYWIK8msxu53J51OdH_ZM6U84kyKsXWg:1726154637056&q=%D8%A7%D8%B3%D9%88%D8%A7%D9%82+%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D9%86&rflfq=1&num=10&sa=X&ved=2ahUKEwiO-9-P272IAxXMxAIHHeufFHMQjGp6BAglEAE&biw=1536&bih=695&dpr=1.25#rlfi=hd:;si:3279287236122741748,l,ChfYp9iz2YjYp9mCINin2YTYsdmK2KfZhkig-KvL96-AgAhaIRAAEAEYABgBIhfYp9iz2YjYp9mCINin2YTYsdmK2KfZhpIBD3Nob3BwaW5nX2NlbnRlcpoBJENoZERTVWhOTUc5blMwVkpRMEZuU1VOV2IxbDFRWGhSUlJBQg;mv:[[32.590702,35.909074499999996],[32.5076107,35.8433322]]",
    icon: "شارع القدس",
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
                  className={
                    `align-center h-10 w-10 items-center justify-center rounded-full font-normal shadow-md outline-none focus:outline-none ${!isContactPage && "mr-2"}`
                  }
                  type="button"
                >
                  {media.icon}
                </button>
              </Link>
            ))}
          </div>
        </div>
        <div
          className={`mt-4 flex justify-around ${isContactPage && "flex-col"}`}
        >
          <div className={isContactPage ? "mb-4" : ""}>
            <h4
              className={`fonat-bold text-center ${!isContactPage ? "text-3xl" : "mb-2 text-5xl"}`}
            >
              فروعنا
            </h4>
            <ul
              className={`list-unstyled text-center ${isContactPage && "mt-4"}`}
            >
              {OUR_LOCATIONS.map((loc) => (
                <li key={loc.link} className={`${isContactPage && "py-1"}`}>
                  <Link
                    className={`${!isContactPage ? "text-sm font-semibold" : "text-3xl font-semibold"}`}
                    href={loc.link}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {loc.icon}
                  </Link>
                </li>
              ))}
            </ul>
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
            جميع الحقوق محفوظة أسواق الريان العالمية
          </div>
        </div>
      </div>
    </div>
  );
}
