import RequireAuth from "@/components/RequireAuth";

export default function TestPage() {
  return (
    <RequireAuth>
      <div className="h-screen flex items-center justify-center bg-red-500">
        <h1 className="text-4xl font-bold text-white">Tailwind Works 🎉</h1>
      </div>
    </RequireAuth>
  );
}
