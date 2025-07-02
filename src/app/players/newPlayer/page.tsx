"use client";
import { countries } from "@/data/nationalities";
import { positions } from "@/data/position";
import { Player, Position } from "@/data/types/interfaces";
import { addPlayer } from "@/store/playersSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
const NewPlayer = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useRouter();
  const { isLoggedIn } = useSelector((state: RootState) => state.login);
  const retrievedPlayers = useSelector((state: RootState) => state.players);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isName, setIsName] = useState<boolean | null>(null);
  const [isNationality, setIsNationality] = useState<boolean | null>(null);
  const [isPosition, setIsPosition] = useState<boolean | null>(null);
  const [isHeight, setIsHeight] = useState<boolean | null>(null);
  const [isPlayerDOB, setIsPlayerDOB] = useState<boolean | null>(null);
  const [isPlayerFoot, setIsPlayerFoot] = useState<boolean | null>(null);
  const [isPlayerNumber, setIsPlayerNumber] = useState<boolean | null>(null);
  const [isPlayerValue, setIsPlayerValue] = useState<boolean | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const formSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("playerName") as string;
    const nationality = formData.get("playerNationality") as string;
    const position = formData.get("playerPosition") as Position;
    const height = formData.get("playerHeight") as string;
    const playerDOB = formData.get("playerDOB") as string;
    const playerFoot = formData.get("playerFoot") as "Left" | "Right" | "Both";
    const playerNumber = formData.get("playerNumber") as string;
    const playerValue = formData.get("playerValue") as string;
    if (!name) {
      setIsName(false);
    }
    if (!nationality) {
      setIsNationality(false);
    }
    if (!position) {
      setIsPosition(false);
    }
    if (!height) {
      setIsHeight(false);
    }
    if (!playerDOB) {
      setIsPlayerDOB(false);
    }
    if (!playerFoot) {
      setIsPlayerFoot(false);
    }
    if (!playerNumber) {
      setIsPlayerNumber(false);
    }
    if (!playerValue) {
      setIsPlayerValue(false);
    }
    if (
      name &&
      nationality &&
      position &&
      height &&
      playerDOB &&
      playerFoot &&
      playerNumber &&
      playerValue
    ) {
      const newPlayer: Player = {
        id: uuidv4(),
        name,
        nationality,
        position,
        height: Number(height),
        dob: new Date(playerDOB).getTime(),
        image: "/players/noImage.png",
        preferredFoot: playerFoot,
        shirtNumber: parseInt(playerNumber, 10),
        marketValue: parseFloat(playerValue),
        sold: false,
        valueSoldFor: 0,
        goalsScored: 0,
        yellowCardsReceived: 0,
        redCardsReceived: 0,
      };
      dispatch(addPlayer(newPlayer));
      e.currentTarget.reset();
      setIsSubmitted(true);
      setIsSuccess(true);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem("players", JSON.stringify(retrievedPlayers));
      setIsSuccess(false);
      navigate.push("/players");
    }
  }, [isSuccess, retrievedPlayers, navigate]);
  useEffect(() => {
    if (!isLoggedIn) {
      navigate.push("/players");
    }
  }, [isLoggedIn, navigate]);
  if (isLoggedIn) {
    return (
      <>
        <div className="p-4">
          <div className="w-full flex flex-col gap-10">
            <div className="font-bold text-base md:text-xl">Add Player</div>
            {isSubmitted && (
              <div className="font-bold text-base md:text-xl text-green-900 dark:text-green-600">
                Player Added!
              </div>
            )}
            <form
              onChange={() => isSubmitted && setIsSubmitted(false)}
              onSubmit={formSubmited}
              className="flex flex-col gap-4 w-full text-sm md:text-base"
            >
              {/* Player Name*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="playerName" className="w-[110px]">
                    Player Name *
                  </label>
                  <input
                    type="text"
                    name="playerName"
                    id="playerName"
                    placeholder="Enter player name..."
                    className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[300px]"
                  />
                </div>
                {isName !== null && !isName && (
                  <div className="text-xs font-semibold text-red-800">
                    Player name is required!
                  </div>
                )}
              </div>
              {/* Player Nationality*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="playerNationality" className="w-[110px]">
                    Nationality *
                  </label>
                  <select
                    name="playerNationality"
                    id="playerNationality"
                    className="w-full flex-1 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 max-w-[300px]"
                  >
                    {countries.map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                {isNationality !== null && !isNationality && (
                  <div className="text-xs font-semibold text-red-800">
                    Player nationality is required!
                  </div>
                )}
              </div>
              {/* Player Position*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="playerPosition" className="w-[110px]">
                    Position *
                  </label>
                  <select
                    name="playerPosition"
                    id="playerPosition"
                    className="w-full flex-1 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 max-w-[300px]"
                  >
                    {positions(false).map((country, index) => (
                      <option key={index} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
                {isPosition !== null && !isPosition && (
                  <div className="text-xs font-semibold text-red-800">
                    Player position is required!
                  </div>
                )}
              </div>
              {/* Player Height*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="playerHeight" className="w-[110px]">
                    Height *
                  </label>
                  <input
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      if (
                        event.currentTarget.value &&
                        Number(event.currentTarget.value) < 160
                      ) {
                        event.currentTarget.value = "160";
                      } else if (
                        event.currentTarget.value &&
                        Number(event.currentTarget.value) > 200
                      ) {
                        event.currentTarget.value = "200";
                      }
                    }}
                    type="number"
                    min={160}
                    max={200}
                    defaultValue={160}
                    name="playerHeight"
                    id="playerHeight"
                    placeholder="cm"
                    className="w-full flex-1 outline-0 px-2 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[50px]"
                  />
                </div>
                {isHeight !== null && !isHeight && (
                  <div className="text-xs font-semibold text-red-800">
                    Player height is required!
                  </div>
                )}
              </div>
              {/* Player DOB*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="playerDOB" className="w-[110px]">
                    Date Of Birth *
                  </label>
                  <input
                    max={new Date().toISOString().split("T")[0]}
                    type="date"
                    name="playerDOB"
                    id="playerDOB"
                    placeholder="Date Of Birth"
                    className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[140px]"
                  />
                </div>
                {isPlayerDOB !== null && !isPlayerDOB && (
                  <div className="text-xs font-semibold text-red-800">
                    Player date of birth is required!
                  </div>
                )}
              </div>
              {/* Player Preferred Foot*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="playerFoot" className="w-[110px]">
                    Preferred Foot *
                  </label>
                  <select
                    name="playerFoot"
                    id="playerFoot"
                    className="w-full flex-1 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 max-w-[300px]"
                  >
                    <option value="Left">Left</option>
                    <option value="Right">Right</option>
                    <option value="Both">Both</option>
                  </select>
                </div>
                {isPlayerFoot !== null && !isPlayerFoot && (
                  <div className="text-xs font-semibold text-red-800">
                    Player preferred foot is required!
                  </div>
                )}
              </div>
              {/* Player Shirt Number*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="playerNumber" className="w-[110px]">
                    Shirt Number *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={99}
                    defaultValue={10}
                    name="playerNumber"
                    id="playerNumber"
                    placeholder="cm"
                    className="w-full flex-1 outline-0 px-2 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[50px]"
                  />
                </div>
                {isPlayerNumber !== null && !isPlayerNumber && (
                  <div className="text-xs font-semibold text-red-800">
                    Player shirt number is required!
                  </div>
                )}
              </div>
              {/* Player Market Value*/}
              <div className="flex flex-col gap-2 items-start justify-start w-full">
                <div className="flex flex-row gap-4 items-center justify-start w-full">
                  <label htmlFor="playerValue" className="w-[110px]">
                    Market Value *
                  </label>
                  <input
                    type="number"
                    min={0}
                    defaultValue={0}
                    name="playerValue"
                    id="playerValue"
                    placeholder="Market Value"
                    className="w-full flex-1 outline-0 px-2 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[140px]"
                  />
                </div>
                {isPlayerValue !== null && !isPlayerValue && (
                  <div className="text-xs font-semibold text-red-800">
                    Player market value is required!
                  </div>
                )}
              </div>
              {/* Button to submit */}
              <div className="flex flex-row gap-4">
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80 max-w-[150px] font-bold"
                >
                  Submit Player
                </button>
                <button
                  type="reset"
                  className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80 max-w-[150px] font-bold"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </>
    );
  } else return null;
};
export default NewPlayer;
