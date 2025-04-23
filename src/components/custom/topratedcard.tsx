import { Badge, Rate } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'

const TopRatedCard = () => {
  return (
    <Link to={""} className='w-[330px] relative p-2 rounded-md h-[100px] flex justify-around items-center gap-5 bg-blur shadow-xl'>

        <div className='flex justify-center items-center w-[70px] h-[100px] rounded-md overflow-hidden mt-[-30px] shadow-2xs'>
            <img src="/assets/ss2.jpg" alt="" />
        </div>
        <div className='flex flex-col gap-2'>
            <h1 className='text-sm'>Harry Potter and Sorcerer stones</h1>
            <div className='flex gap-3'>
                <small>193 Pages</small>
                <small>20 chapters</small>
                <Badge count={"trailer"} />
            </div>
            <Rate count={5} value={5}/>
        </div>
    </Link>
  )
}

export default TopRatedCard