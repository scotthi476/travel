import {
    useState,
    type FormEvent,
    type ChangeEvent,
    type FocusEvent,
} from "react"
import { useNavigate } from "react-router-dom"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../config/firebase"
import "../App.css"
import TextInput from "../components/ui/TextInput"
import ShadowCard from "../layout/ShadowCard"
import Button from "../components/ui/Button"

// TODO: Andrew add login form
// references used:
// https://dev.to/luqmanshaban/creating-a-sign-up-form-in-react-with-typescript-2jb3
// https://www.youtube.com/watch?v=j4Ms4CSDR60&ab_channel=CodingPartner
// https://firebase.google.com/docs/auth/web/start

interface LoginData {
    email: string
    password: string
}

const Login = () => {
    const [formData, setFormData] = useState<LoginData>({
        email: "",
        password: "",
    })

    // form validation errors - field specific errors
    const [errors, setErrors] = useState<
        Partial<Record<keyof LoginData, string>>
    >({})
    // authentication errors from firebase
    const [authError, setAuthError] = useState<string>("")
    // shows loading indicator during authentication
    const [isLoading, setIsLoading] = useState<boolean>(false)
    // navigation hook for redirecting after login
    const navigate = useNavigate()

    // form field validation
    const validateField = (name: keyof LoginData, value: string): string => {
        if (name === "email") {
            if (!value.trim()) return "Email is required"
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailPattern.test(value)) return "Please enter a valid email."
        }
        if (name === "password" && !value) {
            return "Password is required."
        }
        return ""
    }

    //form input validation
    const validateAll = (): boolean => {
        const newErrors: Partial<Record<keyof LoginData, string>> = {}
        ;(Object.keys(formData) as (keyof LoginData)[]).forEach((field) => {
            const error = validateField(field, formData[field])
            if (error) newErrors[field] = error
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // handles input field changes and updates form data and clears
    // existing errors when user begins typing
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({ ...prevData, [name]: value }))

        // clear existing error when user begins typing
        if (errors[name as keyof LoginData]) {
            setErrors((prevData) => ({ ...prevData, [name]: undefined }))
        }
        // clear authentication error when user begins typing
        if (authError) {
            setAuthError("")
        }
    }

    // handles input field blur when user leaves input field
    // validates field
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const field = name as keyof LoginData
        const error = validateField(field, value)
        setErrors((prevData) => ({ ...prevData, [field]: error }))
    }

    // handles form sumbission and Firebase authentication
    // redirect to homepage if login successful
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        // validate fields before logging in
        if (!validateAll()) {
            return
        }
        // set loading state and clear previous errors
        setIsLoading(true)
        setAuthError("")

        // log in with Firebase
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                formData.email,
                formData.password
            )
            console.log(userCredential)
            // redirect user to homepage
            navigate("/")

            // handles authentication errors
        } catch (error: any) {
            const authError = error
            setAuthError(authError.message)
            console.error("Login error: ", authError)
            // clear loading state
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="mx-auto max-w-8/12">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Login</h1>
            </div>
            <ShadowCard>
                {/* if there is an auth error, display error*/}
                {authError && (
                    <div style={{ color: "red", marginBottom: "10px" }}>
                        {authError}
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <div className="space-y-4">
                        <label htmlFor="email">Email: </label>
                        <TextInput
                            type="email"
                            name="email"
                            label=""
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

                    <div className="mb-4">
                        <label htmlFor="password">Password: </label>
                        <TextInput
                            type="password"
                            name="password"
                            label=""
                            id="password"
                            value={formData.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            //disable user input while authenticating
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <span style={{ color: "red" }}>
                                {errors.password}
                            </span>
                        )}
                    </div>

                    {/*submit button with loading state */}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Logging in..." : "Log in"}
                    </Button>
                </form>
                <br />
                {/*Link to registration page*/}
                <div className="space-y-0.5">
                    <div className="text-gray-400 text-sm">
                        Don't have an account?
                    </div>
                    <Button
                        onClick={() => navigate("/register")}
                        variant="update"
                    >
                        Register
                    </Button>
                </div>
            </ShadowCard>
        </div>
    )
}

export default Login
