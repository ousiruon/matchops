import { Finance, Season } from "@/data/types/interfaces";
const Filters = ({
  filters,
  setFilters,
  seasons,
  allFinances,
}: {
  filters: {
    season: string;
    type: string;
    incomeOrOutcome: string;
  };
  setFilters: (filters: {
    season: string;
    type: string;
    incomeOrOutcome: string;
  }) => void;
  seasons: Season[];
  allFinances: Finance[];
}) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 items-end justify-end w-full">
        <select
          className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark outline-0 transition-all ease-in duration-300"
          value={filters.season}
          onChange={(e) => setFilters({ ...filters, season: e.target.value })}
        >
          <option value="all">All Seasons</option>
          {seasons.map((season) => (
            <option key={season.id} value={season.id}>{`${season.date}-${
              season.date + 1
            }`}</option>
          ))}
        </select>
        <select
          className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark outline-0 transition-all ease-in duration-300"
          value={filters.type}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="all">All Types</option>
          {Array.from(new Set(allFinances.map((finance) => finance.type))).map(
            (type) => (
              <option key={type} value={type}>
                {type.charAt(0).toUpperCase() +
                  type.slice(1).replace(/_/g, " ")}
              </option>
            )
          )}
        </select>
        <select
          className="bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark outline-0 transition-all ease-in duration-300"
          value={filters.incomeOrOutcome}
          onChange={(e) =>
            setFilters({ ...filters, incomeOrOutcome: e.target.value })
          }
        >
          <option value="all">All Income/Outcome</option>
          <option value="in">Income</option>
          <option value="out">Outcome</option>
        </select>
      </div>
    </>
  );
};
export default Filters;
