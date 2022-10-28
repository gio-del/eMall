import "./App.css";
import "bulma/css/bulma.min.css";

import InputTodo from "./component/InputTodo";
import TodoList from "./component/TodoList";

export default function App() {
  return (
    <>
      <h1 className="title">Todo App</h1>
      <InputTodo />
      <TodoList />

      <footer className="footer">
        <div className="content has-text-centered">
          <a className="" href="https://github.com/gio-del">
            <button className="button">
              <span className="icon">
                <i className="fab fa-github"></i>
              </span>
              <span>GitHub</span>
            </button>
          </a>
          Built using
          <a href="https://reactjs.org/">
            <span className="icon is-large">
              <i className="fab fa-react"></i>
            </span>
          </a>
          <a href="https://laravel.com/">
            <span className="icon is-large">
              <i className="fab fa-laravel"></i>
            </span>
          </a>
        </div>
      </footer>
    </>
  );
}
