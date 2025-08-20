 import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";

function FormTodo() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todo.trim()) return;

    addTodo({ text: todo, completed: false });
    setTodo("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full p-2 rounded-2xl border border-gray-200 bg-white/70 backdrop-blur-md shadow-md hover:shadow-lg transition"
    >
      {/* Input */}
      <input
        type="text"
        placeholder="✍️ Write your next task..."
        className="flex-1 px-4 py-2 rounded-xl bg-transparent border-none outline-none text-gray-800 font-medium placeholder-gray-400 focus:ring-2 focus:ring-indigo-400 transition"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {/* Button */}
      <button
        type="submit"
        className="ml-3 px-5 py-2 rounded-xl font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
      >
        ➕ Add
      </button>
    </form>
  );
}

export default FormTodo;
