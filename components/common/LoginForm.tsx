"use client";
import {useState} from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function LoginForm() {
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
   const result = await signIn("credentials", {
    email,
    password,
    redirect: false,
   });

   if (result?.error) {
    setError("Invalid email or password");
   } else {
    router.push("/dashboard");
   }
  } catch (_err) {
   setError("Something went wrong. Please try again.");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
   <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
    Login to CodeTopup
   </h2>

   {error && (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
     {error}
    </div>
   )}

   <form
    onSubmit={handleSubmit}
    className="space-y-4">
    <div>
     <label
      htmlFor="email"
      className="block text-sm font-medium text-gray-700">
      Email
     </label>
     <input
      type="email"
      id="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
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
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
      required
     />
    </div>

    <div className="flex items-center justify-between">
     <div className="flex items-center">
      <input
       id="remember-me"
       name="remember-me"
       type="checkbox"
       className="h-4 w-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
      />
      <label
       htmlFor="remember-me"
       className="ml-2 block text-sm text-gray-900">
       Remember me
      </label>
     </div>

     <div className="text-sm">
      <Link
       href="/auth/forgot-password"
       className="font-medium text-red-600 hover:text-red-500">
       Forgot password?
      </Link>
     </div>
    </div>

    <div>
     <button
      type="submit"
      disabled={loading}
      className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 ${
       loading ? "opacity-70 cursor-not-allowed" : ""
      }`}>
      {loading ? "Logging in..." : "Login"}
     </button>
    </div>
   </form>

   <div className="mt-4 text-center text-sm text-gray-600">
    Don&apos;t have an account?{" "}
    <Link
     href="/auth/register"
     className="font-medium text-red-600 hover:text-red-500">
     Register here
    </Link>
   </div>
  </div>
 );
}
