import React, { useEffect, useState } from "react";
import ConfirmButton from "./confirmButton";

export default function EditTodo({
  id,
  description,
}: {
  id?: number;
  description: string;
}) {
  const [editDescription, setEditDescription] = useState("");

  const onSubmitTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost/todo/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: editDescription }),
      });

      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    setEditDescription(description);
  }, []);

  return (
    <>
    <h1>Edit Todo</h1>
      <form className="flex flex-row w-full mt-5" onSubmit={onSubmitTodo}>
        <input
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg border-b-4 focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 mr-2"
          onChange={(e) => setEditDescription(e.target.value)}
          value={editDescription}
          required
        ></input>
        <ConfirmButton>Confirm</ConfirmButton>
      </form>
    </>
  );
}
