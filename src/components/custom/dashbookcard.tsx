import { Rate } from "antd"
import { Link } from "react-router-dom"


const DashbookCard = () => {
  return (
    <Link to={""} className='w-[200px] rounded-md overflow-hidden bg-blur'>
        <div className='w-[100%] h-[250px] overflow-hidden flex justify-center items-center'>
          <img src="/assets/ss1.jpg" alt="" className=""/>
        </div>
        <div className=" mt-1 flex flex-col gap-1 px-2 pb-4">
          <h1 className="font-bold text-black">The lord of the ring</h1>
          <small>Lorem ipsum, dolor sit amet conse adipisicing elit. </small>
          <Rate value={2} count={5} />
        </div>
    </Link>
  )
}

export default DashbookCard