import { API_URL, FILE_URL } from "@/lib/server"
import { adminInfoType } from "@/pages/admins"
import { Avatar, Badge, Input } from "antd"
import axios from "axios"
import React, { useEffect, useState } from "react"
// import { BiMoon } from "react-icons/bi"
import { BsBookmarkHeart } from "react-icons/bs"
import { FaUserSlash } from "react-icons/fa"
import { FaUpload, FaUserLock } from "react-icons/fa6"
import { GrDashboard } from "react-icons/gr"
import { RiBookShelfFill } from "react-icons/ri"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner"



const DashboardLayout = ({children} : {children: React.ReactNode}) => {

    const [admin, setAdmin] = useState<adminInfoType>()
    const navigate = useNavigate()


    const authenticateUser = async()=>{
        try {
            const token = localStorage.getItem("admin_token")
            if(token){
                const {data} = await axios.get(`${API_URL}/admin`,{
                    headers:{
                        "Authorization": `Bearer: ${token}`
                    }
                })
                setAdmin(data.message)
            }else{
                navigate("/signin")
            }

            // eslint-disable-next-line
        } catch (error: any) {
            // toast.error(error.response.data.message ?? "Client side error")
        }
    }


    useEffect(()=>{
        authenticateUser()
    },[])

  return (
    <section className="flex min-h-screen">

        <aside className="h-screen overflow-y-scroll bg-blur shadow-md w-[200px] p-3 flex flex-col gap-10"> 

            <div className="flex items-center gap-2 bg-blue-700 text-white justify-center py-2 rounded-md shadow-xl">
                <BsBookmarkHeart size={20} />
                <h1>Ebook</h1>
            </div>

        <div className="flex flex-col gap-4">
            <Link to={"/"} className="flex items-center p-2 gap-2 rounded-md hover:bg-blue-600 hover:text-white hover:shadow-xl text-slate-500">
                <GrDashboard />
                <span>Dashboard</span>
            </Link>
            <Link to={"/users"} className="flex items-center p-2 gap-2 rounded-md hover:bg-blue-600 hover:text-white hover:shadow-xl text-slate-500">
                <FaUserSlash />
                <span>Users</span>
            </Link>
            <Link to={"/books"} className="flex items-center p-2 gap-2 rounded-md hover:bg-blue-600 hover:text-white hover:shadow-xl text-slate-500">
                <RiBookShelfFill />
                <span>Books</span>
            </Link>
            <Link to={"/upload"} className="flex items-center p-2 gap-2 rounded-md hover:bg-blue-600 hover:text-white hover:shadow-xl text-slate-500">
                <FaUpload />
                <span>Upload Book</span>
            </Link>
            <Link to={"/admins"} className="flex items-center p-2 gap-2 rounded-md hover:bg-blue-600 hover:text-white hover:shadow-xl text-slate-500">
                <FaUserLock />
                <span>Admin</span>
            </Link>
        </div>

        </aside>


        <main className="flex-1">
            <nav className="bg-blur flex justify-between items-center p-3">
                <form action="" className="w-[300px]">
                    <Input type="search" placeholder="Search Book here..."/> 
                </form>
                <div className="flex items-center gap-3 py-1">
                    <Badge count={"Live"}/>
                    {/* <BiMoon size={25} color="grey"/> */}
                    <Avatar src={`${FILE_URL}/${admin?.image_url}`} size={30}/>
                </div>
            </nav>


            {/* OTHER ELEMENTS GOES IN HERE  */}

            <div className="p-5 h-[90vh] overflow-y-scroll">
                {children}
            </div>


        </main>
    </section>
  )
}

export default DashboardLayout