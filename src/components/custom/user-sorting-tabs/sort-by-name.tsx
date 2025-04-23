import { API_URL, FILE_URL } from '@/lib/server'
import { userProps } from '@/pages/users'
import { Avatar, Button, Table } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { BiTrash } from 'react-icons/bi'
import { toast } from 'sonner'


const SortByName = () => {

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
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }


   



        useEffect(()=>{
            fetchAllUsers()
        },[])
    return (
        <div>
            <Table columns={columns} dataSource={
            users?.map((user, i)=>(
                {
                    serialNo: i+1,
                    profile: <Avatar  src={`${FILE_URL}/${user.profileImage}`}/>,
                    fullname: user.fullname,
                    email: user.email,
                    username: user.username,
                    action: <Button onClick={()=>deleteUser(user._id)} style={{background:"red", color:"white"}}><BiTrash /></Button>
                }

            ))
        }/>
        </div>
    )
}

export default SortByName