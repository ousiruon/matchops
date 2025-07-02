"use client";
import { Finance } from "@/data/types/interfaces";
import { useEffect, useState } from "react";
import { FaMoneyBill, FaBusinessTime } from "react-icons/fa";
import { FaMoneyBillTransfer, FaHandshakeSimple } from "react-icons/fa6";
import { FcSalesPerformance } from "react-icons/fc";
import { GrMoney } from "react-icons/gr";
import { IoMdFootball } from "react-icons/io";
import { MdBroadcastOnHome, MdStadium, MdManageAccounts } from "react-icons/md";
import { RiBankFill } from "react-icons/ri";

const ReusableIncome = ({
  finances,
  result,
}: {
  finances: Finance[];
  result: "best" | "worst";
}) => {
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
  const [sortedFinances, setSortedFinances] = useState<Finance[]>([]);
  useEffect(() => {
    if (result === "best") {
      const selectedFinances = finances.filter(
        (finance) => finance.incomeOrOutcome === "in"
      );
      setSortedFinances(selectedFinances.sort((a, b) => b.value - a.value));
    } else {
      const selectedFinances = finances.filter(
        (finance) => finance.incomeOrOutcome === "out"
      );
      setSortedFinances(selectedFinances.sort((a, b) => b.value - a.value));
    }
  }, [finances, result]);
  return (
    <>
      {" "}
      <div className="w-full lg:w-1/2 px-1 sm:px-3 py-3">
        <div className="flex flex-col items-start justify-start transition-all duration-200 ease-in rounded-lg w-full shadow-md">
          <h1 className="flex items-center justify-between w-full text-lg font-bold p-4 border-b-1 border-text-light/40 dark:border-text-dark/40  dark:bg-primary-dark bg-primary-light text-text-light/70 dark:text-text-dark/70 rounded-t">
            {result === "best" ? "Highest Income" : "Highest Outcome"}
          </h1>
          <ul className="rounded-b w-full">
            {sortedFinances.length > 0 &&
              [...sortedFinances.slice(0, 3)].map((finance) => (
                <div
                  className="font-semibold flex flex-row items-center w-full bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out not-last:border-b-1 border-text-light/20 dark:border-text-dark/20"
                  key={finance.id}
                >
                  <div
                    className={`flex flex-row items-center justify-between w-full ${
                      result === "best"
                        ? "bg-green-900/20 dark:bg-green-800/20"
                        : "bg-red-900/20 dark:bg-red-800/20"
                    }`}
                  >
                    <div className="px-2 sm:px-4 py-6 flex-1">
                      {finance.name}
                    </div>
                    <div className="px-2 sm:px-4 py-6">
                      {iconByType(finance.type)}
                    </div>
                  </div>
                </div>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default ReusableIncome;
