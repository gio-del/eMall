import { useEffect, useState } from "react";
import Modal from "react-modal";
import DeleteButton from "./deleteButton";
import EditButton from "./editButton";
import EditTodo from "./editTodo";
import InputTodo from "./inputTodo";

export default function TodoList() {
  interface Todo {
    id_todo: number;
    description: string;
  }
  interface ModalEdit {
    modalIsOpen: boolean;
    idTodo: number;
  }

  const [todo, setTodo] = useState<Todo[]>([]);
  const [edit, setEdit] = useState<ModalEdit>({
    modalIsOpen: false,
    idTodo: 0,
  });

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50%, -50%)",
    },
  };

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost/todo/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
    setTodo(todo.filter((old) => old.id_todo != id));
  };

  const getTodo = async () => {
    try {
      const response = await fetch("http://localhost/todo");
      const jsonData = await response.json();
      jsonData.sort(
        (a: { id_todo: number }, b: { id_todo: number }) =>
          a.id_todo - b.id_todo
      );
      setTodo(jsonData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  function handleEdit(id: number) {
    setEdit({ idTodo: id, modalIsOpen: true });
  }

  return (
    <>
      <Modal
        isOpen={edit.modalIsOpen}
        onRequestClose={() => setEdit({ ...edit, modalIsOpen: false })}
        contentLabel="Example Modal"
        style={customStyles}
        ariaHideApp={false}
        shouldCloseOnOverlayClick={false}
      >
        <EditTodo
          id={edit.idTodo}
          description={
            (todo.length === 0)
              ? ""
              : (todo.filter((todo) => todo.id_todo === edit.idTodo).length === 0)? "":
              todo.filter((todo) => todo.id_todo === edit.idTodo)[0].description
          }
        />
      </Modal>
      <table className="w-1/2 text-left text-base text-gray-900 dark:text-slate-50 bg-slate-50 dark:bg-gray-800">
        <thead className="text-xs text-gray-400 uppercase dark:text-gray-400">
          <tr>
            <th>Description</th>
            <th></th>
            <th></th>
            <th>id</th>
          </tr>
        </thead>
        <tbody>
          {todo.map(
            ({
              id_todo,
              description,
            }: {
              id_todo: number;
              description: string;
            }) => (
              <tr key={id_todo}>
                <td>{description}</td>
                <td>
                  <EditButton
                    onClick={() => {
                      handleEdit(id_todo);
                    }}
                  >
                    Edit
                  </EditButton>
                </td>
                <td>
                  <DeleteButton onClick={() => deleteTodo(id_todo)}>
                    Delete
                  </DeleteButton>
                </td>
                <td>{id_todo}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
