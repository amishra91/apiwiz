'use client';
import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { filterTasksByStatus } from '@/lib/utils';

const BoardList = ({ data }: BoardListProps) => {
  const [tasks, setTasks] = useState<Task[]>(data);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);

  const handleDragStart = (task: Task) => {
    setDraggedTask(task);
  };

  const handleDragOver = (
    event: React.DragEvent<HTMLDivElement>,
    status: string
  ) => {
    event.preventDefault();

    if (draggedTask) {
      const newTasks = tasks.filter((task) => task.id !== draggedTask.id);
      const updatedTask = { ...draggedTask, status };
      const newTasksWithUpdatedTask = [...newTasks, updatedTask];
      setTasks(newTasksWithUpdatedTask);
    }
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const listHeaders: string[] = [
    'backlog',
    'to do',
    'in progress',
    'completed',
  ];

  return (
    <div className="flex flex-col md:flex-row justify-between w-full gap-4 md:gap-11">
      {listHeaders.map((item, index) => (
        <div
          key={index}
          className="flex-1 md:w-1/4"
          onDragOver={(e) => handleDragOver(e, item)}
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
                ({filterTasksByStatus(tasks, item).length})
              </span>
            </h3>
          </div>
          <div className="max-h-[60vh] md:max-h-[100vh] overflow-auto w-full">
            {filterTasksByStatus(tasks, item).map((task) => (
              <Card
                key={task.id}
                className="mb-4 rounded-sm border-0 shadow-md cursor-pointer"
                draggable
                onDragStart={() => handleDragStart(task)}
                onDragEnd={handleDragEnd}
              >
                <CardHeader className="p-3">
                  <CardTitle className="text-sm">{task.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {task.summary ? task.summary : 'No description'}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center p-3 pt-0 gap-1">
                  {task.assignee && (
                    <div>
                      <Image
                        src="/assets/user.png"
                        width={15}
                        height={15}
                        alt="User"
                      />
                    </div>
                  )}

                  <div className="bg-[#F1F1F1] text-xs p-1 px-2 rounded-xl text-[#868686]">
                    {task.startDate}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Card className="mb-4 rounded-sm border-0 shadow-md cursor-pointer w-full">
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
