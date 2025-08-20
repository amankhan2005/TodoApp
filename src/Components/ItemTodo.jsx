 import { useState } from "react";
import { useTodo } from "../Contexts/TodoContext";

function ItemTodo({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.text);
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  const editTodo = () => {
    updateTodo(todo.id, { ...todo, text: todoMsg });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex items-center w-full gap-2 sm:gap-3 p-3 sm:p-4 rounded-2xl border backdrop-blur-md shadow-md transition-all duration-300
      ${todo.completed ? "bg-green-100/60 border-green-300" : "bg-white/20 border-white/30 hover:shadow-lg"}
      `}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="cursor-pointer accent-green-500 w-4 h-4 sm:w-5 sm:h-5"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Todo Text */}
      <input
        type="text"
        className={`flex-1 px-2 sm:px-3 py-1 bg-transparent rounded-lg text-sm sm:text-base text-white font-medium tracking-wide
          focus:outline-none focus:ring-2 focus:ring-indigo-300
          ${isTodoEditable ? "border border-gray-300" : "border-transparent"}
          ${todo.completed ? "line-through text-gray-400" : ""}
        `}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit / Save Button */}
      <button
        className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-sm sm:text-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:scale-110 active:scale-95 transition disabled:opacity-40"
        onClick={() => {
          if (todo.completed) return;
          if (isTodoEditable) {
            editTodo();
          } else {
            setIsTodoEditable((prev) => !prev);
          }
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "💾" : "✏️"}
      </button>

      {/* Delete Button */}
      <button
        className="inline-flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-xl text-sm sm:text-lg bg-gradient-to-r from-rose-500 to-red-500 text-white hover:scale-110 active:scale-95 transition"
        onClick={() => deleteTodo(todo.id)}
      >
        🗑️
      </button>
    </div>
  );
}

export default ItemTodo;
