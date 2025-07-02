"use client";
import { Competition } from "@/data/types/interfaces";
import { appendCompetition } from "@/store/competitionsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NoCompetition from "./NoCompetition";
import { useRouter } from "next/navigation";

const EditCompetition = () => {
  const router = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const competitions = useSelector((state: RootState) => state.competitions);
  const [dataAvailable, setDataAvailable] = useState<boolean | null>(null);
  const [singleCompetition, setSingleCompetition] = useState<Competition>();
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean | null>(null);
  const [isLocal, setIsLocal] = useState<boolean | null>(null);
  const [isPrize, setIsPrize] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    const retrievedCompetition = competitions.find(
      (competition) => competition.id === router.competitionId
    );
    if (retrievedCompetition) {
      setSingleCompetition(retrievedCompetition);
    }
    setDataAvailable(!!retrievedCompetition);
  }, [competitions, router.competitionId]);

  const formSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get("competitionId") as string;
    const name = formData.get("competitionName") as string;
    const local = formData.get("competitionLocal") as string;
    const prize = formData.get("competitionPrize") as string;
    if (!name) {
      setIsName(false);
    }
    if (!local) {
      setIsLocal(false);
    }
    if (!prize) {
      setIsPrize(false);
    }
    if (name && local && prize) {
      const modifiedCompetition: Competition = {
        id,
        name,
        local: local === "yes" ? true : false,
        prize: Number(prize),
      };
      dispatch(appendCompetition(modifiedCompetition));
      e.currentTarget.reset();
      setIsSubmitted(true);
      setIsSuccess(true);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("competitions", JSON.stringify(competitions));
      setIsSuccess(false);
      navigate.push("/matches/competitions");
    }
  }, [isSuccess, competitions, navigate]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate.push("/matches");
    }
  }, [isLoggedIn, navigate]);
  if (isLoggedIn) {
    return (
      <>
        <div className={`relative p-4 min-h-full ${!dataAvailable && "flex "}`}>
          {dataAvailable && singleCompetition && (
            <div className="w-full flex flex-col gap-10">
              <div className="font-bold text-base md:text-xl">
                Add Competition
              </div>
              {isSubmitted && (
                <div className="font-bold text-base md:text-xl text-green-900 dark:text-green-600">
                  Competition Modified!
                </div>
              )}
              <form
                onChange={() => isSubmitted && setIsSubmitted(false)}
                onSubmit={formSubmited}
                className="flex flex-col gap-4 w-full text-sm md:text-base"
              >
                {/* Competition Name*/}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-4 items-center justify-start w-full">
                    <label htmlFor="competitionName" className="w-[145px]">
                      Competition&quot;s Name *
                    </label>
                    <input
                      defaultValue={singleCompetition.name}
                      type="text"
                      name="competitionName"
                      id="competitionName"
                      placeholder="Enter player name..."
                      className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[300px]"
                    />
                    <input
                      defaultValue={singleCompetition.id}
                      type="text"
                      name="competitionId"
                      id="competitionId"
                      className="w-0 hidden"
                    />
                  </div>
                  {isName !== null && !isName && (
                    <div className="text-xs font-semibold text-red-800">
                      Competition name is required!
                    </div>
                  )}
                </div>
                {/* Competition Local*/}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-4 items-center justify-start w-full">
                    <label htmlFor="competitionLocal" className="w-[145px]">
                      Is it local? *
                    </label>
                    <select
                      defaultValue={singleCompetition.local ? "yes" : "no"}
                      name="competitionLocal"
                      id="competitionLocal"
                      className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300"
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {isLocal !== null && !isLocal && (
                    <div className="text-xs font-semibold text-red-800">
                      Required Input!
                    </div>
                  )}
                </div>
                {/* Competition Local*/}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-4 items-center justify-start w-full">
                    <label htmlFor="competitionPrize" className="w-[145px]">
                      Competition Prize *
                    </label>
                    <input
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        if (
                          event.currentTarget.value &&
                          Number(event.currentTarget.value) < 0
                        ) {
                          event.currentTarget.value = "0";
                        }
                      }}
                      defaultValue={singleCompetition.prize}
                      min={0}
                      type="number"
                      name="competitionPrize"
                      id="competitionPrize"
                      placeholder="Enter Prize..."
                      className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[300px]"
                    />
                  </div>
                  {isPrize !== null && !isPrize && (
                    <div className="text-xs font-semibold text-red-800">
                      Competition Prize is required!
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
                  <button
                    type="reset"
                    className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80 max-w-[150px] font-bold"
                  >
                    Reset
                  </button>
                </div>
              </form>
            </div>
          )}
          {dataAvailable !== null && dataAvailable === false && (
            <NoCompetition />
          )}
        </div>
      </>
    );
  } else return null;
};
export default EditCompetition;
