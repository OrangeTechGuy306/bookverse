import DashboardLayout from "@/components/custom/_layout";
import { API_URL } from "@/lib/server";
import { Avatar, Button, Input, Modal, Select, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { IoMdPersonAdd } from "react-icons/io"
import { MdOutlinePhotoCameraFront } from "react-icons/md"
import { toast } from "sonner";



export interface adminInfoType {
    image_url?: string;
    username?: string;
    email?: string;
    _id?: number;
    admin_type?: string;
}


const AdminsPage = () => {


    const [open, setOpen] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [admin_type, setType] = useState("");
    const [image, setImage] = useState();
    const [admins, setAdmins] = useState<adminInfoType[]>();





    const openModal = () => {
        setOpen(true);
    };


    const columns = [
        {
            title: "S/NO",
            dataIndex: "no",
            key: "no",
        },
        {
            title: "Passport",
            dataIndex: "passport",
            key: "passport",
        },
        {
            title: "Username",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Admin Type",
            dataIndex: "type",
            key: "type",
        },
        {
            title: "View",
            dataIndex: "view",
            key: "view",
        },
        {
            title: "Action",
            dataIndex: "action",
            key: "action",
        },
    ];

    //eslint-disable-next-line
    const newAdmin = async (e: any) => {
        e.preventDefault();

        const formData = new FormData()

        formData.append("username", username)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("admin_type", admin_type)
        //eslint-disable-next-line
        formData.append("image", image as any)

        console.log(image)


        const { data } = await axios.post(`${API_URL}/new/admin`, formData, {
            headers: {
                "Authorization": "Bearer",
                "Content-Type": "multipart/form-data"
            }

        })
        toast.success(data.message)
        // await createAdmin(username, password, email, conPass, admin_type, image);
        // getAuthAdmins();
        // setOpen(false)
    };

    const getAllAdmins = async () => {

        const { data } = await axios.get(`${API_URL}/admins`, {
            headers: {
                "Authorization": "Bearer",
            }
        })
        console.log(data)
        setAdmins(data.user)
    };

    const deleteAdmin = async (id: string) => {

        const { data } = await axios.delete(`${API_URL}/admin/${id}`, {
            headers: {
                "Authorization": "Bearer",
            }
        })
        toast.success(data.message)
        getAllAdmins()
    };

    useEffect(() => {
        getAllAdmins()
    }, [])

    return (
        <DashboardLayout>

            <div className="h-[86vh] overflow-y-scroll ">

                <div className="mb-5">
                    <h1 className="font-bold text-3xl text-slate-400">Admin</h1>
                </div>

                <div className="my-5 flex justify-end items-center  ">
                    {/* <div className="flex items-center gap-5 flex-wrap">
          <form
            action=""
            className="flex items-center gap-2"
            // onSubmit={filterAdmin}
          >
            <Select
              className="w-[200px]"
              placeholder={"Click to Filter By: Categories"}
              options={filterData}
              defaultValue={"Date"}
              onChange={(value) => setFilter(value)}
            />
            <button
              type="submit"
              className="py-1 px-4 rounded-md bg-primary text-white"
            >
              filter
            </button>
          </form>
          <form action="" className="flex items-center gap-2">
            <Input
              type="search"
              placeholder="Search Executives..."
              className="w-[300px]"
            />
            <input
              type="submit"
              className="py-1 px-4 rounded-md bg-primary text-white"
              value={"Search"}
            />
          </form>
        </div> */}
                    <div>
                        <Button
                            className="bg-primary text-white flex items-center"
                            onClick={openModal}
                        >
                            <IoMdPersonAdd /> <span>New Admin</span>{" "}
                        </Button>
                        <Modal open={open} onCancel={() => setOpen(false)} footer={null}>
                            <form action="" onSubmit={newAdmin}>
                                <div className="my-5">
                                    <h1 className="text-xl text-slate-300">Create New Admin </h1>
                                </div>
                                {image ? (
                                    <div className="my-3 flex flex-col">
                                        <label
                                            htmlFor="passport"
                                            className=" w-[150px] overflow-hidden h-[150px] bg-slate-50 rounded-xl flex justify-center flex-col gap-2 items-center cursor-pointer"
                                        >
                                            <img src={URL.createObjectURL(image)} alt="" />
                                        </label>
                                        <input
                                            type="file"
                                            placeholder="Member Fullname"
                                            className="hidden"
                                            id="passport"
                                            //eslint-disable-next-line
                                            onChange={(e: any) => {
                                                setImage(e.target.files[0]);
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div className="my-3 flex flex-col justify-center">
                                        <label
                                            htmlFor="passport"
                                            className=" w-[150px] overflow-hidden h-[150px] bg-slate-50 rounded-xl flex justify-center flex-col gap-2 items-center cursor-pointer"
                                        >
                                            <MdOutlinePhotoCameraFront
                                                size={50}
                                                className="text-slate-400"
                                            />
                                            <span className="text-slate-400">Upload Passport</span>
                                        </label>
                                        <input
                                            type="file"
                                            placeholder="Member Fullname"
                                            className="hidden"
                                            id="passport"
                                            //eslint-disable-next-line
                                            onChange={(e: any) => {
                                                setImage(e.target.files[0]);
                                            }}
                                        />
                                    </div>
                                )}
                                <div className="my-3">
                                    <label htmlFor="">Username</label>
                                    <Input
                                        type="text"
                                        placeholder="Admin Username"
                                        className=""
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                                <div className="my-3">
                                    <label htmlFor="">Email</label>
                                    <Input
                                        type="email"
                                        placeholder="Admin Email"
                                        className=""
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="my-3">
                                    <label htmlFor="">Password</label>
                                    <Input
                                        type="password"
                                        placeholder="Admin Password"
                                        className=""
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="my-3">
                                    <label htmlFor="">Admin Type</label> <br />
                                    <Select
                                        className="w-[100%]"
                                        placeholder={"Select the Admin Type"}
                                        options={[
                                            { value: "admin", label: "Admin" },
                                            { value: "super_admin", label: "Super Admin" },
                                            { value: "master_admin", label: "Master Admin" },
                                        ]}
                                        defaultValue={"Select Admin Type"}
                                        onChange={(value) => setType(value)}
                                    />
                                </div>
                                <div className="my-3">
                                    <input
                                        type="submit"
                                        value={"Create New Admin"}
                                        className="bg-primary text-white py-2 px-4 rounded-xl cursor-pointer"
                                    />
                                </div>
                            </form>
                        </Modal>
                    </div>
                </div>
                {/* ADMINS TABLE */}
                <div className="my-10">

                    <Table
                        dataSource={admins?.map((d: adminInfoType, i) => (
                            {
                                key: i + 1,
                                no: i + 1,
                                name: d.username,
                                passport: (
                                    <Avatar src={`http://localhost:5000/uploads/${d.image_url}`} />
                                ),
                                email: d.email,
                                action: (
                                    <>
                                        <Button
                                            className={`bg-red-500 text-white px-2 rounded-md`}
                                            onClick={() => {
                                                //eslint-disable-next-line
                                                deleteAdmin(d._id as any);
                                            }}
                                        >
                                            <FaTrash />
                                        </Button>

                                    </>
                                ),
                                type: <button
                                    className={`bg-green-500 text-white px-2 rounded-md`}
                                >
                                    {d.admin_type}
                                </button>
                            }
                        ))}
                        columns={columns}
                    />



                </div>
            </div>
        </DashboardLayout>
    )
}

export default AdminsPage