"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { menuItems } from "../data/menu";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import NavSettings from "./NavSettings";
import LoginOrLogout from "./LoginOrLogout";
const DefaultNavMenu = () => {
  const pathname = usePathname();
  const { menuPosition } = useSelector((state: RootState) => state.settings);
  const renderMenu = (section: "main" | "bottom") =>
    menuItems
      .filter((item) => item.section === section)
      .map(({ label, href, Icon }) => {
        const isActive =
          label === "Dashboard"
            ? pathname === "/"
            : pathname.startsWith(`/${label.toLowerCase()}`);
        return (
          <Link
            key={href}
            href={href}
            className={`flex flex-row gap-2 items-center lg:py-6 lg:px-12 p-3 sm:p-6 transition-all ease-in duration-300 ${
              isActive
                ? "bg-bg-light/20 dark:bg-bg-dark/20"
                : "hover:bg-bg-light/20 hover:dark:bg-bg-dark/20"
            }`}
          >
            <div className="text-lg md:text-base">
              <Icon />
            </div>
            <div className="hidden md:block">{label}</div>
          </Link>
        );
      });
  return (
    <div
      className={`sticky top-0 ${
        menuPosition === "right" ? "right-0" : "left-0"
      } min-h-dvh max-h-dvh flex flex-col justify-between py-4 text-lg font-bold bg-bg-2-light dark:bg-bg-2-dark text-text-light dark:text-text-dark`}
    >
      <div className="flex flex-col">
        {renderMenu("main")}
        <NavSettings />
      </div>
      <div className="flex flex-col">
        <LoginOrLogout />
      </div>
    </div>
  );
};
export default DefaultNavMenu;
