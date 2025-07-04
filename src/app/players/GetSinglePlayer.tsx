"use client";
import { Player } from "@/data/types/interfaces";
import Image from "next/image";
import Link from "next/link";
import { getAge } from "../utils/functions";
import { useState } from "react";
import { motion } from "motion/react";

const GetSinglePlayer = ({ player }: { player: Player }) => {
  const [hoverSelect, setHoverSelect] = useState<string | null>(null);
  return (
    <>
      <Link
        className="flex flex-row items-center justify-between w-full"
        href={`/players/${player.id}`}
      >
        <motion.div
          onHoverStart={() => setHoverSelect(player.id)}
          onHoverEnd={() => setHoverSelect(null)}
          className="px-2 sm:px-4 py-3 font-semibold flex flex-row items-center justify-between w-full bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-4 transition-all duration-200 ease-in-out"
        >
          <div className="flex flex-row items-center justify-start gap-4 grow-1">
            <div className="rounded-2xl bg-primary-light dark:bg-primary-dark object-cover flex-shrink-0  aspect-square overflow-hidden max-w-[50px]">
              <Image
                src={player.image}
                alt={player.name}
                width={100}
                height={100}
                loading="lazy"
                className={`${
                  hoverSelect === player.id ? "scale-110" : ""
                } object-cover w-full transition-transform duration-200 ease-in-out overflow-hidden`}
              />
            </div>
            <div className="">{player.name}</div>
          </div>
          <div className="flex flex-row items-center justify-start gap-4">
            <div>{player.position}</div>
            <div className="w-8 text-right">
              {player.dob && getAge(player.dob)}
            </div>
          </div>
        </motion.div>
      </Link>
    </>
  );
};
export default GetSinglePlayer;
