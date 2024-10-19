import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import InstallApp from "../components/InstallApp";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "next-themes";
import LoadingProvider from "@/app/(siteFacing)/_context/LoadingContext";
import AdminNavbar from "./admin/_components/AdminNavbar";
import MainNavbar from "./(siteFacing)/_components/MainNavbar";
import { checkUser } from "./(siteFacing)/auth/_actions/isAuthenticated";
import BottomNavbar from "./(siteFacing)/(mobile)/_components/BottomNavbar";
import db from "@/db/db";
import { getPendingLength } from "./(siteFacing)/orders/_actions/getOrders";
import { CartProvider } from "./(siteFacing)/_context/cart/CartContext";

export const dynamic =
  process.env.NODE_ENV === "development" ? "force-dynamic" : "auto";

const Alexandria = localFont({
  src: "../fonts/Alexandria-VariableFont_wght.ttf",
  display: "swap",
});

const APP_NAME = "أسواق الريان";
const APP_DEFAULT_TITLE = "mStore";
const APP_TITLE_TEMPLATE = "أسواق الريان - %s";
const APP_DESCRIPTION =
  "أسواق الريان العالمية تجسد روح الكفاءة والابتكار والتركيز على العملاء";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  manifest: "/manifest.json",
  applicationName: APP_NAME,
  category: "Home Supplies",
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE,
  },
  description: APP_DESCRIPTION,
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: APP_DEFAULT_TITLE,
    startupImage: ["/apple-touch-icon.png"],
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
  },
  other: {
    "fb:app_id": `${process.env.WHATSAPP_APP_ID}`,
    "facebook-domain-verification": `${process.env.META_VERIFICATION_CODE}`,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = (await checkUser()) as {
    id: string;
    phone: string;
    username: string;
    role: string;
    profile: { id: string };
  };
  const pendingLength = await getPendingLength();
  const offers = await db.product.findFirst({ where: { isOffer: true } });
  const forHomeProducts = await db.product.findFirst({
    where: { productType: "forHome" },
  });

  return (
    <html lang="ar" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-slate-50 text-rayanPrimary-dark antialiased",
          Alexandria.className,
        )}
        dir="rtl"
      >
        <ThemeProvider attribute="class">
          <CartProvider>
            <LoadingProvider
              AdminNavbar={<AdminNavbar />}
              SiteFacingNavbar={
                <MainNavbar
                  pendingOrdersLength={pendingLength}
                  offersExists={offers !== null}
                  forHomeExists={forHomeProducts !== null}
                  user={user}
                />
              }
              MobileNavBar={<BottomNavbar />}
            >
              <section className="mx-auto max-w-screen-2xl">{children}</section>
            </LoadingProvider>
          </CartProvider>
             <InstallApp /> 
        </ThemeProvider>
      </body>
    </html>
  );
}
