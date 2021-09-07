import React from "react";

export function Login() {
  return (
    <div className="container mx-auto h-screen grid grid-rows-1 grid-cols-1 items-center">
      <div className="wrapper">
        <h1 className="text-center">Inspire your comic book collection</h1>
        <form
          name="login"
          method="post"
          className="my-2 mx-auto flex flex-col"
          style={{ width: 320 }}
        >
          <input
            type="text"
            name="login"
            className="border-2 border-green-300 h-10 px-2 rounded-lg text-center focus:outline-none focus:border-yellow-300"
            placeholder="Type your login"
          />
          <button className="bg-green-300 mt-2 h-10 rounded-lg text-white font-bold">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
