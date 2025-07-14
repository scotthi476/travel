import React, {useState, FormEvent, ChangeEvent} from "react"
import "../App.css";

// TODO: Andrew add login form
// references used:
// https://dev.to/luqmanshaban/creating-a-sign-up-form-in-react-with-typescript-2jb3
// https://www.youtube.com/watch?v=j4Ms4CSDR60&ab_channel=CodingPartner 

interface LoginData {
    email: string
    password: string
}

const Login = () => {
    const [formData, setFormData] = useState<LoginData>({
        email: '',
        pasword: '',
    })
    const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({})

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prevData => ({...prevData, [name]: value}))
    }

    //validation
    const validate = (): boolean => {
        const newErrors: typeof errors = {};
        if (!formData.email) newErrors.email = "Email is required"
        else if (!/^[\w.-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(formData.email)) newErrors.email = "Email is invalid"
        if (!formData.password) newErrors.password = "Password is required"
        setErrors(newErrors)
        return Object.keys(newErrors.length === 0)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (!validate()) return;
        console.log('Lgin data: ', formData)
        // integrate with backened api for login
    }

    return <div>Login</div>
    return (
        <div>
            <h2>Log in</h2>
            <form onSubmit = {handleSubmit} noValidate>
                <label htmlFor = "email">Email</label>
                <input 
                    type = "email"
                    name = "email"
                    id = "email"
                    value = {formData.email}
                    onChange = {handleChange}
                />

                <label htmlFor = "password">Password</label>
                <input 
                    type = "password"
                    name = "password"
                    id = "password"
                    value = {formData.password}
                    onChange = {handleChange}
                />

                <button type = "sumbit">Log in</button>                
            </form>

            <div>
                Don't have an account? <a href = "/Register">Register</a>
            </div>           
             
        </div>


    )
}

export default Login
