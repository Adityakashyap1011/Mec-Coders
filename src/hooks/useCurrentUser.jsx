import { useEffect, useState } from "react";
import { auth } from "../firebase/authentication";
import { onAuthStateChanged } from "firebase/auth";

export default function useCurrentUser() {
    const [currentUser, setCurrentUser] = useState("loading");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });
        return () => unsubscribe();
    }, []);

    return currentUser;
}
