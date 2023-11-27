import React, { useState, ChangeEvent, FormEvent } from 'react';
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
  window.addEventListener('load', Ralle);
  async function Ralle() {
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
          console.log("Du har nu logget ud af prgorammet")
        }
      } catch (error) {
        console.log(error);
      }
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        console.log("Du har nu logget ud af prgorammet")
        window.location.href = '/'
      }
    } catch (error) {
      console.log(error);
    }
    
  };
  

  return (
    
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <div id='SubmitId'>
          <button className='SubmitId' type="submit">Log out</button>
        </div>
      </form>
    </div>
  );
  
};

export default MyForm;
