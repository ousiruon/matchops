"use client";
import { useEffect, useState } from "react";
import Button from "../(reusable)/Button";
import Filters from "./Filters";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Competition, Game, GoalScored, Season } from "@/data/types/interfaces";
import { FaHome } from "react-icons/fa";
import { FaPlaneDeparture } from "react-icons/fa6";
import Link from "next/link";

const GetMatches = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const matches: Game[] = useSelector((state: RootState) => state.matches);
  const seasons: Season[] = useSelector((state: RootState) => state.seasons);
  const goals: GoalScored[] = useSelector((state: RootState) => state.goals);
  const [games, setGames] = useState<Game[]>([]);
  const [sortBySeason, setSortBySeason] = useState<string>("Season");
  const [sortedSeasons, setSortedSeasons] = useState<Season[]>([]);
  const [time, setTime] = useState<null | "up" | "down">(null);
  const [sortByLocation, setSortByLocation] = useState<
    "All" | "Location" | "Home" | "Away"
  >("Location");
  const [sortByCompetition, setSortByCompetition] =
    useState<string>("Competition");
  const competitions: Competition[] = useSelector(
    (state: RootState) => state.competitions
  );
  useEffect(() => {
    setSortedSeasons(
      [...seasons].sort((a, b) => {
        return b.date - a.date;
      })
    );
  }, [seasons]);
  useEffect(() => {
    if (sortedSeasons.length > 0) {
      setSortBySeason(sortedSeasons[0].id);
    }
  }, [sortedSeasons]);
  useEffect(() => {
    let sortedGames = [...matches].sort((a, b) => {
      if (time === "down") {
        return a.time - b.time;
      }
      return b.time - a.time;
    });
    if (sortByCompetition !== "Competition" && sortByCompetition !== "All") {
      sortedGames = sortedGames.filter(
        (game) => game.competition === sortByCompetition
      );
    }
    if (sortByLocation !== "All" && sortByLocation !== "Location") {
      sortedGames = sortedGames.filter(
        (game) => game.home === (sortByLocation === "Home" ? true : false)
      );
    }
    if (sortBySeason !== "Season") {
      sortedGames = sortedGames.filter((game) => game.season === sortBySeason);
    }
    setGames(sortedGames);
  }, [
    sortByCompetition,
    sortByLocation,
    time,
    sortBySeason,
    competitions,
    matches,
    sortedSeasons,
  ]);
  return (
    <>
      <div className="flex flex-col items-start justify-start w-full mx-auto max-w-[1200px]">
        {isLoggedIn && (
          <div className="flex flex-col sm:flex-row w-full p-4 gap-4 items-end sm:items-center justify-end">
            <Button link="/matches/seasons" text="Seasons" />
            <Button link="/matches/competitions" text="Competitions" />
            <Button link="/matches/newMatch" text="Add Match" />
          </div>
        )}
        <Filters
          time={time}
          setTime={setTime}
          sortByLocation={sortByLocation}
          setSortByLocation={setSortByLocation}
          sortByCompetition={sortByCompetition}
          setSortByCompetition={setSortByCompetition}
          sortBySeason={sortBySeason}
          setSortBySeason={setSortBySeason}
          competitions={competitions}
          seasons={sortedSeasons}
        />
        <div className="flex flex-col w-full">
          {games.length > 0 && (
            <div className="flex flex-col gap-4 w-full">
              {games.map((game: Game) => {
                const date = new Date(game.time);
                const formatted = date.toISOString().split("T")[0];
                const goalsPerGame = goals.filter(
                  (match) => match.game === game.id
                );
                const goalsForUs = goalsPerGame.filter((match) => match.byus);
                const goalsAgainstUs = goalsPerGame.filter(
                  (match) => !match.byus
                );
                return (
                  <Link
                    href={`/matches/match/${game.id}`}
                    className="flex flex-col md:flex-row items-stretch w-full bg-bg-2-light/70 dark:bg-bg-2-dark/40 hover:bg-bg-2-light dark:hover:bg-bg-2-dark/60 gap-2 md:gap-4 transition-all duration-200 ease-in-out rounded-lg"
                    key={game.id}
                  >
                    <div className="text-3xl flex-2/8 flex items-center justify-center min-h-full bg-primary-light dark:bg-primary-dark py-4 md:py-0 rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                      {game.home ? <FaHome /> : <FaPlaneDeparture />}
                    </div>
                    <div className="flex-4/8 flex flex-col items-center justify-between gap-2 py-2">
                      <div className="font-bold">{game.name}</div>
                      <div
                        className={`flex flex-row gap-2 text-lg font-semibold ${
                          goalsForUs > goalsAgainstUs
                            ? "text-green-600"
                            : goalsForUs < goalsAgainstUs
                            ? " text-red-600"
                            : "text-yellow-600"
                        }`}
                      >
                        <div>{goalsForUs.length}</div>
                        <div>-</div>
                        <div>{goalsAgainstUs.length}</div>
                      </div>
                      <div className="text-sm">{formatted}</div>
                    </div>
                    <div className="flex-2/8 flex justify-center md:justify-end items-center font-semibold py-4 md:py-14 px-5 text-lg text-center md:text-right">
                      {game.opponent}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
          {sortedSeasons.length > 0 && games.length === 0 && (
            <div className="min-h-[300px] flex items-center justify-center">
              <div className="opacity-70 text-lg font-semibold flex flex-col gap-4 items-center justify-center">
                No match was found for the{" "}
                {`${sortedSeasons[0].date}-${sortedSeasons[0].date + 1}`}{" "}
                season!
                <div>
                  Please add a match or change the season in the filters above.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default GetMatches;
