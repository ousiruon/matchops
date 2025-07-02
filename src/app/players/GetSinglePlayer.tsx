import { Player } from "@/data/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { getAge } from "../utils/functions";

const GetSinglePlayer = ({ player }: { player: Player }) => {
  return (
    <>
      <Link
        className="flex flex-row items-center justify-start w-full p-4 bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out"
        href={`/players/${player.id}`}
      >
        <div className="flex flex-row items-center justify-start gap-4 grow-1">
          <Image
            src={player.image}
            alt={player.name}
            width={50}
            height={50}
            className="rounded-2xl bg-primary-light dark:bg-primary-dark aspect-square object-cover flex-shrink-0"
            loading="lazy"
          />
          <div className="">{player.name}</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-4">
          <div>{player.position}</div>
          <div className="w-8 text-right">
            {player.dob && getAge(player.dob)}
          </div>
        </div>
      </Link>
    </>
  );
};
export default GetSinglePlayer;
