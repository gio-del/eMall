import { useEffect, useState } from "react";
import Modal from "react-modal";
import { BASE_API } from "../constants";
import EditTodo from "./EditTodo";
import Button from "./Button";

export default function TodoList() {
  interface Todo {
    id: number;
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
      const response = await fetch(`${BASE_API}/todo/${id}`, {
        method: "DELETE",
      });
    } catch (err) {
      console.error(err);
    }
    setTodo(todo.filter((old) => old.id != id));
  };

  const getTodo = async () => {
    try {
      const response = await fetch(`${BASE_API}/todo`);
      const jsonData = await response.json();
      jsonData.sort((a: { id: number }, b: { id: number }) => a.id - b.id);
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
      >
        <EditTodo
          id={edit.idTodo}
          description={
            todo.length === 0
              ? ""
              : todo.filter((todo) => todo.id === edit.idTodo).length === 0
              ? ""
              : todo.filter((todo) => todo.id === edit.idTodo)[0].description
          }
        />
      </Modal>
      <table className="table is-striped is-hoverable is-fullwidth">
        <thead className="">
          <tr>
            <th>Description</th>
            <th></th>
            <th></th>
            {/*<th>id</th>*/}
          </tr>
        </thead>
        <tbody>
          {todo.map(
            ({ id, description }: { id: number; description: string }) => (
              <tr key={id}>
                <td>{description}</td>
                <td>
                  <Button
                    className="is-info"
                    onClick={() => {
                      handleEdit(id);
                    }}
                  >
                    <span>Edit</span>
                    <span className="icon is-small">
                      <i className="fas fa-wrench"></i>
                    </span>
                  </Button>
                </td>
                <td>
                  <Button
                    className="is-danger is-light is-outlined"
                    onClick={() => deleteTodo(id)}
                  >
                    <span>Delete</span>
                    <span className="icon is-small">
                      <i className="fas fa-times"></i>
                    </span>
                  </Button>
                </td>
                {/*<td>{id}</td>*/}
              </tr>
            )
          )}
        </tbody>
      </table>
    </>
  );
}
