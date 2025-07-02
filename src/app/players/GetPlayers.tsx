"use client";
import { RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import GetSinglePlayer from "./GetSinglePlayer";
import GetSinglePlayerHeader from "./GetSinglePlayerHeader";
import GetSinglePlayerGrid from "./GetSinglePlayerGrid";
import Filters from "./Filters";
import { Player } from "../../data/types/interfaces";
import { getAge } from "../utils/functions";
import Button from "../(reusable)/Button";

const GetPlayers = () => {
  const players = useSelector((state: RootState) => state.players);
  const goals = useSelector((state: RootState) => state.goals);
  const cards = useSelector((state: RootState) => state.cards);
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const { playersDisplay } = useSelector((state: RootState) => state.settings);
  const [displayType, setDisplayType] = useState<string>(playersDisplay);
  const [filter, setFilter] = useState<boolean>(false);
  const [selectedPosition, setSelectedPosition] = useState<string>("All");
  const [selectedHeight, setSelectedHeight] = useState<number>(160);
  const [selectedAge, setSelectedAge] = useState<number>(45);
  const [selectedFooted, setSelectedFooted] = useState<
    "Left" | "Right" | "Both" | "All"
  >("All");
  const [market, setMarket] = useState<boolean | null>(null);
  const [selectedGoals, setSelectedGoals] = useState<boolean | null>(null);
  const [selectedYellowCards, setSelectedYellowCards] = useState<
    boolean | null
  >(null);
  const [selectedRedCards, setSelectedRedCards] = useState<boolean | null>(
    null
  );
  const [retrievedPlayers, setRetrievedPlayers] = useState<Player[]>();
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([]);
  const [searchedPlayer, setSearchedPlayer] = useState<string>("");
  useEffect(() => {
    if (players.length > 0) {
      const playersWithScores = players.map((player) => {
        const playerGoals = goals.filter(
          (goal) => goal.scorer === player.id
        ).length;
        const yellowCards = cards.filter(
          (card) => card.who === player.id && card.type === "yellow"
        ).length;
        const redCards = cards.filter(
          (card) => card.who === player.id && card.type === "red"
        ).length;
        return {
          ...player,
          goalsScored: playerGoals,
          yellowCardsReceived: yellowCards,
          redCardsReceived: redCards,
        };
      });
      setRetrievedPlayers(playersWithScores);
    } else {
      setRetrievedPlayers([]);
    }
  }, [players, goals, cards]);
  useEffect(() => {
    if (retrievedPlayers && retrievedPlayers.length > 0) {
      if (searchedPlayer.length >= 1) {
        setFilteredPlayers(
          [...retrievedPlayers]
            .filter((player) =>
              player.name.toLowerCase().includes(searchedPlayer.toLowerCase())
            )
            .filter((player) => {
              if (selectedPosition === "All") return true;
              return player.position === selectedPosition;
            })
            .filter((player) => {
              if (selectedHeight === 160 || selectedHeight === 200) return true;
              return player.height && player.height >= selectedHeight;
            })
            .filter((player) => {
              if (selectedAge <= 16 || selectedAge >= 46) return true;
              const playerAge = getAge(player.dob as number);
              return playerAge <= selectedAge;
            })
            .filter((player) => {
              if (selectedFooted === "All") return true;
              return player.preferredFoot === selectedFooted;
            })
            .sort((a, b) => {
              if (market !== null) {
                const diff = market
                  ? (b.marketValue || 0) - (a.marketValue || 0)
                  : (a.marketValue || 0) - (b.marketValue || 0);
                if (diff !== 0) return diff;
              }
              if (selectedGoals !== null) {
                const diff = selectedGoals
                  ? (b.goalsScored || 0) - (a.goalsScored || 0)
                  : (a.goalsScored || 0) - (b.goalsScored || 0);
                if (diff !== 0) return diff;
              }
              if (selectedYellowCards !== null) {
                const diff = selectedYellowCards
                  ? (b.yellowCardsReceived || 0) - (a.yellowCardsReceived || 0)
                  : (a.yellowCardsReceived || 0) - (b.yellowCardsReceived || 0);
                if (diff !== 0) return diff;
              }
              if (selectedRedCards !== null) {
                const diff = selectedRedCards
                  ? (b.redCardsReceived || 0) - (a.redCardsReceived || 0)
                  : (a.redCardsReceived || 0) - (b.redCardsReceived || 0);
                if (diff !== 0) return diff;
              }

              return 0;
            })
        );
      } else {
        setFilteredPlayers(
          [...retrievedPlayers]
            .filter((player) => {
              if (selectedPosition === "All") return true;
              return player.position === selectedPosition;
            })
            .filter((player) => {
              if (selectedHeight === 160 || selectedHeight === 200) return true;
              return player.height && player.height >= selectedHeight;
            })
            .filter((player) => {
              if (selectedAge <= 15 || selectedAge >= 46) return true;
              const playerAge = getAge(player.dob as number);
              return playerAge <= selectedAge;
            })
            .filter((player) => {
              if (selectedFooted === "All") return true;
              return player.preferredFoot === selectedFooted;
            })
            .sort((a, b) => {
              if (market !== null) {
                const diff = market
                  ? (b.marketValue || 0) - (a.marketValue || 0)
                  : (a.marketValue || 0) - (b.marketValue || 0);
                if (diff !== 0) return diff;
              }
              if (selectedGoals !== null) {
                const diff = selectedGoals
                  ? (b.goalsScored || 0) - (a.goalsScored || 0)
                  : (a.goalsScored || 0) - (b.goalsScored || 0);
                if (diff !== 0) return diff;
              }
              if (selectedYellowCards !== null) {
                const diff = selectedYellowCards
                  ? (b.yellowCardsReceived || 0) - (a.yellowCardsReceived || 0)
                  : (a.yellowCardsReceived || 0) - (b.yellowCardsReceived || 0);
                if (diff !== 0) return diff;
              }
              if (selectedRedCards !== null) {
                const diff = selectedRedCards
                  ? (b.redCardsReceived || 0) - (a.redCardsReceived || 0)
                  : (a.redCardsReceived || 0) - (b.redCardsReceived || 0);
                if (diff !== 0) return diff;
              }

              return 0;
            })
        );
      }
    }
  }, [
    searchedPlayer,
    selectedPosition,
    selectedHeight,
    selectedAge,
    selectedFooted,
    market,
    selectedGoals,
    selectedYellowCards,
    selectedRedCards,
    retrievedPlayers,
  ]);
  return (
    <>
      <div
        className={`flex flex-col items-start justify-start w-full mx-auto ${
          displayType === "table" ? "max-w-[1200px]" : ""
        }`}
      >
        {isLoggedIn && (
          <div className="p-4 w-full flex items-center justify-end">
            <Button link="/players/newPlayer" text="Add Player" />
          </div>
        )}
        <Filters
          displayType={displayType}
          setDisplayType={setDisplayType}
          setSearchedPlayer={setSearchedPlayer}
          setFilter={setFilter}
          setSelectedPosition={setSelectedPosition}
          setSelectedHeight={setSelectedHeight}
          setSelectedAge={setSelectedAge}
          setSelectedFooted={setSelectedFooted}
          setMarket={setMarket}
          setSelectedGoals={setSelectedGoals}
          setSelectedYellowCards={setSelectedYellowCards}
          setSelectedRedCards={setSelectedRedCards}
          filter={filter}
          selectedPosition={selectedPosition}
          selectedHeight={selectedHeight}
          selectedAge={selectedAge}
          selectedFooted={selectedFooted}
          market={market}
          selectedGoals={selectedGoals}
          selectedYellowCards={selectedYellowCards}
          selectedRedCards={selectedRedCards}
        />
        {displayType === "table" && (
          <div className="flex flex-col items-start justify-start px-2 md:px-8 w-full">
            <GetSinglePlayerHeader />
            {filteredPlayers.map((player, index) => (
              <GetSinglePlayer key={index} player={player} />
            ))}
          </div>
        )}
        {displayType === "grid" && (
          <div className="flex flex-row flex-wrap items-start justify-start w-full">
            {filteredPlayers.map((player, index) => (
              <GetSinglePlayerGrid key={index} player={player} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};
export default GetPlayers;
