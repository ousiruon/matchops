import { IconType } from "react-icons";
export type Position =
  | "All"
  | "GK"
  | "CB"
  | "LCB"
  | "RCB"
  | "LB"
  | "RB"
  | "LWB"
  | "RWB"
  | "CM"
  | "CDM"
  | "CAM"
  | "LM"
  | "RM"
  | "CF"
  | "ST"
  | "SS"
  | "LW"
  | "RW";
export interface Player {
  id: string;
  name: string;
  nationality: string;
  position: Position;
  height: number | null;
  dob: number | null;
  image: string;
  preferredFoot: "Left" | "Right" | "Both";
  shirtNumber: number | null;
  marketValue: number | null;
  sold: boolean;
  valueSoldFor?: number | null;
  goalsScored: number;
  yellowCardsReceived: number;
  redCardsReceived: number;
}
export interface Season {
  id: string;
  date: number;
}
export interface Competition {
  id: string;
  name: string;
  local: boolean;
  prize: number;
}
export interface Game {
  id: string;
  name: string;
  opponent: string;
  home: boolean;
  time: number;
  competition: string | null;
  season: string | null;
}
export interface GoalScored {
  id: string;
  byus: boolean;
  scorer: string;
  game: string;
  time: number;
}
export interface Card {
  id: string;
  who: string;
  byus: boolean;
  type: "red" | "yellow";
  game: string;
  time: number;
}
export interface MenuItem {
  label: string;
  href: string;
  Icon: IconType;
  section?: "main" | "bottom";
}

export interface LoginState {
  isLoggedIn: boolean;
  credentialsFalse: boolean | null;
  credentials: {
    username: string;
    password: string;
  };
}
export interface Finance {
  id: string;
  name: string;
  incomeOrOutcome: "in" | "out";
  value: number;
  type:
    | "partner"
    | "transfer"
    | "broadcasting"
    | "matchday"
    | "prize_money"
    | "commercial"
    | "wages"
    | "operational_costs"
    | "agent_fees"
    | "loan_repayment"
    | "youth_academy";
  season: string;
  transfer?: {
    player: string;
  };
  matchDay?: {
    id: string;
  };
}
