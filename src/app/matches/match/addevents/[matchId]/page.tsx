"use client";
import { Card, Game, GoalScored, Player } from "@/data/types/interfaces";
import { RootState } from "@/store/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AddGoal from "./AddGoal";
import AddCard from "./AddCard";

const AddEventToGame = () => {
  const params = useParams();
  const navigate = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const matches: Game[] = useSelector((state: RootState) => state.matches);
  const players: Player[] = useSelector((state: RootState) => state.players);
  const goals: GoalScored[] = useSelector((state: RootState) => state.goals);
  const cards: Card[] = useSelector((state: RootState) => state.cards);
  const [isGoal, setIsGoal] = useState<boolean>(true);
  const [isForUs, setIsForUs] = useState<boolean>(false);
  const [singleGame, setSingleGame] = useState<Game | null | boolean>(null);
  const [isScorer, setIsScorer] = useState<boolean | null>(null);
  const [isTime, setIsTime] = useState<boolean | null>(null);
  const [goalTimeValue, setGoalTimeValue] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isSuccessCard, setIsSuccessCard] = useState<boolean>(false);
  const [leave, setLeave] = useState<boolean>(false);
  useEffect(() => {
    const selectedGame = matches.find((match) => match.id === params.matchId);
    if (selectedGame) {
      setSingleGame(selectedGame as Game);
    } else {
      setSingleGame(false);
    }
  }, [matches, params.matchId]);
  useEffect(() => {
    const scorerInput = document.querySelector(
      "#scorerName"
    ) as HTMLInputElement;
    const scorerInputList = document.querySelector(
      "#scorerNameList"
    ) as HTMLInputElement;
    const goalForUs = document.querySelector("#goalForUs") as HTMLInputElement;
    const cardType = document.querySelector("#cardType") as HTMLInputElement;
    if (scorerInput) {
      scorerInput.value = "";
    }
    if (scorerInputList) {
      scorerInputList.value = "";
    }
    if (goalForUs) {
      goalForUs.value = "no";
    }
    if (cardType) {
      cardType.value = "yellow";
    }
  }, [isGoal]);
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("goals", JSON.stringify(goals));
      setIsSuccess(false);
      if (leave) {
        navigate.push(`/matches/match/${params.matchId}`);
      }
    }
    if (isSuccessCard) {
      localStorage.setItem("cards", JSON.stringify(cards));
      setIsSuccessCard(false);
      if (leave) {
        navigate.push(`/matches/match/${params.matchId}`);
      }
    }
  }, [goals, leave, navigate, params.matchId, cards, isSuccess, isSuccessCard]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate.push("/matches");
    }
  }, [isLoggedIn, navigate]);
  const changeLayout = (e: boolean) => {
    if (e) {
      setIsGoal(true);
      setIsForUs(false);
      setGoalTimeValue(1);
      setIsScorer(null);
      setIsTime(null);
    } else {
      setIsGoal(false);
      setIsForUs(false);
      setGoalTimeValue(1);
      setIsScorer(null);
      setIsTime(null);
    }
  };
  if (isLoggedIn) {
    return (
      <>
        <div className="p-4">
          <div className="flex flex-row pb-8">
            <div
              onClick={() => changeLayout(true)}
              className={`py-4 px-6 bg-primary-light dark:bg-primary-dark font-bold transition-all duration-300 ease-in cursor-pointer ${
                isGoal && "bg-primary-light/50 dark:bg-primary-dark/50"
              }`}
            >
              Add Goal
            </div>
            <div
              onClick={() => changeLayout(false)}
              className={`py-4 px-6 bg-primary-light dark:bg-primary-dark font-bold transition-all duration-300 ease-in cursor-pointer ${
                !isGoal && "bg-primary-light/50 dark:bg-primary-dark/50"
              }`}
            >
              Add Card
            </div>
          </div>
          {singleGame ? (
            isGoal ? (
              <AddGoal
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                setIsForUs={setIsForUs}
                isForUs={isForUs}
                players={players}
                isScorer={isScorer}
                goalTimeValue={goalTimeValue}
                setGoalTimeValue={setGoalTimeValue}
                isTime={isTime}
                setLeave={setLeave}
                setIsSuccess={setIsSuccess}
                setIsScorer={setIsScorer}
                setIsTime={setIsTime}
              />
            ) : (
              <AddCard
                isSubmitted={isSubmitted}
                setIsSubmitted={setIsSubmitted}
                setIsForUs={setIsForUs}
                isForUs={isForUs}
                players={players}
                isScorer={isScorer}
                goalTimeValue={goalTimeValue}
                setGoalTimeValue={setGoalTimeValue}
                isTime={isTime}
                setLeave={setLeave}
                setIsSuccessCard={setIsSuccessCard}
                setIsScorer={setIsScorer}
                setIsTime={setIsTime}
              />
            )
          ) : singleGame === false ? (
            "No Match found!"
          ) : (
            ""
          )}
        </div>
      </>
    );
  } else return null;
};
export default AddEventToGame;
