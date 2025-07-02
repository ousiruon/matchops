"use client";
import Button from "@/app/(reusable)/Button";
import { Season } from "@/data/types/interfaces";
import { deleteSeason } from "@/store/seasonsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Seasons = () => {
  const dispatch: AppDispatch = useDispatch();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const navigate = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const seasons: Season[] = useSelector((state: RootState) => state.seasons);
  const deleteSeasonFunc = (id: string) => {
    dispatch(deleteSeason(id));
    setIsSuccess(true);
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("seasons", JSON.stringify(seasons));
      setIsSuccess(false);
    }
  }, [isSuccess, seasons]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate.push("/matches");
    }
  }, [isLoggedIn, navigate]);
  if (isLoggedIn) {
    return (
      <>
        <div className="flex flex-col items-start justify-start w-full mx-auto max-w-[1200px] min-h-dvh">
          <div className="flex flex-row w-full p-4 gap-4 justify-end">
            <Button link="/matches/seasons/newSeason" text="Add Season" />
            <Button link="/matches/newMatch" text="Add Match" />
          </div>
          <div className="flex flex-row w-full py-4 gap-4 justify-start text-3xl font-bold">
            Seasons
          </div>
          {seasons.length > 0 && (
            <div className="flex flex-col w-full border-1 border-text-light/10 dark:border-text-dark/10">
              {seasons.map((season) => (
                <div
                  key={season.id}
                  className="flex flex-row py-4 px-8 items-center justify-between border-b-1 border-text-light/10 dark:border-text-dark/10  w-full p-4 bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out"
                >
                  <div>{`${season.date}-${season.date + 1}`}</div>
                  <div className="flex flex-row items-center justify-end gap-4">
                    <Link
                      className="text-sm"
                      href={`/matches/seasons/${season.id}`}
                    >
                      <FaPen />
                    </Link>
                    <div
                      onClick={() => deleteSeasonFunc(season.id)}
                      className="cursor-pointer"
                    >
                      <MdDeleteForever />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {seasons.length === 0 && (
            <div className="flex flex-col gap-4 flex-1 w-full h-full items-center justify-center font-semibold">
              <div className="opacity-70 text-lg">No seasons found!</div>
            </div>
          )}
        </div>
      </>
    );
  } else return null;
};
export default Seasons;
