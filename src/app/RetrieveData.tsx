"use client";
import { setCards } from "@/store/cardsSlice";
import { setCompetitions } from "@/store/competitionsSlice";
import { setFinances } from "@/store/financesSlice";
import { setGoals } from "@/store/goalsSlice";
import { setSavedLogin } from "@/store/loginSlice";
import { setMatches } from "@/store/matchesSlice";
import { setPlayers } from "@/store/playersSlice";
import { setseasons } from "@/store/seasonsSlice";
import {
  setMenuPosition,
  setMode,
  setPlayerDisplay,
} from "@/store/settingsSlice";
import { AppDispatch, RootState } from "@/store/store";
import { ReactNode, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const RetrieveData = ({
  children,
  font,
}: {
  children: ReactNode;
  font: string;
}) => {
  const { darkMode, darkModeUpdated, menuPosition } = useSelector(
    (state: RootState) => state.settings
  );
  const dispatch: AppDispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const storedPLayers = localStorage.getItem("players");
    const storedCompetitions = localStorage.getItem("competitions");
    const storedSeasons = localStorage.getItem("seasons");
    const storedMatches = localStorage.getItem("matches");
    const storedGoals = localStorage.getItem("goals");
    const storedCards = localStorage.getItem("cards");
    const storedIsLogged = localStorage.getItem("isLogged");
    const storedFinances = localStorage.getItem("finances");
    if (storedPLayers) {
      dispatch(setPlayers(JSON.parse(storedPLayers)));
    }
    if (storedCompetitions) {
      dispatch(setCompetitions(JSON.parse(storedCompetitions)));
    }
    if (storedSeasons) {
      dispatch(setseasons(JSON.parse(storedSeasons)));
    }
    if (storedMatches) {
      dispatch(setMatches(JSON.parse(storedMatches)));
    }
    if (storedGoals) {
      dispatch(setGoals(JSON.parse(storedGoals)));
    }
    if (storedCards) {
      dispatch(setCards(JSON.parse(storedCards)));
    }
    if (storedIsLogged) {
      dispatch(setSavedLogin(JSON.parse(storedIsLogged)));
    }
    if (storedFinances) {
      dispatch(setFinances(JSON.parse(storedFinances)));
    }
    if ("theme" in localStorage && localStorage.theme === "light") {
      dispatch(setMode(false));
    }
    if ("display" in localStorage && localStorage.display === "table") {
      dispatch(setPlayerDisplay("table"));
    }
    if ("menuPosition" in localStorage && localStorage.display === "right") {
      dispatch(setMenuPosition("right"));
    }
    document.documentElement.classList.toggle(
      "dark",
      localStorage.theme === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
    );
    setLoaded(true);
  }, [dispatch]);
  useEffect(() => {
    if (darkModeUpdated) {
      document.documentElement.classList.toggle(
        "dark",
        localStorage.theme === "dark" ||
          (!("theme" in localStorage) &&
            window.matchMedia("(prefers-color-scheme: dark)").matches)
      );
    }
  }, [darkModeUpdated, darkMode]);
  if (loaded) {
    return (
      <>
        <body
          className={`relative ${font} antialiased flex ${
            menuPosition === "right" ? "flex-row-reverse" : "flex-row"
          } max-w-full min-h-dvh`}
        >
          {children}
        </body>
      </>
    );
  }
  return <body></body>;
};
export default RetrieveData;
