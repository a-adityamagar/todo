import { useState } from 'react';
import TodoItem from './TodoItem';
import TodoForm from './TodoForm';
import { useTodos } from '../hooks/useTodos';
import { AnimatePresence, motion } from 'framer-motion';

function TodoList() {
  const { todos, addTodo, toggleTodo, deleteTodo, editTodo } = useTodos();
  const [editingId, setEditingId] = useState(null);

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <motion.h1 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl sm:text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600"
      >
        Your Todo
      </motion.h1>
      
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-xl"
      >
        <TodoForm onSubmit={addTodo} />
      </motion.div>

      <AnimatePresence mode="popLayout">
        <div className="mt-6 space-y-4">
          {todos.map(todo => (
            <motion.div
              key={todo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              layout
            >
              <TodoItem
                todo={todo}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                onEdit={editTodo}
                isEditing={editingId === todo.id}
                setEditingId={setEditingId}
              />
            </motion.div>
          ))}
        </div>
      </AnimatePresence>
    </div>
  );
}

export default TodoList;