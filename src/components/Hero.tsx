"use client";
import React from "react";
import HeroNavBar from "./HeroNavBar";


import NewTask from "./NewTask";
import { useTodo } from "@/context/TodoContext";

import TodoBoard from "./TodoBoard";

const Hero = () => {
  const { todos } = useTodo();

  return (
    <main className="relative">
      <HeroNavBar />

      <section>
        
        <TodoBoard/>
        <NewTask />
      </section>
    </main>
  );
};

export default Hero;
