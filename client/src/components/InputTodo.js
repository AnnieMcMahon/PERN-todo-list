import React, { useState } from 'react';

const InputTodo = () => {
  const [description, setDescription] = useState('');
  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:5000/todos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
      )
      window.location = "/";
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div class="mx-auto w-75">
      <h1 class="text-center mt-5 mx-auto">My To-do List</h1>
      <form class="d-flex mt-5 mx-auto w-75" onSubmit={onSubmitForm}>
        <input type="text" class="form-control" value={description} onChange={e => setDescription(e.target.value)} />
        <button class="btn btn-success">Add</button>
      </form>
    </div>
  )
};

export default InputTodo;