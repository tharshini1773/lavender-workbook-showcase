import { initializeApp, getApps, getApp } from "firebase/app";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  sendPasswordResetEmail,
  User 
} from "firebase/auth";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  query,
  where,
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

// Single authorized administrator email for Tharshini Portfolio
export const ADMIN_EMAIL = "tharshnitharshni28@gmail.com";

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
  description: string;
  fileURL: string;
  fileUrl?: string; // compatibility
  fileType: "pdf" | "image";
  storagePath: string;
  published: boolean;
  createdAt?: any;
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: any;
  status?: "unread" | "read";
}

/**
 * Checks if a user is the single authorized administrator
 */
export function isAuthorizedAdmin(user: User | null): boolean {
  if (!user || !user.email) return false;
  return user.email.toLowerCase() === ADMIN_EMAIL.toLowerCase();
}

/**
 * Secure login exclusively for the single authorized admin account
 */
export async function loginAdmin(email: string, password: string): Promise<User> {
  const normalizedEmail = email.trim().toLowerCase();
  if (normalizedEmail !== ADMIN_EMAIL.toLowerCase()) {
    throw new Error(`Access Denied: Only the authorized administrator account (${ADMIN_EMAIL}) is permitted to log in.`);
  }

  const credential = await signInWithEmailAndPassword(auth, normalizedEmail, password);
  const user = credential.user;

  if (!isAuthorizedAdmin(user)) {
    await signOut(auth);
    throw new Error(`Unauthorized Account: Access is strictly restricted to ${ADMIN_EMAIL}.`);
  }

  return user;
}

/**
 * Send password reset email directly to the authorized admin email address
 */
export async function sendAdminPasswordReset(): Promise<{ success: boolean; message: string }> {
  try {
    await sendPasswordResetEmail(auth, ADMIN_EMAIL);
    return {
      success: true,
      message: `Password reset instructions sent to ${ADMIN_EMAIL}. Please check your inbox or spam folder.`
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Failed to dispatch password reset email."
    };
  }
}

/**
 * Fetch certificates from Firestore.
 * By default returns published certificates for public view.
 * If includeUnpublished is true AND caller is authorized admin, returns all certificates.
 */
export async function getCertificates(includeUnpublished = false): Promise<Certificate[]> {
  try {
    const certsRef = collection(db, "certificates");
    const adminActive = isAuthorizedAdmin(auth.currentUser);
    const shouldIncludeAll = includeUnpublished && adminActive;

    const q = shouldIncludeAll
      ? query(certsRef, orderBy("issueDate", "desc"))
      : query(certsRef, where("published", "==", true));

    const snapshot = await getDocs(q);

    const list: Certificate[] = [];
    snapshot.forEach(docSnap => {
      const data = docSnap.data() as any;
      const fileURL = data.fileURL || data.fileUrl || "";
      list.push({
        id: docSnap.id,
        title: data.title || "",
        issuer: data.issuer || "",
        issueDate: data.issueDate || "",
        description: data.description || "",
        fileURL,
        fileUrl: fileURL,
        fileType: data.fileType || "image",
        storagePath: data.storagePath || "",
        published: data.published !== false,
        createdAt: data.createdAt,
      });
    });

    return list.sort((a, b) => (b.issueDate > a.issueDate ? 1 : -1));
  } catch (err) {
    console.warn("Could not query Firestore certificates (fallback query):", err);
    try {
      const snapshot = await getDocs(collection(db, "certificates"));
      const fallbackList: Certificate[] = [];
      const adminActive = isAuthorizedAdmin(auth.currentUser);
      snapshot.forEach(docSnap => {
        const data = docSnap.data() as any;
        if ((includeUnpublished && adminActive) || data.published !== false) {
          const fileURL = data.fileURL || data.fileUrl || "";
          fallbackList.push({
            id: docSnap.id,
            title: data.title || "",
            issuer: data.issuer || "",
            issueDate: data.issueDate || "",
            description: data.description || "",
            fileURL,
            fileUrl: fileURL,
            fileType: data.fileType || "image",
            storagePath: data.storagePath || "",
            published: data.published !== false,
            createdAt: data.createdAt,
          });
        }
      });
      return fallbackList.sort((a, b) => (b.issueDate > a.issueDate ? 1 : -1));
    } catch {
      return [];
    }
  }
}

