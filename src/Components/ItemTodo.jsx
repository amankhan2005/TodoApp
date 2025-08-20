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
      className={`flex items-center justify-between w-full p-3 rounded-2xl backdrop-blur-md border 
      shadow-md transition-all duration-300
      ${todo.completed ? "bg-green-100/70 border-green-200" : "bg-white/80 border-gray-200 hover:shadow-lg"}
      `}
    >
      {/* Checkbox */}
      <input
        type="checkbox"
        className="cursor-pointer accent-green-500 w-5 h-5"
        checked={todo.completed}
        onChange={toggleCompleted}
      />

      {/* Todo Text */}
      <input
        type="text"
        className={`flex-1 mx-3 px-2 py-1 bg-transparent rounded-lg text-gray-800 font-medium tracking-wide
          focus:outline-none focus:ring-2 focus:ring-indigo-300 transition
          ${isTodoEditable ? "border border-gray-300" : "border-transparent"}
          ${todo.completed ? "line-through text-gray-400" : ""}
        `}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />

      {/* Edit / Save Button */}
      <button
        className={`inline-flex items-center justify-center w-9 h-9 rounded-xl text-lg 
          bg-gradient-to-r from-indigo-500 to-purple-500 text-white 
          hover:scale-110 active:scale-95 transition disabled:opacity-40`}
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
        className="ml-2 inline-flex items-center justify-center w-9 h-9 rounded-xl text-lg 
        bg-gradient-to-r from-rose-500 to-red-500 text-white 
        hover:scale-110 active:scale-95 transition"
        onClick={() => deleteTodo(todo.id)}
      >
        🗑️
      </button>
    </div>
  );
}

export default ItemTodo;
