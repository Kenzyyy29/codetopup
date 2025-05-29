import {
 addDoc,
 collection,
 doc,
 getDoc,
 getDocs,
 getFirestore,
 query,
 where,
} from "firebase/firestore";
import {app, db} from "@/lib/firebase/config";
import bcrypt from "bcryptjs";

const firestore = getFirestore(app);

export interface User {
 id?: string;
 fullname: string;
 email: string;
 phone: string;
 password: string;
 role?: string;
 created_at?: Date;
 updated_at?: Date;
}

export async function retrieveData(collectionName: string) {
 const snapshot = await getDocs(collection(firestore, collectionName));
 return snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 }));
}

export async function retrieveDataById(
 collectionName: string,
 id: string
): Promise<User | null> {
 const snapshot = await getDoc(doc(firestore, collectionName, id));
 if (!snapshot.exists()) {
  return null;
 }
 return {
  id: snapshot.id,
  ...snapshot.data(),
 } as User;
}

export async function register(data: {
 fullname: string;
 email: string;
 phone: string;
 password: string;
}) {
 try {
  // Validasi email unik
  const q = query(collection(db, "users"), where("email", "==", data.email));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
   return {
    status: false,
    statusCode: 400,
    message: "Email already exists",
   };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 10);

  // Tambah user baru
  const docRef = await addDoc(collection(db, "users"), {
   fullname: data.fullname,
   email: data.email,
   phone: data.phone,
   password: hashedPassword,
   role: "member",
   created_at: new Date(),
   updated_at: new Date(),
  });

  return {
   status: true,
   statusCode: 200,
   message: "User registered successfully",
   userId: docRef.id,
  };
 } catch (error) {
  console.error("Firestore error:", error);
  return {
   status: false,
   statusCode: 500,
   message: "Failed to register user",
  };
 }
}

export async function login(data: {email: string}): Promise<User | null> {
 const q = query(
  collection(firestore, "users"),
  where("email", "==", data.email)
 );
 const snapshot = await getDocs(q);
 const users = snapshot.docs.map((doc) => ({
  id: doc.id,
  ...doc.data(),
 })) as User[];

 return users.length > 0 ? users[0] : null;
}
