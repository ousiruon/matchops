"use client";

import Button from "@/app/(reusable)/Button";
import { Game, GoalScored, Card } from "@/data/types/interfaces";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState, useRef } from "react";
import { FaHome, FaPlaneDeparture } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import GetEvent from "./GetEvent";
import { useRouter } from "next/navigation";
import { deleteMatch } from "@/store/matchesSlice";
import { deleteGoalsByMatch } from "@/store/goalsSlice";
import { deleteCardsByMatch } from "@/store/cardsSlice";

const RenderMatch = ({ game }: { game: Game }) => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const date = new Date(game.time);
  const formatted = date.toISOString().split("T")[0];

  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const matches = useSelector((state: RootState) => state.matches);
  const goals = useSelector((state: RootState) => state.goals);
  const cards = useSelector((state: RootState) => state.cards);

  const [goalsCardsForUs, setGoalsCardsForUs] = useState<(GoalScored | Card)[]>(
    []
  );
  const [goalsCardsAgainstUs, setGoalsCardsAgainstUs] = useState<
    (GoalScored | Card)[]
  >([]);

  const deleteTriggered = useRef(false);

  useEffect(() => {
    const goalsPerGame = goals.filter((goal) => goal.game === game.id);
    const cardsPerGame = cards.filter((card) => card.game === game.id);

    const goalsForUs = goalsPerGame.filter((goal) => goal.byus);
    const goalsAgainstUs = goalsPerGame.filter((goal) => !goal.byus);
    const cardsForUs = cardsPerGame.filter((card) => card.byus);
    const cardsAgainstUs = cardsPerGame.filter((card) => !card.byus);

    const sortedForUs = [...goalsForUs, ...cardsForUs].sort(
      (a, b) => a.time - b.time
    );
    const sortedAgainstUs = [...goalsAgainstUs, ...cardsAgainstUs].sort(
      (a, b) => a.time - b.time
    );

    setGoalsCardsForUs(sortedForUs);
    setGoalsCardsAgainstUs(sortedAgainstUs);
  }, [goals, cards, game.id]);

  const deleteGame = (id: string) => {
    if (deleteTriggered.current) return;
    deleteTriggered.current = true;

    dispatch(deleteMatch(id));
    dispatch(deleteGoalsByMatch(id));
    dispatch(deleteCardsByMatch(id));

    localStorage.setItem("matches", JSON.stringify(matches));
    localStorage.setItem("goals", JSON.stringify(goals));
    localStorage.setItem("cards", JSON.stringify(cards));

    router.push("/matches/");
  };

  const goalsForUsCount = goalsCardsForUs.filter((e) => "scorer" in e).length;
  const goalsAgainstUsCount = goalsCardsAgainstUs.filter(
    (e) => "scorer" in e
  ).length;

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex flex-col md:flex-row items-stretch w-full bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out rounded-lg"
        key={game.id}
      >
        {/* Left Icon */}
        <div className="text-5xl flex-2/8 flex items-center justify-center min-h-full bg-primary-light dark:bg-primary-dark py-4 md:py-0 rounded-t-lg md:rounded-l-lg">
          {game.home ? <FaHome /> : <FaPlaneDeparture />}
        </div>

        {/* Middle Info */}
        <div className="flex-4/8 flex flex-col items-center justify-between gap-2 py-2">
          <div className="font-bold">{game.name}</div>

          <div className="flex flex-col gap-4 w-full items-center">
            <div
              className={`flex flex-row w-full justify-center gap-2 text-lg font-semibold ${
                goalsForUsCount > goalsAgainstUsCount
                  ? "text-green-600"
                  : goalsForUsCount < goalsAgainstUsCount
                  ? "text-red-600"
                  : "text-yellow-600"
              }`}
            >
              <div>{goalsForUsCount}</div>
              <div>-</div>
              <div>{goalsAgainstUsCount}</div>
            </div>

            <div className="flex flex-row gap-2 w-full justify-center">
              <GetEvent data={goalsCardsForUs} position="left" />
              <GetEvent data={goalsCardsAgainstUs} position="right" />
            </div>
          </div>

          <div className="text-sm">{formatted}</div>
        </div>

        {/* Right Opponent */}
        <div className="flex-2/8 flex justify-center md:justify-end items-center font-semibold py-4 md:py-20 px-5 text-lg text-right">
          {game.opponent}
        </div>
      </div>

      {/* Buttons */}
      {isLoggedIn && (
        <div className="flex flex-col sm:flex-row items-end sm:items-center justify-center gap-4">
          <Button
            link={`/matches/match/editmatch/${game.id}`}
            text="Modify Match"
          />
          <Button
            link={`/matches/match/addevents/${game.id}`}
            text="Add Events"
          />
          <div
            onClick={() => deleteGame(game.id)}
            className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80"
          >
            Delete Match
          </div>
        </div>
      )}
    </div>
  );
};
export default RenderMatch;
