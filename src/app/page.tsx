"use client";
import {
  Card,
  Finance,
  Game,
  GoalScored,
  Player,
} from "@/data/types/interfaces";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import ReusableTop from "./home/ReusableTop";
import ReusableGame from "./home/ReusableGame";
import ReusableIncome from "./home/ReusableIncome";

const Home = () => {
  const players: Player[] = useSelector((state: RootState) => state.players);
  const games: Game[] = useSelector((state: RootState) => state.matches);
  const goals: GoalScored[] = useSelector((state: RootState) => state.goals);
  const cards: Card[] = useSelector((state: RootState) => state.cards);
  const finances: Finance[] = useSelector((state: RootState) => state.finances);
  return (
    <>
      <div className="flex flex-row flex-wrap items-start justify-start w-full mx-auto max-w-[1200px] p-4">
        <ReusableTop
          title="Top scorers"
          link="/players"
          rankBy="goals"
          players={players}
          goals={goals}
        />
        <ReusableGame matches={games} goals={goals} result="biggestlosses" />
        <ReusableIncome finances={finances} result="best" />
        <ReusableTop
          title="Most yellow cards"
          link="/players"
          rankBy="yellowCards"
          players={players}
          cards={cards}
        />
        <ReusableTop
          title="Most red cards"
          link="/players"
          rankBy="redCards"
          players={players}
          cards={cards}
        />
        <ReusableGame matches={games} goals={goals} result="biggestWins" />
        <ReusableTop
          title="Youngest players"
          link="/players"
          rankBy="youngPlayers"
          players={players}
        />
        <ReusableIncome finances={finances} result="worst" />
      </div>
    </>
  );
};
export default Home;
