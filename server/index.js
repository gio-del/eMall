const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = 80

app.use(express.json());
app.use(cors());

//custom middleware prints out some stuff at each request
app.use(function (req, res, next) {
  console.log("url: ", req.url)
  console.log("body: ", req.body);
  console.log("query: ", req.query);
  console.log("method:", req.method);
  console.log("")
  next.call();
});

// get all todos in the database
app.get("/todo", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM TODO");
    res.json(allTodo.rows);
  } catch (err) {
    console.error(err);
  }
});

//get a specific todo from the database
app.get("/todo/:id", async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const todo = await pool.query("SELECT * FROM TODO WHERE id_todo=$1", [id]);
    if (todo.rowCount === 0) {
      res.status(404);
      res.send();
      return;
    }
    res.json(todo.rows[0]);
  } catch (err) {
    console.error(err);
  }
})

// add a new todo element
app.post("/todo", async (req, res) => {
  try {
    const {
      description
    } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a specific todo from the database
app.delete("/todo/:id", async (req, res) => {
  const {
    id
  } = req.params;

  (async () => {
    const client = await pool.connect()

    try {
      await client.query('BEGIN')
      const allTodo = await pool.query("DELETE FROM todo WHERE id_todo=$1 RETURNING *;", [id])
      await client.query("SELECT SETVAL('todo_id_todo_seq', (SELECT COALESCE(MAX(id_todo),1) FROM todo));")
      await client.query('COMMIT')

      res.json(allTodo.rows);
    } catch (e) {
      await client.query('ROLLBACK')
      throw e
    } finally {
      client.release()
    }
  })().catch(e => console.error(e.stack))
});

//update a todo
app.patch("/todo/:id", async (req, res) => {
  try {
    const {
      description
    } = req.body;
    const {
      id
    } = req.params;
    const newTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE id_todo = $2 RETURNING *", [description, id]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// get all todos
// app.get("/todolist", async (req, res) => {
//   try {
//     const allTodo = await pool.query("select * from todo");
//     let html = "<html><body><table><tr><th>id</th><th>description</th></tr>";
//     for (let i = 0; i < allTodo.rowCount; i++) {
//       html += "<tr>";
//       html += "<td>" + allTodo.rows[i]["id_todo"] + "</td>";
//       html += "<td>" + allTodo.rows[i]["description"] + "</td>";
//       html += "</tr>";
//     }
//     html += "</table></body></html>"
//     res.send(html);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

//server start
app.listen(PORT || 3000, () => {
  console.log(`Server listening on port: ${PORT}. Open http://localhost:${PORT}`);
});