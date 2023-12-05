'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { useEffect, useState } from 'react';

interface BoardListProps {
  data: Task[];
}

interface Task {
  id: number;
  name: string;
  summary: string;
  assignee: string;
  startDate: string;
  status: string;
}

interface DraggableCardProps {
  task: Task;
  onDragStart: (task: Task) => void;
}

const DraggableCard = ({ task, onDragStart }: DraggableCardProps) => {
  const handleDragStart: React.DragEventHandler<HTMLDivElement> = (e) => {
    onDragStart(task);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', String(task.id));
  };

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      className="mb-4 rounded-sm border-0 shadow-md cursor-pointer"
    >
      <Card
        key={task.id}
        className="mb-4 rounded-sm border-0 shadow-md cursor-pointer"
      >
        <CardHeader className="p-3">
          <CardTitle className="text-sm">{task.name}</CardTitle>
          <CardDescription className="text-sm">
            {task.summary ? task.summary : 'No description'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center p-3 pt-0 gap-1">
          <div>
            <Image src="/assets/user.png" width={15} height={15} alt="User" />
          </div>
          <div className="bg-[#F1F1F1] text-xs p-1 px-2 rounded-xl text-[#868686]">
            {task.startDate}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const BoardList = ({ data }: BoardListProps) => {
  const [tasks, setTasks] = useState<Task[]>(data);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [updatedTasks, setUpdatedTasks] = useState<Task[]>([]);

  // useEffect(() => {
  //   setTasks(data);
  // }, [data]);

  const listHeaders: string[] = [
    'backlog',
    'to do',
    'in progress',
    'completed',
  ];

  const filterTasksByStatus = (status: string): Task[] => {
    const showTasks = updatedTasks.length ? updatedTasks : tasks;
    return showTasks.filter((task: Task) => {
      const lowerCaseStatus = status.toLowerCase();
      const isBacklog = task.assignee === '' || task.status === 'backlog';
      const isToDo =
        new Date(task.startDate) > new Date() || task.status === 'to do';
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
          return isToDo;
        case 'in progress':
          return isInProgress;
        case 'completed':
          return isCompleted;
        default:
          return false;
      }
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    if (draggedTask) {
      const newStatus = e.currentTarget.dataset.status as string;
      const updatedTasks = tasks.filter((task) => task.id !== draggedTask.id);
      const updatedDraggedTask: Task = { ...draggedTask, status: newStatus };
      setUpdatedTasks([...updatedTasks, updatedDraggedTask]);
      setDraggedTask(null);
    }
  };

  const handleDragOver: React.DragEventHandler<HTMLDivElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-between w-full gap-11">
      {listHeaders.map((item, index) => (
        <div
          key={index}
          className="flex-1"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          data-status={item}
        >
          <div
            className={`p-4 pl-0 border-b-4 mb-4 ${
              item.toLowerCase() === 'backlog'
                ? 'border-grey-300'
                : item.toLowerCase() === 'to do'
                ? 'border-[#6fd6eb] '
                : item.toLowerCase() === 'completed'
                ? 'border-green-500 '
                : item.toLowerCase() === 'in progress'
                ? 'border-yellow-500'
                : 'border-gray-300'
            }`}
          >
            <h3 className="text-gray-700 text-sm uppercase">
              {item}{' '}
              <span className="text-gray-400">
                ({filterTasksByStatus(item).length})
              </span>
            </h3>
          </div>
          <div className="max-h-[100vh] overflow-auto w-full">
            {filterTasksByStatus(item).map((task) => (
              <DraggableCard
                key={task.id}
                task={task}
                onDragStart={(task: any) => setDraggedTask(task)}
              />
            ))}
          </div>
          <Card className="mb-4 rounded-sm border-0 shadow-md cursor-pointer">
            <CardHeader className="p-3">
              <CardTitle className="text-sm">
                <button className="text-green-500">+ Add Task</button>
              </CardTitle>
            </CardHeader>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
