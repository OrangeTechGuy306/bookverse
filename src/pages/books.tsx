import DashboardLayout from "@/components/custom/_layout"
import SummaryCard from "@/components/custom/summarycard";
import { API_URL } from "@/lib/server";
import { Avatar, Button, Modal, Table } from "antd"
import axios from "axios";
import { useEffect, useState } from "react"
import { BiTrash } from "react-icons/bi";
import { PiBooksDuotone } from "react-icons/pi";
import { toast } from "sonner";
import { PiBookOpenTextBold } from "react-icons/pi";
import { BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

export interface BookProps {
    _id?: string;
    title?: string;
    author?: string;
    description?: string;
    reviews?: [
        {
            name?: string,
            message?: string;
            rating?: string
        }
    ];
    category?: string;
    coverUrl?: string;
    format?: string;
    file?: string;
    isbn?: string;
    publishDate?: string;
    pages?: string;
    language?: string;
    publisher?: string;
    rating?: string;
    ratingCount?: string;
    isActive?: string;
    tags?: Array<string>;
}

const BooksPage = () => {



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
            title: "Language",
            dataIndex: "language",
            key: "language"
        },
        {
            title: "Pages",
            dataIndex: "pages",
            key: "pages"
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating"
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

    const [books, setBooks] = useState<BookProps[]>()
    const [deleteID, setDeleteID] = useState("")
    const [deleteModal, setDeleteModal] = useState(false)

    const navigate = useNavigate()


    const fetchAllBooks = async () => {
        try {
            const { data } = await axios.get(`${API_URL}/books`)
            setBooks(data.message)
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message)
        }
    }

    const openDeleteModal = (id: string)=>{
        setDeleteModal(true)
        setDeleteID(id)
    }

    const removeBook = async(id: string)=>{
       try {
        
        const {data} = await axios.delete(`${API_URL}/book/${id}`)
        toast.success(data.message)
        fetchAllBooks()
        setDeleteModal(false)
         // eslint-disable-next-line
       } catch (error: any) {
        toast.error(error.response.data.message)
       }
    }

    const gotoViewPage = (id:string)=>{
        navigate(`/view/${id}`)
    }



    useEffect(() => {
        fetchAllBooks()
    }, [])

    return (
        <DashboardLayout>

            <div className="mb-5">
                <SummaryCard count={books?.length as any} color="bg-blue-600 rounded-md" icon={<PiBookOpenTextBold />} text="Books"/>
            </div>

            <div>
                <Table columns={columns} dataSource={
                    books?.map((book, i) => (
                        {
                            key: i,
                            serialNo: i + 1,
                            cover: <Avatar src={book.coverUrl} />,
                            title: book.title,
                            pages: book.pages,
                            author: book.author,
                            language: book.language,
                            rating: book.rating,
                            action: <div className="flex items-center gap-2">
                                <Button 
                                    style={{backgroundColor: "red", color: "white", padding: "0 5px"}} 
                                    onClick={()=>{openDeleteModal(book._id)}}>
                                    <BiTrash />
                                </Button>
                                <Button style={{backgroundColor: "blue", color: "white", padding: "0 5px"}} 
                                onClick={()=>gotoViewPage(book._id)}>
                                <BsEyeFill />
                                </Button>
                            </div>
                        }

                    ))
                } />
            </div>
            {/* DELETE MODAL */}
            <Modal open={deleteModal} onCancel={()=>setDeleteModal(false)} footer={null}>
                <h1 className="text-xl text-red-500">warning:  danger zone</h1>
                <p>You are about to delete or remove this book from the database</p>
                <small>Note: this changes is irreversible</small>
                <div className="mt-5 flex gap-5 justify-end">
                    <Button style={{backgroundColor: "red", color: "white", border: "none"}} onClick={()=>removeBook(deleteID)}>Delete</Button>
                    <Button style={{backgroundColor: "blue", color: "white", border:"none"}} onClick={()=>setDeleteModal(false)}>Cancel</Button>
                </div>
            </Modal>
        </DashboardLayout>
    )


}

export default BooksPage