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
  endDate: string;
}
