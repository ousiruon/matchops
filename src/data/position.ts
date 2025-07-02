import { Position } from "./types/interfaces";

export const positions = (all: boolean): Position[] => {
  if (all) {
    return [
      "All",
      "GK",
      "CB",
      "LCB",
      "RCB",
      "LB",
      "RB",
      "LWB",
      "RWB",
      "CM",
      "CDM",
      "CAM",
      "LM",
      "RM",
      "CF",
      "ST",
      "SS",
      "LW",
      "RW",
    ];
  } else {
    return [
      "GK",
      "CB",
      "LCB",
      "RCB",
      "LB",
      "RB",
      "LWB",
      "RWB",
      "CM",
      "CDM",
      "CAM",
      "LM",
      "RM",
      "CF",
      "ST",
      "SS",
      "LW",
      "RW",
    ];
  }
};
