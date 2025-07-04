"use client";
import { Card, GoalScored, Player } from "@/data/types/interfaces";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAge } from "../utils/functions";
import { motion } from "motion/react";

const ReusableTop = ({
  title,
  link,
  rankBy,
  players,
  goals,
  cards,
}: {
  title: string;
  link: string;
  rankBy: "goals" | "yellowCards" | "redCards" | "youngPlayers";
  players: Player[];
  goals?: GoalScored[];
  cards?: Card[];
}) => {
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);
  const [hoverSelect, setHoverSelect] = useState<string | null>(null);
  useEffect(() => {
    console.log(hoverSelect);
  }, [hoverSelect]);
  useEffect(() => {
    if (players.length === 0) return;
    if (rankBy === "goals" && goals && goals.length > 0) {
      const playersWithGoals = players.map((player) => {
        const playerGoals = goals.filter((goal) => goal.scorer === player.id);
        return {
          ...player,
          goalsScored: playerGoals.length,
        };
      });
      const sorted = playersWithGoals.sort(
        (a, b) => b.goalsScored - a.goalsScored
      );
      setSortedPlayers(sorted);
    } else if (rankBy === "yellowCards" && cards && cards.length > 0) {
      const playersWithYellowCards = players.map((player) => {
        const playerCards = cards.filter(
          (card) => card.who === player.id && card.type === "yellow"
        );
        return {
          ...player,
          yellowCardsReceived: playerCards.length,
        };
      });
      const sorted = playersWithYellowCards.sort(
        (a, b) => b.yellowCardsReceived - a.yellowCardsReceived
      );
      setSortedPlayers(sorted);
    } else if (rankBy === "redCards" && cards && cards.length > 0) {
      const playersWithRedCards = players.map((player) => {
        const playerCards = cards.filter(
          (card) => card.who === player.id && card.type === "red"
        );
        return {
          ...player,
          redCardsReceived: playerCards.length,
        };
      });
      const sorted = playersWithRedCards.sort(
        (a, b) => b.redCardsReceived - a.redCardsReceived
      );
      setSortedPlayers(sorted);
    } else if (rankBy === "youngPlayers") {
      const sorted = [...players].sort(
        (a, b) => getAge(a.dob || 0) - getAge(b.dob || 0)
      );
      setSortedPlayers(sorted);
    } else {
      setSortedPlayers([]);
    }
  }, [players, goals, cards, rankBy]);
  return (
    sortedPlayers.length > 0 && (
      <div className="w-full lg:w-1/2 px-1 sm:px-3 py-3">
        <div className="flex flex-col items-start justify-start transition-all duration-200 ease-in rounded-lg w-full shadow-md">
          <h1 className="flex items-center justify-between w-full text-lg font-bold p-4 border-b-1 border-text-light/40 dark:border-text-dark/40  dark:bg-primary-dark bg-primary-light text-text-light/70 dark:text-text-dark/70 rounded-t">
            {title}
          </h1>
          <ul className="rounded-b w-full">
            {[...sortedPlayers.slice(0, 3)].map((player) => (
              <Link
                href={`/players/${player.id}`}
                className="flex flex-row items-center justify-between w-full"
                key={player.id}
              >
                <motion.div
                  onHoverStart={() => setHoverSelect(`${rankBy}-${player.id}`)}
                  onHoverEnd={() => setHoverSelect(null)}
                  className="px-2 sm:px-4 py-3 font-semibold flex flex-row items-center justify-between w-full bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out"
                >
                  <div className="flex flex-row gap-4 items-center justify-center">
                    <div className="rounded-full bg-primary-light dark:bg-primary-dark object-cover w-full max-w-[40px] aspect-square overflow-hidden">
                      <Image
                        src={player.image}
                        alt={player.name}
                        width={100}
                        height={100}
                        className={`${
                          hoverSelect === `${rankBy}-${player.id}`
                            ? "scale-110"
                            : ""
                        } object-cover w-full transition-transform duration-200 ease-in-out overflow-hidden`}
                      />
                    </div>
                    {player.name}
                  </div>
                  <div className="text-primary-light dark:text-primary-dark font-semibold opacity-80">
                    {rankBy === "goals"
                      ? player.goalsScored
                      : rankBy === "yellowCards"
                      ? player.yellowCardsReceived
                      : rankBy === "redCards"
                      ? player.redCardsReceived
                      : rankBy === "youngPlayers"
                      ? getAge(player.dob || 0)
                      : ""}
                  </div>
                </motion.div>
              </Link>
            ))}
          </ul>
          <Link
            href={link}
            className="w-full text-right text-sm font-semibold text-text-light/70 dark:text-text-dark/70 hover:text-text-light dark:hover:text-text-dark unded transition-all duration-200 ease-in-out bg-bg-2-light/70 dark:bg-bg-2-dark/40 px-4 pb-4"
          >
            View all
          </Link>
        </div>
      </div>
    )
  );
};
export default ReusableTop;
