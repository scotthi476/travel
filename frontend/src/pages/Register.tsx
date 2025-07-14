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

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prevData => ({...prevData, [name]: value}))
    }


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
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
