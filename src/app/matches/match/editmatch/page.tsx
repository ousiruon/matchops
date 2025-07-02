"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const ModifyMatch = () => {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/matches");
  }, [navigate]);
  return null;
};
export default ModifyMatch;
