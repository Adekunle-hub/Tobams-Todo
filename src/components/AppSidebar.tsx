// components/app-sidebar.tsx
"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Accordion, AccordionItem, AccordionTrigger } from "./ui/accordion";

import Image from "next/image";
import { assets } from "@/app/assets/assets";
import { AccordionContent } from "@radix-ui/react-accordion";
import { useEffect, useMemo, useState } from "react";

import { ThemeToggle } from "./ThemeToggle";
import Link from "next/link";
import { useTodo } from "@/context/TodoContext";

export function AppSidebar() {
  const { todos } = useTodo();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const projectsData = useMemo(
    () => [
      `All Projects(${todos.length})`,
      "Design System",
      "User flow",
      "Ux research",
    ],
    [todos.length]
  );
  const tasksData = useMemo(() => {
    const todoCount = todos.filter((t) => t.status === "todo").length;
    const inProgressCount = todos.filter(
      (t) => t.status === "inProgress"
    ).length;
    const completedCount = todos.filter((t) => t.status === "completed").length;
    return [
      `All Tasks(${todos.length})`,
      `To do(${todoCount})`,
      `In progress(${inProgressCount})`,
      `Done(${completedCount})`,
    ];
  }, [todos.length]);

  return (
    <>
      <Sidebar
        className="h-screen flex flex-col justify-between"
        collapsible="icon"
        variant={isMobile ? "floating" : "sidebar"}
      >
        <SidebarContent className="flex-1  ">
          <SidebarGroup>
            <SidebarGroupLabel className="text-foreground flex items-center justify-between font-bold text-[1.5rem]">
              Projects
              <div className="bg-[#1C1D2214] dark:bg-[#FFFFFF14] p-1 rounded-full">
                <Image src={assets.plusIcon} alt="add" width={8} height={8} />
              </div>
            </SidebarGroupLabel>

            <div className="flex items-center my-5 px-2 justify-between">
              <a className="text-[#1C1D2280] dark:text-[#FFFFFF80] font-semibold text-sm">
                Team
              </a>
              <Image
                width={4}
                height={4}
                src={assets.leftArrow}
                alt="left"
                className=""
              />
            </div>

            <SidebarMenu>
              <SidebarMenuItem>
                <Accordion type="single" collapsible className="w-full mt-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="pl-2 font-bold text-sm">
                      Projects
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      {projectsData.map((project, index) => (
                        <SidebarMenuButton key={index} asChild>
                          <Link
                            href={`/projects/#`}
                            className="block py-1 dark:text-[#FFFFFF80] hover:underline font-semibold text-xs text-[#1C1D2280]"
                          >
                            {project}
                          </Link>
                        </SidebarMenuButton>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <Accordion type="single" collapsible className="w-full mt-1">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="pl-2 font-bold text-sm">
                      Tasks
                    </AccordionTrigger>
                    <AccordionContent className="pl-8">
                      {tasksData.map((project, index) => (
                        <SidebarMenuButton key={index} asChild>
                          <Link
                            href={`/projects/#`}
                            className="block py-1 w-fit dark:text-[#FFFFFF80] hover:underline font-semibold text-[#1C1D2280] text-xs"
                          >
                            {project}
                          </Link>
                        </SidebarMenuButton>
                      ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={`/reminders`}
                    className="block py-1 dark:text-[#FFFFFF80] text-xs font-semibold text-[#1C1D2280] hover:underline"
                  >
                    Reminders
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Link
                    href={`/messengers`}
                    className="block py-1  text-[#1C1D2280] dark:text-[#FFFFFF80] text-xs font-semibold hover:underline"
                  >
                    Messengers
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarFooter className="transition-all z-50  mt-auto duration-300 ease-in-out">
            <ThemeToggle />
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
    </>
  );
}
