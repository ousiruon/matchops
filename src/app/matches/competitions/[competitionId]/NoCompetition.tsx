import Button from "@/app/(reusable)/Button";

const NoCompetition = () => {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-full w-full items-center justify-center">
        <div className="opacity-70 text-lg">No competition is found!</div>
        <Button
          link="/matches/competitions/newCompetition"
          text="Add a competition"
        />
      </div>
    </>
  );
};
export default NoCompetition;
