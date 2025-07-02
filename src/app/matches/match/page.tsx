"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Match = () => {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/matches");
  }, [navigate]);
  return null;
};
export default Match;
