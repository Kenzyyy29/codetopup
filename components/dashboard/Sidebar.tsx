"use client";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import {useState, useEffect} from "react";
import {
 FiMenu,
 FiX,
 FiHome,
 FiUsers,
 FiSettings,
 FiShoppingBag,
 FiBarChart2,
 FiFileText,
 FiLogOut,
} from "react-icons/fi";

const itemVariants = {
 hidden: {opacity: 0, x: -20},
 visible: {
  opacity: 1,
  x: 0,
  transition: {
   type: "spring",
   stiffness: 120,
   damping: 8,
  },
 },
};

const mobileItemVariants = {
 hidden: {opacity: 0, x: -20},
 visible: {
  opacity: 1,
  x: 0,
  transition: {
   type: "spring",
   stiffness: 100,
   damping: 10,
  },
 },
};

export default function AdminSidebar({
 isOpen,
 setIsOpen,
}: {
 isOpen: boolean;
 setIsOpen: (open: boolean) => void;
}) {
 const pathname = usePathname();
 const router = useRouter();
 const [mobileOpen, setMobileOpen] = useState(false);

 const handleLogout = () => {
  console.log("Logging out...");
  router.push("/auth/login");
 };

 useEffect(() => {
  if (mobileOpen) {
   document.body.style.overflow = "hidden";
  } else {
   document.body.style.overflow = "";
  }
  return () => {
   document.body.style.overflow = "";
  };
 }, [mobileOpen]);

 const navItems = [
  {
   name: "Dashboard",
   path: "/dashboard",
   icon: <FiHome className="text-lg" />,
  },
  {
   name: "Users",
   path: "/dashboard/users",
   icon: <FiUsers className="text-lg" />,
  },
  {
   name: "Products",
   path: "/dashboard/products",
   icon: <FiShoppingBag className="text-lg" />,
  },
  {
   name: "Orders",
   path: "/dashboard/orders",
   icon: <FiFileText className="text-lg" />,
  },
  {
   name: "Analytics",
   path: "/dashboard/analytics",
   icon: <FiBarChart2 className="text-lg" />,
  },
  {
   name: "Settings",
   path: "/dashboard/settings",
   icon: <FiSettings className="text-lg" />,
  },
 ];

 return (
  <>
   {/* Mobile Menu Button */}
   <motion.button
    className="md:hidden fixed top-4 left-4 z-50 bg-red-800 text-white p-2 rounded-lg hover:bg-red-700 focus:outline-none shadow-lg"
    onClick={() => setMobileOpen(!mobileOpen)}
    whileHover={{scale: 1.1}}
    whileTap={{scale: 0.95}}>
    {mobileOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
   </motion.button>

   {/* Desktop Sidebar */}
   <motion.div
    initial={{width: isOpen ? "250px" : "80px"}}
    animate={{width: isOpen ? "250px" : "80px"}}
    transition={{duration: 0.3, ease: "easeInOut"}}
    className="hidden md:flex flex-col fixed h-screen bg-red-700/95 text-white shadow-lg z-40"
    style={{overflow: "hidden"}}>
    {/* Sidebar Header */}
    <div className="flex items-center justify-between p-4 border-b border-red-700 min-w-[250px]">
     {isOpen && (
      <motion.h2
       initial={{opacity: 0}}
       animate={{opacity: 1}}
       className="text-xl font-bold whitespace-nowrap">
       Admin Panel
      </motion.h2>
     )}
     <button
      onClick={() => setIsOpen(!isOpen)}
      className="p-2 rounded-lg hover:bg-red-700">
      {isOpen ? <FiX /> : <FiMenu />}
     </button>
    </div>

    {/* Sidebar Items */}
    <div
     className="flex-1 overflow-y-auto p-2"
     style={{scrollbarWidth: "none", msOverflowStyle: "none"}}>
     <style jsx>{`
      .flex-1::-webkit-scrollbar {
       display: none;
      }
     `}</style>
     <motion.div
      initial="hidden"
      animate="visible"
      variants={{
       visible: {
        transition: {
         staggerChildren: 0.1,
        },
       },
      }}>
      {navItems.map((item) => (
       <motion.div
        key={item.path}
        variants={itemVariants}
        whileHover={{scale: 1.02}}
        className="mb-1">
        <Link
         href={item.path}
         className={`flex items-center p-3 rounded-lg transition-all ${
          pathname === item.path
           ? "bg-red-700/80 text-white font-medium"
           : "text-gray-300 hover:bg-red-700/80 hover:text-white"
         }`}>
         <span className="mr-3">{item.icon}</span>
         {isOpen && (
          <motion.span
           initial={{opacity: 0}}
           animate={{opacity: 1}}
           className="whitespace-nowrap">
           {item.name}
          </motion.span>
         )}
        </Link>
       </motion.div>
      ))}
     </motion.div>
    </div>

    {/* Logout Button */}
    <div className="p-4 border-t border-red-700">
     <motion.button
      onClick={handleLogout}
      className={`flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-red-700 hover:text-white transition-all ${
       isOpen ? "justify-start" : "justify-center"
      }`}
      whileHover={{scale: 1.02}}
      whileTap={{scale: 0.98}}>
      <FiLogOut className="text-lg" />
      {isOpen && (
       <motion.span
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        className="ml-3 whitespace-nowrap">
        Logout
       </motion.span>
      )}
     </motion.button>
    </div>
   </motion.div>

   {/* Mobile Sidebar */}
   <AnimatePresence>
    {mobileOpen && (
     <motion.div
      initial={{opacity: 0, x: -300}}
      animate={{opacity: 1, x: 0}}
      exit={{opacity: 0, x: -300}}
      transition={{duration: 0.3}}
      className="md:hidden fixed inset-y-0 left-0 w-64 bg-red-800 text-white shadow-lg z-40">
      <div className="flex items-center justify-between p-4 border-b border-red-700">
       <h2 className="text-xl font-bold">Admin Panel</h2>
       <button
        onClick={() => setMobileOpen(false)}
        className="p-2 rounded-lg hover:bg-red-700">
        <FiX />
       </button>
      </div>

      <div
       className="p-2 overflow-y-auto h-[calc(100vh-120px)]"
       style={{scrollbarWidth: "none", msOverflowStyle: "none"}}>
       <style jsx>{`
        div::-webkit-scrollbar {
         display: none;
        }
       `}</style>
       <motion.div
        initial="hidden"
        animate="visible"
        variants={{
         visible: {
          transition: {
           staggerChildren: 0.1,
          },
         },
        }}>
        {navItems.map((item) => (
         <motion.div
          key={item.path}
          variants={mobileItemVariants}
          whileHover={{scale: 1.02}}
          className="mb-1">
          <Link
           href={item.path}
           onClick={() => setMobileOpen(false)}
           className={`flex items-center p-3 rounded-lg transition-all ${
            pathname === item.path
             ? "bg-red-700 text-white font-medium"
             : "text-gray-300 hover:bg-red-700 hover:text-white"
           }`}>
           <span className="mr-3">{item.icon}</span>
           <span>{item.name}</span>
          </Link>
         </motion.div>
        ))}
       </motion.div>
      </div>

      {/* Mobile Logout Button */}
      <div className="p-4 border-t border-red-700">
       <button
        onClick={handleLogout}
        className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-red-700 hover:text-white transition-all">
        <FiLogOut className="text-lg mr-3" />
        <span>Logout</span>
       </button>
      </div>
     </motion.div>
    )}
   </AnimatePresence>
  </>
 );
}
