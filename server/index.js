const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');
const port = 5000;

//middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query('INSERT INTO todo (description) VALUES ($1) RETURNING *',
      [description]);
    res.json(newTodo.rows[0]); //rows[0] to only return the added data
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
    res.json(todo.rows);
  } catch (err) {
    console.log(err.message);
  }
});

app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updatedTodo = await pool.query('UPDATE todo SET description = $1 WHERE todo_id = $2',
      [description, id]);
    res.json(`To-do # ${id} was updated: ${description}`);
  } catch (err) {
    console.log(err.message);
  }
});

app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTodo = await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.json(`To-do #${id} was deleted`);
  } catch (err) {
    console.log(err.message);
  }
})

app.listen(port, () => { console.log(`App running on port ${port}.`) });
