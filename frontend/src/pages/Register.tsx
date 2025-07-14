import React, {useState, FormEvent, ChangeEvent} from "react"
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    // registration form validation check
    const validate = (): boolean => {
        const newErrors: typeof errors = {}
        if (!formData.username.trim()) newErrors.username = 'Username is required'
        if (!formData.firstname.trim()) newErrors.firstname = 'First name is required'
        if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required'
        if (!formData.email) newErrors.email = 'Email is required'
        else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email)) newErrors.email = 'Email is invalid'
        if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters'
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords don't match"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!validate()) return;
        console.log("Regisrtation data:", formData)
        // call registration api backend 
    }

    // socials authenticator?

    
    return <div>Registration</div>
    return (
        <div>
            <h2>Create an Account</h2>
            <form onSubmit = {handleSubmit} noValidate>
                <label htmlFor = "username">Username</label>
                <input
                    type = "text"
                    name = "username"
                    id = "username"
                    value = {formData.username}
                    onChange = {handleChange}
                />
                
                <label htmlFor = "firstname">First Name</label>
                <input
                    type = "text"
                    name = "firstname"
                    id = "firstname"
                    value = {formData.firstname}
                    onChange = {handleChange}
                />

                <label htmlFor = "lastname">Last Name</label>
                <input
                    type = "text"
                    name = "lastname"
                    id = "lastname"
                    value = {formData.lastname}
                    onChange = {handleChange}
                />
                <label htmlFor = "email">Email</label>
                <input
                    type = "text"
                    name = "email"
                    id = "email"
                    value = {formData.email}
                    onChange = {handleChange}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                />

                <button type = "submit">Register</button>
            </form>

            <div>Already have an account? <a href = "/Login">Log in</a></div>
        </div>
    )

}

export default RegistrationForm
