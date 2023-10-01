"use client";

import auth from "@/utils/auth";
import {
	GoogleAuthProvider,
	UserCredential,
	linkWithPopup,
	onAuthStateChanged,
	signInAnonymously,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import {
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

interface IAuthContext {
	signInWithGoogle: () => Promise<UserCredential> | undefined;
	logout: () => Promise<void>;
	signInWithAnonymous: () => Promise<UserCredential>;
	firebaseUser: any;
	isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext | null>(null);

export default function AuthContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	// const [user, setUser] = useState<any>(null)
	const [firebaseUser, setFirebaseUser] = useState<any>(null);
	const [loading, setLoading] = useState(true);

	const refreshAuth = async (_firebaseUser: any) => {
		setLoading(true);
		if (_firebaseUser) {
			setFirebaseUser(_firebaseUser);
		} else {
			const res = await signInAnonymously(auth);
		}
		setLoading(false);
	};

	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		if (auth.currentUser) {
			return linkWithPopup(auth.currentUser, provider);
		} else {
			return signInWithPopup(auth, provider);
		}
		return;
	};

	const signInWithAnonymous = () => signInAnonymously(auth);

	const logout = () => signOut(auth);
	useEffect(() => {
		const unsubscribeAuthState = onAuthStateChanged(auth, refreshAuth);
		return () => unsubscribeAuthState();
	}, []);

	const isAuthenticated = useMemo(() => {
		return firebaseUser !== null} , [firebaseUser]);
	

	return (
		<AuthContext.Provider
			value={{
				signInWithGoogle,
				logout,
				signInWithAnonymous,
				firebaseUser,
				isAuthenticated,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === null) {
		throw new Error("useAuthContext must be used within a AuthProvider");
	}
	return context;
}
