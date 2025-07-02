const GetSinglePlayerHeader = () => {
  return (
    <>
      <div className="flex flex-row items-center justify-start w-full py-4 px-4 bg-bg-2-light dark:bg-bg-2-dark/40 gap-4 border-b-1 border-text-light/10 dark:border-text-dark/10 font-bold">
        <div className="flex flex-row items-center justify-start gap-4 grow-1">
          <div className="w-[50px]"></div>
          <div className="">Name</div>
        </div>
        <div className="flex flex-row items-center justify-start gap-4">
          <div>Position</div>
          <div className="w-8 text-right">Age</div>
        </div>
      </div>
    </>
  );
};
export default GetSinglePlayerHeader;
