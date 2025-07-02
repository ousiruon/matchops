"use client";
import { Player } from "@/data/types/interfaces";
import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DisplayPlayer from "./DisplayPlayer";

const SinglePlayer = () => {
  const [single, setSingle] = useState<null | Player>(null);
  const players: Player[] = useSelector((state: RootState) => state.players);
  const { playerID } = useParams();
  useEffect(() => {
    if (playerID) {
      const getPlayerData = players.find((player) => player.id === playerID);
      if (getPlayerData) {
        setSingle(getPlayerData);
      }
    }
  }, [playerID, players]);
  return (
    <div className="flex flex-col items-center justify-center h-full px-2 md:px-4 py-4 gap-4 w-full max-w-[700px] mx-auto">
      {single ? (
        <>
          <DisplayPlayer player={single} />
        </>
      ) : (
        <p className="text-xl">Player not found</p>
      )}
    </div>
  );
};
export default SinglePlayer;
