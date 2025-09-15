import React from "react";

export default function ThemeToggler() {
  return (
    <>
      {/* Minimal theme switch: toggles a "dark" class on <html> for the whole site */}
      <button
        type="button"
        onClick={() => {
          const html = document.documentElement;
          html.classList.toggle("dark");
        }}
        className="border rounded px-2 py-1 m-2"
      >
        Toggle Theme
      </button>
    </>
  );
}
