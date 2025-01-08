import { useState } from "react";
import "./App.css";
import randomId from "random-id";
import { Todo } from "./types/Todo.types";
import { intialTodos } from "./constants/Todos";
import React from "react"

function App() {
  const [todos, setTodos] = useState<Todo[]>(intialTodos);
  const [text, setText] = useState<string>("");
  const [editText, setEditText] = useState<string>();
  const [editId, setEditId] = useState<string>();
  const [showEditField, setShowEditField] = useState<boolean>(false);

  const handleRemoveTodo = (id: string) => {
    setTodos((prevState) => [...prevState.filter((todo) => todo.id !== id)]);
  };

  const handleEditTodo = (id: string) => {
    setShowEditField(true);
    setEditId(id);
    const getTextFromId = todos?.find((todo) => todo.id === id);
    if (getTextFromId) {
      setEditText(getTextFromId.text);
    }
  };

  const handleTodoEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editText && editText !== "") {
      setTodos((prev) => [
        ...prev.map((todo) => {
          if (todo.id === editId) {
            todo.text = editText;
          }
          return todo;
        }),
      ]);
      setShowEditField(false);
      setEditText("");
    }
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("text", text);
    
    if (text !== "") {
      setTodos((prev) => [...prev, { id: randomId(5), text }]);
      setText("");
    }
  };
  return (
    <div className="todo-container">
      <h1>Todo App</h1>
      <form action="" onSubmit={handleFormSubmit} className="todo-form">
        <label htmlFor="add-todo">Add Todo: </label>
        <input
          type="text"
          name="add-todo"
          id="add-todo"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter Todo"
        />
        <button>Enter</button>
      </form>

      {showEditField && (
        <form
          action=""
          onSubmit={handleTodoEdit}
          className="todo-form edit-form"
        >
          <label>Edit Todo: </label>
          <input
            type="text"
            name="todoEdit"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
          />
          <button>Enter</button>
        </form>
      )}

      <div className="todo-list">
        {todos?.length > 0 &&
          todos?.map((todo) => {
            return (
              <div className="todo-item" key={todo?.id}>
                <span className="todo-text">{todo?.text}</span>
                <div className="buttons">
                  {" "}
                  <button
                    onClick={() => handleEditTodo(todo?.id)}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemoveTodo(todo?.id)}
                    className="remove-btn"
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default App;
