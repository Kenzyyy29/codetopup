import RegisterForm from "@/components/common/RegisterForm";
import {Suspense} from "react";
import {FaSpinner} from "react-icons/fa";

export default function LoginPage() {
 return (
  <Suspense fallback={<FaSpinner className="animate-spin" />}>
   <RegisterForm />
  </Suspense>
 );
}
