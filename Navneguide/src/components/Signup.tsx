import React, { useState, ChangeEvent, FormEvent } from 'react';
import './SignupCSS.css';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [passwordStrength, setPasswordStrength] = useState('');



  const checkPasswordStrength = (password : string) => {
    if (password.length < 6) {
      setPasswordStrength('Weak');
    } else if (password.length < 10) {
      setPasswordStrength('Moderate');
    } else {
      setPasswordStrength('Strong');
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'password') {
      checkPasswordStrength(value);
    }
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
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          console.log('Data sent successfully!');
          console.log(response);
          window.location.href = 'Login'
        } else {
          console.error('Error sending data to the server');
        }
      }catch(error)
      {
        console.error('Error:', error);
      }
  };

  return (
    <div className='signup-page'>
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Registrering</h2>
          <div className="form-group">
            <label id='name-label' htmlFor="name">Navn:</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label id='email-label' htmlFor="email">Email:</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label id='password-label' htmlFor="password">Adgangskode:</label>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
            {passwordStrength && (
              <div className="password-strength">
                Password Strength: {passwordStrength}
              </div>
            )}
          </div>


          <button type="submit" className="submit-button">
            Indsend
          </button>
          <p className="terms-of-service">
           Ved at klikke på denne knap accepterer du vores <a href="/servicevilkår" style={{ color: 'blue', fontSize : '25px' } }>servicevilkår</a>
          </p>

        </form>
      </div>
    </div>
  );

}

export default Signup;
