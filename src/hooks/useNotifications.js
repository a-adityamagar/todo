import { useEffect, useCallback } from 'react';
import { formatDistanceToNow } from 'date-fns';

export function useNotifications() {
  useEffect(() => {
    if ('Notification' in window) {
      Notification.requestPermission();
    }
  }, []);

  const sendNotification = useCallback((todo) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Todo Reminder', {
        body: `Task "${todo.text}" is due ${formatDistanceToNow(new Date(todo.dueDate))} ago!`
      });
    }
  }, []);

  return { sendNotification };
}