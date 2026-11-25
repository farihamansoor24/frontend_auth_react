import { useState } from "react";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMessage("");
    setErrorMessage("");

    if (!token) {
      setErrorMessage("Invalid or missing reset token.");
      return;
    }

    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL?.replace(/\/+$/, "");
      const res = await axios.post(`${baseUrl}/auth/reset-password/${token}`, {
        password,
        token,
      });

      if (res.data?.success) {
        setStatusMessage(
          res.data.message || "Password reset successfully! Redirecting to login..."
        );
        setPassword("");
        setConfirmPassword("");
        setTimeout(() => {
          navigate("/login", { replace: true });
        }, 1200);
      } else {
        setErrorMessage(res.data?.message || "Unable to reset password.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message ||
          "Reset link is invalid or expired. Please request a new one."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Card className="border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Reset Password
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Enter your new password below
            </p>
          </div>

          {statusMessage && (
            <div className="rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
              {statusMessage}
            </div>
          )}

          {errorMessage && (
            <div className="rounded-lg bg-red-50 p-3 text-center text-sm font-medium text-red-700 dark:bg-red-900/40 dark:text-red-300">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-1.5 block">
                <Label htmlFor="password">New Password</Label>
              </div>
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div>
              <div className="mb-1.5 block">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
              </div>
              <TextInput
                id="confirmPassword"
                type="password"
                name="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              color="blue"
              className="mt-1 w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Resetting Password..." : "Reset Password"}
            </Button>
          </form>

          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Remembered your password?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Back to login
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default ResetPassword;