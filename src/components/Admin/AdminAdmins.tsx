import { useEffect, useState } from "react";
import { getAllUsers } from "../../lib/adminUsers";

export default function AdminAdmins() {
  const [users, setUsers] = useState<{ fullName: string; email: string }[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getAllUsers()
      .then(setUsers)
      .finally(() => setLoading(false));
  }, []);

  const filtered = users.filter(u =>
    u.fullName.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 px-8 py-10 text-white">
      <h2 className="font-display text-2xl mb-6">User management</h2>
      <input
        type="text"
        placeholder="Search by name or email..."
        className="mb-4 w-full rounded px-3 py-2 text-black"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {loading ? <div>Loading...</div> : null}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="px-2 py-2">Name</th>
              <th className="px-2 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.email} className="border-b border-white/10">
                <td className="px-2 py-2">{u.fullName}</td>
                <td className="px-2 py-2">{u.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
