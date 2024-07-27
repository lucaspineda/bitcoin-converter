import {FC} from 'react'
import {IBPIData} from '../../../types/types'

interface ICard {
  rate: number,
  code: string,
  symbol: string,
}

const Card: FC<ICard> = ({rate, code, symbol}) => {
  return (
    <div className='flex flex-col border border-black items-center text-lg font-semibold py-8'>
      <span className='mb-6'>{code} ({symbol})</span>
      <h2 className='mb-8'>{rate}</h2>
      <input className='border border-black mb-4' type="text" />
      <span>Result</span>
    </div>
  )
}

export default Card;