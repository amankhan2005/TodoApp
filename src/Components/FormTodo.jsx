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
      className="flex w-full bg-white/20 backdrop-blur-md rounded-2xl border border-white/30 shadow-md overflow-hidden"
    >
      {/* Input */}
      <input
        type="text"
        placeholder="✍️ Write your next task..."
        className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-transparent text-sm sm:text-base text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {/* Button */}
      <button
        type="submit"
        className="px-4 sm:px-6 py-2 sm:py-3 font-semibold text-white text-sm sm:text-base bg-gradient-to-r from-green-500 to-emerald-600 hover:scale-105 active:scale-95 transition-all duration-200 shadow-md"
      >
        ➕ Add
      </button>
    </form>
  );
}

export default FormTodo;
