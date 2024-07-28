import { FC } from "react";
import { IBPIData } from "../../../types/types";
import Card from "../card/Card";

interface ICardsList {
  BPIData: IBPIData;
}

const CardsList: FC<ICardsList> = ({ BPIData }) => {
  const USDRate: number = BPIData["USD"].rate;

  return (
    <div className="grid gap-8 lg:grid-cols-3 mt-20">
      {Object.entries(BPIData).map(([key, BPIValues], index) => {
        return (
          <Card
            rate={BPIValues.rate}
            code={BPIValues.code}
            symbol={BPIValues.symbol}
            key={index}
            USDRate={USDRate}
          />
        );
      })}
    </div>
  );
};

export default CardsList;
