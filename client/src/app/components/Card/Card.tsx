import { FC, useCallback, useEffect, useState } from "react";
import ChartModal from "../chartModal/ChartModal";
import { IBPIData } from "../../../types/types";

interface ICard {
  rate: number;
  code: string;
  symbol: string;
  USDRate: number;
}

const Card: FC<ICard> = ({ rate, code, symbol, USDRate }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [bitcoinValue, setBitcoinValue] = useState<number>(0);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
  };

  const handleModalClickOutside = () => {
    setModalOpen(false);
  }

  const handleBitcoinConversion = useCallback(
    (newInputValue: number | null) => {
      if (!newInputValue) return
      if (code === "USD") {
        setBitcoinValue(newInputValue / rate);
        return;
      }
      const ratio: number = rate / USDRate;
      const crosConverstion = (newInputValue * ratio) / rate;
      setBitcoinValue(crosConverstion);
    },
    [USDRate, code, rate]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!(e.target instanceof HTMLInputElement)) {
      setModalOpen(true)
    }
  }

  useEffect(() => {
    handleBitcoinConversion(parseFloat(inputValue));
  }, [rate, inputValue, handleBitcoinConversion]);

  return (
    <>
      {modalOpen && <ChartModal code={code} handleModalClickOutside={handleModalClickOutside}/>}
      <div
        onClick={handleClick}
        className="flex flex-col border border-black items-center text-lg font-semibold py-8 cursor-pointer"
      >
        <span className="mb-6">
          {code} ({symbol})
        </span>
        <h2 className="mb-8">{rate}</h2>
        <input
          className="border border-black mb-4"
          value={inputValue}
          onChange={handleInputChange}
          type="number"
        />
        <span>
          {bitcoinValue ? bitcoinValue : 0} Bitcoin
          {bitcoinValue >= 2 ? "s" : ""}
        </span>
      </div>
    </>
  );
};

export default Card;
