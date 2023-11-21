import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory hook

interface FormData {
  name: string;
  email: string;
  // Add more fields as needed
}

const MyForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    // Initialize other fields as needed
  });

  const history = useHistory(); // Access the history object

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
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
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
    } catch (error) {
      console.error('Error:', error);
    }
  };

 

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
        </label>
        <br />

        <label>
          Password:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <br />

        {/* Add more fields as needed */}
        <div id='SubmitId'>
          <button className='SubmitId' type="submit">Log on</button>
        
        </div>
      </form>
    </div>
  );
};

export default MyForm;
