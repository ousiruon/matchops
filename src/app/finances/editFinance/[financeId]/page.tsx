"use client";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Finance, Game, Season } from "@/data/types/interfaces";
import { useParams, useRouter } from "next/navigation";
import { players } from "@/data/players";
import { editFinance } from "@/store/financesSlice";

const EditFinance = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const [isSeason, setIsSeason] = useState<boolean | null>(null);
  const seasons: Season[] = useSelector((state: RootState) => state.seasons);
  const matches: Game[] = useSelector((state: RootState) => state.matches);
  const finances: Finance[] = useSelector((state: RootState) => state.finances);
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const navigate = useRouter();
  const [financeType, setFinanceType] = useState<string>("transfer");
  const [isFound, setIsFound] = useState<boolean | null>(null);
  const [singleFinance, setSingleFinance] = useState<Finance | null>(null);
  const [financeIn, setFinanceIn] = useState<boolean>(true);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean | null>(null);
  const [isIncome, setIsIncome] = useState<boolean | null>(null);
  const [isValue, setIsValue] = useState<boolean | null>(null);
  const [isType, setIsType] = useState<boolean | null>(null);
  const [isPlayer, setIsPlayer] = useState<boolean | null>(null);
  const [isMatch, setIsMatch] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (seasons.length > 0) {
      setIsSeason(true);
    } else {
      setIsSeason(false);
    }
  }, [seasons]);
  const formSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("financeName") as string;
    const income = formData.get("financeIncome") as string;
    const value = formData.get("financeValue") as string;
    const season = formData.get("financeSeason") as string;
    const type = formData.get("financeType") as
      | "transfer"
      | "matchday"
      | "partner"
      | "broadcasting"
      | "prize_money"
      | "commercial"
      | "wages"
      | "operational_costs"
      | "agent_fees"
      | "loan_repayment"
      | "youth_academy";
    const playerIn = formData.get("financePlayerIn") as string;
    const playerOut = formData.get("financePlayerOut") as string;
    const match = formData.get("financeMatches") as string;
    if (!name) {
      setIsName(false);
    }
    if (!income) {
      setIsIncome(false);
    }
    if (!value) {
      setIsValue(false);
    }
    if (!type) {
      setIsType(false);
    }
    if (financeType === "transfer" && financeIn && !playerIn) {
      setIsPlayer(false);
    }
    if (financeType === "transfer" && !financeIn && !playerOut) {
      setIsPlayer(false);
    }
    if (financeType === "matchday" && !matches) {
      setIsMatch(false);
    }
    if (params.financeId && name && income && value && type) {
      const newFinance: Finance = {
        id: params.financeId as string,
        name,
        value: parseFloat(value),
        incomeOrOutcome: income === "yes" ? "in" : "out",
        type,
        season: season || "",
        transfer:
          financeType === "transfer"
            ? {
                player: !financeIn ? playerOut : playerIn,
              }
            : undefined,
        matchDay: financeType === "matchday" ? { id: match } : undefined,
      };
      dispatch(editFinance(newFinance));
      e.currentTarget.reset();
      setIsSubmitted(true);
      setIsSuccess(true);
    }
  };
  useEffect(() => {
    if (params.financeId) {
      const finance = finances.find(
        (finance) => finance.id === params.financeId
      );
      if (finance) {
        setIsFound(true);
        setSingleFinance(finance);
        setFinanceType(finance.type);
        setFinanceIn(finance.incomeOrOutcome === "in");
      } else {
        setIsFound(false);
      }
    }
  }, [params.financeId, finances]);
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("finances", JSON.stringify(finances));
      setIsSuccess(false);
      navigate.push("/finances");
    }
  }, [isSuccess, finances, navigate]);
  useEffect(() => {
    if (!isLoggedIn || isFound === false) {
      navigate.push("/finances");
    }
  }, [isLoggedIn, isFound, navigate]);
  if (isSeason === false) {
    return <></>;
  } else {
    if (isLoggedIn && isFound && singleFinance !== null) {
      return (
        <>
          <div className="p-4">
            <div className="w-full flex flex-col gap-10">
              <div className="font-bold text-base md:text-xl">Edit Finance</div>
              {isSubmitted && (
                <div className="font-bold text-base md:text-xl text-green-900 dark:text-green-600">
                  Finance Edited!
                </div>
              )}
              <form
                onChange={() => isSubmitted && setIsSubmitted(false)}
                onSubmit={formSubmited}
                className="flex flex-col gap-4 w-full text-sm md:text-base"
              >
                {/* Finance Name*/}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-4 items-center justify-start w-full">
                    <label htmlFor="financeName" className="w-[90px]">
                      Name *
                    </label>
                    <input
                      defaultValue={singleFinance.name}
                      type="text"
                      name="financeName"
                      id="financeName"
                      placeholder="Enter finance name..."
                      className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded sm:max-w-[300px]"
                    />
                  </div>
                  {isName !== null && !isName && (
                    <div className="text-xs font-semibold text-red-800">
                      Finance name is required!
                    </div>
                  )}
                </div>
                {/* Finance Income or Outcome*/}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-4 items-center justify-start w-full">
                    <label htmlFor="financeIncome" className="w-[90px]">
                      Income *
                    </label>
                    <select
                      onChange={(e) => {
                        setIsName(true);
                        if (e.target.value === "yes") {
                          setFinanceIn(true);
                        } else {
                          setFinanceIn(false);
                        }
                      }}
                      className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 w-full sm:w-auto"
                      name="financeIncome"
                      id="financeIncome"
                      defaultValue={
                        singleFinance.incomeOrOutcome === "in" ? "yes" : "no"
                      }
                    >
                      <option value="yes">Yes</option>
                      <option value="no">No</option>
                    </select>
                  </div>
                  {isIncome !== null && !isIncome && (
                    <div className="text-xs font-semibold text-red-800">
                      Income type is required!
                    </div>
                  )}
                </div>
                {/* Finance Value*/}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-4 items-center justify-start w-full">
                    <label htmlFor="financeValue" className="w-[90px]">
                      Value *
                    </label>
                    <input
                      type="number"
                      defaultValue={singleFinance.value}
                      onChange={(e) => {
                        setIsValue(true);
                        if (e.target.value === "") {
                          setIsValue(false);
                        }
                        if (parseFloat(e.target.value) < 0) {
                          e.target.value = "0";
                        }
                      }}
                      min={0}
                      name="financeValue"
                      id="financeValue"
                      placeholder="Enter value..."
                      className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded sm:max-w-[300px]"
                    />
                  </div>
                  {isValue !== null && !isValue && (
                    <div className="text-xs font-semibold text-red-800">
                      Value is required!
                    </div>
                  )}
                </div>
                {/* Finance Season*/}
                {seasons.length > 0 && (
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                      <label htmlFor="financeSeason" className="w-[90px]">
                        Season *
                      </label>
                      <select
                        id="financeSeason"
                        name="financeSeason"
                        defaultValue={singleFinance.season || ""}
                        className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 w-full sm:w-auto"
                      >
                        {seasons.map((season) => (
                          <option key={season.id} value={season.id}>
                            {season.date}-{season.date + 1}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isType !== null && !isType && (
                      <div className="text-xs font-semibold text-red-800">
                        Type is required!
                      </div>
                    )}
                  </div>
                )}
                {/* Finance Type*/}
                <div className="flex flex-col gap-2 items-start justify-start w-full">
                  <div className="flex flex-row gap-4 items-center justify-start w-full">
                    <label htmlFor="financeType" className="w-[90px]">
                      Type *
                    </label>
                    <select
                      onChange={(e) => setFinanceType(e.target.value)}
                      value={financeType}
                      id="financeType"
                      name="financeType"
                      className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 w-full sm:w-auto"
                    >
                      {Array.from(
                        new Set(finances.map((finance) => finance.type))
                      ).map((type) => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() +
                            type.slice(1).replace(/_/g, " ")}
                        </option>
                      ))}
                    </select>
                  </div>
                  {isType !== null && !isType && (
                    <div className="text-xs font-semibold text-red-800">
                      Type is required!
                    </div>
                  )}
                </div>
                {/* Finance Player In*/}
                {financeType === "transfer" && financeIn && (
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                      <label htmlFor="financePlayerIn" className="w-[90px]">
                        Player *
                      </label>
                      <select
                        id="financePlayerIn"
                        name="financePlayerIn"
                        defaultValue={singleFinance.transfer?.player || ""}
                        className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 w-full sm:w-auto"
                      >
                        {players.map((player) => (
                          <option key={player.id} value={player.id}>
                            {player.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isPlayer !== null && !isPlayer && (
                      <div className="text-xs font-semibold text-red-800">
                        Player is required!
                      </div>
                    )}
                  </div>
                )}
                {/* Finance Player Out*/}
                {financeType === "transfer" && !financeIn && (
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                      <label htmlFor="financePlayerOut" className="w-[90px]">
                        Player *
                      </label>
                      <input
                        type="text"
                        name="financePlayerOut"
                        id="financePlayerOut"
                        defaultValue={singleFinance.transfer?.player || ""}
                        placeholder="Enter player name..."
                        className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded sm:max-w-[300px]"
                      />
                    </div>
                    {isPlayer !== null && !isPlayer && (
                      <div className="text-xs font-semibold text-red-800">
                        Player is required!
                      </div>
                    )}
                  </div>
                )}
                {/* Finance Matches*/}
                {financeType === "matchday" && (
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                      <label htmlFor="financeMatches" className="w-[90px]">
                        Match *
                      </label>
                      <select
                        id="financeMatches"
                        name="financeMatches"
                        defaultValue={singleFinance.matchDay?.id || ""}
                        className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 w-full sm:w-auto"
                      >
                        {matches.map((match) => (
                          <option key={match.id} value={match.id}>
                            {match.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {isMatch !== null && !isMatch && (
                      <div className="text-xs font-semibold text-red-800">
                        Match is required!
                      </div>
                    )}
                  </div>
                )}
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
  }
};
export default EditFinance;
