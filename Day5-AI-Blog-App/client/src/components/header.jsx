import React from "react";

export default function Header() {
  return (
    <>
      <header className="h-24">
        <nav className="p-4 h-full w-full flex justify-between items-center bg-green-500">
          <h1 className="text-4xl text-white  ">Blog App</h1>
          <p className="text-2xl text-white ">Profile</p>
        </nav>
      </header>
    </>
  );
}
