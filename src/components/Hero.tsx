"use client"
import React from "react";
import HeroNavBar from "./HeroNavBar";
import Todo from "./Todo";
import InProgress from "./InProgress";
import CompletedTask from "./CompletedTask";
import NewTask from "./NewTask";
import { useTodo } from "@/context/TodoContext";


const Hero = () => {
  const { todos } = useTodo();
  

  return (
    <main className="relative">
       
      <HeroNavBar />
    
        <section className="grid lg:grid-cols-3 gap-4 grid-cols-1 px-8 sm:grid-cols-2 relative z-10 ">
          <Todo />
          <InProgress />
          <CompletedTask />
          <NewTask />
        </section>
      
    </main>
  );
};

export default Hero;
