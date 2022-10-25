import { useEffect, useState } from "react";
import "./App.css";
import ConfirmButton from "./component/confirmButton";
import InputTodo from "./component/inputTodo";
import TodoList from "./component/todoList";

export default function App() {
  return (
    <>
      <div className="container flex flex-col w-full justify-center items-center mx-auto my-0">
        <InputTodo />
        <TodoList />
      </div>
    </>
  );
}
