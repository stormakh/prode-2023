"use client";

import { createUser } from "@/utils/api/users";
import auth from "@/utils/auth";
import { FirebaseError } from "firebase/app";
import {
	GoogleAuthProvider,
	UserCredential,
	linkWithCredential,
	linkWithPopup,
	onAuthStateChanged,
	signInAnonymously,
	signInWithCredential,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import {
	Dispatch,
	SetStateAction,
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from "react";

interface IAuthContext {
	signInWithGoogle: () => void;
	logout: () => Promise<void>;
	signInWithAnonymous: () => Promise<UserCredential>;
	firebaseUser: any;
	isAuthenticated: boolean;
	// setAnonUsername: Dispatch<SetStateAction<string | null>>;
	createAnonymousUser: (username: string) => Promise<void>;
	AnonUsername: string | null;
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
	const [AnonUsername, setAnonUsername] = useState<string | null>(null);

	const refreshAuth = async (_firebaseUser: any) => {
		setLoading(true);
		if (_firebaseUser) {
			setFirebaseUser(_firebaseUser);
		} else {
			const res = await signInAnonymously(auth);
		}
		setLoading(false);
	};

	const signInWithGoogle = async () => {
		const provider = new GoogleAuthProvider();
		if (auth.currentUser?.isAnonymous) {
			try {
				const result = await linkWithPopup(auth.currentUser, provider);

				const createUserDto: any = {
					displayName: firebaseUser.displayName,
					email: firebaseUser.email,
					photoUrl: firebaseUser.photoURL,
					uid: firebaseUser.uid,
				};
				const userCreated = await createUser(createUserDto);
				console.log(userCreated);
				setFirebaseUser({
					...result.user,
				});
				return result;
			} catch (error: any) {
				if (error.code === "auth/credential-already-in-use") {
					console.log(error);
					const credential =
						GoogleAuthProvider.credentialFromError(error);
					if (credential) {
						const userPromise = await signInWithCredential(
							auth,
							credential
						);
						console.log(userPromise.user);
						setFirebaseUser({ ...userPromise.user, prop: "aaaa" });
						return userPromise;
					}
				}
			}
		}
	};

	const signInWithAnonymous = () => signInAnonymously(auth);

	const logout = () => signOut(auth);
	useEffect(() => {
		const unsubscribeAuthState = onAuthStateChanged(auth, refreshAuth);
		return () => unsubscribeAuthState();
	}, []);

	const isAuthenticated = useMemo(() => {
		return firebaseUser !== null;
	}, [firebaseUser]);

	const createAnonymousUser = async (username: string) => {
		const resp = await createUser({
			username: username,
			uid: firebaseUser.uid,
			level: "initial",
		});

		setFirebaseUser({
			...firebaseUser,
			username: username,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				signInWithGoogle,
				logout,
				signInWithAnonymous,
				firebaseUser,
				isAuthenticated,
				createAnonymousUser,
				AnonUsername,
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
