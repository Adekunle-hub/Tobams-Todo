"use client";
import { DndContext, DragOverlay, closestCorners, PointerSensor, useSensor, useSensors, DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useState } from "react";
import { useTodo } from "@/context/TodoContext";
import DraggableTodoCard from "./TodoCard";

import TodoColumns from "./TodoColumns";

export default function TodoBoard() {
  const { todos, updateTodoStatus, reorderTodos, setAddNewTask } = useTodo();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const todoTasks = todos.filter(t => t.status === "todo");
  const inProgressTasks = todos.filter(t => t.status === "inProgress");
  const doneTasks = todos.filter(t => t.status === "completed");

  const findContainer = (id: string) => {
    if (todoTasks.find(t => t.id === +id)) return "todo";
    if (inProgressTasks.find(t => t.id === +id)) return "inProgress";
    if (doneTasks.find(t => t.id === +id)) return "completed";
    return id as "todo" | "inProgress" | "completed";
  };

  const handleDragStart = (event: DragStartEvent) => setActiveId(event.active.id as string);

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;
    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);
    if (activeContainer !== overContainer) updateTodoStatus(+active.id, overContainer);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    const activeContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (activeContainer === overContainer) {
      const containerTasks = todos.filter(t => t.status === activeContainer);
      const oldIndex = containerTasks.findIndex(t => t.id === +active.id);
      const newIndex = containerTasks.findIndex(t => t.id === +over.id);

      if (oldIndex !== newIndex) {
        const reordered = arrayMove(containerTasks, oldIndex, newIndex);
        const otherTasks = todos.filter(t => t.status !== activeContainer);
        reorderTodos([...otherTasks, ...reordered]);
      }
    }

    setActiveId(null);
  };

  const activeTodo = todos.find(t => t.id === +activeId!);

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        <TodoColumns id="todo" title="To Do" todos={todoTasks} onAddTask={() => setAddNewTask(true)} />
        <TodoColumns id="inProgress" title="In Progress" todos={inProgressTasks}  />
        <TodoColumns id="completed" title="Completed" todos={doneTasks} />
      </div>

      <DragOverlay>
        {activeTodo && <DraggableTodoCard task={activeTodo} />}
      </DragOverlay>
    </DndContext>
  );
}
