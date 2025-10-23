
"use client"
import { assets } from "@/app/assets/assets";
import Image, { StaticImageData } from "next/image";
import React from "react";

import TodoCard from "./TodoCard";

import { TodoItem, useTodo } from "@/context/TodoContext";



const Todo = () => {
  const {todos, setAddNewTask} = useTodo()
  const todoTask  = todos.filter((task:TodoItem)=> task.status === "inProgress")

  return(
    <main className="flex  border-dashed border-[#1C1D2214] border-2  flex-col dark:bg-[#24262C] my-4 rounded-lg">
        <div className="flex items-center justify-between pb-1 pt-2 px-4">
          <h5 className="text-xs font-semibold dark:text-[#FFFFFF80] text-[#1C1D2280]" >In Progress ({todoTask.length})</h5>
          <div onClick={()=>setAddNewTask(true)} className="flex cursor-pointer items-center gap-1">
           <Image src={assets.plusIcon} alt="more" className="w-4  p-1 bg-[#1C1D2214] dark:bg-[#FFFFFF1A] rounded-full h-4"/>
           <h4 className="text-xs dark:text-[#FFFFFF] text-[#1C1D22] font-semibold">Add more task</h4>
          </div>
        </div>
       <TodoCard todo={todoTask} />
    </main>
  )
};

export default Todo;

