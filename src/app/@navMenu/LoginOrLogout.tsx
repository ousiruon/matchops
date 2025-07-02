"use client";
import { setLogout } from "@/store/loginSlice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";

const LoginOrLogout = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn } = useSelector(
    (state: RootState) => state.login
  );
  const pathname = usePathname();
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);
  const [stateLogOut, setStateLogOut] = useState<boolean>(false);
  const logOut = () => {
    dispatch(setLogout());
    setStateLogOut(true);
  };
  useEffect(() => {
    if (!isLoggedIn && stateLogOut) {
      if (localStorage.getItem("isLogged")) {
        localStorage.removeItem("isLogged");
      }
      setStateLogOut(false);
    }
  }, [isLoggedIn, stateLogOut]);
  useEffect(() => {
    if (isLoggedIn) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [isLoggedIn]);
  if (!loggedIn) {
    return (
      <>
        <Link
          href="/login"
          className={`flex flex-row gap-2 items-center lg:py-6 lg:px-12 p-3 sm:p-6 transition-all ease-in duration-300 ${
            pathname === "/login" ? "bg-bg-light/20 dark:bg-bg-dark/20" : ""
          }`}
        >
          <div className="text-lg md:text-base">
            <FaUser />
          </div>
          <div className="hidden md:block">Login</div>
        </Link>
      </>
    );
  } else if (loggedIn === true) {
    return (
      <>
        <div
          onClick={logOut}
          className="flex flex-row cursor-pointer hover:bg-bg-light/20 hover:dark:bg-bg-dark/20 gap-2 items-center lg:py-6 lg:px-12 p-3 sm:p-6 transition-all ease-in duration-300"
        >
          <div className="text-lg md:text-base">
            <IoMdLogOut />
          </div>
          <div className="hidden md:block">Logout</div>
        </div>
      </>
    );
  } else return null;
};
export default LoginOrLogout;
