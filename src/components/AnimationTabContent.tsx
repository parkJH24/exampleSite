"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

type Example = {
    id: number;
    title: string;
    category: string; // Animation, CSS, GSAP 등
    subCategory?: string; // animation/css, animation/gsap 등
    link: string;
    thumbnail?: string;
};

type TabContentProps = {
    activeTab: string;
};

export default function AnimationTabContent({ activeTab }: TabContentProps) {
    const [examples, setExamples] = useState<Example[]>([]);
    const [filteredExamples, setFilteredExamples] = useState<Example[]>([]);

    // 📌 JSON 데이터 불러오기
    useEffect(() => {
        fetch("/data/examples.json")
            .then((res) => res.json())
            .then((data: Example[]) => setExamples(data))
            .catch((error) => console.error("예제 데이터를 불러오는 중 오류 발생:", error));
    }, []);

    // 📌 선택된 탭(`activeTab`)에 맞게 필터링 (폴더 기반)
    useEffect(() => {
        if (activeTab === "All") {
            setFilteredExamples(examples);
        } else {
            setFilteredExamples(
                examples.filter(
                    (ex) => ex.category === "Animation" && (!ex.subCategory || ex.subCategory === activeTab)
                )
            );
        }
    }, [activeTab, examples]);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredExamples.length > 0 ? (
                filteredExamples.map((example) => (
                    <a
                        key={example.id}
                        href={example.link}
                        className="block rounded-lg overflow-hidden"
                    >
                        {/* 📌 썸네일 적용 */}
                        <Image
                            src={example.thumbnail || "/thumbnails/default-thumbnail.jpg"}
                            alt={example.title}
                            width={400}
                            height={250}
                            className="w-full h-[200px] object-cover"
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-semibold">{example.title}</h3>
                        </div>
                    </a>
                ))
            ) : (
                <p className="text-center text-gray-600 col-span-full">해당 카테고리에 예제가 없습니다.</p>
            )}
        </div>
    );
}
