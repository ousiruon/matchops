import { FaHome, FaWallet } from "react-icons/fa";
import { IoIosFootball } from "react-icons/io";
import { MdStadium } from "react-icons/md";
import { MenuItem } from "../../data/types/interfaces";
export const menuItems: MenuItem[] = [
  { label: "Dashboard", href: "/", Icon: FaHome, section: "main" },
  { label: "Players", href: "/players", Icon: IoIosFootball, section: "main" },
  { label: "Matches", href: "/matches", Icon: MdStadium, section: "main" },
  { label: "Finances", href: "/finances", Icon: FaWallet, section: "main" },
  // { label: "Settings", href: "/settings", Icon: IoMdSettings, section: "main" },
  // { label: "Login", href: "/login", Icon: FaUser, section: "bottom" },
];