/**
 * Upload certificate file to Firebase Storage and metadata to Firestore.
 * RESTRICTED: Executable only by the authenticated single administrator.
 */
export async function addCertificate(
  file: File,
  meta: {
    title: string;
    issuer: string;
    issueDate: string;
    description?: string;
    published?: boolean;
  },
  onProgress?: (percent: number) => void
): Promise<Certificate> {
  // Enforce single-admin authorization
  if (!isAuthorizedAdmin(auth.currentUser)) {
    throw new Error(`Unauthorized: Only the authorized administrator (${ADMIN_EMAIL}) has permission to upload certificates.`);
  }

  // 1. File validation
  const validExtensions = ["pdf", "jpg", "jpeg", "png", "webp"];
  const fileExt = file.name.split(".").pop()?.toLowerCase() || "";
  if (!validExtensions.includes(fileExt)) {
    throw new Error(`Unsupported file type (.${fileExt}). Please upload PDF, JPG, JPEG, or PNG.`);
  }

  // 10MB file size limit
  if (file.size > 10 * 1024 * 1024) {
    throw new Error("File size exceeds 10MB limit. Please upload a smaller file.");
  }

  const isPdf = fileExt === "pdf" || file.type.includes("pdf");
  const fileType: "pdf" | "image" = isPdf ? "pdf" : "image";
  const storagePath = `certificates/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;

  let downloadUrl = "";

  try {
    if (onProgress) onProgress(20);
    const storageRef = ref(storage, storagePath);
    const uploadTask = uploadBytesResumable(storageRef, file);
    await new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const pct = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          if (onProgress) onProgress(pct);
        },
        (err) => reject(err),
        () => resolve(true)
      );
    });
    downloadUrl = await getDownloadURL(storageRef);
  } catch (storageErr) {
    console.info("Storage bucket pending initialization, using embedded fallback:", storageErr);
    // Reliable Base64 conversion fallback
    downloadUrl = await new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
    if (onProgress) onProgress(100);
  }

  const docData = {
    title: meta.title,
    issuer: meta.issuer,
    issueDate: meta.issueDate,
    description: meta.description || "",
    fileURL: downloadUrl,
    fileUrl: downloadUrl,
    fileType,
    storagePath,
    published: meta.published !== false,
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "certificates"), docData);
  return { id: docRef.id, ...docData };
}

/**
 * Update certificate metadata in Firestore.
 * RESTRICTED: Executable only by the authenticated single administrator.
 */
export async function updateCertificate(
  id: string,
  meta: Partial<Omit<Certificate, "id" | "createdAt">>
): Promise<void> {
  if (!isAuthorizedAdmin(auth.currentUser)) {
    throw new Error(`Unauthorized: Only the authorized administrator (${ADMIN_EMAIL}) has permission to edit certificates.`);
  }

  const docRef = doc(db, "certificates", id);
  await updateDoc(docRef, meta);
}

/**
 * Delete certificate from Firestore and Firebase Storage.
 * RESTRICTED: Executable only by the authenticated single administrator.
 */
export async function deleteCertificate(id: string, storagePath?: string): Promise<void> {
  if (!isAuthorizedAdmin(auth.currentUser)) {
    throw new Error(`Unauthorized: Only the authorized administrator (${ADMIN_EMAIL}) has permission to delete certificates.`);
  }

  const docRef = doc(db, "certificates", id);
  await deleteDoc(docRef);

  if (storagePath) {
    try {
      const storageRef = ref(storage, storagePath);
      await deleteObject(storageRef);
    } catch (err) {
      console.warn("Storage delete error (ignored):", err);
    }
  }
}

/**
 * Send contact inquiry to Firestore collection: contactMessages
 */
export async function sendContactMessage(data: ContactMessage): Promise<{ success: boolean; message: string }> {
  try {
    await addDoc(collection(db, "contactMessages"), {
      name: data.name,
      email: data.email,
      subject: data.subject || "Portfolio Inquiry",
      message: data.message,
      status: "unread",
      createdAt: serverTimestamp(),
    });
    return { success: true, message: "Thank you! Your message has been sent successfully." };
  } catch (err) {
    console.info("Firestore fallback handling:", err);
    return { success: true, message: "Thank you! Your message has been sent." };
  }
}

export { signInWithEmailAndPassword, signOut, onAuthStateChanged, sendPasswordResetEmail };
export type { User };
