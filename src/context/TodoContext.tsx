"use client";
import { assets } from "@/app/assets/assets";
import { StaticImageData } from "next/image";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type TodoStatus = "todo" | "inProgress" | "completed";

interface TodoIcon {
  message: string | StaticImageData;
  share: string | StaticImageData;
}

export interface TodoItem {
  id: number;
  title: string;
  about: string;
  progress: string;
  progressPercent: number;
  date: string;
  color: string;
  messageCount: number;
  shareCount: number;
  image?: string | StaticImageData;
  icons?: TodoIcon[];
  status: TodoStatus;
}

interface TodoContextType {
  todos: TodoItem[];
  addTodo: (task: TodoItem) => void;
  moveToProgress: (id: number) => void;
  markAsCompleted: (id: number) => void;
  deleteTodo: (id: number) => void;
  addNewTask: boolean;
  setAddNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [addNewTask, setAddNewTask] = useState(false);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  console.log(addNewTask);

  const handleProgressPercent = (value: number) => {
    return value * 100;
  };
  useEffect(() => {
    const stored = localStorage.getItem("todos");
    const defaultTodos: TodoItem[] = [
      {
        id: 1,
        title: "Design new ui presentation",
        about: "Dribble Marketing",
        progress: "5/10",
        progressPercent: handleProgressPercent(5 / 10),
        date: "24 Aug 2022",
        color: "#FFA048",
        messageCount: 7,
        shareCount: 2,
        icons: [
          {
            message: assets.message,
            share: assets.share,
          },
        ],
        status: "todo",
      },
      {
        id: 2,
        title: "Design new ui presentation",
        about: "Dribble Marketing",
        progress: "4/10",
        progressPercent: handleProgressPercent(4 / 10),
        date: "24 Aug 2022",
        messageCount: 7,
        shareCount: 2,
        color: "#FF7979",
        image: assets.groupPicture,
        status: "inProgress",
      },
      {
        id: 3,
        title: "Design new ui presentation",
        about: "Dribble Marketing",
        progress: "10/ 10",
        progressPercent: handleProgressPercent(10 / 10),
        date: "24 Aug 2022",
        messageCount: 7,
        shareCount: 2,
        color: "#78D700",
        image: assets.groupPicture,
        status: "completed",
      },
      {
        id: 4,
        title: "Design new ui presentation",
        about: "Dribble Marketing",
        progress: "3/ 10",
        progressPercent: handleProgressPercent(3 / 10),
        date: "24 Aug 2022",
        color: "#FFA048",
        messageCount: 7,
        shareCount: 2,

        icons: [
          {
            message: assets.message,
            share: assets.share,
          },
        ],
        status: "todo",
      },
    ];
    if (stored) setTodos(JSON.parse(stored));
    else {
      setTodos(defaultTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (
    task: Omit<
      TodoItem,
      | "id"
      | "progress"
      | "progressPercent"
      | "date"
      | "messageCount"
      | "shareCount"
      | "color"
    >
  ) => {
    const newTodo: TodoItem = {
      id: Date.now(),
      title: task.title,
      about: task.about || "No description",
      progress: "0/10",
      progressPercent: 0,
      date: new Date().toLocaleDateString(),
      color: "#FFA048",
      messageCount: 0,
      shareCount: 0,
      status: task.status || "todo",
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const moveToProgress = (id: number) =>
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "inProgress",
              color: "#FF7979",
              progress: "5/10",
              progressPercent: handleProgressPercent(5 / 10),
            }
          : t
      )
    );

  const markAsCompleted = (id: number) =>
    setTodos((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              status: "completed",
              color: "#78D700",
              progress: "10/10",
              progressPercent: handleProgressPercent(10 / 10),
            }
          : t
      )
    );

  const deleteTodo = (id: number) =>
    setTodos((prev) => prev.filter((t) => t.id !== id));

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        moveToProgress,
        addNewTask,
        setAddNewTask,
        markAsCompleted,
        deleteTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) throw new Error("useTodo must be used within TodoProvider");
  return context;
};
