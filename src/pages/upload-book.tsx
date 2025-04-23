import DashboardLayout from '@/components/custom/_layout'
import { DatePicker, Input, Select } from 'antd';
import { useState } from 'react';
import { GiBookCover } from "react-icons/gi";
import { BookProps } from './books';
import { toast } from 'sonner';
import axios from 'axios';
import { API_URL } from '@/lib/server';


const UploadBookPage = () => {

  const [cover, setCover] = useState<Blob>()
  const [fileType, setFileType] = useState<Blob>()
  const [file, setFile] = useState<Blob>()


  const [book, setBook] = useState<BookProps>({
    title: "",
    author: "",
    description: "",
    category: "",
    coverUrl: "",
    format: "",
    file: "",
    isbn: "",
    publishDate: "",
    pages: "",
    language: "",
    publisher: ""
  })


  // eslint-disable-next-line
  const createNewBook = async(e:any)=>{
    e.preventDefault()
    console.log({...book})
    try {
      
      const formData = new FormData()
      
      
      // eslint-disable-next-line
      formData.append("file-image", file as any)
      // eslint-disable-next-line
      formData.append("file-image", cover as any)
      // eslint-disable-next-line
      formData.append("title", book.title as any)
      // eslint-disable-next-line
      formData.append("author", book.author as any)
      // eslint-disable-next-line
      formData.append("description", book.description as any)
      // eslint-disable-next-line
      formData.append("category", book.category as any)
      // eslint-disable-next-line
      formData.append("isbn", book.isbn as any)
      // eslint-disable-next-line
      formData.append("pages", book.pages as any)
      // eslint-disable-next-line
      formData.append("language", book.language as any)
      // eslint-disable-next-line
      formData.append("publisher", book.publisher as any)
      // eslint-disable-next-line
      formData.append("publishDate", book.publishDate as any)
      // eslint-disable-next-line
      formData.append("format", book.format as any)

      const {data} = await axios.post(`${API_URL}/book`, formData, {
        headers:{
          "Content-Type": "multipart/form-data"
        }
      })
      // 
      toast.success(data.message)
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error.response.data.message)
    }
  }



  return (
    <DashboardLayout>
       <h1 className='text-2xl text-slate-400 mb-5'>Upload New Book</h1>
       
       <form action="" className='flex flex-col gap-4 bg-blur p-5' onSubmit={createNewBook}>
        {/* BOOK COVER UPLOAD */}

        <div>
          {
          cover ?  
          <div className='my-3 flex flex-col'>
              <label htmlFor="cover" className='w-[200px] h-[300px] bg-slate-100 flex flex-col justify-center items-center cursor-pointer text-slate-500 border-[.5px] border-slate-400 rounded-md overflow-hidden p-1'>
                  <img src={URL.createObjectURL(cover)} alt="" className='w-[100%]'/>
              </label>
              <input type="file" id='cover' className='hidden' onChange={(e)=>setCover(e.target.files[0])}/>
            </div>
            :
            <div className='my-3 flex flex-col'>
            <label htmlFor="cover" className='w-[200px] h-[300px] bg-slate-100 flex flex-col justify-center items-center cursor-pointer text-slate-500 border-[.5px] border-slate-400 rounded-md overflow-auto'>
                  <GiBookCover size={100}/>
                  <span className='text-xl font-bold'>Upload Book Cover</span>
            </label>
            <input type="file" id='cover' className='hidden' 
              onChange={(e)=>{
                // eslint-disable-next-line
                setCover( e.target.files[0] as any)
            }}/>
          </div>
            }
          
          <div className='my-3 flex flex-col'>
              <label htmlFor="media" className='w-[100%] py-2 px-4 bg-slate-100 flex flex-col justify-center items-center cursor-pointer text-slate-500 border-[.5px] border-slate-400 rounded-md overflow-hidden p-1'>
                  {file ? 
                  <span>{file?.name}</span>
                  :
                  <span>Pick file to upload</span>
                }
              </label>
              <input type="file" id='media' className='hidden' onChange={(e)=>setFile(e.target.files[0])}/>
            </div>
        </div>

        <div className=''>
          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">Book Title</label>
            <Input 
                type='text' 
                placeholder='Enter Book Title' 
                onChange={(e)=>setBook({...book, title: e.target.value})}
              />
          </div>
          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">Book Author Name</label>
            <Input 
            type='text'  
            placeholder='Enter Book Author'
            onChange={(e)=>setBook({...book, author: e.target.value})}
            />
          </div>
          <div className='my-3'>
          <label htmlFor="">Book Description</label>
            <Input.TextArea 
                style={{height: 200}}  
                // eslint-disable-next-line
                onChange={(e: any)=>{
                  setBook({...book, description: e.target.value})}}
                  />
          </div>

          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">Book Format</label>
            <Select placeholder={"Choose Book Format"} 
              options={[
                {label: "Ebook", value: "Ebook"},
                {label: "Audiobook", value: "Audiobook"},
              ]}
            
            // eslint-disable-next-line
            onChange={(value: any)=>setBook({...book, format: value})}
            />
          </div>

          <div className='my-3'>
              <label htmlFor="">Book ISBN</label>
            <Input 
              type='number' 
              placeholder='Enter ISBN'
              // eslint-disable-next-line
              onChange={(e: any)=>setBook({...book, isbn: e.target.value})}
              />
          </div>


          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">Publish Date</label>
            <DatePicker 
              // eslint-disable-next-line
              onChange={(_, value:any)=>setBook({...book, publishDate: value})}
              />
          </div>
          
          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">NO. of Book Pages</label>
            <Input 
                type='number'
                placeholder='Enter Book Pages'
                // eslint-disable-next-line
                onChange={(e: any)=>setBook({...book, pages:e.target.value})}
                />
          </div>

          {/* <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">Book Format</label>
            <Select placeholder={"Choose Book Format"} options={[
              {label: "Ebook", value: "Ebook"},
              {label: "Audiobook", value: "Audiobook"},
            ]}
            // eslint-disable-next-line
            onChange={(value:any)=>setBook({...book, format: value})}
            />
          </div> */}
          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">Book Language</label>
            <Select placeholder={"Choose Book Language"} options={[
              {label: "English", value: "English"},
              {label: "French", value: "French"},
              {label: "Italian", value: "Italian"},
              {label: "Greek", value: "Greek"},
              {label: "Arabic", value: "Arabic"},
              {label: "Spanish", value: "Spanish"},
            ]}
            // eslint-disable-next-line
            onChange={(value:any)=>setBook({...book, language: value})}
            />
          </div>
          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">Book Categories</label>
            <Select placeholder={"Choose Book Language"} options={[
              {label: "Fiction", value: "Fiction"},
              {label: "Action", value: "Action"},
              {label: "Dystopian", value: "Dystopian"},
              {label: "Drama", value: "Drama"},
              {label: "Scifi", value: "Scifi"},
              {label: "History", value: "History"},
            ]}
            // eslint-disable-next-line
              onChange={(e: any)=>setBook({...book, category:e})}
            />
          </div>

          <div className='my-3 flex flex-col gap-2'>
            <label htmlFor="">Book Publisher</label>
            <Input 
                type='text'
                placeholder='Enter Book Publisher'
                // eslint-disable-next-line
                onChange={(e: any)=>setBook({...book, publisher:e.target.value})}
                />
          </div>

          <div className='flex justify-end items-center mb-10'>
            <Input type='submit' value={"Add new book"} style={{width: "max-content", backgroundColor:"blue", color: "white", border:"none"}}/>
          </div>

        </div>
          
      
       </form>
    </DashboardLayout>
  )
}

export default UploadBookPage