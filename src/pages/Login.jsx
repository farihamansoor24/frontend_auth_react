import { useState,useRef } from "react";
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { setToken, setUser } from "../utils/authHelper";

const Login = () => {
  const navigate = useNavigate();
  const formRef = useRef(null);

  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetSent, setResetSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  // Optional: connect to your AuthContext if exposed
  // const { login, loginWithGoogle } = useAuth();

  const handleSubmit = async(e) => {
    e.preventDefault();
    setStatusMessage("");
    const rawData = new FormData(formRef.current);
    const formData = Object.fromEntries(rawData.entries());
    // console.log('Form from useref', formData)
    const res= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,formData)
    // setStatusMessage("Signed in! Redirecting to home...");
    // setTimeout(() => navigate("/login"), 500);
     if(res.data.success){
          setUser(res.data.user);
          setToken(res.data.token);
                 setTimeout(() => navigate("/user/user-dashboard"), 700);
        }
  };

  const handleGoogleLogin = () => {
    setStatusMessage("");
    // Replace with Firebase / Supabase / OAuth / AuthContext Google sign-in
    console.log("Google auth triggered");
    setStatusMessage("Continuing with Google...");
  };

  const handleForgotPassword = async(e) => {
    e.preventDefault();
    if (!resetEmail.trim()) return;
    const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot-password`,{email:resetEmail})
    setResetSent(true);
  };

  return (
    <section className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <Card className="border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome Back
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {statusMessage && (
            <div className="rounded-lg bg-blue-50 p-3 text-center text-sm font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
              {statusMessage}
            </div>
          )}

          {/* Google Auth Button */}
          <Button
            type="button"
            color="light"
            onClick={handleGoogleLogin}
            className="flex w-full items-center justify-center gap-2 border border-gray-300 dark:border-gray-600"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.54-1.14 2.85-2.4 3.72v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.72z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
              />
            </svg>
            <span>Continue with Google</span>
          </Button>

          {/* Divider */}
          <div className="relative my-2 flex items-center">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
            <span className="mx-3 shrink-0 text-xs uppercase text-gray-400 dark:text-gray-500">
              or sign in with email
            </span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700" />
          </div>

          {/* Email & Password Form */}
          <form ref= {formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <div className="mb-1.5 block">
                <Label htmlFor="email">Email Address</Label>
              </div>
              <TextInput
                id="email"
                type="email"
                name="email"
                placeholder="name@example.com"
              required
              />
            </div>

            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <button
                  type="button"
                 onClick={() => {
                  const currentEmail = formRef.current?.email?.value?.trim() || "";
                  setShowForgotModal((prev) => !prev);
                  setResetSent(false);
                  setResetEmail(currentEmail);
                }}
                  className="text-xs font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  Forgot password?
                </button>
              </div>
              <TextInput
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
                // value={password}
                // onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>


            <Button type="submit" color="blue" className="mt-1 w-full">
              Sign In
            </Button>
          </form>

         {showForgotModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
    onClick={() => setShowForgotModal(false)}
  >
    <div
      className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 shadow-xl dark:border-gray-700 dark:bg-gray-800"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900 dark:text-white">
          Forgot Password
        </h2>
        <button
          type="button"
          onClick={() => setShowForgotModal(false)}
          className="text-sm text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
        >
          ✕
        </button>
      </div>

      {resetSent ? (
        <div className="space-y-3">
          <p className="text-sm text-green-700 dark:text-green-400">
          A password reset link has been sent to <strong>{resetEmail}</strong>.
          </p>
          <Button
            type="button"
            color="blue"
            size="sm"
            className="w-full"
            onClick={() => setShowForgotModal(false)}
          >
            Done
          </Button>
        </div>
      ) : (
        <form onSubmit={handleForgotPassword} className="space-y-3">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Enter your email address and we&apos;ll send you a reset link.
          </p>
          <TextInput
            type="email"
            placeholder="you@example.com"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              color="light"
              size="sm"
              onClick={() => setShowForgotModal(false)}
            >
              Cancel
            </Button>
            <Button type="submit" color="blue" size="sm">
              Send Reset Link
            </Button>
          </div>
        </form>
      )}
    </div>
  </div>
)}

          {/* Sign Up Link */}
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign up
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Login;