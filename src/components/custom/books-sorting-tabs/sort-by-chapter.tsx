import { Table } from 'antd'


const SortByBookChapter = () => {

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

  return (
    <div>
        <Table columns={columns} />
    </div>
  )
}

export default SortByBookChapter