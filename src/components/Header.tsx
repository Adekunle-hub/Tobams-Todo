import React from "react";
import { Search } from "lucide-react";
import { Bell } from "lucide-react";
import { FormatDate } from "./FormatDate";
import Image from "next/image";
import { assets } from "@/app/assets/assets";

const Header = () => {
  return (
    <nav className="flex items-center px-4 md:px-8 w-full py-1 md:p-4 justify-between">
      <h1 className="text-foreground text-sm  md:text-base  font-semibold">Welcome AbdulMujeeb 👋</h1>
      <div className="flex items-center gap-4">
        <Search className="w-5 h-5 hidden md:block" />
        <div className="relative hidden md:block">
          <Bell className="w-5 h-5" />
          <div className="w-2 h-2 absolute right-0.5 top-0 rounded-full bg-[#FFA048]"></div>
        </div>

        <div className="hidden md:block">
          <FormatDate />
        </div>

        <Image src={assets.profile} alt="profile" width={40} height={40} />
      </div>
    </nav>
  );
};

export default Header;
