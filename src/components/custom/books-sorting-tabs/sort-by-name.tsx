import { Avatar, Table } from 'antd'
import { toast } from 'sonner'
import axios from "axios"
import { API_URL } from '@/lib/server'
import { useEffect, useState } from 'react'
import { userProps } from '@/pages/users'

const SortByBookName = () => {

    const columns = [
        {
            title: "S/NO",
            dataIndex: "serialNo",
            key: "serialNo"
        },
        {
            title: "Cover Image",
            dataIndex: "cover",
            key: "cover"
        },
        {
            title: "Title",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Chapters",
            dataIndex: "title",
            key: "title"
        },
        {
            title: "Pages",
            dataIndex: "pages",
            key: "pages"
        },
        {
            title: "File",
            dataIndex: "file",
            key: "file"
        },
        {
            title: "Author",
            dataIndex: "author",
            key: "author"
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action"
        },
    ]

    const [users, setUsers] = useState<userProps[]>()
    

    const fetchAllUsers = async()=>{
        console.log("ell")
        try {
            const {data} = await axios.get(`${API_URL}/users`)
            setUsers(data.message)
            // eslint-disable-next-line
        } catch (error:any) {
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
                    cover: <Avatar  src={user.profileImage}/>
                }

            ))
        }/>
    </div>
  )
}

export default SortByBookName