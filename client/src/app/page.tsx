"use client";
import { useCallback, useEffect, useState } from "react";
import CardsList from "./components/cardsList/CardsList";
import { IBPIData } from "@/types/types";

export default function Home() {
  const [BPIData, setBPIData] = useState<IBPIData | undefined>(undefined);

  const fetchBPIData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3002/api/prices/latest");
      const responseJSON = await response.json();
      setBPIData(responseJSON.data);
    } catch (error) {
      // Could create a component for displaying errors
      console.log("An error occurred when fetching BPI data");
    }
  }, []);

  useEffect(() => {
    fetchBPIData();
    const intervalId = setInterval(fetchBPIData, 20000);
    return () => clearInterval(intervalId);
  }, [fetchBPIData]);

  return (
    <main className="p-4">
      <h1 className="text-center text-xl font-bold">Bitcoin Price Index</h1>
      {BPIData && <CardsList BPIData={BPIData} />}
    </main>
  );
}
