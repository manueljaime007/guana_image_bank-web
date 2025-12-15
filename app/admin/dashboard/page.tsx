// app/admin/page.tsx
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminPage() {
  return (
    <ProtectedRoute role="admin">
      <div className="p-8">
        <h1 className="text-2xl font-bold">Painel do Admin</h1>
        <p>Somente admins podem ver esta página.</p>
      </div>
    </ProtectedRoute>
  );
}
