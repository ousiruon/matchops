"use client";

import { Game } from "@/data/types/interfaces";
import { RootState } from "@/store/store";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NoMatchFound from "./NoMatchFound";
import RenderMatch from "./RenderMatch";

const SingleMatch = () => {
  const [singleMatch, setSingleMatch] = useState<Game | null>(null);
  const [isReady, setIsReady] = useState<boolean | null>(null);
  const matches = useSelector((state: RootState) => state.matches);
  const params = useParams();
  useEffect(() => {
    const match = matches.find((item) => item.id === params.matchId);
    if (match) {
      setSingleMatch(match);
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [params, matches]);
  if (isReady === false) {
    return (
      <>
        <NoMatchFound />
      </>
    );
  } else if (isReady) {
    return (
      <>
        <RenderMatch game={singleMatch as Game} />
      </>
    );
  } else return null;
};
export default SingleMatch;
