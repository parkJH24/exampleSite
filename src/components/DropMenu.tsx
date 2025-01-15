"use client";

import React, { useState } from "react";
import { DropdownMenuProps, MenuItem } from "@/types";

const DropMenu: React.FC<DropdownMenuProps> = ({ items, onSelect }) => {
  const [openSubMenus, setOpenSubMenus] = useState<{ [key: string]: boolean }>(
    {}
  );

  const toggleSubMenu = (itemId: string | number) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [itemId]: !prevState[itemId], // 해당 메뉴의 열림 상태를 토글
    }));
  };

  const handleSelect = (item: MenuItem) => {
    onSelect?.(item.id); // 선택된 항목의 id 전달
  };

  return (
    <div className="relative w-32">
      {/* 항상 펼쳐진 1차 메뉴 */}
      <ul className="shadow-md">
        {items.map((item) => (
          <li key={item.id} className="p-2 cursor-pointer">
            <div
              onClick={() => toggleSubMenu(item.id)}
              className="flex justify-between"
            >
              {item.label}
              {item.children && (
                <span>{openSubMenus[item.id] ? "▲" : "▼"}</span> // 열림/닫힘 아이콘
              )}
            </div>

            {/* 2차 메뉴 */}
            {item.children && (
              <ul
                className={` shadow-md mt-2 overflow-hidden transition-all duration-600 ease-in-out ${
                  openSubMenus[item.id]
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                {item.children.map((child) => (
                  <li
                    key={child.id}
                    onClick={() => handleSelect(child)}
                    className="p-2 cursor-pointer"
                  >
                    {child.label}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DropMenu;
