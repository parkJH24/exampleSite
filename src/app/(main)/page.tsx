"use client"
import LineAnimation from "@/components/animations/LineAnimation";
import Curriculum from "@/components/curriculum";
import VisualTextWrapper from "@/components/VisualTextWrapper";
import Image from "next/image";
import styled from "styled-components";

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

