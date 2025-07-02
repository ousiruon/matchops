import type { Metadata } from "next";
import { Rajdhani } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Providers from "./Providers";
import RetrieveData from "./RetrieveData";

const mainFont = Rajdhani({ weight: "500", subsets: ["latin"] });
export const metadata: Metadata = {
  title: "MatchOps – Football Club Manager Dashboard",
  description:
    "MatchOps is an all-in-one football management dashboard for clubs and coaches. Track players, manage match results, monitor finances, and optimize tactics—all in one powerful and intuitive platform.",
};

const RootLayout = ({
  children,
  navMenu,
}: Readonly<{
  children: ReactNode;
  navMenu: ReactNode;
}>) => {
  return (
    <html lang="en">
      <Providers>
        <RetrieveData font={mainFont.className}>
          {navMenu}
          <div className="flex-1 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark max-w-full px-5 lg:px-10 xl:px-20 py-4 lg:py-8 overflow-x-hidden">
            {children}
          </div>
        </RetrieveData>
      </Providers>
    </html>
  );
};
export default RootLayout;
