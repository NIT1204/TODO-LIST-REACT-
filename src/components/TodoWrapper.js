import React, { useState, useEffect } from "react";
import { TodoForm } from "./TodoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditTodoForm } from "./EditTodoform";

export const TodoWrapper = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prevTodos) => [
      ...prevTodos,//keep all existing todos
      { id: uuidv4(), task: todo, completed: false, isEditing: false },
    ]);
  };

  const toggleComplete=id=>{
    setTodos(todos.map(todo=>todo.id==id? 
      {...todo,completed:!todo.completed}:todo))
  }

  const deleteTodo=id=>
  {
    setTodos(todos.filter(todo=>todo.id!==id))
  }

  const editTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
  }

  const editTask = (task, id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, task, isEditing: !todo.isEditing } : todo
      )
    );
  };
  // Use useEffect to log todos when they change
  useEffect(() => {
    console.log(todos);
  }, [todos]);

  return (
    <div className="TodoWrapper">
      <h1>Hi Get thing's done ASAP NITIN JADA:)</h1>
      <TodoForm addTodo={addTodo} />
      {todos.map((todo,index)=>
      (
        todo.isEditing ? (
          <EditTodoForm editTodo={editTask} task={todo} />
        ) :(
          <Todo task={todo} key={index}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
        editTodo={editTodo}/>
        )
      ))}
    </div>
  );
};
