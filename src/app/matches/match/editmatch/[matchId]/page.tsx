"use client";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Competition, Game, Season } from "@/data/types/interfaces";
import { useParams, useRouter } from "next/navigation";
import { editMatch } from "@/store/matchesSlice";
import NoCompetitions from "@/app/matches/newMatch/NoCompetitions";

const EditMatchPage = () => {
  const params = useParams();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const competitions: Competition[] = useSelector(
    (state: RootState) => state.competitions
  );
  const seasons: Season[] = useSelector((state: RootState) => state.seasons);
  const matches: Game[] = useSelector((state: RootState) => state.matches);
  const [singleGame, setSingleGame] = useState<Game | null | boolean>(null);
  const [isCompetition, setIsCompetition] = useState<boolean | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean | null>(null);
  const [isOpponent, setIsOpponent] = useState<boolean | null>(null);
  const [isLocation, setIsLocation] = useState<boolean | null>(null);
  const [isTime, setIsTime] = useState<boolean | null>(null);
  const [isCompetitionName, setIsCompetitionName] = useState<boolean | null>(
    null
  );
  const [isSeason, setIsSeason] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  useEffect(() => {
    if (competitions.length > 0) {
      setIsCompetition(true);
    }
  }, [competitions]);
  useEffect(() => {
    const selectedGame = matches.find((match) => match.id === params.matchId);
    if (selectedGame) {
      setSingleGame(selectedGame as Game);
    } else {
      setSingleGame(false);
    }
  }, [matches, seasons, competitions, params.matchId]);
  const formSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = formData.get("matchId") as string;
    const name = formData.get("matchName") as string;
    const opponent = formData.get("opponentName") as string;
    const location = formData.get("location") as string;
    const time = formData.get("matchTime") as string;
    const competition = formData.get("competitionName") as string;
    const season = formData.get("seasonName") as string;
    if (!name) {
      setIsName(false);
    }
    if (!opponent) {
      setIsOpponent(false);
    }
    if (!location) {
      setIsLocation(false);
    }
    if (!time) {
      setIsTime(false);
    }
    if (!competition) {
      setIsCompetitionName(false);
    }
    if (!season) {
      setIsSeason(false);
    }
    if (name && opponent && location && time) {
      const newGame: Game = {
        id,
        name,
        opponent,
        home: location === "home" ? true : false,
        time: new Date(time).getTime(),
        competition: competition ? competition : null,
        season: season ? season : null,
      };
      dispatch(editMatch(newGame));
      e.currentTarget.reset();
      setIsSubmitted(true);
      setIsSuccess(true);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("matches", JSON.stringify(matches));
      setIsSuccess(false);
      navigate.push(`/matches/match/${params.matchId}`);
    }
  }, [isSuccess, matches, navigate, params.matchId]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate.push("/matches");
    }
  }, [isLoggedIn, navigate]);
  if (isCompetition === false) {
    return (
      <>
        <NoCompetitions />
      </>
    );
  } else {
    if (isLoggedIn) {
      return (
        <>
          <div className="p-4">
            {singleGame ? (
              <div className="w-full flex flex-col gap-10">
                <div className="font-bold text-base md:text-xl">Edit Match</div>
                {isSubmitted && (
                  <div className="font-bold text-base md:text-xl text-green-900 dark:text-green-600">
                    Match Edited!
                  </div>
                )}
                <form
                  onChange={() => isSubmitted && setIsSubmitted(false)}
                  onSubmit={formSubmited}
                  className="flex flex-col gap-4 w-full text-sm md:text-base"
                >
                  <input
                    type="text"
                    name="matchId"
                    id="matchId"
                    readOnly
                    defaultValue={(singleGame as Game).id}
                    className="w-0 hidden flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded"
                  />
                  {/* Match Name*/}
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                      <label htmlFor="matchName" className="w-[145px]">
                        Match&quot;s Name *
                      </label>
                      <input
                        type="text"
                        name="matchName"
                        id="matchName"
                        defaultValue={(singleGame as Game).name}
                        placeholder="Enter match name..."
                        className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[300px]"
                      />
                    </div>
                    {isOpponent !== null && !isOpponent && (
                      <div className="text-xs font-semibold text-red-800">
                        Match name is required!
                      </div>
                    )}
                  </div>
                  {/* Opponent Name*/}
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                      <label htmlFor="opponentName" className="w-[145px]">
                        Opponent *
                      </label>
                      <input
                        type="text"
                        name="opponentName"
                        id="opponentName"
                        defaultValue={(singleGame as Game).opponent}
                        placeholder="Enter opponent name..."
                        className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[300px]"
                      />
                    </div>
                    {isName !== null && !isName && (
                      <div className="text-xs font-semibold text-red-800">
                        Opponent is required!
                      </div>
                    )}
                  </div>
                  {/* Match Location*/}
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                      <label htmlFor="location" className="w-[145px]">
                        Location *
                      </label>
                      <select
                        className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 sm:w-auto w-full"
                        name="location"
                        id="location"
                        defaultValue={
                          (singleGame as Game).home ? "home" : "away"
                        }
                      >
                        <option value="home">Home</option>
                        <option value="away">Away</option>
                      </select>
                    </div>
                    {isLocation !== null && !isLocation && (
                      <div className="text-xs font-semibold text-red-800">
                        Location is required!
                      </div>
                    )}
                  </div>
                  {/* Match Time*/}
                  <div className="flex flex-col gap-2 items-start justify-start w-full">
                    <div className="flex flex-row gap-4 items-center justify-start w-full">
                      <label htmlFor="matchTime" className="w-[145px]">
                        Match date *
                      </label>
                      <input
                        type="date"
                        name="matchTime"
                        id="matchTime"
                        defaultValue={
                          new Date((singleGame as Game).time)
                            .toISOString()
                            .split("T")[0]
                        }
                        placeholder="Enter match time..."
                        className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[150px]"
                      />
                    </div>
                    {isTime !== null && !isTime && (
                      <div className="text-xs font-semibold text-red-800">
                        Time is required!
                      </div>
                    )}
                  </div>
                  {/* Competition*/}
                  {competitions.length > 0 && (
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <div className="flex flex-row gap-4 items-center justify-start w-full">
                        <label htmlFor="competitionName" className="w-[145px]">
                          Competition *
                        </label>
                        <select
                          className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300"
                          name="competitionName"
                          id="competitionName"
                          defaultValue={
                            (singleGame as Game).competition as string
                          }
                        >
                          {competitions.map((competition) => (
                            <option key={competition.id} value={competition.id}>
                              {competition.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      {isCompetitionName !== null && !isCompetitionName && (
                        <div className="text-xs font-semibold text-red-800">
                          Competition is required!
                        </div>
                      )}
                    </div>
                  )}
                  {/* Seasons*/}
                  {seasons.length > 0 && (
                    <div className="flex flex-col gap-2 items-start justify-start w-full">
                      <div className="flex flex-row gap-4 items-center justify-start w-full">
                        <label htmlFor="seasonName" className="w-[145px]">
                          Season *
                        </label>
                        <select
                          className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300"
                          name="seasonName"
                          id="seasonName"
                          defaultValue={(singleGame as Game).season as string}
                        >
                          {seasons.map((season) => (
                            <option key={season.id} value={season.id}>
                              {`${season.date}-${season.date + 1}`}
                            </option>
                          ))}
                        </select>
                      </div>
                      {isSeason !== null && !isSeason && (
                        <div className="text-xs font-semibold text-red-800">
                          Season is required!
                        </div>
                      )}
                    </div>
                  )}
                  {/* Button to edit */}
                  <div className="flex flex-row gap-4">
                    <button
                      type="submit"
                      className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80 max-w-[200px] font-bold"
                    >
                      Edit
                    </button>
                  </div>
                </form>
              </div>
            ) : singleGame === false ? (
              "No Match found!"
            ) : (
              ""
            )}
          </div>
        </>
      );
    } else return null;
  }
};
export default EditMatchPage;
