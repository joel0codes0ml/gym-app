import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '@/src/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

interface UserProfile {
  id: string;
  fullName: string;
  avatarUrl: string;
  age: number;
  weightKg: number;
  heightCm: number;
  goal: string;
  fitnessLevel: string;
  planId: string;
  subscriptionTier: string;
  streakDays: number;
  createdAt: string;
}

interface FirebaseContextType {
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const FirebaseContext = createContext<FirebaseContextType | undefined>(undefined);

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    let unsubscribeProfile: () => void = () => {};

    if (user) {
      const docRef = doc(db, 'users', user.uid);
      unsubscribeProfile = onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
          setProfile(doc.data() as UserProfile);
        }
        setLoading(false);
      }, (error) => {
        console.error("Error fetching profile:", error);
        setLoading(false);
      });
    }

    return () => unsubscribeProfile();
  }, [user]);

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out", error);
    }
  };

  return (
    <FirebaseContext.Provider value={{ user, profile, loading, signInWithGoogle, logout }}>
      {children}
    </FirebaseContext.Provider>
  );
}

export const useFirebase = () => {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
};
