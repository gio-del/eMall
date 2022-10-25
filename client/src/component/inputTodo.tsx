import React, { useState } from "react";
import ConfirmButton from "./confirmButton";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  const onSubmitTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });

      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="flex flex-row w-1/2 mt-5" onSubmit={onSubmitTodo}>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-b-4 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mr-2"
          onChange={(e) => setDescription(e.target.value)}
          required
        ></input>
        <ConfirmButton>Add</ConfirmButton>
      </form>
    </>
  );
}
