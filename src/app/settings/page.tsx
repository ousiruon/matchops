"use client";
import {
  setMenuPosition,
  setMode,
  setPlayerDisplay,
} from "@/store/settingsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const { darkMode, playersDisplay, menuPosition } = useSelector(
    (state: RootState) => state.settings
  );
  const navigate = useRouter();
  const [loaded, setLoaded] = useState<boolean>(false);
  const [isPassSaved, setIsPassSaved] = useState<boolean>(
    localStorage.isLogged === "true" ? true : false
  );
  const [successMsg, setSuccessMsg] = useState<boolean>(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!isLoggedIn && loaded) {
      navigate.push("/");
    }
  }, [isLoggedIn, navigate, loaded]);

  const updateTheme = (e: string) => {
    if (e === "yes") {
      dispatch(setMode(true));
      localStorage.theme = "dark";
      setSuccessMsg(true);
    } else {
      dispatch(setMode(false));
      localStorage.theme = "light";
      setSuccessMsg(true);
    }
  };
  const updateDisplay = (e: string) => {
    dispatch(setPlayerDisplay(e));
    localStorage.display = e;
    setSuccessMsg(true);
  };
  const updatePosition = (e: string) => {
    dispatch(setMenuPosition(e));
    localStorage.menuPosition = e;
    setSuccessMsg(true);
  };
  const updateSavedPass = (e: string) => {
    if (e === "yes" && isLoggedIn) {
      localStorage.isLogged = "true";
      setSuccessMsg(true);
      setIsPassSaved(true);
    } else if (e === "no" && isLoggedIn) {
      localStorage.removeItem("isLogged");
      setSuccessMsg(true);
    }
  };
  useEffect(() => {
    if (successMsg) {
      setTimeout(() => {
        setSuccessMsg(false);
      }, 3000);
    }
  }, [successMsg]);
  if (isLoggedIn && loaded) {
    return (
      <>
        <div className="relative p-4">
          {successMsg && (
            <div className="absolute top-0 left-[50%] translate-x-[-50%] bg-primary-light dark:bg-primary-dark py-2 px-4 rounded">
              Change saved!
            </div>
          )}
          <div className="w-full flex flex-col gap-10">
            <div className="font-bold text-base md:text-xl">Edit settings</div>
            <div className="flex flex-col gap-4 w-full text-sm md:text-base">
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 py-4 items-center justify-start w-full">
                  <label htmlFor="darkModeSettings" className="w-[150px]">
                    Dark Mode *
                  </label>
                  <select
                    name="darkModeSettings"
                    id="darkModeSettings"
                    className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300"
                    defaultValue={darkMode ? "yes" : "no"}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      updateTheme(event.target.value)
                    }
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
                <div className="flex flex-row gap-4 py-4 items-center justify-start w-full">
                  <label htmlFor="darkModeSettings" className="w-[150px]">
                    Players Display *
                  </label>
                  <select
                    name="darkModeSettings"
                    id="darkModeSettings"
                    className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300"
                    defaultValue={playersDisplay}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      updateDisplay(event.target.value)
                    }
                  >
                    <option value="grid">Grid</option>
                    <option value="table">Table</option>
                  </select>
                </div>
                <div className="flex flex-row gap-4 py-4 items-center justify-start w-full">
                  <label htmlFor="positionSettings" className="w-[150px]">
                    Menu Position *
                  </label>
                  <select
                    name="positionSettings"
                    id="positionSettings"
                    className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300"
                    defaultValue={menuPosition}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      updatePosition(event.target.value)
                    }
                  >
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                <div className="flex flex-row gap-4 py-4 items-center justify-start w-full">
                  <label htmlFor="passwordSettins" className="w-[150px]">
                    Remember Password *
                  </label>
                  <select
                    name="passwordSettins"
                    id="passwordSettins"
                    className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300"
                    defaultValue={isPassSaved ? "yes" : "no"}
                    onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                      updateSavedPass(event.target.value)
                    }
                  >
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else return null;
};
export default Settings;
