"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Example = {
  id: number;
  title: string;
  category: string[];  // ✅ 문자열이 아니라 배열로 변경
  subCategory?: string[];
  link: string;
  thumbnail?: string;
};

type TabContentProps = {
  activeCategory: string;
  activeSubCategory?: string;
};

export default function AnimationTabContent({ activeCategory, activeSubCategory }: TabContentProps) {
  const [examples, setExamples] = useState<Example[]>([]);
  const [filteredExamples, setFilteredExamples] = useState<Example[]>([]);

  // 📌 JSON 데이터 불러오기
  useEffect(() => {
    fetch("/data/examples.json")
      .then((res) => res.json())
      .then((data: Example[]) => {
        console.log(data);
        setExamples(data);
      })
      .catch((error) => console.error("예제 데이터를 불러오는 중 오류 발생:", error));
  }, []);

  // 📌 카테고리 및 서브카테고리 필터링
  useEffect(() => {
    setFilteredExamples(
      examples.filter(
        (ex) =>
          ex.category.includes(activeCategory) && // ✅ 여러 카테고리에 속할 수 있도록 변경
          (activeSubCategory ? ex.subCategory?.includes(activeSubCategory) : true) // ✅ 서브카테고리도 배열에서 체크
      )
    );
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
