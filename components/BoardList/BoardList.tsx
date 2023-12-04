'use client';
import React from 'react';

interface BoardListProps {
  data: Task[];
}

interface Task {
  id: number;
  name: string;
  assignee: string;
  startDate: string;
}

const BoardList = ({ data }: BoardListProps) => {
  console.log(data);

  const listHeaders: string[] = [
    'backlog',
    'to do',
    'in progress',
    'completed',
  ];

  const filterTasksByStatus = (status: string): Task[] => {
    return data.filter((task: Task) => {
      const lowerCaseStatus = status.toLowerCase();
      if (lowerCaseStatus === 'backlog') {
        return task.assignee === '';
      } else if (lowerCaseStatus === 'to do') {
        return new Date(task.startDate) > new Date();
      } else if (lowerCaseStatus === 'in progress') {
        return new Date(task.startDate) <= new Date() && task.assignee !== '';
      } else if (lowerCaseStatus === 'completed') {
        return new Date(task.startDate) <= new Date() && task.assignee === '';
      }
      return false;
    });
  };

  return (
    <div className="flex justify-between w-full gap-11">
      {listHeaders.map((item, index) => (
        <div key={index} className="flex-1">
          <div
            className={`p-4 pl-0 border-b-4 ${
              item.toLowerCase() === 'backlog'
                ? 'border-grey-300'
                : item.toLowerCase() === 'to do'
                ? 'border-blue-500 '
                : item.toLowerCase() === 'completed'
                ? 'border-green-500 '
                : item.toLowerCase() === 'in progress'
                ? 'border-yellow-500'
                : 'border-gray-300'
            }`}
          >
            <h3 className="text-gray-700 text-sm uppercase">{item}</h3>
          </div>
          <div>
            {filterTasksByStatus(item).map((task) => (
              <div className="text-gray-700" key={task.id}>
                {task.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BoardList;
