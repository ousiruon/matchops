"use client";
import { Game, GoalScored } from "@/data/types/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa6";
interface MatchWithGoals extends Game {
  ourGoals?: number;
  theirGoals?: number;
  goalDifference?: number;
}
const ReusableGame = ({
  matches,
  goals,
  result,
}: {
  matches: MatchWithGoals[];
  goals: GoalScored[];
  result: "biggestWins" | "biggestlosses";
}) => {
  const [sortedMatches, setSortedMatches] = useState<MatchWithGoals[]>([]);
  useEffect(() => {
    if (matches.length === 0 || goals.length === 0) return;
    if (matches.length > 0 && goals.length > 0) {
      const updatedMatches = [...matches].map((match) => {
        const matchGoals = goals.filter((goal) => goal.game === match.id);
        const ourGoals = matchGoals.filter((goal) => goal.byus).length;
        const theirGoals = matchGoals.filter((goal) => !goal.byus).length;
        return {
          ...match,
          ourGoals,
          theirGoals,
          goalDifference: ourGoals - theirGoals,
        };
      });
      const sortedMatchesArray = [...updatedMatches].sort((a, b) => {
        if (result === "biggestWins") {
          return b.goalDifference - a.goalDifference;
        } else {
          return a.goalDifference - b.goalDifference;
        }
      });
      setSortedMatches(sortedMatchesArray);
    }
  }, [matches, goals, result]);
  return (
    <>
      <div className="w-full lg:w-1/2 px-1 sm:px-3 py-3">
        <div className="flex flex-col items-start justify-start transition-all duration-200 ease-in rounded-lg w-full shadow-md">
          <h1 className="flex items-center justify-between w-full text-lg font-bold p-4 border-b-1 border-text-light/40 dark:border-text-dark/40  dark:bg-primary-dark bg-primary-light text-text-light/70 dark:text-text-dark/70 rounded-t">
            {result === "biggestWins" ? "Biggest Wins" : "Biggest Losses"}
          </h1>
          <ul className="rounded-b w-full">
            {[...sortedMatches.slice(0, 4)].map((match) => (
              <Link
                href={`/matches/match/${match.id}`}
                className="font-semibold flex flex-row items-center justify-between w-full bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out not-last:border-b-1 border-text-light/20 dark:border-text-dark/20"
                key={match.id}
              >
                <div className="flex flex-row justify-between items-center gap-2 px-2 md:px-4 py-3 bg-primary-light dark:bg-primary-dark w-3/5">
                  <div className="text-3xl flex items-center justify-center min-h-full">
                    {match.home ? <FaHome /> : <FaPlaneDeparture />}
                  </div>
                  <div>
                    {match.ourGoals}-{match.theirGoals}
                  </div>
                </div>
                <div className="w-2/5 flex justify-end px-2 md:px-4 text-right">
                  {match.opponent}
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default ReusableGame;
