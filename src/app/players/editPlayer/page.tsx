"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EditPlayer = () => {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/players");
  }, [navigate]);
  return null;
};
export default EditPlayer;
