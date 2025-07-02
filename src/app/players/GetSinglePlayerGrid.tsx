import { Player } from "@/data/types/interfaces";
import Link from "next/link";
import Image from "next/image";
import { getAge } from "../utils/functions";
const GetSinglePlayerGrid = ({ player }: { player: Player }) => {
  return (
    <>
      <Link
        className="w-full max-w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 p-4"
        href={`/players/${player.id}`}
      >
        <div className="flex flex-col items-center justify-start bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 transition-all duration-200 ease-in rounded-lg">
          <Image
            src={player.image}
            alt={player.name}
            width={200}
            height={500}
            className="rounded-t-lg bg-primary-light dark:bg-primary-dark object-cover w-full max-w-full aspect-retro"
          />
          <div className="flex flex-col gap-2 py-4 w-full items-center font-bold ">
            <div>{player.name}</div>
            <div className="flex flex-row justify-between px-4 w-full">
              <div>{player.position}</div>
              <div>{player.dob && getAge(player.dob)}</div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};
export default GetSinglePlayerGrid;
