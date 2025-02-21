"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Example = {
  id: number;
  title: string;
  category: string;
  subCategory?: string;
  link: string;
  thumbnail?: string;
};

type TabContentProps = {
  activeCategory: string;
  activeSubCategory?: string; // ✅ subCategory 추가
};

export default function CloneTabContent({ activeCategory, activeSubCategory }: TabContentProps) {
  const [examples, setExamples] = useState<Example[]>([]);
  const [filteredExamples, setFilteredExamples] = useState<Example[]>([]);

  // 📌 JSON 데이터 불러오기
  useEffect(() => {
    fetch("/data/examples.json")
      .then((res) => res.json())
      .then((data: Example[]) => {
        console.log(data)
        setExamples(data)})
      .catch((error) => console.error("예제 데이터를 불러오는 중 오류 발생:", error));
  }, []);

  // 📌 카테고리 및 서브카테고리 필터링
  useEffect(() => {
    if (activeCategory === "Clone") {
      // ✅ Animation일 경우 subCategory까지 체크
      setFilteredExamples(
        examples.filter(
          (ex) =>
            ex.category === "Clone" &&
            (activeSubCategory ? ex.subCategory === activeSubCategory : true) // subCategory가 있으면 필터링
        )
      );
    } else {
      // ✅ 일반 카테고리일 경우 기존 필터링 방식 유지
      setFilteredExamples(examples.filter((ex) => ex.category === activeCategory));
    }
  }, [activeCategory, activeSubCategory, examples]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-[3rem]">
      {filteredExamples.length > 0 ? (
        filteredExamples.map((example) => (
          <a key={example.id} href={example.link} className="block rounded-lg overflow-hidden" target="_blank">
            <Image
              src={example.thumbnail || "/thumbnails/default-thumbnail.jpg"}
              alt={example.title}
              width={400}
              height={250}
              className="w-full h-[250px] object-cover"
            />
            <div className="p-4">
              <h3 className="text-[2rem] font-semibold">{example.title}</h3>
            </div>
          </a>
        ))
      ) : (
        <p className="text-center text-gray-600 col-span-full">해당 카테고리에 예제가 없습니다.</p>
      )}
    </div>
  );
}
