import { Table } from 'antd'


const SortByDate = () => {

    const columns = [
        {
            title: "S/NO",
            dataIndex: "serialNo",
            key: "serialNo"
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
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile"
        },
        {
            title: "Create Date",
            dataIndex: "date",
            key: "date"
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

export default SortByDate