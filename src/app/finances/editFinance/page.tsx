"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const EditFinance = () => {
  const navigate = useRouter();
  useEffect(() => {
    navigate.push("/finances");
  }, [navigate]);
  return null;
};
export default EditFinance;
