// app/dashboard/page.tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p>Bem-vindo ao seu painel!</p>
      </div>
    </ProtectedRoute>
  );
}
