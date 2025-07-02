import { Competition, Season } from "@/data/types/interfaces";
import { FaSortDown, FaSortUp } from "react-icons/fa6";

interface FiltersProps {
  time: null | "up" | "down";
  setTime: (e: "up" | "down") => void;
  sortByLocation: "All" | "Location" | "Home" | "Away";
  setSortByLocation: (e: "All" | "Location" | "Home" | "Away") => void;
  sortByCompetition: string;
  setSortByCompetition: (e: string) => void;
  sortBySeason: string;
  setSortBySeason: (e: string) => void;
  competitions: Competition[];
  seasons: Season[];
}
const Filters = ({
  time,
  setTime,
  sortByLocation,
  setSortByLocation,
  sortByCompetition,
  setSortByCompetition,
  sortBySeason,
  setSortBySeason,
  competitions,
  seasons,
}: FiltersProps) => {
  return (
    <>
      <div className="flex flex-row w-full items-center justify-end p-4 gap-2 font-semibold">
        <div>Sort by:</div>
        <div className="flex flex-col md:flex-row md:items-center gap-2">
          <div
            onClick={() =>
              !time || time === "down" ? setTime("up") : setTime("down")
            }
            className="cursor-pointer flex flex-row gap-1 items-center"
          >
            {time === "down" ? (
              <FaSortDown className="text-red-800" size={10} />
            ) : time === "up" ? (
              <FaSortUp className="text-green-800" size={10} />
            ) : (
              ""
            )}

            <div>Time</div>
          </div>
          <div className="hidden md:block">|</div>
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setSortByLocation(
                event.target.value as "All" | "Location" | "Home" | "Away"
              )
            }
            value={sortByLocation}
            className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark outline-0 transition-all ease-in duration-300"
            name="sortBy"
            id="sortBy"
          >
            <option value="Location" disabled>
              Location
            </option>
            <option value="All">All</option>
            <option value="Home">Home</option>
            <option value="Away">Away</option>
          </select>
          <div className="hidden md:block">|</div>
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setSortByCompetition(event.target.value)
            }
            value={sortByCompetition}
            className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark outline-0 transition-all ease-in duration-300"
            name="sortBy"
            id="sortBy"
          >
            <option value="Competition" disabled>
              Competition
            </option>
            <option value="All">All</option>
            {competitions.map((competition: Competition) => (
              <option key={competition.id} value={competition.id}>
                {competition.name.length > 25
                  ? `${competition.name.slice(0, 21)}...`
                  : competition.name}
              </option>
            ))}
          </select>
          <div className="hidden md:block">|</div>
          <select
            onChange={(event: React.ChangeEvent<HTMLSelectElement>) =>
              setSortBySeason(event.target.value)
            }
            defaultValue={sortBySeason}
            className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark outline-0 transition-all ease-in duration-300"
            name="sortBySeason"
            id="sortBySeason"
          >
            {seasons.map((season) => (
              <option key={season.id} value={season.id}>{`${season.date}-${
                season.date + 1
              }`}</option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
export default Filters;
