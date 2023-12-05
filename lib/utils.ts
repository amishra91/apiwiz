import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const filterTasksByStatus = (tasks: Task[], status: string) => {
  return tasks.filter((task) => {
    const lowerCaseStatus = status.toLowerCase();
    const isBacklog =
      (task.assignee === '' &&
        task.status === '' &&
        new Date(task.startDate) > new Date()) ||
      task.status === 'backlog';
    const isToDo =
      (task.assignee !== '' && new Date(task.startDate) >= new Date()) ||
      task.status === 'to do';
    const isInProgress =
      (new Date(task.startDate) <= new Date() && task.assignee !== '') ||
      task.status === 'in progress';
    const isCompleted =
      (new Date(task.startDate) <= new Date() && task.assignee === '') ||
      task.status === 'completed';

    switch (lowerCaseStatus) {
      case 'backlog':
        return isBacklog;
      case 'to do':
        return (
          isToDo && task.status !== 'in progress' && task.status !== 'completed'
        );
      case 'in progress':
        return (
          isInProgress && task.status !== 'to do' && task.status !== 'completed'
        );
      case 'completed':
        return (
          isCompleted &&
          task.status !== 'to do' &&
          task.status !== 'in progress'
        );
      default:
        return false;
    }
  });
};
