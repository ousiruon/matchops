import { RootState } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoMdSettings } from "react-icons/io";
import { useSelector } from "react-redux";

const NavSettings = () => {
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.login
  );
  const pathname = usePathname();
  if (isLoggedIn) {
    return (
      <>
        <Link
          href="/settings"
          className={`flex flex-row gap-2 items-center lg:py-6 lg:px-12 p-3 sm:p-6 transition-all ease-in duration-300 ${
            pathname === "/settings" ? "bg-bg-light/20 dark:bg-bg-dark/20" : ""
          }`}
        >
          <div className="text-lg md:text-base">
            <IoMdSettings />
          </div>
          <div className="hidden md:block">Settings</div>
        </Link>
      </>
    );
  } else return null;
};
export default NavSettings;
