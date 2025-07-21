import React, {useState, FormEvent, ChangeEvent, FocusEvent} from "react"
import { useNavigate } from "react-router-dom"
import "../App.css"

// TODO: Andrew add registration form
// references used:
// https://dev.to/luqmanshaban/creating-a-sign-up-form-in-react-with-typescript-2jb3
// https://www.youtube.com/watch?v=j4Ms4CSDR60&ab_channel=CodingPartner 

interface RegistrationData {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegistrationForm = () => {
    const [formData, setFormData] = useState<RegistrationData>({
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
    })

    const [errors, setErrors] = useState<Partial<Record<keyof RegistrationData, string>>>({})
    const navigate = useNavigate() 


    //form input validations
    const validateField = (
        name: keyof RegistrationData,
        value: string
    ): string => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        
        if (name == "username" || name == "firstname" || name == "lastname"){
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
            if (value.length < 8) return "Password must be at least 8 characters long."
        }
        if (name =="confirmPassword") {
            if (!value) return "Please confirm your password."
            if (value !== formData.password) return "Password does not match."
        }
        return ""

    }

    const validateAll = (): boolean => {
        const newErrors: Partial<Record<keyof RegistrationData, string>> = {}
        (Object.keys(formData) as (keyof RegistrationData)[]).forEach((field) => {
            const errorMsg = validateField(field, formData[field])
            if (errorMsg) newErrors[field] = errorMsg
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prevData => ({...prevData, [name]: value}))
    
        // clear existing error when input
        if (errors[name as keyof RegistrationData]){
            setErrors((prevData => ({...prevData,[name]: undefined})))
        }
    }

    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        const field = name as keyof RegistrationData
        const error = validateField(field, value)
        setErrors((prevData) => ({...prevData, [field]: error}))
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!validateAll()) {
            return
        }
        console.log("Registration data:", formData)
        // call registration api backend
        // navigate back to login page
        navigate("/Login.tsx")
    }

    // optional socials authenticator

    
    return (
        <div>
            <br/>
            <h2>Create an Account</h2>
            <br/>
            <form onSubmit = {handleSubmit} noValidate>
                <label htmlFor = "username">Username: </label>
                <input
                    type = "text"
                    name = "username"
                    id = "username"
                    value = {formData.username}
                    onChange = {handleChange}
                    onBlur={handleBlur}
                />
                {errors.username && <span>{errors.username}</span>}
                <br />
                <label htmlFor = "firstname">First Name: </label>
                <input
                    type = "text"
                    name = "firstname"
                    id = "firstname"
                    value = {formData.firstname}
                    onChange = {handleChange}
                    onBlur={handleBlur}
                />
                {errors.firstname && <span>{errors.firstname}</span>}
                <br />
                <label htmlFor = "lastname">Last Name: </label>
                <input
                    type = "text"
                    name = "lastname"
                    id = "lastname"
                    value = {formData.lastname}
                    onChange = {handleChange}
                    onBlur={handleBlur}
                />
                {errors.lastname && <span>{errors.lastname}</span>}
                <br />
                <label htmlFor = "email">Email: </label>
                <input
                    type = "email"
                    name = "email"
                    id = "email"
                    value = {formData.email}
                    onChange = {handleChange}
                    onBlur={handleBlur}
                />
                {errors.email && <span>{errors.email}</span>}
                <br />
                <label htmlFor="password">Password: </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.password && <span>{errors.password}</span>}
                <br />
                <label htmlFor="confirmPassword">Confirm Password: </label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
                {errors.confirmPassword && <span>{errors.confirmPassword}</span>}
                <br />
                <button type = "submit">Register</button>
            </form>
            <br />
            <div>Already have an account? <a href = "/Login">Log in</a></div>
        </div>
    )

}

export default RegistrationForm
