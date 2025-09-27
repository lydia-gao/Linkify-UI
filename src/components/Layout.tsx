import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-linkify-background min-h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        {children}
      </div>
    </div>
  );
}
