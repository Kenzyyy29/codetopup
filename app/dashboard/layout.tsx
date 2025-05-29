"use client";
import {useState} from "react";
import {motion} from "framer-motion";
import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
 children,
}: {
 children: React.ReactNode;
}) {
 const [sidebarOpen, setSidebarOpen] = useState(true);

 return (
  <div className="flex min-h-screen bg-gray-100">
   <Sidebar
    isOpen={sidebarOpen}
    setIsOpen={setSidebarOpen}
   />

   <motion.main
    initial={{
     marginLeft: "250px",
     width: "calc(100% - 250px)",
    }}
    animate={{
     marginLeft: sidebarOpen ? "250px" : "80px",
     width: sidebarOpen ? "calc(100% - 250px)" : "calc(100% - 80px)",
     transition: {duration: 0.3, ease: "easeInOut"},
    }}
    className="flex-1 overflow-x-hidden min-h-screen">
    <div className="p-6">{children}</div>
   </motion.main>
  </div>
 );
}
