import { IBPILatestPricesValue } from "@/types/types";
import { FC, useCallback, useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";


interface IChartModal {
  code: string;
  handleModalClickOutside: () => void;
}

const ChartModal: FC<IChartModal> = ({ code, handleModalClickOutside }) => {
  const [chartData, setChartData] = useState<any>(null);
  const [yAxisRange, setYAxisRange] = useState<number[]>([]);

  const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleModalClickOutside();
    }
  };

  const fetchBPILatestPrices = useCallback(async () => {
    try {
    const response = await fetch(
      `http://localhost:3002/api/prices/count/${code}?count=10`
    );
    const responseJSON = await response.json();
    getRateRange(responseJSON.data)
    setChartData(responseJSON.data);
    } catch (error) {
      console.log(`An error occurred when fetching latest ${code} data`);
    }
  }, [code]);

  const getRateRange = (BPILatestPricesValue: IBPILatestPricesValue[]) => {
    const rates = BPILatestPricesValue.map((element) => {
      return element.rate
    })

    const maxRate = Math.max(...rates)
    const minRate = Math.min(...rates)

    setYAxisRange([minRate, maxRate])

  }

  useEffect(() => {
    fetchBPILatestPrices();
    console.log("heyhey");
  }, [fetchBPILatestPrices]);

  function getCurrentTime(dateString: string) {
    const date = new Date(dateString);
    const localOffset = date.getTimezoneOffset();
    const offsetMs = -localOffset * 60000;
    const adjustedDate = new Date(date.getTime() + offsetMs);

    const hours = adjustedDate.getHours().toString().padStart(2, '0');
    const minutes = adjustedDate.getMinutes().toString().padStart(2, '0');
  
    return `${hours}:${minutes}`;
  }

  if (!chartData) return null;

  return (
    <div
      className="flex justify-center items-center text-center fixed z-10 left-0 top-0 bg-black bg-opacity-10 h-svh w-svw px-10"
      onClick={handleClickOutside}
    >
      <div className="flex justify-center items-center relative bg-white w-full h-96 p-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 60,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" tickFormatter={(value: string) => getCurrentTime(value)} />
          <YAxis domain={yAxisRange} />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="rate" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartModal;
