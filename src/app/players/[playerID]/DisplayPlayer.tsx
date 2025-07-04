"use client";
import { Card, GoalScored, Player } from "@/data/types/interfaces";
import Image from "next/image";
import StadiumPosition from "./StadiumPosition";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { TbRectangleVerticalFilled } from "react-icons/tb";
import Button from "@/app/(reusable)/Button";
import { useEffect, useState } from "react";
import { deletePlayer } from "@/store/playersSlice";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";

const DisplayPlayer = ({ player }: { player: Player }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useRouter();
  const players: Player[] = useSelector((state: RootState) => state.players);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const goals: GoalScored[] = useSelector((state: RootState) => state.goals);
  const cards: Card[] = useSelector((state: RootState) => state.cards);
  const playerGoals = goals.filter((goal) => goal.scorer === player.id);
  const playerCardsYellow = cards.filter(
    (card) => card.who === player.id && card.type === "yellow"
  );
  const playerCardsRed = cards.filter(
    (card) => card.who === player.id && card.type === "red"
  );
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const deletePLayerFunc = (id: string) => {
    dispatch(deletePlayer(id));
    setIsSuccess(true);
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("players", JSON.stringify(players));
      setIsSuccess(false);
      navigate.push("/players");
    }
  }, [isSuccess, players, navigate, dispatch]);
  const [hoverSelect, setHoverSelect] = useState<string | null>(null);
  return (
    <>
      <div className="flex flex-col gap-6 w-full">
        {isLoggedIn && (
          <div className="flex flex-row w-full gap-2 justify-end">
            <Button link={`/players/editPlayer/${player.id}`} text="Edit" />
            <div
              onClick={() => deletePLayerFunc(player.id)}
              className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80"
            >
              Delete
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row w-full">
          <motion.div
            onHoverStart={() => setHoverSelect(player.id)}
            onHoverEnd={() => setHoverSelect(null)}
            className="flex flex-col w-full items-center justify-center bg-bg-2-light/70 dark:bg-bg-2-dark/40 rounded-l overflow-hidden"
          >
            <Image
              src={player.image}
              alt={player.name}
              width={700}
              height={700}
              className={`${
                hoverSelect === player.id ? "scale-105" : ""
              } rounded-l bg-primary-light dark:bg-primary-dark w-full h-auto aspect-retro object-cover  transition-transform duration-200 ease-in-out`}
              loading="lazy"
            />
          </motion.div>
          <div className="flex flex-col gap-4 w-full items-start justify-start bg-bg-2-light/70 dark:bg-bg-2-dark/40 p-4 rounded-r">
            <h1 className="text-2xl font-bold">{player.name}</h1>
            {player.nationality && (
              <div className="flex flex-row gap-2">
                Country:
                <div className="font-semibold opacity-70">
                  {player.nationality}
                </div>
              </div>
            )}
            {player.height && (
              <div className="flex flex-row gap-2">
                Height:
                <div className="font-semibold opacity-70">
                  {player.height} cm
                </div>
              </div>
            )}
            {player.dob && (
              <div className="flex flex-row gap-2">
                Dob:
                <div className="font-semibold opacity-70">
                  {new Date(player.dob || 0).toLocaleDateString("en-US", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </div>
              </div>
            )}
            {player.preferredFoot && (
              <div className="flex flex-row gap-2">
                Preferred Foot:
                <div className="font-semibold opacity-70">
                  {player.preferredFoot}
                </div>
              </div>
            )}
            {player.shirtNumber && (
              <div className="flex flex-row gap-2">
                Shirt Number:
                <div className="font-semibold opacity-70">
                  {player.shirtNumber}
                </div>
              </div>
            )}
            {player.marketValue && player.marketValue > 0 && (
              <div className="flex flex-row gap-2">
                Market Value:
                <div className="font-semibold opacity-70">
                  {player.marketValue
                    ? `$${(player.marketValue / 1000000).toFixed(2)} M`
                    : "N/A"}
                </div>
              </div>
            )}
            {playerGoals.length > 0 && (
              <div className="flex flex-row gap-2">
                Goals Scored:
                <div className="font-semibold opacity-70">
                  {playerGoals.length}
                </div>
              </div>
            )}
            {(playerCardsYellow.length > 0 || playerCardsRed.length > 0) && (
              <div className="flex flex-row gap-2">
                Cards:
                {playerCardsYellow.length > 0 && (
                  <div className="flex flex-row gap-1 items-center">
                    <div className="text-yellow-500">
                      <TbRectangleVerticalFilled />
                    </div>
                    <div className="font-semibold opacity-70">
                      {playerCardsYellow.length}
                    </div>
                  </div>
                )}
                {playerCardsRed.length > 0 && (
                  <div className="flex flex-row gap-1 items-center">
                    <div className="text-red-500">
                      <TbRectangleVerticalFilled />
                    </div>
                    <div className="font-semibold opacity-70">
                      {playerCardsRed.length}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <StadiumPosition playerPosition={player.position} />
        </div>
      </div>
    </>
  );
};
export default DisplayPlayer;
