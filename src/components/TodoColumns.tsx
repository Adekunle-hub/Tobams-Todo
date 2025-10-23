"use client";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableTodoCard from "./TodoCard";
import { TodoItem } from "@/context/TodoContext";
import Image from "next/image";
import { assets } from "@/app/assets/assets";

interface TodoColumnsProps {
  id: string;
  title: string;
  todos: TodoItem[];
  onAddTask?: () => void;
}

const TodoColumns: React.FC<TodoColumnsProps> = ({
  id,
  title,
  todos,
  onAddTask,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col border-dashed border-2 border-[#1C1D2214] rounded-lg p-2 transition-colors ${
        isOver ? "bg-blue-50 dark:bg-blue-900/20 border-blue-400" : ""
      }`}
    >
      <div className="flex items-center justify-between pb-1 px-2">
        <h5 className="text-xs font-semibold dark:text-[#FFFFFF80]">
          {title} ({todos.length})
        </h5>
        {onAddTask && (
          <div
            onClick={onAddTask}
            className="flex text-[#1C1D22] font-semibold dark:text-[#FFFFFF] cursor-pointer text-[10px] items-center gap-1"
          >
            <Image
              src={assets.plusIcon}
              alt="add"
              className="w-4 h-4 p-1  bg-[#1C1D2214]  rounded-full"
            />
            Add new task
          </div>
        )}
      </div>

      <div className="px-2 py-2 min-h-[100px]">
        <SortableContext
          items={todos.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {todos.map((task) => (
            <DraggableTodoCard key={task.id} task={task} />
          ))}
        </SortableContext>
        {todos.length === 0 && (
          <p className="text-center text-xs text-gray-400 py-4">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default TodoColumns;
