import LeakTable from "./components/contents/main";
import Sidebar from "./components/sidebar/sibebar";

export default function Home() {
  return (
   <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">
        <LeakTable />
      </main>
    </div>
  );
}
