import { Badge, Button, Rate } from "antd"
import { LucideBookOpenText } from "lucide-react"
import { useEffect, useState } from "react"
import { BookProps } from "./books"
import axios from "axios"
import { API_URL, FILE_URL } from "@/lib/server"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"
import DashboardLayout from "@/components/custom/_layout"


const ViewBooks = () => {


    const [book, setBook] = useState<BookProps>()
    const {id} = useParams()
    const navigate = useNavigate()


    const fetchSingleBook = async()=>{
        try {
            const {data} = await axios.get(`${API_URL}/book/${id}`)
            setBook(data.message)
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side error")
            navigate("/books")
        }
    }

    useEffect(()=>{
        fetchSingleBook()
    },[])

  return (
    <DashboardLayout>
    <section className="min-h-screen flex pt-[100px] justify-center p-10 md:w-[90%] w-[100%] md:mx-[auto] gap-20 flex-wrap">
        <img src={`${FILE_URL}/${book?.coverUrl}`} alt="" className="md:w-[300px] w-[100%]"/>
        <div className="md:flex-1 w-[100%]">
            <div className="flex flex-col gap-2">
                <h1 className="text-xl font-bold">{book?.title}</h1>
                <small>By: {book?.author} published: {book?.publishDate} </small>
                <Badge count={book?.format} />
           
                <Rate count={5} allowHalf={true} 
                // eslint-disable-next-line
                value={book?.rating as any} />
                <p>{book?.description}</p>
                <ul className="flex flex-col gap-2">
                    <li>ISBN: {book?.isbn}</li>
                    <li>Publisher: {book?.publisher}</li>
                    <li>Pages: {book?.pages}</li>
                    <li>Langauge: {book?.language}</li>
                </ul>

                <div className="flex gap-2">
                    <Button style={{backgroundColor:"blue", border:"none", color:"white"}}>
                        <LucideBookOpenText />
                        Read Book
                    </Button>
                </div>
            </div>
        </div>
    </section>

    <hr />

    <section className="min-h-[70vh] md:w-[90%] md:mx-[auto] my-10 px-5">
        <h1 className="text-2xl">{book?.reviews&&book?.reviews.length} Reviews:</h1>

        <div className="flex mt-5 gap-5 flex-wrap-reverse ">

            <div className="flex flex-col gap-2 md:flex-1 w-[100%]">
                <Rate 
                    count={5} 
                     // eslint-disable-next-line
                    value={book?.rating as any}/>
            </div>  

            {/* <div className="md:flex-1 w-[100%]">
                <form action="" onSubmit={addNewReview}>
                    <div className="my-3">
                        <h1 className="font-bold">Write a Review</h1>
                    </div>
                    <div className="my-3">
                        <Rate count={5} value={rating} onChange={(value)=>setRating(value)}/>
                    </div>
                    <div className="my-3">
                        <Input.TextArea
                            placeholder="Write a Review about this book" 
                            style={{height: 200}} 
                            onChange={(e)=>{
                                setMessage(e.target.value)
                            }}
                            />
                    </div>

                    <div className="my-3">
                        <Input type="submit" value="Post Review" className="cursor-pointer" style={{background: "blue", color: "white", border:"none"}}/>
                    </div>

                </form>
            </div> */}
        </div>
    </section>

    </DashboardLayout>
  )
}

export default ViewBooks