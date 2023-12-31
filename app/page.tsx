import Board from '@/components/Board/Board';
import Navbar from '@/components/Navbar/Navbar';
import Sidebar from '@/components/Sidebar/Sidebar';

export default function Home() {
  return (
    <main className="flex h-full w-full">
      <Sidebar />
      <div className="flex-1 flex flex-col w-full">
        <Navbar />
        <div className="flex-1 overflow-y-auto p-4">
          {/* Main content */}
          <Board />
        </div>
      </div>
    </main>
  );
}
