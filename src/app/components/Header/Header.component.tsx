import React from "react";

const HeaderComponent = () => {
  return (
    <header className="w-full h-10 flex justify-center items-center">
      <div className="w-11/12 h-full flex flex-row justify-between items-center">
        <h1 className="text-lg">Chat App</h1>
        <nav className="flex flex-row gap-5">
          <a href="/login" className="cursor-pointer">
            Log in
          </a>
          <a href="/register" className="cursor-pointer">
            Register
          </a>
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
