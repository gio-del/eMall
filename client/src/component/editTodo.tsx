import React, { useEffect, useState } from "react";
import Button from "./Button";
import { BASE_API } from "../constants";

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
      const response = await fetch(`${BASE_API}/todo/${id}`, {
        method: "PUT",
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
      <form className="" onSubmit={onSubmitTodo}>
        <input
          type="text"
          id="first_name"
          className=""
          onChange={(e) => setEditDescription(e.target.value)}
          value={editDescription}
          required
        ></input>
        <Button className="is-primary">
          <span>Confirm</span>
          <span className="icon is-small">
            <i className="fas fa-check"></i>
          </span>
        </Button>
      </form>
    </>
  );
}
