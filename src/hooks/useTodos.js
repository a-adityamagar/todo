import { useState, useEffect } from 'react';
import { useNotifications } from './useNotifications';
import toast from 'react-hot-toast';

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const { sendNotification } = useNotifications();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      todos.forEach(todo => {
        const dueDate = new Date(todo.dueDate);
        if (!todo.notified && dueDate <= now) {
          sendNotification(todo);
          setTodos(prev => 
            prev.map(t => 
              t.id === todo.id ? { ...t, notified: true } : t
            )
          );
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [todos, sendNotification]);

  const addTodo = (text, dueDate) => {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      dueDate,
      completed: false,
      notified: false
    }]);
    toast.success('Todo added successfully!');
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo => {
        if (todo.id === id) {
          const completed = !todo.completed;
          toast.success(completed ? 'Todo completed! 🎉' : 'Todo uncompleted');
          return { ...todo, completed };
        }
        return todo;
      })
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
    toast.success('Todo deleted');
  };

  const editTodo = (id, newText, newDueDate) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText, dueDate: newDueDate } : todo
      )
    );
    toast.success('Todo updated successfully!');
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    editTodo
  };
}