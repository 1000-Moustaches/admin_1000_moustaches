import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import UsersManager from "./users.manager";
import { setLoggedUser } from "../hooks/useLoggedUser";

class AuthManager {
    static async login(email: string, password: string): Promise<{ token: string }> {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            const token = await response.user.getIdToken();

            // Fetch the current user from the database
            const currentUser = await UsersManager.getLoggedUser();
            if (!currentUser) {
                sessionStorage.removeItem("Auth Token");
                throw new Error("User not found in database");
            }
            // Store auth token in sessionStorage
            sessionStorage.setItem("Auth Token", token);
            // Store user in sessionStorage
            setLoggedUser(currentUser);

            return {
                token,
            };
        } catch (error) {
            console.error("Login error:", error);
            throw error;
        }
    }

    static async logout(): Promise<void> {
        await signOut(auth);
        // Clear user from sessionStorage
        sessionStorage.removeItem("User");
    }
}

export default AuthManager;
