import React from 'react';
import BoardList from '../BoardList/BoardList';

async function getTasks() {
  try {
    const res = await fetch('https://gcp-mock.apiwiz.io/v1/tasks', {
      headers: {
        'x-tenant': 'b4349714-47c7-4605-a81c-df509fc7e653',
      },
      cache: 'force-cache',
    });
    const tasks = await res.json();
    return tasks;
  } catch (err) {
    throw err;
  }
}

const Board = async () => {
  const data = await getTasks();

  return <BoardList data={data} />;
};

export default Board;
