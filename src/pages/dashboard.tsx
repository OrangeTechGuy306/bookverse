import DashboardLayout from '@/components/custom/_layout'
import DashbookCard from '@/components/custom/dashbookcard'
import SummaryCard from '@/components/custom/summarycard'
import TopRatedCard from '@/components/custom/topratedcard'
import { BsStarFill } from 'react-icons/bs'
import { CiBookmark } from 'react-icons/ci'
import { IoBookSharp } from 'react-icons/io5'
import { PiUserSwitch } from 'react-icons/pi'
import { RiAdminFill } from 'react-icons/ri'
import { Link } from 'react-router-dom'
// import { PulsatingButton } from '@/components/magicui/pulsating-button'


const DashboardPage = () => {
  return (
    <DashboardLayout>
        
        <div className='w-[100%] h-[200px] bg-blue-700 p-5 flex justify-around items-center flex-wrap overflow-hidden'>
            <img src="/assets/dashbook.webp" alt="" width={200}/>

            <div className='flex flex-col gap-2'>
                <h1 className='text-2xl text-white'>Hello! And Welcome</h1>
                <p className='text-slate-400'>The library serves as a welcome home for knowledge  <br /> seekers and readers online</p>
                {/* <PulsatingButton pulseColor='red'>Join Affiliate Program</PulsatingButton> */}
                <button className='bg-white py-1 px-2 rounded-md w-[max-content] text-blue-500 shadow-xl border-[2px] border-blue-300 cursor-pointer'>Go to book page</button>
            </div>
        </div>

        <div className=" flex justify-centerflex-wrap">
            <SummaryCard 
                text='Total Books Upload'
                count='200000' 
                icon={<IoBookSharp />}
                color='bg-amber-400 flex-1'
            />
            <SummaryCard 
                text='Total Active users'
                count='200000' 
                icon={<PiUserSwitch />}
                color='bg-emerald-500 flex-1'
            />
            <SummaryCard 
                text='Total Admins'
                count='200000' 
                icon={<RiAdminFill />}
                color='bg-purple-500 flex-1'
            />
            <SummaryCard 
                text='High Rated Books'
                count='200000' 
                icon={<BsStarFill />}
                color='bg-pink-500 flex-1'
            />
            <SummaryCard 
                text='Most Popular Books'
                count='200000' 
                icon={<CiBookmark />}
                color='bg-orange-500 flex-1'
            />
        </div>

        <div className='bg-blur rounded-md p-5'>
            <div className='flex justify-between items-center my-5'>
                <h1 className='text-xl font-bold text-blue-600'>Top Rated</h1>
                <Link to={"/books"}>View All</Link>
            </div>
            <hr className='my-5'/>
            <div className='flex items-center gap-5 flex-wrap'>
                <TopRatedCard />
                <TopRatedCard />
                <TopRatedCard />
                <TopRatedCard />
                <TopRatedCard />
                <TopRatedCard />
            </div>
            <div className='flex justify-between items-center my-5'>
                <h1 className='text-xl font-bold text-blue-600'>Popular</h1>
                <Link to={"/books"}>View All</Link>
            </div>
            <hr className='my-5'/>
            <div className='flex items-center gap-5 flex-wrap'>
                <DashbookCard />
                <DashbookCard />
                <DashbookCard />
                <DashbookCard />
                <DashbookCard />
            </div>
        </div>

    </DashboardLayout>
  )
}

export default DashboardPage