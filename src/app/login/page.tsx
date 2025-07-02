"use client";
import { setLogin } from "@/store/loginSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn, credentialsFalse } = useSelector(
    (state: RootState) => state.login
  );
  const [isRemember, setIsRemember] = useState<boolean>(false);
  const navigate = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  const submitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("formUsername") as string;
    const password = formData.get("formPassword") as string;
    const remember = formData.get("formRemember") as string;
    if (username && password) {
      if (remember) {
        setIsRemember(true);
      }
      dispatch(setLogin({ username, password }));
    }
  };
  useEffect(() => {
    if (isLoggedIn && loaded) {
      if (isRemember) {
        localStorage.setItem("isLogged", "true");
      }
      navigate.push("/");
    }
  }, [isLoggedIn, isRemember, loaded, navigate, dispatch]);
  if (!isLoggedIn && loaded) {
    return (
      <>
        <div className="w-full h-full flex items-center justify-center">
          <form
            onSubmit={submitForm}
            className="flex flex-col gap-8 rounded border-1 border-text-light/40 dark:border-text-dark/40 p-2 md:py-6 md:px-12"
          >
            <div className="text-2xl font-semibold w-full flex items-center justify-center pt-4 px-4 opacity-40">
              Login
            </div>
            <div className="flex flex-row gap-4 text-lg px-4 items-center justify-center">
              <label
                htmlFor="formUsername"
                className="font-semibold text-xl opacity-40 w-1/2 md:w-[100px]"
              >
                Username
              </label>
              <input
                type="text"
                name="formUsername"
                id="formUsername"
                className="w-2/3 sm:w-[200px] border-1 rounded px-4 py-2 text-sm outline-0"
              />
            </div>
            <div className="flex flex-row gap-4 text-lg px-4 items-center justify-center">
              <label
                htmlFor="formPassword"
                className="font-semibold text-xl opacity-40 w-1/2 md:w-[100px]"
              >
                Password
              </label>
              <input
                type="password"
                name="formPassword"
                id="formPassword"
                className="w-2/3 sm:w-[200px] border-1 rounded px-4 py-2 text-sm outline-0"
              />
            </div>
            <div className="flex flex-row gap-2 px-4 items-center justify-start">
              <input
                type="checkbox"
                name="formRemember"
                id="formRemember"
                className="border-1 rounded px-4 py-2 text-xs outline-0"
              />
              <label
                htmlFor="formRemember"
                className="font-semibold opacity-40 "
              >
                Remember Me
              </label>
            </div>
            <div className="flex gap-4 items-center justify-center w-full text-sm font-semibold">
              Enter &quot;demo&quot; for both username and password
            </div>
            {credentialsFalse === true && (
              <div className="flex flex-row px-4 items-center justify-start text-red-800 dark:text-red-400 ">
                Invalid username or password. Please try again.
              </div>
            )}

            <div className="flex flex-row gap-4 text-lg pb-4 items-center justify-center">
              <button
                type="submit"
                className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80"
              >
                Login
              </button>
              <button
                type="reset"
                className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </>
    );
  } else return null;
};
export default Login;
