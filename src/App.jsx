import TodoList from './components/TodoList';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-8">
      <Toaster position="top-right" />
      <TodoList />
    </div>
  );
}

export default App;