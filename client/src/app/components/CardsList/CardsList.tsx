import { FC } from "react";
import { IBPIData } from "../../../types/types";
import Card from "../Card/Card";

interface ICardsList {
  BPIData: IBPIData;
}

const CardsList: FC<ICardsList> = ({ BPIData }) => {
  console.log(BPIData, 'BPIData')
  return (
    <div className="grid gap-8">
      {Object.entries(BPIData).map(([key, BPIValues], index) => {
        console.log(BPIValues, 'BPIValues')
        return <Card rate={BPIValues.rate} code={BPIValues.code} symbol={BPIValues.symbol} key={index} />;
      })}
    </div>
  );
};

export default CardsList;
