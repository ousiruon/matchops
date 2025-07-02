import { GoalScored, Player } from "@/data/types/interfaces";
import { addGoal } from "@/store/goalsSlice";
import { AppDispatch } from "@/store/store";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

interface AddGoalProps {
  isSubmitted: boolean;
  setIsSubmitted: (e: boolean) => void;
  setIsForUs: (e: boolean) => void;
  isForUs: boolean;
  players: Player[];
  isScorer: boolean | null;
  goalTimeValue: number;
  setGoalTimeValue: (e: number) => void;
  isTime: boolean | null;
  setLeave: (e: boolean) => void;
  setIsSuccess: (e: boolean) => void;
  setIsScorer: (e: boolean | null) => void;
  setIsTime: (e: boolean | null) => void;
}
const AddGoal = ({
  isSubmitted,
  setIsSubmitted,
  setIsForUs,
  isForUs,
  players,
  isScorer,
  goalTimeValue,
  setGoalTimeValue,
  isTime,
  setLeave,
  setIsSuccess,
  setIsScorer,
  setIsTime,
}: AddGoalProps) => {
  const dispatch: AppDispatch = useDispatch();
  const params = useParams();
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = Number(e.currentTarget.value);
    if (value < 1) value = 1;
    if (value > 120) value = 120;
    setGoalTimeValue(value);
  };
  const formSubmitted = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const id = uuidv4();
    const formData = new FormData(e.currentTarget);
    const goalForUs = formData.get("goalForUs") as string;
    const name = formData.get("scorerName") as string;
    const matchId = params.matchId;
    const time = Number(formData.get("goalTime") as string);
    if (name === "scorerName") {
      setIsScorer(false);
    } else {
      setIsScorer(true);
    }
    if (time === 0 || time < 1 || time > 120) {
      setIsTime(false);
    } else {
      setIsTime(true);
    }
    if (id && name && goalForUs && matchId && time) {
      const newEvent: GoalScored = {
        id,
        byus: goalForUs === "yes" ? true : false,
        scorer: name,
        game: matchId as string,
        time,
      };
      dispatch(addGoal(newEvent));
      e.currentTarget.reset();
      setIsForUs(false);
      setIsSubmitted(true);
      setIsSuccess(true);
    }
  };
  return (
    <>
      <div className="w-full flex flex-col gap-10">
        <div className="font-bold text-base md:text-xl">Add Event</div>
        {isSubmitted && (
          <div className="font-bold text-base md:text-xl text-green-900 dark:text-green-600">
            Event Added!
          </div>
        )}
        <form
          onChange={() => isSubmitted && setIsSubmitted(false)}
          onSubmit={formSubmitted}
          className="flex flex-col gap-4 w-full text-sm md:text-base"
        >
          {/* Scored by us */}
          <div className="flex flex-col gap-2 items-start justify-start w-full">
            <div className="flex flex-row gap-4 items-center justify-start w-full">
              <label htmlFor="goalForUs" className="w-[145px]">
                Was the goal scored by us? *
              </label>
              <select
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  e.currentTarget.value === "yes"
                    ? setIsForUs(true)
                    : setIsForUs(false)
                }
                name="goalForUs"
                id="goalForUs"
                className="w-full flex-1 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 max-w-[300px]"
              >
                <option value="no">No</option>
                <option value="yes">Yes</option>
              </select>
            </div>
          </div>
          {/* Event Name*/}
          <div className="flex flex-col gap-2 items-start justify-start w-full">
            <div className="flex flex-row gap-4 items-center justify-start w-full">
              {isForUs ? (
                <>
                  <label htmlFor="scorerName" className="w-[145px]">
                    Goal Scorer *
                  </label>
                  <select
                    name="scorerName"
                    id="scorerName"
                    className="w-full flex-1 bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark border border-text-light dark:border-text-dark rounded px-4 py-1 outline-0 transition-all ease-in duration-300 max-w-[300px]"
                  >
                    {players.map((player) => (
                      <option key={player.id} value={player.id}>
                        {player.name}
                      </option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <label htmlFor="scorerName" className="w-[145px]">
                    Goal Scorer *
                  </label>
                  <input
                    type="text"
                    name="scorerName"
                    id="scorerName"
                    placeholder="Enter player name..."
                    className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[300px]"
                  />
                </>
              )}
            </div>
            {isScorer !== null && !isScorer && (
              <div className="text-xs font-semibold text-red-800">
                Player name is required!
              </div>
            )}
          </div>
          {/* Event time*/}
          <div className="flex flex-col gap-2 items-start justify-start w-full">
            <div className="flex flex-row gap-4 items-center justify-start w-full">
              <label htmlFor="goalTime" className="w-[145px]">
                Goal Time *
              </label>
              <input
                type="number"
                name="goalTime"
                id="goalTime"
                min={1}
                max={120}
                value={goalTimeValue}
                onChange={handleTimeChange}
                placeholder="Enter Event Time..."
                className="w-full flex-1 outline-0 px-4 py-2 text-sm border-1 border-text-light/40 dark:border-text-dark/40 rounded max-w-[300px]"
              />
            </div>
            {isTime !== null && !isTime && (
              <div className="text-xs font-semibold text-red-800">
                Goal Time is required!
              </div>
            )}
          </div>
          {/* Button to edit */}
          <div className="flex flex-row gap-4">
            <button
              type="submit"
              className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80 max-w-[200px] font-bold"
            >
              Add event
            </button>
            <button
              onClick={() => setLeave(true)}
              type="submit"
              className="px-4 py-2 rounded bg-primary-light dark:bg-primary-dark cursor-pointer text-text-light dark:text-text-dark transition-all ease-in duration-300 hover:bg-primary-light/80 dark:hover:bg-primary-dark/80 max-w-[200px] font-bold"
            >
              Add & Leave
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
export default AddGoal;
