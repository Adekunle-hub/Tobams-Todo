import { assets } from "@/app/assets/assets";
import Image from "next/image";
import React from "react";

const SideIcons = () => {
  return (
    <section className="w-14 bg-[#1C1D22] min-h-full flex flex-col  items-center py-4 justify-between">
      <div className="flex flex-col gap-8">
        <Image src={assets.dots} alt="dots" width={26} height={4} />
        <Image src={assets.logo} alt="logo" width={17} height={17} />
        <Image src={assets.items} alt="items" width={32} height={20} />
      </div>

      <div>
        <Image src={assets.icon} alt="icon" width={20} height={20} />
      </div>
    </section>
  );
};

export default SideIcons;
