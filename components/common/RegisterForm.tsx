"use client";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function RegisterForm() {
 const [formData, setFormData] = useState({
  fullname: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
 });
 const [error, setError] = useState("");
 const [success, setSuccess] = useState("");
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const {name, value} = e.target;
  setFormData((prev) => ({...prev, [name]: value}));
 };

 const validatePassword = (password: string) => {
  if (password.length < 8) {
   return "Password must be at least 8 characters";
  }
  if (!/[0-9]/.test(password)) {
   return "Password must contain a number";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
   return "Password must contain a symbol";
  }
  return "";
 };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validasi client-side
  if (formData.password !== formData.confirmPassword) {
   setError("Passwords don't match");
   return;
  }

  const passwordError = validatePassword(formData.password);
  if (passwordError) {
   setError(passwordError);
   return;
  }

  setLoading(true);
  setError("");

  try {
   const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify({
     fullname: formData.fullname,
     email: formData.email,
     phone: formData.phone,
     password: formData.password,
    }),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.message || "Registration failed");
   }

   setSuccess("Registration successful! Redirecting...");
   setTimeout(() => router.push("/auth/login"), 2000);
  } catch (_err) {
   setError("Registration failed. Please try again.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
   <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
    Create Your CodeTopup Account
   </h2>

   {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
     {error}
    </div>
   )}

   {success && (
    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
     {success}
    </div>
   )}

   <form
    onSubmit={handleSubmit}
    className="space-y-4">
    <div>
     <label
      htmlFor="fullname"
      className="block text-sm font-medium text-gray-700">
      Full Name
     </label>
     <input
      type="text"
      id="fullname"
      name="fullname"
      value={formData.fullname}
      onChange={handleChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
      required
     />
    </div>

    <div>
     <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700">
      Email
     </label>
     <input
      type="email"
      id="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
      required
     />
    </div>

    <div>
     <label
      htmlFor="phone"
      className="block text-sm font-medium text-gray-700">
      Phone Number
     </label>
     <input
      type="tel"
      id="phone"
      name="phone"
      value={formData.phone}
      onChange={handleChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
      required
     />
    </div>

    <div>
     <label
      htmlFor="password"
      className="block text-sm font-medium text-gray-700">
      Password
     </label>
     <input
      type="password"
      id="password"
      name="password"
      value={formData.password}
      onChange={handleChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
      required
     />
     <p className="mt-1 text-xs text-gray-500">
      Password must be at least 8 characters, contain a number and a symbol
     </p>
    </div>

    <div>
     <label
      htmlFor="confirmPassword"
      className="block text-sm font-medium text-gray-700">
      Confirm Password
     </label>
     <input
      type="password"
      id="confirmPassword"
      name="confirmPassword"
      value={formData.confirmPassword}
      onChange={handleChange}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
      required
     />
    </div>

    <div>
     <button
      type="submit"
      disabled={loading}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
       loading ? "opacity-70 cursor-not-allowed" : ""
      }`}>
      {loading ? "Registering..." : "Register"}
     </button>
    </div>
   </form>

   <div className="mt-4 text-center text-sm text-gray-600">
    Already have an account?{" "}
    <Link
     href="/auth/login"
     className="font-medium text-red-600 hover:text-red-500">
     Login here
    </Link>
   </div>
  </div>
 );
}
