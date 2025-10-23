"use client";
import { assets } from "@/app/assets/assets";
import Image, { StaticImageData } from "next/image";
import React, { useState } from "react";
import ProgressBar from "./ProgressIndicator";
import { TodoItem, useTodo } from "@/context/TodoContext";
import { Button } from "./ui/button";

import dynamic from "next/dynamic";
import { TaskCube } from "./TaskCube";
import { ClientOnly } from "./ThreeJsWrapper";

interface TodoIcon {
  message: string | StaticImageData;
  share: string | StaticImageData;
}

interface TodoCardProps {
  todo: TodoItem[] | undefined;
}
function addAlpha(hex: string, alpha: number) {
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0")
    .toUpperCase();
  return `${hex}${a}`;
}

const TodoCard: React.FC<TodoCardProps> = ({ todo }) => {
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);

  const { deleteTodo, moveToProgress, markAsCompleted } = useTodo();

  const toggleEdit = (id: number) => {
    setActiveTaskId((prevId) => (prevId === id ? null : id));
  };

  if (!todo || todo.length === 0) {
    return (
      <section className="flex items-center justify-center w-full h-32 text-gray-400 italic border rounded-lg dark:border-[#FFFFFF1A]">
        No tasks available.
      </section>
    );
  }
  return (
    <section className="grid max-w-[24rem] gap-4 p-4 ">
      {todo.map((task) => (
        <div
          className="flex flex-col dark:bg-[#FFFFFF1A]  border-2 rounded-lg p-2 "
          key={task.id}
        >
          <div className="flex items-center relative justify-between">
            <h3 className="font-semibold text-sm">{task.title}</h3>
            <Image
              src={assets.moreIcon}
              alt="more"
              className="w-4 h-4 cursor-pointer"
              onClick={() => toggleEdit(task.id)}
            />

            {activeTaskId === task.id && (
              <div className="absolute -top-20 -right-4 flex justify-baseline flex-col gap-1">
                {task.status === "todo" && (
                  <Button
                    onClick={() => moveToProgress(task.id)}
                    className="text-xs cursor-pointer text-white font-semibold rounded-sm py-1 px-2 bg-[#FFA048] hover:bg-[#FFA048]/90 transition-all duration-200 ease-in-out"
                  >
                    In Progress
                  </Button>
                )}

                {task.status != "completed" && (
                  <Button
                    onClick={() => markAsCompleted(task.id)}
                    className="text-xs cursor-pointer text-white font-semibold rounded-sm py-1 px-2 bg-[#78D700] hover:bg-[#78D700]/90 transition-all duration-200 ease-in-out"
                  >
                    Completed
                  </Button>
                )}
                <Button
                  onClick={() => deleteTodo(task.id)}
                  className="text-xs text-white font-semibold rounded-sm py-1 px-2 bg-red-900 hover:bg-red-900/90 transition-all duration-200 ease-in-out cursor-pointer"
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
          <p className="p-0 m-0 text-xs dark:text-[#FFFFFF80]">{task.about}</p>
          <div className="flex items-center my-3 justify-between">
            <span className="flex items-center dark:text-[#FFFFFF80] gap-1 text-xs font-bold ">
              <Image
                src={assets.progressIcon}
                alt="progress"
                className="w-4 h-4"
              />
              Progress
            </span>
            <p className="text-xs font-semibold text-[#1C1D22] dark:text-[#FFFFFF80] ">
              {task.progress}
            </p>
          </div>
          <ProgressBar percentage={task.progressPercent} color={task.color} />

          <ClientOnly>
            <TaskCube completedTasks={task.progressPercent} />
          </ClientOnly>

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
                      className="w-4 h-4 "
                    />
                    <span className="text-xs dark:text-[#FFFFFF80] ">
                      {task.shareCount}
                    </span>
                  </div>
                )}
              </aside>
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default TodoCard;
