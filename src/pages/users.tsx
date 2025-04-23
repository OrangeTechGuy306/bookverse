import DashboardLayout from '@/components/custom/_layout'
import SummaryCard from '@/components/custom/summarycard'
import { API_URL, FILE_URL } from '@/lib/server'
import { Avatar, Button, Input, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { BsSearch } from 'react-icons/bs'
import { FaUserShield } from 'react-icons/fa'
import { toast } from 'sonner'



export interface userProps {
    _id: string
    fullname: string,
    email: string,
    username: string,
    password?: string,
    confirm_password?: string;
    profileImage?: string;
    favourite?: [
        {
            title: string;
            image_url: string;
            bookID: string
        }
    ]
}



const UsersPage = () => {

    const [searchValue, setSearchValue] = useState("")

    const [count, setCount] = useState(0)

    const columns = [
        {
            title: "S/NO",
            dataIndex: "serialNo",
            key: "serialNo"
        },
        {
            title: "Profile",
            dataIndex: "profile",
            key: "profile"
        },
        {
            title: "Full Name",
            dataIndex: "fullname",
            key: "fullname"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        },
        {
            title: "Username",
            dataIndex: "username",
            key: "username"
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action"
        },
    ]

    const [users, setUsers] = useState<userProps[]>()



    const fetchAllUsers = async () => {

        try {
            const { data } = await axios.get(`${API_URL}/users`)
            setUsers(data.message)
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    const deleteUser = async (id: string) => {

        try {
            const { data } = await axios.delete(`${API_URL}/user/${id}`)
            toast.success(data.message)
            fetchAllUsers()
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    const countAllUsers = async () => {

        try {
            const { data } = await axios.get(`${API_URL}/count/users`)
            setCount(data.message)
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }



    

    // eslint-disable-next-line
    const handleSearch = async (e: any) => {
        e.preventDefault()
        try {
            const { data } = await axios.get(`${API_URL}/search/user?search=${searchValue}`)
            console.log(data)
            if(data.message.length > 0){
                setUsers(data.message)
            }else{
                toast.error("NO user found")
                fetchAllUsers()
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    useEffect(() => {
        countAllUsers()
        fetchAllUsers()
    }, [])


    return (
        <DashboardLayout>

            <h1 className='text-2xl text-slate-400 mb-5'>Users</h1>

            <div>
                <SummaryCard
                    text='Users'
                    // eslint-disable-next-line
                    count={count as any}
                    icon={<FaUserShield />}
                    color='bg-slate-800 rounded-md'
                />
            </div>

            <div className='my-5'>
                <form action="" className='flex items-center gap-3' onSubmit={handleSearch}>
                    <Input type='search' placeholder='Search users here...' onChange={(e) => setSearchValue(e.target.value)} />
                    <button className='bg-blue-700 py-2 px-4 text-white rounded-md cursor-pointer' type='submit'><BsSearch /></button>
                </form>
            </div>

            <div className='my-5'>
                <Table columns={columns} dataSource={
                    users?.map((user, i) => (
                        {
                            serialNo: i + 1,
                            profile: <Avatar src={`${FILE_URL}/${user.profileImage}`} />,
                            fullname: user.fullname,
                            email: user.email,
                            username: user.username,
                            action: <Button onClick={() => deleteUser(user._id)} style={{ background: "red", color: "white" }}><BiTrash /></Button>
                        }

                    ))
                } />
            </div>

        </DashboardLayout>
    )
}

export default UsersPage