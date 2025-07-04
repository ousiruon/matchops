"use client";
import { Player } from "@/data/types/interfaces";
import Link from "next/link";
import Image from "next/image";
import { getAge } from "../utils/functions";
import { useState } from "react";
import { motion } from "motion/react";
const GetSinglePlayerGrid = ({ player }: { player: Player }) => {
  const [hoverSelect, setHoverSelect] = useState<string | null>(null);
  return (
    <>
      <Link
        className="w-full max-w-full md:w-1/2 lg:w-1/3 xl:w-1/4 2xl:w-1/5 p-4"
        href={`/players/${player.id}`}
      >
        <motion.div
          onHoverStart={() => setHoverSelect(player.id)}
          onHoverEnd={() => setHoverSelect(null)}
          className="flex flex-col items-center justify-start bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 transition-all duration-200 ease-in rounded-lg"
        >
          <div className="rounded-t-lg bg-primary-light dark:bg-primary-dark object-cover w-full aspect-retro overflow-hidden">
            <Image
              src={player.image}
              alt={player.name}
              width={400}
              height={700}
              className={`${
                hoverSelect === player.id ? "scale-105" : ""
              } object-cover w-full max-w-full aspect-retro overflow-hidden transition-transform duration-200 ease-in-out`}
            />
          </div>
          <div className="flex flex-col gap-2 py-4 w-full items-center font-bold ">
            <div>{player.name}</div>
            <div className="flex flex-row justify-between px-4 w-full">
              <div>{player.position}</div>
              <div>{player.dob && getAge(player.dob)}</div>
            </div>
          </div>
        </motion.div>
      </Link>
    </>
  );
};
export default GetSinglePlayerGrid;
