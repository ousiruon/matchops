import Button from "@/app/(reusable)/Button";

const NoCompetitions = () => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full h-full items-center justify-center font-semibold">
        <div className="opacity-70 text-lg">
          A competition must be added before a match can be created!
        </div>
        <Button link="/matches/newCompetition" text="Add a competition" />
      </div>
    </>
  );
};
export default NoCompetitions;
