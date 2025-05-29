"use client";
import {motion, AnimatePresence} from "framer-motion";
import Link from "next/link";
import {usePathname} from "next/navigation";
import {useState, useEffect} from "react";
import {FiMenu, FiX} from "react-icons/fi";
import {FaGamepad} from "react-icons/fa";

const itemVariants = {
 hidden: {opacity: 0, y: -20},
 visible: {
  opacity: 1,
  y: 0,
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

export default function Navbar() {
 const pathname = usePathname();
 const [isOpen, setIsOpen] = useState(false);
 const [scrolled, setScrolled] = useState(false);

 useEffect(() => {
  const handleScroll = () => {
   setScrolled(window.scrollY > 10);
  };
  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
 }, []);

 const navItems = [
  {
   name: "Games",
   path: "/games",
  },
  {
   name: "Vouchers",
   path: "/vouchers",
  },
  {
   name: "Promo",
   path: "/promo",
  },
  {
   name: "Berita",
   path: "/news",
  },
  {
   name: "Kontak",
   path: "/contact",
  },
 ];

 return (
  <motion.nav
   initial="hidden"
   animate="visible"
   variants={{
    visible: {
     transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
     },
    },
   }}
   className={`fixed w-full z-50 transition-all duration-500 ease-in-out ${
    scrolled
     ? "bg-red-700/95 py-2 backdrop-blur-sm shadow-lg"
     : "bg-red-700/90 py-3"
   }`}>
   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
     {/* Logo/Brand */}
     <motion.div
      variants={itemVariants}
      className="flex-shrink-0 flex items-center">
      <Link
       href="/"
       className="flex items-center group">
       <motion.div
        className="bg-white p-2 rounded-lg shadow-lg mr-3 group-hover:rotate-12 transition-transform duration-300"
        whileHover={{scale: 1.1, rotate: 15}}>
        <FaGamepad className="text-red-600 text-2xl" />
       </motion.div>
       <span
        className="text-white text-3xl font-bold"
        style={{
         fontFamily: "'Teko', sans-serif",
         textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
         letterSpacing: "1px",
        }}>
        CodeTopup
       </span>
      </Link>
     </motion.div>

     {/* Desktop Navigation */}
     <motion.div
      variants={itemVariants}
      className="hidden md:flex items-center space-x-2">
      {navItems.map((item) => (
       <motion.div
        key={item.path}
        className="relative"
        whileHover={{scale: 1.05}}
        transition={{type: "spring", stiffness: 300}}>
        <div className="flex items-center">
         <Link
          href={item.path}
          className={`flex items-center px-4 py-2 rounded-md text-md font-medium transition-all duration-300 ${
           pathname === item.path
            ? "bg-white text-red-700 shadow-md font-bold"
            : "text-white hover:bg-red-600 hover:text-white"
          }`}>
          {item.name}
          {pathname === item.path && (
           <motion.span
            layoutId="activeItem"
            className="absolute bottom-0 left-0 w-full h-1 bg-yellow-400"
            transition={{type: "spring", stiffness: 300, damping: 30}}
           />
          )}
         </Link>
        </div>
       </motion.div>
      ))}
     </motion.div>

     {/* Mobile Menu Button */}
     <motion.button
      className="md:hidden text-white p-2 rounded-lg hover:bg-red-600 focus:outline-none"
      onClick={() => setIsOpen(!isOpen)}
      whileHover={{scale: 1.1, backgroundColor: "rgba(220, 38, 38, 0.8)"}}
      whileTap={{scale: 0.95}}>
      {isOpen ? <FiX className="h-6 w-6" /> : <FiMenu className="h-6 w-6" />}
     </motion.button>
    </div>
   </div>

   {/* Mobile Menu */}
   <AnimatePresence>
    {isOpen && (
     <motion.div
      initial={{opacity: 0, height: 0}}
      animate={{opacity: 1, height: "auto"}}
      exit={{opacity: 0, height: 0}}
      transition={{duration: 0.4, ease: "easeInOut"}}
      className="md:hidden bg-red-800 overflow-hidden">
      <motion.div
       variants={{
        visible: {
         transition: {
          staggerChildren: 0.1,
          delayChildren: 0.2,
         },
        },
       }}
       initial="hidden"
       animate="visible"
       className="px-4 pt-2 pb-4 space-y-2">
       {navItems.map((item) => (
        <motion.div
         key={item.path}
         variants={mobileItemVariants}
         whileHover={{scale: 1.02}}
         whileTap={{scale: 0.98}}>
         <Link
          href={item.path}
          onClick={() => setIsOpen(false)}
          className={`flex items-center px-4 py-3 rounded-lg text-base font-medium transition-all ${
           pathname === item.path
            ? "bg-white text-red-700 font-bold"
            : "text-white hover:bg-red-700"
          }`}>
          {item.name}
         </Link>
        </motion.div>
       ))}
      </motion.div>
     </motion.div>
    )}
   </AnimatePresence>
  </motion.nav>
 );
}
