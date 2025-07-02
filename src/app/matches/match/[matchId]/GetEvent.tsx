/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { deleteCard } from "@/store/cardsSlice";
import { deleteGoal } from "@/store/goalsSlice";
import { AppDispatch, RootState } from "@/store/store";
import Link from "next/link";
import { useEffect, useState } from "react";
import { GiSoccerBall } from "react-icons/gi";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import { TiDelete } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";

const GetEvent = ({ data, position }: { data: any[]; position: string }) => {
  const dispatch: AppDispatch = useDispatch();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const players = useSelector((state: RootState) => state.players);
  const goals = useSelector((state: RootState) => state.goals);
  const cards = useSelector((state: RootState) => state.cards);
  const [isSuccess, setIsSucess] = useState<boolean>(false);
  const getPlayerName = (id: string) => {
    const player = players.find((player) => player.id === id);
    if (player) {
      return (
        <Link
          href={`/players/${player.id}`}
          className="flex flex-row gap-2 items-center jusityf-center"
        >
          {player.name}
        </Link>
      );
    }
    return `${id} - OG`;
  };
  const deleteCardFunc = (id: string) => {
    dispatch(deleteCard(id));
    setIsSucess(true);
  };
  const deleteGoalFunc = (id: string) => {
    dispatch(deleteGoal(id));
    setIsSucess(true);
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("goals", JSON.stringify(goals));
    }
  }, [goals, isSuccess]);
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards, isSuccess]);
  return (
    <>
      <div
        className={`flex flex-col gap-2 flex-1/2 ${
          position === "left" ? "text-right" : "text-left"
        } px-2`}
      >
        {data.map((singleEvent, index) => (
          <div
            key={index}
            className={`flex ${
              position === "left" ? "flex-row" : "flex-row-reverse"
            } justify-end items-center gap-1`}
          >
            <div className="text-xs opacity-40">{singleEvent.time}&apos;</div>
            {singleEvent.type && position === "left" && (
              <>
                {getPlayerName(singleEvent.who)}
                {isLoggedIn && (
                  <div onClick={() => deleteCardFunc(singleEvent.id)}>
                    <TiDelete />
                  </div>
                )}
              </>
            )}
            {singleEvent.type && position !== "left" && (
              <>
                {singleEvent.who}
                {isLoggedIn && (
                  <div onClick={() => deleteCardFunc(singleEvent.id)}>
                    <TiDelete />
                  </div>
                )}
              </>
            )}
            {!singleEvent.type && position === "left" && (
              <>
                {getPlayerName(singleEvent.scorer)}
                {isLoggedIn && (
                  <div onClick={() => deleteGoalFunc(singleEvent.id)}>
                    <TiDelete />
                  </div>
                )}
              </>
            )}
            {!singleEvent.type && position !== "left" && (
              <>
                {singleEvent.scorer}
                {isLoggedIn && (
                  <div onClick={() => deleteGoalFunc(singleEvent.id)}>
                    <TiDelete />
                  </div>
                )}
              </>
            )}
            {singleEvent.type ? (
              <div
                className={`text-sm ${
                  singleEvent.type === "yellow"
                    ? "text-yellow-500"
                    : "text-red-800"
                }`}
              >
                <TbRectangleVerticalFilled />
              </div>
            ) : (
              <div className="text-sm">
                <GiSoccerBall />
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  );
};
export default GetEvent;
