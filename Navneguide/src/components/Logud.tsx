import React, { useState, ChangeEvent, useEffect } from 'react';

interface FormData {
  email: string;
  password: string;
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

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
          sessionStorage.removeItem('partnerEmail');
          
          window.location.href = '/'
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleLogout();
  }, []);
  

  return (
    
    <div className='login'>
    </div>
  );
  
};

export default MyForm;
