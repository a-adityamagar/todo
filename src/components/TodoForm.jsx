import { useState } from 'react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';

function TodoForm({ onSubmit, initialText = '', initialDueDate = '', isEditing = false }) {
  const [text, setText] = useState(initialText);
  const [dueDate, setDueDate] = useState(initialDueDate || new Date().toISOString().slice(0, 16));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit(text, dueDate);
    if (!isEditing) {
      setText('');
      setDueDate(new Date().toISOString().slice(0, 16));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 sm:space-y-0 sm:flex sm:gap-4">
        <div className="flex-1">
          <Input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full"
          />
        </div>
        <div className="flex-1">
          <Input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <Button type="submit" className="w-full sm:w-auto">
        {isEditing ? 'Update Todo' : 'Add Todo'}
      </Button>
    </form>
  );
}

export default TodoForm;