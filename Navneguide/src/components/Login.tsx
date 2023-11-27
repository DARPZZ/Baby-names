import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  email: string;
  password: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });
  /*Kan nok godt slettes*/
  const [submittedEmail, setSubmittedEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const [userDetails, setUserDetails] = useState<any>(null); //save state

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
/* sprøg om min bruger eksistere */
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

      if (response.ok) {
        const userId = await response.text();
        console.log('Login successful! User ID:', userId);
        setSubmittedEmail(formData.email);
        setUserId(userId);

        const userDetailsResponse = await fetch(`http://localhost:5000/users/email/${formData.email}`, {
          credentials: 'include',
        });

        if (userDetailsResponse.ok) {
          const userDetailsData = await userDetailsResponse.json();
          console.log('User Details:', userDetailsData);
          setUserDetails(userDetailsData); // gem i state
          localStorage.setItem('submittedEmail', formData.email);
        } else {
          console.error('Error fetching user details');
        }
        
      } else {
        console.error('Error logging in');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
        <br />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
        <br />

        <div id='SubmitId'>
          <button className='SubmitId' type="submit">Log on</button>
        </div>
      </form>
    </div>
  );
};

export default MyForm;
