import { Badge, Rate } from 'antd'
import { Link } from 'react-router-dom'

interface BookProps{
  src?: string;
  title: string;
  pages?: string;
  reviews?: string;
  rating?: number;
  category?: string
}

export const TrimText = (text: string)=>{
  if(text.length > 20){
    return text.substring(0, 20) + "..."
  }else{
    return text
  }
}


const TopRatedCard = ({src, title, pages, reviews, rating, category} : BookProps) => {
  return (
    <Link to={""} className='w-[330px] relative p-2 rounded-md h-[100px] flex justify-around items-center gap-5 bg-blur shadow-xl'>

        <div className='flex justify-center items-center w-[70px] h-[100px] rounded-md overflow-hidden mt-[-30px] shadow-2xs'>
            <img src={src} alt="" />
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-sm'>{TrimText(title)}</h1>
            <div className='flex gap-3'>
                <small>{pages} Pages</small>
                <small>{reviews} Reviews</small>
                <Badge count={category} />
            </div>
            <Rate count={5} value={rating}/>
        </div>
    </Link>
  )
}

export default TopRatedCard