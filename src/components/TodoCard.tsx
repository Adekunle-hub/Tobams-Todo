"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import { assets } from "@/app/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import ProgressBar from "./ProgressIndicator";
import { TodoItem, useTodo } from "@/context/TodoContext";

import dynamic from "next/dynamic";
const TaskStar = dynamic(() => import("./TaskStar"), { ssr: false });
import { ClientOnly } from "./ThreeJsWrapper";

function addAlpha(hex: string, alpha: number) {
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return `${hex}${a}`;
}

interface TodoCardProps {
  task: TodoItem;
}

const TodoCard: React.FC<TodoCardProps> = ({ task }) => {
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const { deleteTodo, moveToProgress, markAsCompleted } = useTodo();

  const toggleEdit = () => {
    setActiveTaskId((prev) => (prev === task.id ? null : task.id));
  };

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-[#33353D] rounded-lg  mb-1 cursor-grab active:cursor-grabbing border  border-transparent hover:border-blue-300 dark:hover:border-blue-600 transition-all"
    >
      <div className="relative flex flex-col dark:bg-[#FFFFFF1A] border-2 rounded-lg p-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">{task.title}</h3>
          <Image
            src={assets.moreIcon}
            alt="more"
            className="w-4 h-4 cursor-pointer"
            onClick={toggleEdit}
          />
        </div>

        <div
          className={`
            ${task.status === "completed" || "inProgress" ? "-top-12" : "-top-20"}
             

            task-item absolute  -right-8`}
        >
          {activeTaskId === task.id && (
            <div className="flex flex-col gap-2 animate-stagger-buttons">
              {task.status === "todo" && (
                <button
                  onClick={() => moveToProgress(task.id)}
                  className="text-xs cursor-pointer text-white font-semibold rounded-sm py-1 px-2 bg-[#FFA048] hover:bg-[#FFA048]/90 transition-all duration-200 ease-in-out opacity-0 animate-slide-up [--stagger-delay:0ms]"
                >
                  In Progress
                </button>
              )}

              {task.status !== "completed" && (
                <button
                  onClick={() => markAsCompleted(task.id)}
                  className="text-xs cursor-pointer text-white font-semibold rounded-sm py-1 px-2 bg-[#78D700] hover:bg-[#78D700]/90 transition-all duration-200 ease-in-out opacity-0 animate-slide-up [--stagger-delay:100ms]"
                >
                  Completed
                </button>
              )}

              <button
                onClick={() => deleteTodo(task.id)}
                className="text-xs text-white font-semibold rounded-sm py-1 px-2 bg-red-900 hover:bg-red-900/90 transition-all duration-200 ease-in-out cursor-pointer opacity-0 animate-slide-up [--stagger-delay:200ms]"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <p className="p-0 m-0 text-xs dark:text-[#FFFFFF80]">{task.about}</p>

        <div className="flex items-center my-3 justify-between">
          <span className="flex items-center dark:text-[#FFFFFF80] gap-1 text-xs font-bold">
            <Image
              src={assets.progressIcon}
              alt="progress"
              className="w-4 h-4"
            />
            Progress
          </span>
          <p className="text-xs font-semibold text-[#1C1D22] dark:text-[#FFFFFF80]">
            {task.progress}
          </p>
        </div>

        <ProgressBar percentage={task.progressPercent} color={task.color} />

        {task.status === "completed" && (
          <ClientOnly>
            <TaskStar completedTasks={task.progressPercent} />
          </ClientOnly>
        )}

        <div className="flex items-center justify-between my-3">
          <span
            style={{
              backgroundColor: addAlpha(task.color, 0.1),
              color: task.color,
            }}
            className="text-[10px] font-bold py-1 px-2 rounded-lg"
          >
            {task.date}
          </span>
          {task.image && (
            <Image src={task.image} alt="users" width={60} height={60} />
          )}

          {(task.icons?.[0]?.message || task.icons?.[0]?.share) && (
            <aside className="flex gap-1">
              {task.icons?.[0]?.message && (
                <div className="flex items-center gap-1">
                  <Image
                    src={task.icons[0].message}
                    alt="message"
                    className="w-3 h-3"
                  />
                  <span className="text-xs dark:text-[#FFFFFF80]">
                    {task.messageCount}
                  </span>
                </div>
              )}
              {task.icons?.[0]?.share && (
                <div className="flex items-center gap-1">
                  <Image
                    src={task.icons[0].share}
                    alt="share"
                    className="w-4 h-4"
                  />
                  <span className="text-xs dark:text-[#FFFFFF80]">
                    {task.shareCount}
                  </span>
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
