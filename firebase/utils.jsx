import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";

export const useAuthStateChange = () => {
    const [loading, setLoading] = useState(true);
    const [authUser, setAuthUser] = useState(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
          if (user) setAuthUser(user);
          setLoading(false);
        });

        return () => {
            unsubscribe();
        }
    }, []);

    return [authUser, loading];
}

export const signOutAndRedirect = () => {
    signOut(auth).then(() => {
        window.location.pathname = '/login'
    })
}