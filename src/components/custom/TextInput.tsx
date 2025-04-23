import {Input} from "antd"
// import React from "react";

interface InputProps{
    label?: string;
    type?: string;
    // type: React.InputHTMLAttributes<HTMLInputElement>;
    onChange?: ()=>null ;
    placeholder?: string;
    style?: string;
}

const TextInput = ({label, type, onChange, placeholder, style}: InputProps) => {
  return (
    <div className='flex flex-col gap-2'>
        <label htmlFor="">{label}</label>
        <div className={style}>
            <Input type={type} onChange={onChange} placeholder={placeholder}/>
        </div>
    </div>
  )
}

export default TextInput