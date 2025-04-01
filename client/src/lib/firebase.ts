// Import Firebase dependencies
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  FacebookAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
  User as FirebaseUser,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth';

// Firebase configuration - replace this with your own config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "demo-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "demo-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:a1b2c3d4e5f6a7b8c9d0e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Auth providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const twitterProvider = new TwitterAuthProvider();
const githubProvider = new GithubAuthProvider();
const appleProvider = new OAuthProvider('apple.com');

// Email and password auth functions
export const registerWithEmailAndPassword = async (
  email: string, 
  password: string, 
  displayName: string
): Promise<FirebaseUser> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (userCredential.user) {
      await updateProfile(userCredential.user, { displayName });
    }
    return userCredential.user;
  } catch (error: any) {
    console.error("Error registering with email and password:", error);
    throw error;
  }
};

export const loginWithEmailAndPassword = async (
  email: string, 
  password: string
): Promise<FirebaseUser> => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error logging in with email and password:", error);
    throw error;
  }
};

// Social auth functions
export const signInWithGoogle = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Google:", error);
    throw error;
  }
};

export const signInWithFacebook = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, facebookProvider);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Facebook:", error);
    throw error;
  }
};

export const signInWithTwitter = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, twitterProvider);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Twitter:", error);
    throw error;
  }
};

export const signInWithGithub = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, githubProvider);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Github:", error);
    throw error;
  }
};

export const signInWithApple = async (): Promise<FirebaseUser> => {
  try {
    const result = await signInWithPopup(auth, appleProvider);
    return result.user;
  } catch (error: any) {
    console.error("Error signing in with Apple:", error);
    throw error;
  }
};

// Sign out function
export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error: any) {
    console.error("Error signing out:", error);
    throw error;
  }
};

// Observer for auth state changes
export const onAuthStateChange = (callback: (user: FirebaseUser | null) => void): (() => void) => {
  return onAuthStateChanged(auth, callback);
};

// Current user
export const getCurrentUser = (): FirebaseUser | null => {
  return auth.currentUser;
};

export default auth;