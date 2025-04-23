
import { ReactNode } from 'react';

interface SummaryCardProps{
    icon?: ReactNode;
    text?: string;
    count?: string;
    color?: string
}

const SummaryCard = ({icon, text, count, color} : SummaryCardProps) => {
  return (
    <div className={`w-[200px] p-4 ${color} text-white`}>
        <div className=''>
            {icon}
            <small>{text}</small>
            <h1 className='text-xl'>{count}</h1>
        </div>
    </div>
  )
}

export default SummaryCard