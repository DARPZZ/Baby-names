import React, { useState, ChangeEvent, FormEvent } from 'react';
import './SignupCSS.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

      try{
        const response = await fetch('http://localhost:5000/users', {
          method: 'POST',
          headers: {
            
            "id": "3fa85f64-5717-4562-b3fc-2c963f66afa8",
            "userName": "hiphophej",
            "Password": "hiphophej",
            "Email" : "Email"
            
            
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log('Data sent successfully!');
          console.log(response);
        } else {
          console.error('Error sending data to the server');
          // Handle errors here
        }
      }catch(error)
      {
        console.error('Error:', error);
      }
  };

  return (
    
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Signup</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Signup;
