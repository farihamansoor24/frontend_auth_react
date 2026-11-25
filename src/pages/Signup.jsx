import { useState,useRef } from "react";
import { Button, Card, Label, Radio, Select, Textarea, TextInput } from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {setUser,setToken} from "../utils/authHelper"

const countries = [
  "Pakistan",
  "United States",
  "United Kingdom",
  "Canada",
  "United Arab Emirates",
  "Saudi Arabia",
  "Australia",
  "Germany",
];

const genders = ["Male", "Female", "Other"];

const Signup = () => {
  const navigate = useNavigate();

 const formRef= useRef(null);

  const [statusMessage, setStatusMessage] = useState("");

  // Optional: connect to your AuthContext if exposed
  // const { signup } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setStatusMessage("");
    const rawData = new FormData(formRef.current);
    const formData = Object.fromEntries(rawData.entries());
    console.log('Form from useref', formData)
    const res= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`,formData)
    // console.log(res.data);
    if(res.data.success){
      setUser(res.data.user);
      setToken(res.data.token);
    //  setStatusMessage("Account created! Redirecting to login...");
             setTimeout(() => navigate("/user-dashboard"), 700);
    }

  };

  return (
    <section className="flex min-h-[calc(100vh-140px)] items-center justify-center bg-gray-50 px-4 py-12 dark:bg-gray-900">
      <div className="w-full max-w-2xl">
        <Card className="border-gray-200 shadow-md dark:border-gray-700 dark:bg-gray-800">
          <div className="mb-2 text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create Your Account
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Fill in your details below to get started
            </p>
          </div>

          {statusMessage && (
            <div className="rounded-lg bg-green-50 p-3 text-center text-sm font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
              {statusMessage}
            </div>
          )}

          <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
            {/* Name */}
            <div className="sm:col-span-2">
              <div className="mb-1.5 block">
                <Label htmlFor="name">Full Name</Label>
              </div>
              <TextInput
                id="name"
                name="name"
                type="text"
                placeholder="Ali Khan"
                // value={formData.name}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <div className="mb-1.5 block">
                <Label htmlFor="email">Email Address</Label>
              </div>
              <TextInput
                id="email"
                name="email"
                type="email"
                placeholder="name@example.com"
                // value={formData.email}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 block">
                <Label htmlFor="password">Password</Label>
              </div>
              <TextInput
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                // value={formData.password}
                // onChange={handleChange}
                minLength={6}
                required
              />
            </div>

            {/* Contact */}
            <div>
              <div className="mb-1.5 block">
                <Label htmlFor="contact">Contact Number</Label>
              </div>
              <TextInput
                id="contact"
                name="contact"
                type="tel"
                placeholder="+92 300 1234567"
                // value={formData.contact}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Country */}
            <div>
              <div className="mb-1.5 block">
                <Label htmlFor="country">Country</Label>
              </div>
              <Select
                id="country"
                name="country"
                // value={formData.country}
                // onChange={handleChange}
                required
              >
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </Select>
            </div>

            {/* Gender */}
            <div className="sm:col-span-2">
              <div className="mb-2 block">
                <Label>Gender</Label>
              </div>
              <div className="flex flex-wrap gap-5">
                {genders.map((option) => (
                  <div key={option} className="flex items-center gap-2">
                    <Radio
                      id={`gender-${option}`}
                      name="gender"
                      value={option}
                      // checked={formData.gender === option}
                      // onChange={handleChange}
                    />
                    <Label htmlFor={`gender-${option}`} className="font-normal">
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Address */}
            <div className="sm:col-span-2">
              <div className="mb-1.5 block">
                <Label htmlFor="address">Address</Label>
              </div>
              <Textarea
                id="address"
                name="address"
                rows={3}
                placeholder="Street, area, city, postal code"
                // value={formData.address}
                // onChange={handleChange}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="mt-2 sm:col-span-2">
              <Button type="submit" color="blue" className="w-full">
                Create Account
              </Button>
            </div>
          </form>

          {/* Login Link */}
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              Sign in
            </Link>
          </p>
        </Card>
      </div>
    </section>
  );
};

export default Signup;