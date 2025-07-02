"use client";
import { Finance } from "@/data/types/interfaces";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import {
  FaBusinessTime,
  FaHandshakeSimple,
  FaMoneyBill,
  FaMoneyBillTransfer,
  FaPersonWalkingDashedLineArrowRight,
} from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { GrMoney } from "react-icons/gr";
import { IoMdFootball } from "react-icons/io";
import { MdBroadcastOnHome, MdManageAccounts, MdStadium } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Filters from "./Filters";
import Link from "next/link";
import Button from "../(reusable)/Button";
import { deleteFinance } from "@/store/financesSlice";

const Finances = () => {
  const dispatch: AppDispatch = useDispatch();
  const allFinances = useSelector((state: RootState) => state.finances);
  const seasons = useSelector((state: RootState) => state.seasons);
  const players = useSelector((state: RootState) => state.players);
  const matches = useSelector((state: RootState) => state.matches);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const getSeasonName = (seasonId: string) => {
    const season = seasons.find((s) => s.id === seasonId);
    return season ? `${season.date}/${season.date + 1}` : "Unknown Season";
  };
  const getPlayerName = (playerId: string) => {
    const player = players.find((p) => p.id === playerId);
    return player ? (
      <Link
        href={`/players/${player.id}`}
        className="flex flex-row gap-2 items-center jusityf-center"
      >
        {player.name}
      </Link>
    ) : (
      playerId
    );
  };
  const getMatchName = (matchId: string) => {
    const match = matches.find((m) => m.id === matchId);
    return match ? (
      <Link
        href={`/matches/match/${match.id}`}
        className="flex flex-row gap-2 items-center jusityf-center"
      >
        {match.name}
      </Link>
    ) : (
      matchId
    );
  };
  const iconByType = (type: string) => {
    if (type === "transfer") {
      return <FaMoneyBillTransfer />;
    } else if (type === "partner") {
      return <FaHandshakeSimple />;
    } else if (type === "broadcasting") {
      return <MdBroadcastOnHome />;
    } else if (type === "matchday") {
      return <MdStadium />;
    } else if (type === "prize_money") {
      return <FaMoneyBill />;
    } else if (type === "commercial") {
      return <FcSalesPerformance />;
    } else if (type === "wages") {
      return <GrMoney />;
    } else if (type === "operational_costs") {
      return <FaBusinessTime />;
    } else if (type === "agent_fees") {
      return <MdManageAccounts />;
    } else if (type === "loan_repayment") {
      return <RiBankFill />;
    } else if (type === "youth_academy") {
      return <IoMdFootball />;
    }
  };
  const deleteFinanceFunc = (id: string) => {
    dispatch(deleteFinance(id));
    setIsSuccess(true);
  };
  const [filters, setFilters] = useState({
    season: "all",
    type: "all",
    incomeOrOutcome: "all",
  });
  const [filteredFinances, setFilteredFinances] =
    useState<Finance[]>(allFinances);
  useEffect(() => {
    const filteredFinances = allFinances.filter((finance) => {
      const matchesSeason =
        filters.season === "all" || finance.season === filters.season;
      const matchesType =
        filters.type === "all" || finance.type === filters.type;
      const matchesIncomeOrOutcome =
        filters.incomeOrOutcome === "all" ||
        finance.incomeOrOutcome === filters.incomeOrOutcome;

      return matchesSeason && matchesType && matchesIncomeOrOutcome;
    });
    setFilteredFinances(filteredFinances.reverse());
  }, [allFinances, filters]);
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("finances", JSON.stringify(allFinances));
      setIsSuccess(false);
    }
  }, [isSuccess, allFinances]);
  const [activeSection, setActiveSection] = useState<null | string>(null);
  return (
    <>
      <div className="flex flex-col gap-4 items-start justify-start w-full mx-auto max-w-[1200px]">
        <h1 className="text-2xl font-bold mb-4">All Finances</h1>
        {isLoggedIn && (
          <div className="flex flex-row w-full gap-4 justify-end">
            <Button link="/finances/newFinance" text="New Finance" />
          </div>
        )}
        <Filters
          filters={filters}
          setFilters={setFilters}
          seasons={seasons}
          allFinances={allFinances}
        />
        {filteredFinances.length > 0 &&
          filteredFinances.map((singleFinance) => (
            <div
              key={singleFinance.id}
              className={`flex flex-col items-center w-full bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 transition-all duration-200 ease-in-out cursor-pointer`}
            >
              <div
                onClick={() =>
                  setActiveSection(
                    singleFinance.id === activeSection ? null : singleFinance.id
                  )
                }
                className={`px-4 py-6 flex flex-row items-center justify-between w-full ${
                  singleFinance.incomeOrOutcome === "in"
                    ? "bg-green-900/20 dark:bg-green-800/20 dark:text-green-200"
                    : "bg-red-900/20 dark:bg-red-800/20 dark:text-red-200"
                }`}
              >
                <div className="font-semibold">{singleFinance.name}</div>
                <div>{iconByType(singleFinance.type)}</div>
              </div>
              <div
                className={`bg-bg-2-light dark:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out cursor-pointer ${
                  activeSection === singleFinance.id ? "max-h-96" : "max-h-0"
                } overflow-hidden w-full`}
              >
                <div className="flex flex-col p-4 items-center w-full">
                  {isLoggedIn && (
                    <div className="flex flex-row w-full gap-2 justify-end">
                      <Button
                        link={`/finances/editFinance/${singleFinance.id}`}
                        text="Edit"
                      />
                      <div
                        onClick={() => deleteFinanceFunc(singleFinance.id)}
                        className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80"
                      >
                        Delete
                      </div>
                    </div>
                  )}
                  <div className="flex flex-row w-full justify-between items-center py-4">
                    <div className="text-lg font-semibold">
                      {singleFinance.incomeOrOutcome === "in" ? "+" : "-"}{" "}
                      {singleFinance.value.toLocaleString("en-EU", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {getSeasonName(singleFinance.season)}
                    </div>
                  </div>
                  {singleFinance.transfer && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 w-full flex flex-row items-center gap-2">
                      Transfer:
                      <FaPersonWalkingDashedLineArrowRight
                        className={`${
                          singleFinance.incomeOrOutcome === "in"
                            ? "transform -scale-x-100"
                            : ""
                        }`}
                      />
                      <div>{getPlayerName(singleFinance.transfer.player)}</div>
                    </div>
                  )}
                  {singleFinance.matchDay && (
                    <div className="text-sm text-gray-500 dark:text-gray-400 w-full flex flex-row items-center gap-2">
                      <div>{getMatchName(singleFinance.matchDay.id)}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        {filteredFinances.length === 0 && (
          <div className="text-gray-500 dark:text-gray-400 text-center py-4">
            No finances found for the selected filters.
          </div>
        )}
      </div>
    </>
  );
};
export default Finances;
