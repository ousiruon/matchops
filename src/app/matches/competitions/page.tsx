"use client";
import Button from "@/app/(reusable)/Button";
import { Competition } from "@/data/types/interfaces";
import { deleteCompetition } from "@/store/competitionsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaPen } from "react-icons/fa6";
import { IoAirplane } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

const Competitions = () => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const navigate = useRouter();
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const competitions: Competition[] = useSelector(
    (state: RootState) => state.competitions
  );
  const deleteCompetitionFunc = (id: string) => {
    dispatch(deleteCompetition(id));
    setIsSuccess(true);
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("competitions", JSON.stringify(competitions));
      setIsSuccess(false);
    }
  }, [isSuccess, competitions]);
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
            <Button
              link="/matches/competitions/newCompetition"
              text="Add Competition"
            />
            <Button link="/matches/newMatch" text="Add Match" />
          </div>
          <div className="flex flex-row w-full py-4 gap-4 justify-start text-3xl font-bold">
            Competitions
          </div>
          {competitions.length > 0 && (
            <div className="flex flex-col w-full border-1 border-text-light/10 dark:border-text-dark/10">
              {competitions.map((competition) => (
                <div
                  key={competition.id}
                  className="flex flex-row py-4 px-8 items-center justify-between border-b-1 border-text-light/10 dark:border-text-dark/10  w-full p-4 bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out"
                >
                  <div className="flex flex-row items-center gap-4">
                    {competition.local ? <FaHome /> : <IoAirplane />}
                    {competition.name}
                  </div>
                  <div className="flex flex-row items-center justify-end gap-4">
                    <Link
                      className="text-sm"
                      href={`/matches/competitions/${competition.id}`}
                    >
                      <FaPen />
                    </Link>
                    <div
                      onClick={() => deleteCompetitionFunc(competition.id)}
                      className="cursor-pointer"
                    >
                      <MdDeleteForever />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {competitions.length === 0 && (
            <div className="flex flex-col gap-4 flex-1 w-full h-full items-center justify-center font-semibold">
              <div className="opacity-70 text-lg">No competitions found!</div>
            </div>
          )}
        </div>
      </>
    );
  } else return null;
};
export default Competitions;
