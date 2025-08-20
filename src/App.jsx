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
      {/* Background */}
      <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-700 to-blue-700 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Container */}
        <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10">
          
          {/* Title */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center text-white drop-shadow-md mb-3">
            ✅ Manage Your Todos
          </h1>
          <p className="text-center text-gray-200 mb-8 text-sm sm:text-base">
            Stay productive anywhere — mobile, tablet, or desktop 🚀
          </p>

          {/* Form */}
          <div className="mb-6">
            <FormTodo />
          </div>

          {/* Todos */}
          <div className="space-y-3">
            {todos.length > 0 ? (
              todos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
            ) : (
              <p className="text-center text-gray-300 italic">
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
