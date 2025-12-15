// app/dashboard/page.tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute role="user">
      <div className="p-8">
        <h1 className="text-2xl font-bold">Dashboard do Usuário</h1>
        <p>Somente usuários comuns podem acessar.</p>
      </div>
    </ProtectedRoute>
  );
}
