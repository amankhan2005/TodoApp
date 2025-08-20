 import { useState, useEffect } from "react";
import { TodoProvider } from "./Contexts/TodoContext";
import FormTodo from "./Components/FormTodo";
import TodoItem from "./Components/ItemTodo";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id ? { ...prevTodo, ...todo } : prevTodo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // Load todos from localStorage
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="min-h-screen bg-gradient-to-br from-[#994caf] to-[#7eb0e9] py-10 px-4">
        <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 px-6 py-8">
          {/* Title */}
          <h1 className="text-4xl font-extrabold text-center text-white drop-shadow-lg mb-6">
            ✅ Manage Your Todos
          </h1>
          <p className="text-center text-gray-300 mb-8">
            Stay productive. Organize your tasks in style 🚀
          </p>

          {/* Form */}
          <div className="mb-6">
            <FormTodo />
          </div>

          {/* Todos */}
          <div className="space-y-3">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            ) : (
              <p className="text-center text-gray-400 italic">
                🎉 You’re all caught up!
              </p>
            )}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
