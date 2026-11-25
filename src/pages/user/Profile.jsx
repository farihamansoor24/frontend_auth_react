import { useState } from "react";
import { Alert, Badge, Button, Card, Label, TextInput } from "flowbite-react";
import { Link } from "react-router-dom";

const getStoredUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
};

const Profile = () => {
  const initialUser = getStoredUser() || {
    name: "User",
    email: "user@example.com",
    role: "Member",
    phone: "",
    bio: "",
  };

  const [formData, setFormData] = useState({
    name: initialUser.name || "",
    email: initialUser.email || "",
    role: initialUser.role || "Member",
    phone: initialUser.phone || "",
    bio: initialUser.bio || "",
  });

  const [savedMessage, setSavedMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSavedMessage("");
    setErrorMessage("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage("Name and email are required.");
      return;
    }

    const updatedUser = {
      ...getStoredUser(),
      ...formData,
      name: formData.name.trim(),
      email: formData.email.trim(),
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setSavedMessage("Profile updated successfully.");
  };

  const initials = (formData.name || "U")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:py-12">
        {/* Top Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-xs sm:flex-row sm:items-center dark:border-gray-700 dark:bg-gray-800">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800 dark:bg-blue-900/50 dark:text-blue-300">
              <span>Account Settings</span>
              <span>•</span>
              <span>{formData.role || "Member"}</span>
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
              User Profile
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              View and update your personal details and account information.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button as={Link} to="/user-dashboard" color="light">
              Back to Dashboard
            </Button>
            <Button as={Link} to="/" color="blue">
              Home
            </Button>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <Card className="h-fit dark:border-gray-700 dark:bg-gray-800">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600 text-2xl font-bold text-white">
                {initials || "U"}
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                {formData.name || "User"}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {formData.email}
              </p>
              <div className="mt-3">
                <Badge color="info">{formData.role || "Member"}</Badge>
              </div>
              {formData.bio && (
                <p className="mt-4 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {formData.bio}
                </p>
              )}
            </div>
          </Card>

          {/* Edit Form */}
          <div className="lg:col-span-2">
            <Card className="dark:border-gray-700 dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Edit Profile Information
              </h2>

              {savedMessage && (
                <Alert color="success" className="mb-4">
                  {savedMessage}
                </Alert>
              )}

              {errorMessage && (
                <Alert color="failure" className="mb-4">
                  {errorMessage}
                </Alert>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="name" value="Full Name" />
                    </div>
                    <TextInput
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="email" value="Email Address" />
                    </div>
                    <TextInput
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="phone" value="Phone Number" />
                    </div>
                    <TextInput
                      id="phone"
                      name="phone"
                      type="text"
                      placeholder="+92 300 0000000"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <div className="mb-2 block">
                      <Label htmlFor="role" value="Role" />
                    </div>
                    <TextInput
                      id="role"
                      name="role"
                      type="text"
                      value={formData.role}
                      readOnly
                      disabled
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="bio" value="Short Bio" />
                  </div>
                  <TextInput
                    id="bio"
                    name="bio"
                    type="text"
                    placeholder="Write a short note about yourself..."
                    value={formData.bio}
                    onChange={handleChange}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Button type="submit" color="blue">
                    Save Changes
                  </Button>
                  <Button as={Link} to="/user-dashboard" color="light">
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;