import React, { useState } from "react";
import { BASE_API } from "../constants";
import Button from "./Button";

export default function InputTodo() {
  const [description, setDescription] = useState("");

  const onSubmitTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BASE_API}/todo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: description }),
      });

      window.location.href = "/";
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="" onSubmit={onSubmitTodo}>
        <div className="field has-addons has-addons-centered">
          <div className="control has-icons-left">
            <input
              type="text"
              className="input is-primary"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <span className="icon is-small is-left">
              <i className="fas fa-check"></i>
            </span>
          </div>
          <div className="control">
            <Button className="is-success">
              <span className="icon is-small">
                <i className="fas fa-check"></i>
              </span>
              <span>Add</span>
            </Button>
          </div>
        </div>
      </form>
    </>
  );
}
