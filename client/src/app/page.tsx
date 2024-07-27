"use client";
import { useCallback, useEffect, useState } from "react";
import CardsList from "./components/CardsList/CardsList";
import { IBPIData } from "@/types/types";

// interface IBPIDataValues {
//   rate: number;
//   code: string;
// }

// interface IBPIData {
//   [key: string]: IBPIDataValues;
// }

export default function Home() {
  const [BPIData, setBPIData] = useState<IBPIData | undefined>(undefined);

  const fetchBPIData = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3002/api/prices/latest");
      const responseJSON = await response.json();
      setBPIData(responseJSON.data);
    } catch (error) {
      console.log("An error occurred when fetching BPI data");
    }
  }, []);

  useEffect(() => {
    fetchBPIData();
  }, [fetchBPIData]);

  return (
    <main className="p-4">{BPIData && <CardsList BPIData={BPIData} />}</main>
  );
}
