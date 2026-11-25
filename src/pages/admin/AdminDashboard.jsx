import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { getUser, removeToken, removeUser } from "../../utils/authHelper";
import { useAuthContext } from "../../context/AuthContext";

const adminStats = [
  {
    label: "Total Users",
    value: "128",
    badge: "+12%",
    badgeColor: "info",
  },
  {
    label: "Active Projects",
    value: "34",
    badge: "Running",
    badgeColor: "success",
  },
  {
    label: "Pending Approvals",
    value: "7",
    badge: "Action Needed",
    badgeColor: "warning",
  },
  {
    label: "System Status",
    value: "Online",
    badge: "Healthy",
    badgeColor: "purple",
  },
];

const initialUsers = [
  {
    id: 1,
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    role: "user",
    status: "Active",
    statusColor: "success",
  },
  {
    id: 2,
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    role: "user",
    status: "Pending",
    statusColor: "warning",
  },
  {
    id: 3,
    name: "Zainab Tariq",
    email: "zainab@example.com",
    role: "admin",
    status: "Active",
    statusColor: "info",
  },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user: contextUser, setUser } = useAuthContext() || {};

  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const admin = contextUser ||
    savedUser ||
    (typeof getUser === "function" ? getUser() : null) || {
      name: "Admin",
      email: "admin@example.com",
      role: "admin",
    };

  const [users, setUsers] = useState(initialUsers);

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const isActive = item.status === "Active";
        return {
          ...item,
          status: isActive ? "Suspended" : "Active",
          statusColor: isActive ? "failure" : "success",
        };
      })
    );
  };

  const handleLogout = () => {
    removeToken();
    removeUser();

    setUser?.(null);
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
        {/* Top Admin Banner */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center dark:border-gray-700 dark:bg-gray-800">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800 dark:bg-purple-900/50 dark:text-purple-300">
              <span>Admin Panel</span>
              <span>•</span>
              <span className="capitalize">{admin.role || "admin"}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Admin Dashboard — {admin.name}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {admin.email} — Oversee users, monitor activity, and manage access.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button as={Link} to="/" color="light">
              Home
            </Button>
            <Button color="red" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {adminStats.map((item) => (
            <Card key={item.label} className="dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {item.label}
                </span>
                <Badge color={item.badgeColor}>{item.badge}</Badge>
              </div>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white">
                {item.value}
              </p>
            </Card>
          ))}
        </div>

        {/* Users Management Table */}
        <Card className="dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Registered Users
            </h2>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              Total shown: {users.length}
            </span>
          </div>

          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Name</TableHeadCell>
                  <TableHeadCell>Email</TableHeadCell>
                  <TableHeadCell>Role</TableHeadCell>
                  <TableHeadCell>Status</TableHeadCell>
                  <TableHeadCell>Action</TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {users.map((u) => (
                  <TableRow
                    key={u.id}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                      {u.name}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">{u.email}</TableCell>
                    <TableCell className="whitespace-nowrap capitalize">
                      {u.role}
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Badge color={u.statusColor}>{u.status}</Badge>
                    </TableCell>
                    <TableCell className="whitespace-nowrap">
                      <Button
                        size="xs"
                        color="light"
                        onClick={() => handleToggleStatus(u.id)}
                      >
                        {u.status === "Active" ? "Suspend" : "Activate"}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;