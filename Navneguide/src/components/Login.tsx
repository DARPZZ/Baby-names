import React, { useState, ChangeEvent, FormEvent } from 'react';
import './LoginCSS.css';
interface FormData {
  email: string;
  password: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
 
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userDetails, setUserDetails] = useState<any>(null); //save state
  const [isError, setIsError] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
        credentials: 'include',
      });
      if(!response.ok)
      {
       setIsError(true)
        
      }else
      {
        const userId = await response.text();
        setSubmittedEmail(formData.email);
        sessionStorage.setItem('loggedIn', 'true');
        setUserId(userId);

        const userDetailsResponse = await fetch(`http://localhost:5000/users/email/${formData.email}`, {
          credentials: 'include',
        });

        if (userDetailsResponse.ok) {
          const userDetailsData = await userDetailsResponse.json();
       
          setUserDetails(userDetailsData); 
          sessionStorage.setItem('submittedEmail', formData.email);
          window.location.href = 'Profile'
        }
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login-page'> 
    <div className="container">
      <div className="d-flex justify-content-center h-100">
        <div className="card">
          <div className="card-header">
            <h3>Log på</h3>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="input-group form-group">
                <input type="text" className="form-control" placeholder="Email" name="email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="input-group form-group">
              <input type="password" className="form-control" placeholder="Adgangskode" name="password" value={formData.password}
               onChange={handleChange}
               style={isError ? {borderColor: 'red', borderWidth: '3px'} : {}} />
            </div>
              <div className="form-group">
                <input id='login_btn' type="submit" value="Login" className="btn float-right login_btn" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyForm;
