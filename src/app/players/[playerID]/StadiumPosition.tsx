import Image from "next/image";

const StadiumPosition = ({ playerPosition }: { playerPosition: string }) => {
  const getPositionClass = (position: string) => {
    switch (position) {
      case "GK":
        return "top-[50%] left-5 transform -translate-y-[50%]";
      case "CB":
        return "top-[50%] left-1/5 transform -translate-y-[50%]";
      case "LCB":
        return "top-[30%] left-1/5 transform -translate-y-[30%]";
      case "RCB":
        return "top-[70%] left-1/5 transform -translate-y-[70%]";
      case "LB":
        return "top-[10%] left-1/5 transform -translate-y-[10%]";
      case "RB":
        return "top-[90%] left-1/5 transform -translate-y-[90%]";
      case "LWB":
        return "top-[10%] left-1/5 transform -translate-y-[10%]";
      case "RWB":
        return "top-[90%] left-1/5 transform -translate-y-[90%]";
      case "CDM":
        return "top-[50%] left-[35%] transform -translate-y-[50%]";
      case "CM":
        return "top-[50%] left-[50%] transform -translate-x-[50%] -translate-y-[50%]";
      case "CAM":
        return "top-[50%] left-[70%] transform -translate-x-[50%] -translate-y-[50%]";
      case "LM":
        return "top-[10%] left-[50%] transform -translate-x-[50%] -translate-y-[10%]";
      case "RM":
        return "top-[90%] left-[50%] transform -translate-x-[50%] -translate-y-[90%]";
      case "CF":
        return "top-[50%] left-[85%] transform -translate-x-[85%] -translate-y-[50%]";
      case "ST":
        return "top-[50%] left-[95%] transform -translate-x-[95%] -translate-y-[50%]";
      case "SS":
        return "top-[55%] left-[90%] transform -translate-x-[90%] -translate-y-[55%]";
      case "LW":
        return "top-[10%] left-[95%] transform -translate-x-[95%] -translate-y-[10%]";
      case "RW":
        return "top-[90%] left-[95%] transform -translate-x-[95%] -translate-y-[90%]";
      default:
        return "";
    }
  };
  return (
    <>
      <div className="w-full md:w-[80%] mx-auto relative">
        <Image
          src="/footballField.png"
          alt="Stadium"
          width={800}
          height={400}
          className="w-full h-auto"
        />
        <div
          className={`absolute ${getPositionClass(
            playerPosition
          )} bg-primary-light/90 dark:bg-primary-dark/90 font-semibold p-2`}
        >
          {playerPosition}
        </div>
      </div>
    </>
  );
};
export default StadiumPosition;
