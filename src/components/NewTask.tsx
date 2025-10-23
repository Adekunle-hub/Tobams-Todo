"use client";

import { useState } from "react";
import { useTodo } from "@/context/TodoContext";
import { assets } from "@/app/assets/assets";

export default function NewTask() {
  const { addTodo, todos, addNewTask, setAddNewTask } = useTodo();
  const previousTasks = todos.filter(
    (previousTodos) => previousTodos.status === "todo"
  );

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return alert("Please enter a task title.");

    const newTask = {
      id: todos.length + 1,
      title,
      about: description || "No description provided",
      progress: "0/10",
      progressPercent: 0,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      color: "#FFA048",
      
      messageCount: 0,
      shareCount: 0,
      image:assets.groupPicture,
      status: status as "todo" ,
    };
    addTodo(newTask);
    setTitle("");
    setDescription("");
    setStatus("todo");
    setAddNewTask(!addNewTask);
  };

  return (
    <>
      {addNewTask && (
        <div className="fixed inset-0 flex px-4 items-center justify-center bg-black/50 z-9999">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 p-6 bg-white dark:bg-[#1C1D22] shadow-2xl rounded-xl w-full max-w-md relative"
          >
            <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
              Add New Task
            </h2>

            <input
              type="text"
              placeholder="Task Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none"
            />

            <textarea
              placeholder="Task Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none"
            />

            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="p-2 rounded border border-gray-300 dark:border-gray-700 bg-transparent focus:outline-none"
            >
              <option value="todo">To Do</option>
             
            </select>

            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Add Task
            </button>

            <button
              onClick={()=> setAddNewTask(false)}
              type="button"
              className="absolute top-2 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 text-lg"
            >
              ✕
            </button>
          </form>
        </div>
      )}
    </>
  );
}
