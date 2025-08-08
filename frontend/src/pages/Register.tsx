import {
    useState,
    type FormEvent,
    type ChangeEvent,
    type FocusEvent,
} from "react"
import { useNavigate } from "react-router-dom"
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import {
    doc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore"
import { auth, db } from "../config/firebase"
import "../App.css"

// TODO: Andrew add registration form
// references used:
// https://dev.to/luqmanshaban/creating-a-sign-up-form-in-react-with-typescript-2jb3
// https://www.youtube.com/watch?v=j4Ms4CSDR60&ab_channel=CodingPartner
// https://firebase.google.com/docs/auth/web/start

interface RegistrationData {
    username: string
    firstname: string
    lastname: string
    email: string
    password: string
    confirmPassword: string
}

const RegistrationForm = () => {
    const [formData, setFormData] = useState<RegistrationData>({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    // form validation errors - field specific errors
    const [errors, setErrors] = useState<
        Partial<Record<keyof RegistrationData, string>>
    >({})
    // authentication errors from firebase
    const [authError, setAuthError] = useState<string>("")
    // shows loading indicator during authentication
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // navigation hook for redirecting after registration
    const navigate = useNavigate()

    // validate unique username
    // queries the firestore
    const isUsernameAvailable = async (username: string): Promise<boolean> => {
        if (!db) return true
        try {
            const usersRef = collection(db, "users")
            const q = query(
                usersRef,
                where("username", "==", username.toLowerCase())
            )
            const querySnapshot = await getDocs(q)

            // if username is available
            return querySnapshot.empty
            // username is taken
        } catch (error) {
            console.error("Error checking username availability: ", error)
            return false
        }
    }

    //form input validations
    const validateField = (
        name: keyof RegistrationData,
        value: string
    ): string => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (name == "username" || name == "firstname" || name == "lastname") {
            if (!value.trim()) {
                const label = name.charAt(0).toUpperCase() + name.slice(1)
                return `${label} is required.`
            }
        }
        if (name == "email") {
            if (!value.trim()) return "Email is required."
            if (!emailPattern.test(value)) return "Please enter a valid email."
        }
        if (name == "password") {
            if (!value) return "Password is required."
            if (value.length < 8)
                return "Password must be at least 8 characters long."
        }
        if (name == "confirmPassword") {
            if (!value) return "Please confirm your password."
            if (value !== formData.password) return "Password does not match."
        }
        return ""
    }

    // form input validation
    const validateAll = (): boolean => {
        const newErrors: Partial<Record<keyof RegistrationData, string>> = {}
        ;(Object.keys(formData) as (keyof RegistrationData)[]).forEach(
            (field) => {
                const errorMsg = validateField(field, formData[field])
                if (errorMsg) newErrors[field] = errorMsg
            }
        )
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // handles input field changes and updates form data and clears
    // existing errors when user begins typing
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))

        // clear authentication error when user begins typing
        if (errors[name as keyof RegistrationData]) {
            setErrors((prevData) => ({ ...prevData, [name]: undefined }))
        }
        // clear authentication error when user begins typing
        if (authError) {
            setAuthError("")
        }
    }

    // handles input field blur when user leaves input field
    // validates field
    const handleBlur = async (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const field = name as keyof RegistrationData

        // validate unique username
        if (field === "username" && value.trim() && value.length >= 3) {
            const available = await isUsernameAvailable(value)
            if (!available) {
                setErrors((prevData) => ({
                    ...prevData,
                    username: "Username is already in use",
                }))
                return
            }
        }

        const error = validateField(field, value)
        setErrors((prevData) => ({ ...prevData, [field]: error }))
    }

    // handles form sumbission and Firebase user registration
    // redirect to login page if registration successful
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // validate fields before registering
        if (!validateAll()) {
            return
        }
        // check username availability
        const available = await isUsernameAvailable(formData.username)
        if (!available) {
            setErrors((prevData) => ({
                ...prevData,
                username: "Username is already in use.",
            }))
            return
        }

        // set loading state and clear previous errors
        setIsLoading(true)
        setAuthError("")

        // register user account
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )
            // update profile with username
            await updateProfile(userCredential.user, {
                displayName: formData.username,
            })

            // store user registration data in firestore
            if (db) {
                try {
                    await setDoc(doc(db, "users", userCredential.user.uid), {
                        username: formData.username.toLowerCase(),
                        firstname: formData.firstname,
                        lastname: formData.lastname,
                        email: formData.email,
                        createdAt: new Date(),
                    })
                    //error if registration data failed to be stored
                } catch (firestoreError) {
                    console.error("Error storing user data: ", firestoreError)
                }
            }
            // redirect new user to login page
            navigate("/login")
            // handles registration errors
        } catch (error: any) {
            const authError = error
            setAuthError(authError.message)
            console.error("Regisration error: ", authError)
            // clear loading state
        } finally {
            setIsLoading(false)
        }
    }

    // optional socials authenticator

    return (
        <div>
            <br />
            <h2>Create an Account</h2>
            <br />

            {/* if there is an auth error, display error*/}
            {authError && (
                <div style={{ color: "red", marginBottom: "10px" }}>
                    {authError}
                </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
                <div>
                    <label htmlFor="username">Username: </label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //disable user input while authenticating
                        disabled={isLoading}
                    />
                    {errors.username && (
                        <span style={{ color: "red" }}>{errors.username}</span>
                    )}
                </div>
                <br />

                <div>
                    <label htmlFor="firstname">First Name: </label>
                    <input
                        type="text"
                        name="firstname"
                        id="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //disable user input while authenticating
                        disabled={isLoading}
                    />
                    {errors.firstname && (
                        <span style={{ color: "red" }}>{errors.firstname}</span>
                    )}
                    <br />
                </div>

                <div>
                    <label htmlFor="lastname">Last Name: </label>
                    <input
                        type="text"
                        name="lastname"
                        id="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //disable user input while authenticating
                        disabled={isLoading}
                    />
                    {errors.lastname && (
                        <span style={{ color: "red" }}>{errors.lastname}</span>
                    )}
                </div>
                <br />

                <div>
                    <label htmlFor="email">Email: </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //disable user input while authenticating
                        disabled={isLoading}
                    />
                    {errors.email && (
                        <span style={{ color: "red" }}>{errors.email}</span>
                    )}
                </div>
                <br />

                <div>
                    <label htmlFor="password">Password: </label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //disable user input while authenticating
                        disabled={isLoading}
                    />
                    {errors.password && (
                        <span style={{ color: "red" }}>{errors.password}</span>
                    )}
                </div>
                <br />

                <div>
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        //disable user input while authenticating
                        disabled={isLoading}
                    />
                    {errors.confirmPassword && (
                        <span style={{ color: "red" }}>
                            {errors.confirmPassword}
                        </span>
                    )}
                </div>
                <br />

                {/* submit with loading state */}
                <button type="submit" disabled={isLoading}>
                    {isLoading ? "Registering Account... " : "Register"}
                </button>
            </form>
            <br />

            <div>
                Already have an account? <a href="/login">Log in</a>
            </div>
        </div>
    )
}

export default RegistrationForm
