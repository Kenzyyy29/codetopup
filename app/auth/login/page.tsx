import LoginForm from "@/components/common/LoginForm";
import {Suspense} from "react";
import {FaSpinner} from "react-icons/fa";
import {Metadata} from "next";

export const metadata: Metadata = {
 title: "CodeTopUp - Login Page",
 description: "Login",
};

export default function LoginPage() {
 return (
  <Suspense fallback={<FaSpinner className="animate-spin" />}>
   <LoginForm />
  </Suspense>
 );
}
