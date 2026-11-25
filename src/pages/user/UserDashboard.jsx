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

const stats = [
  {
    label: "Active Projects",
    value: "4",
    badge: "In Progress",
    badgeColor: "info",
  },
  {
    label: "Completed Tasks",
    value: "18",
    badge: "On Track",
    badgeColor: "success",
  },
  {
    label: "Pending Requests",
    value: "2",
    badge: "Review",
    badgeColor: "warning",
  },
  {
    label: "Account Status",
    value: "Verified",
    badge: "Active",
    badgeColor: "purple",
  },
];

const initialActivities = [
  {
    id: 1,
    service: "Web Development",
    title: "Landing Page & Auth Flow",
    status: "In Progress",
    statusColor: "info",
    updatedAt: "Today",
  },
  {
    id: 2,
    service: "UI / UX Design",
    title: "Dashboard Wireframes",
    status: "Completed",
    statusColor: "success",
    updatedAt: "2 days ago",
  },
  {
    id: 3,
    service: "Cloud & API Integration",
    title: "JWT Token Middleware Setup",
    status: "Pending",
    statusColor: "warning",
    updatedAt: "3 days ago",
  },
];

const UserDashboard = () => {
  const navigate = useNavigate();

  const savedUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const user = savedUser || {
    name: "User",
    email: "user@example.com",
    role: "Member",
  };

  const [activities] = useState(initialActivities);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
        {/* Top Welcome Banner */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center dark:border-gray-700 dark:bg-gray-800">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              <span>User Dashboard</span>
              <span>•</span>
              <span>{user.role || "Member"}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              Welcome back, {user.name}
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {user.email} — Manage your services, track progress, and update your account.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Top Banner Profile Link */}
            <Button as={Link} to="/user-profile" color="light">
              Profile
            </Button>
            <Button as={Link} to="/contact" color="blue">
              New Request
            </Button>
            <Button color="light" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>

        {/* Summary Stats Cards */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
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

        {/* Main Grid: Recent Activity Table + Profile / Quick Actions */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Projects / Requests */}
          <div className="lg:col-span-2">
            <Card className="dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Recent Services & Activity
                </h2>
                <Link
                  to="/contact"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Request More
                </Link>
              </div>

              <div className="overflow-x-auto">
                <Table hoverable>
                  <TableHead>
                    <TableRow>
                      <TableHeadCell>Project / Task</TableHeadCell>
                      <TableHeadCell>Service</TableHeadCell>
                      <TableHeadCell>Status</TableHeadCell>
                      <TableHeadCell>Updated</TableHeadCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="divide-y">
                    {activities.map((row) => (
                      <TableRow
                        key={row.id}
                        className="bg-white dark:border-gray-700 dark:bg-gray-800"
                      >
                        <TableCell className="font-medium whitespace-nowrap text-gray-900 dark:text-white">
                          {row.title}
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{row.service}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <Badge color={row.statusColor}>{row.status}</Badge>
                        </TableCell>
                        <TableCell className="whitespace-nowrap text-gray-500 dark:text-gray-400">
                          {row.updatedAt}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </div>

          {/* Account Summary & Quick Links */}
          <div className="space-y-6">
            <Card className="dark:border-gray-700 dark:bg-gray-800">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                  Profile Summary
                </h2>
                {/* Profile Summary Link */}
                <Link
                  to="/user-profile"
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  View / Edit
                </Link>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Name:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Email:</span>
                  <span className="font-medium text-gray-900 dark:text-white">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Role:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    {user.role || "Member"}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-3 text-lg font-bold text-gray-900 dark:text-white">
                Quick Links
              </h2>
              <div className="flex flex-col gap-2">
                {/* Quick Links Profile Button */}
                <Button as={Link} to="/user-profile" color="light" size="sm">
                  My Profile
                </Button>
                <Button as={Link} to="/" color="light" size="sm">
                  Back to Home
                </Button>
                <Button as={Link} to="/about" color="light" size="sm">
                  About Us
                </Button>
                <Button as={Link} to="/contact" color="blue" size="sm">
                  Contact Support
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;