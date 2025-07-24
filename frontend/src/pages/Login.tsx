import React, { useState, FormEvent, ChangeEvent, FocusEvent } from "react";
import { useNavigate } from "react-router-dom"
import "../App.css";

// TODO: Andrew add login form
// references used:
// https://dev.to/luqmanshaban/creating-a-sign-up-form-in-react-with-typescript-2jb3
// https://www.youtube.com/watch?v=j4Ms4CSDR60&ab_channel=CodingPartner 

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",     
  });

  const [errors, setErrors] = useState<Partial<Record<keyof LoginData, string>>>({})
  const navigate = useNavigate()

  
  const validateField = (
    name: keyof LoginData,
    value: string
  ): string => {
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
    const newErrors: Partial<Record<keyof LoginData, string>> = {}(
    Object.keys(formData) as (keyof LoginData)[]).forEach((field) => {
      const error = validateField(field, formData[field])
      if (error) newErrors[field] = error
    })

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));

    // clear existing error when input
    if (errors[name as keyof LoginData]){
        setErrors((prevData => ({...prevData,[name]: undefined})))
    }
  }

  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const {name, value} = e.target
    const field = name as keyof LoginData
    const error = validateField(field, value)
    setErrors((prevData) => ({...prevData, [field]: error}))
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validateAll()) {
      return
    }

    console.log("Login data:", formData); 
    // integrate with backend API for login
    // successful login redirects user to homepage
    navigate("/Home.tsx")
  };

  return (
    <div>
      <br />
      <h2>Login</h2>
      <br />
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
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
        
        <button type = "submit">Log in</button>

      </form>
      <br />
      <div>
        Don’t have an account? <a href = "/Register">Register</a>
      </div>
    </div>
  );
};

export default Login;  
