"use client";
import { Season } from "@/data/types/interfaces";
import { addSeason } from "@/store/seasonsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const NewCompetition = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const seasons = useSelector((state: RootState) => state.seasons);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isDate, setIsDate] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const formSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const date = formData.get("seasonName") as string;
    if (!date) {
      setIsDate(false);
    }
    if (date) {
      const newSeason: Season = {
        id: uuidv4(),
        date: new Date(date).getFullYear(),
      };
      dispatch(addSeason(newSeason));
      e.currentTarget.reset();
      setIsSubmitted(true);
      setIsSuccess(true);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("seasons", JSON.stringify(seasons));
      setIsSuccess(false);
      navigate.push("/matches/seasons");
    }
  }, [isSuccess, seasons, navigate]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate.push("/matches");
    }
  }, [isLoggedIn, navigate]);
  if (isLoggedIn) {
    return (
      <>
        <div className="p-4">
          <div className="w-full flex flex-col gap-10">
            <div className="font-bold text-base md:text-xl">Add Season</div>
            {isSubmitted && (
              <div className="font-bold text-base md:text-xl text-green-900 dark:text-green-600">
                Season Added!
              </div>
            )}
            <form
              onChange={() => isSubmitted && setIsSubmitted(false)}
              onSubmit={formSubmited}
              className="flex flex-col gap-4 w-full text-sm md:text-base"
            >
              {/* Season Name*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="seasonName" className="w-[145px]">
                    When will the season start? * *
                  </label>
                  <input
                    type="date"
                    name="seasonName"
                    id="seasonName"
                    placeholder="Enter season date..."
                    className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[300px]"
                  />
                </div>
                {isDate !== null && !isDate && (
                  <div className="text-xs font-semibold text-red-800">
                    Season name is required!
                  </div>
                )}
              </div>
              {/* Button to submit */}
              <div className="flex flex-row gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80 max-w-[200px] font-bold"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else return null;
};
export default NewCompetition;
