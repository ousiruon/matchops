import { positions } from "@/data/position";
import { FaSortDown, FaSortUp } from "react-icons/fa6";
import { IoCloseSharp, IoFilter } from "react-icons/io5";

interface FiltersProps {
  displayType: string;
  setDisplayType: (type: string) => void;
  setSearchedPlayer: (player: string) => void;
  setFilter: (filter: boolean) => void;
  setSelectedPosition: (player: string) => void;
  setSelectedHeight: (height: number) => void;
  setSelectedAge: (age: number) => void;
  setSelectedFooted: (footed: "Left" | "Right" | "Both" | "All") => void;
  setMarket: (value: boolean | null) => void;
  setSelectedGoals: (goals: boolean | null) => void;
  setSelectedYellowCards: (yellowCards: boolean | null) => void;
  setSelectedRedCards: (redCards: boolean | null) => void;
  filter: boolean;
  selectedPosition: string;
  selectedHeight: number;
  selectedAge: number;
  selectedFooted: "Left" | "Right" | "Both" | "All";
  market: boolean | null;
  selectedGoals: boolean | null;
  selectedYellowCards: boolean | null;
  selectedRedCards: boolean | null;
}
const Filters = ({
  displayType,
  setDisplayType,
  setSearchedPlayer,
  setFilter,
  setSelectedPosition,
  setSelectedHeight,
  setSelectedAge,
  setSelectedFooted,
  setMarket,
  setSelectedGoals,
  setSelectedYellowCards,
  setSelectedRedCards,
  filter,
  selectedPosition,
  selectedHeight,
  selectedAge,
  selectedFooted,
  market,
  selectedGoals,
  selectedYellowCards,
  selectedRedCards,
}: FiltersProps) => {
  const filterFunc = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchedPlayer(event.target.value);
  };
  const renderedPositions = positions(true);
  const footedOptions = ["All", "Left", "Right", "Both"];
  const setFilterValue = (
    value: boolean | null,
    setValue: (value: boolean | null) => void
  ) => {
    setMarket(null);
    setSelectedGoals(null);
    setSelectedYellowCards(null);
    setSelectedRedCards(null);
    if (value === null || value === false) {
      setValue(true);
    } else {
      setValue(false);
    }
  };
  return (
    <>
      <div className="relative flex w-full p-4">
        <div
          className={`flex flex-col-reverse ${
            displayType === "table" && "px-5"
          } gap-4 md:flex-row items-center justify-between w-full mx-auto`}
        >
          <div className="w-full md:w-[300px]">
            <input
              type="text"
              placeholder="Search players..."
              className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border-b-1 border-text-light/40 dark:border-text-dark/40 px-2 py-1 outline-0 transition-all ease-in duration-300 w-full"
              onChange={filterFunc}
              autoComplete="off"
            />
          </div>
          <div className="flex flex-row w-full justify-end items-center gap-4">
            <select
              onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                setDisplayType(event.target.value as "grid" | "table")
              }
              name="displayType"
              value={displayType}
              className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300"
            >
              <option value="table">Table</option>
              <option value="grid">Grid</option>
            </select>
            <div onClick={() => setFilter(true)} className="cursor-pointer">
              <IoFilter size={20} />
            </div>
          </div>
        </div>
        <div
          className={`absolute ${
            filter ? "top-[100%]" : "top-[-100vh]"
          } right-0 py-4 px-8 bg-bg-2-light dark:bg-bg-2-dark shadow-2xl flex flex-col gap-6 z-10`}
        >
          <div
            onClick={() => setFilter(false)}
            className="flex w-full justify-end cursor-pointer"
          >
            <IoCloseSharp />
          </div>
          <div className="flex flex-row gap-4 flex-wrap items-start justify-center w-full">
            <div className="flex flex-col gap-2">
              <div className="font-bold">Position</div>
              <div>
                <select
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedPosition(event.target.value)
                  }
                  name="selectedPosition"
                  value={selectedPosition}
                  className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-2 py-1 outline-0 transition-all ease-in duration-300"
                >
                  {renderedPositions.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold">Min Height</div>
              <div>
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (
                      event.target.value &&
                      Number(event.target.value) >= 160 &&
                      Number(event.target.value) <= 200
                    ) {
                      setSelectedHeight(Number(event.target.value));
                    }
                  }}
                  value={selectedHeight}
                  type="number"
                  min={160}
                  max={200}
                  placeholder="cm"
                  className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border-1 border-text-light/40 dark:border-text-dark/40 px-2 py-1 outline-0 transition-all ease-in duration-300 w-[70px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold">Max Age</div>
              <div>
                <input
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    if (
                      event.target.value &&
                      Number(event.target.value) >= 16 &&
                      Number(event.target.value) <= 45
                    ) {
                      setSelectedAge(Number(event.target.value));
                    }
                  }}
                  value={selectedAge}
                  type="number"
                  min={16}
                  max={45}
                  placeholder="Age"
                  className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border-1 border-text-light/40 dark:border-text-dark/40 px-2 py-1 outline-0 transition-all ease-in duration-300 w-[50px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="font-bold">Preferred Foot</div>
              <div>
                <select
                  onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
                    setSelectedFooted(
                      event.target.value as "Left" | "Right" | "Both" | "All"
                    )
                  }
                  name="selectedFooted"
                  value={selectedFooted}
                  className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-2 py-1 outline-0 transition-all ease-in duration-300 w-[100px]"
                >
                  {footedOptions.map((foot) => (
                    <option key={foot} value={foot}>
                      {foot}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2 flex-wrap items-start justify-start w-full">
            <div>Sort By:</div>
            <div className="flex flex-row gap-1 flex-wrap items-start justify-start">
              <div className="flex flex-col md:flex-row gap-2 text-sm">
                <div className="cursor-pointer relative flex flex-row gap-1 items-center">
                  <div>
                    {market === null ? (
                      ""
                    ) : !market ? (
                      <FaSortDown className="text-red-800" size={10} />
                    ) : (
                      <FaSortUp className="text-green-800" size={10} />
                    )}
                  </div>
                  <div
                    className="font-bold"
                    onClick={() => setFilterValue(market, setMarket)}
                  >
                    Value
                  </div>
                </div>
                <div className="hidden md:block">|</div>
                <div className="cursor-pointer relative flex flex-row gap-1 items-center">
                  <div>
                    {selectedGoals === null ? (
                      ""
                    ) : !selectedGoals ? (
                      <FaSortDown className="text-red-800" size={10} />
                    ) : (
                      <FaSortUp className="text-green-800" size={10} />
                    )}
                  </div>
                  <div
                    className="font-bold"
                    onClick={() =>
                      setFilterValue(selectedGoals, setSelectedGoals)
                    }
                  >
                    Goals
                  </div>
                </div>
                <div className="hidden md:block">|</div>
                <div className="cursor-pointer relative flex flex-row gap-1 items-center">
                  <div>
                    {selectedYellowCards === null ? (
                      ""
                    ) : !selectedYellowCards ? (
                      <FaSortDown className="text-red-800" size={10} />
                    ) : (
                      <FaSortUp className="text-green-800" size={10} />
                    )}
                  </div>
                  <div
                    className="font-bold"
                    onClick={() =>
                      setFilterValue(
                        selectedYellowCards,
                        setSelectedYellowCards
                      )
                    }
                  >
                    Yellow Cards
                  </div>
                </div>
                <div className="hidden md:block">|</div>
                <div className="cursor-pointer relative flex flex-row gap-1 items-center">
                  <div>
                    {selectedRedCards === null ? (
                      ""
                    ) : !selectedRedCards ? (
                      <FaSortDown className="text-red-800" size={10} />
                    ) : (
                      <FaSortUp className="text-green-800" size={10} />
                    )}
                  </div>
                  <div
                    className="font-bold"
                    onClick={() =>
                      setFilterValue(selectedRedCards, setSelectedRedCards)
                    }
                  >
                    Red Cards
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div
              className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80"
              onClick={() => {
                setSearchedPlayer("");
                setSelectedPosition("All");
                setSelectedHeight(160);
                setSelectedAge(45);
                setSelectedFooted("All");
                setMarket(null);
                setSelectedGoals(null);
                setSelectedYellowCards(null);
                setSelectedRedCards(null);
              }}
            >
              Reset
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Filters;
