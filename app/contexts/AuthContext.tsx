"use client";

import auth from "@/utils/auth";
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
	setAnonUsername : Dispatch<SetStateAction<string | null>>;
	AnonUsername : string | null;
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




	const signInWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		if (auth.currentUser?.isAnonymous) {
			linkWithPopup(auth.currentUser, provider).then((result) => {
				
				
				setFirebaseUser({...result.user, providerId : result.providerId});
				return result;
			}).catch((error) => {
				
				if(error.code === 'auth/credential-already-in-use'){
					const credential = GoogleAuthProvider.credentialFromError(error);
					if(credential){
						const userPromise = signInWithCredential(auth, credential);
						setFirebaseUser(userPromise);
						return userPromise;
					}
				}
			});
			
		}
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
				setAnonUsername,
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
