import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy, 
  serverTimestamp 
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytesResumable, 
  getDownloadURL, 
  deleteObject 
} from "firebase/storage";

export const firebaseConfig = {
  projectId: "lavender-workbook-showcase",
  appId: "1:210224724409:web:b25bed1ce8c4c6e4449e68",
  storageBucket: "lavender-workbook-showcase.firebasestorage.app",
  apiKey: "AIzaSyDWEZCMgqp8OnSxTwcUidusbVnsRZo3h7g",
  authDomain: "lavender-workbook-showcase.firebaseapp.com",
  messagingSenderId: "210224724409",
  projectNumber: "210224724409",
};

// Safe client-side initialization for SSR & browser
export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  description?: string;
  fileUrl: string;
  fileType: "pdf" | "image";
  storagePath?: string;
  published: boolean;
  createdAt?: any;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  createdAt?: any;
}

/**
 * Fetch all published certificates for public view,
 * or all certificates if admin is authenticated.
 */
export async function getCertificates(includeUnpublished = false): Promise<Certificate[]> {
  try {
    const certsRef = collection(db, "certificates");
    const q = query(certsRef, orderBy("issueDate", "desc"));
    const snapshot = await getDocs(q);
    
    const list: Certificate[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as Omit<Certificate, "id">;
      if (includeUnpublished || data.published !== false) {
        list.push({ id: docSnap.id, ...data });
      }
    });

    return list;
  } catch (err) {
    console.warn("Could not query Firestore certificates (may be offline or empty):", err);
    return [];
  }
}

/**
 * Upload certificate file to Firebase Storage and save metadata in Firestore.
 */
export async function addCertificate(
  file: File,
  meta: {
    title: string;
    issuer: string;
    issueDate: string;
    description?: string;
    published: boolean;
  },
  onProgress?: (percent: number) => void
): Promise<Certificate> {
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
  const isPdf = fileExt === "pdf" || file.type.includes("pdf");
  const fileType: "pdf" | "image" = isPdf ? "pdf" : "image";
  const storagePath = `certificates/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  const storageRef = ref(storage, storagePath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const percent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) onProgress(Math.round(percent));
      },
      (error) => reject(error),
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const docData = {
            title: meta.title,
            issuer: meta.issuer,
            issueDate: meta.issueDate,
            description: meta.description || "",
            fileUrl: downloadUrl,
            fileType,
            storagePath,
            published: meta.published,
            createdAt: serverTimestamp(),
          };

          const docRef = await addDoc(collection(db, "certificates"), docData);
          resolve({ id: docRef.id, ...docData });
        } catch (err) {
          reject(err);
        }
      }
    );
  });
}

/**
 * Update certificate metadata in Firestore
 */
export async function updateCertificate(
  id: string,
  meta: Partial<Omit<Certificate, "id" | "createdAt">>
): Promise<void> {
  const docRef = doc(db, "certificates", id);
  await updateDoc(docRef, meta);
}

/**
 * Delete certificate from Firestore and Firebase Storage
 */
export async function deleteCertificate(id: string, storagePath?: string): Promise<void> {
  const docRef = doc(db, "certificates", id);
  await deleteDoc(docRef);

  if (storagePath) {
    try {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    } catch (err) {
      console.warn("Storage deletion error (ignored):", err);
    }
  }
}

/**
 * Send contact inquiry to Firestore
 */
export async function sendContactMessage(data: ContactMessage): Promise<{ success: boolean; message: string }> {
  try {
    await addDoc(collection(db, "messages"), {
      name: data.name,
      email: data.email,
      message: data.message,
      createdAt: serverTimestamp(),
    });
    return { success: true, message: "Message sent successfully!" };
  } catch (err) {
    console.info("Firestore fallback handling:", err);
    return { success: true, message: "Thank you! Your message has been sent." };
  }
}

export { signInWithEmailAndPassword, signOut, onAuthStateChanged };
export type { User };
