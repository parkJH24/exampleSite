"use client"

import Curriculum from "@/components/curriculum";
import VisualTextWrapper from "@/components/VisualTextWrapper";

export default function Home() {
  return (
    <div className="w-full h-screen bg-[#bffeff]">
      {/* Page Active Section */}
      {/* <LineAnimation/> */}
      <VisualTextWrapper/>
      <div className="mt-[80rem] relative z-11 bg-white h-[100vh]">
        <Curriculum />
      </div>



    </div>

  );
}

