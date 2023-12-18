import { useState } from "react";

export default function Categories({ value, onClickCategory }) {
  const categories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Новинки",
  ];

  function CategoryList() {
    return categories.map((categoryName, categoryIndex) => {
      return (
        <li
          key={categoryIndex}
          onClick={() => onClickCategory(categoryIndex)}
          className={value === categoryIndex ? "active" : ""}
        >
          {categoryName}
        </li>
      );
    });
  }

  return (
    <>
      <div className="categories">
        <ul>
          <CategoryList />
        </ul>
      </div>
    </>
  );
}
