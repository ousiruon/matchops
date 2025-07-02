import Button from "@/app/(reusable)/Button";

const NoSeason = () => {
  return (
    <>
      <div className="flex flex-col gap-4 min-h-full w-full items-center justify-center">
        <div className="opacity-70 text-lg">No Season is found!</div>
        <Button link="/matches/seasons/newSeason" text="Add a season" />
      </div>
    </>
  );
};
export default NoSeason;
