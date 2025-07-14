import React, { useState, FormEvent, ChangeEvent } from "react";
// import "../App.css";

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [formData, setFormData] = useState<LoginData>({
    email: "",
    password: "",     
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Login data:", formData); 
    // integrate with backend API for login
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit">Log in</button>
      </form>

      <div>
        Don’t have an account? <a href="/Register">Register</a>
      </div>
    </div>
  );
};

export default Login;  
