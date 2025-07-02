import Button from "@/app/(reusable)/Button";

const NoSeasons = () => {
  return (
    <>
      <div className="flex flex-col gap-4 w-full h-full items-center justify-center font-semibold">
        <div className="opacity-70 text-lg">
          A season must be added before a finance can be created!
        </div>
        <Button link="/matches/seasons/newSeason" text="Add a season" />
      </div>
    </>
  );
};
export default NoSeasons;
