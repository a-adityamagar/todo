import { formatDistanceToNow } from 'date-fns';
import TodoForm from './TodoForm';
import { Button } from './ui/Button';
import { Checkbox } from './ui/Checkbox';

function TodoItem({ todo, onToggle, onDelete, onEdit, isEditing, setEditingId }) {
  const timeUntilDue = formatDistanceToNow(new Date(todo.dueDate), { addSuffix: true });
  const isOverdue = new Date(todo.dueDate) < new Date() && !todo.completed;

  if (isEditing) {
    return (
      <div className="p-4 bg-white/80 backdrop-blur-sm rounded-xl shadow-lg">
        <TodoForm
          initialText={todo.text}
          initialDueDate={todo.dueDate}
          onSubmit={(text, dueDate) => {
            onEdit(todo.id, text, dueDate);
            setEditingId(null);
          }}
          isEditing={true}
        />
      </div>
    );
  }

  return (
    <div className={`group p-4 rounded-xl shadow-lg transition-all duration-200 hover:shadow-xl ${
      todo.completed ? 'bg-green-50/80' : isOverdue ? 'bg-red-50/80' : 'bg-white/80'
    } backdrop-blur-sm`}>
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center space-x-4 flex-1 min-w-[200px]">
          <Checkbox
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <div className="flex-1">
            <p className={`text-lg transition-all duration-200 ${
              todo.completed ? 'line-through text-gray-500' : isOverdue ? 'text-red-600 font-medium' : 'text-gray-800'
            }`}>
              {todo.text}
            </p>
            <p className={`text-sm ${isOverdue ? 'text-red-500 font-medium' : 'text-gray-500'}`}>
              Due: {timeUntilDue}
            </p>
          </div>
        </div>
        <div className="space-x-2 opacity-70 group-hover:opacity-100 transition-opacity">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setEditingId(todo.id)}
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(todo.id)}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TodoItem;