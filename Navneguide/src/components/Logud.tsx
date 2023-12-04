import React, { useState, ChangeEvent, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

interface FormData {
  email: string;
  password: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:5000/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        });

        if (response.ok) {
          sessionStorage.removeItem('loggedIn');
          localStorage.removeItem('partnerEmail');
          
          window.location.href = '/'
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleLogout();
  }, []); // Empty dependency array means this effect will only run once, when the component mounts.
  

  return (
    
    <div className='login'>
    </div>
  );
  
};

export default MyForm;
