"use client";
import { assets } from "@/app/assets/assets";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const HeroNavBar = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) return null;
  return (
    <nav className="flex mx-4 py-2 border-b-2  items-center justify-between">
      <section className="flex items-center gap-6">
        <div className="flex items-center gap-1 ">
          <Image
            className="md:w-5 w-3 h-3 md:h-5 text-white"
            src={theme === "light" ? assets.hamburger : assets.hamburgerWhite}
            alt="hamburger"
          />
          <h4 className="cursor-pointer text-sm md:text-base ">Board View</h4>
        </div>
        <div className=" hidden md:flex cursor-pointer items-center dark:text-[#FFFFFF80] gap-2  font-medium text-[#1C1D2280] ">
          <Image
            className="w-4 h-4 p-1 rounded-full dark:bg-[#FFFFFF1A] bg-[#1C1D2214]"
            src={assets.plusIcon}
            alt="add"
          />
          <h4>Add view</h4>
        </div>
      </section>
      <section className="flex items-center gap-3">
        <h4 className="text-sm font-semibold">Filter</h4>
        <Button className="bg-transparent font-semibold hover:bg-transparent dark:text-[#FFFFFF80] px-2 text-[#1C1D2280] py-1">
          Sort
        </Button>
        <Image src={assets.moreIcon} alt="more" className="w-5 hidden md:block h-5" />
        <Button className="bg-[#1C1D22] hidden md:block text-[10px] cursor-pointer font-semibold rounded-2xl py-1 px-3 dark:bg-[#4B69FF] text-[#FFFFFF]">
          New Template
        </Button>
      </section>
    </nav>
  );
};

export default HeroNavBar;
