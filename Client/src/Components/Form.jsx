import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Form.css';
export default function Form() {
  let navigate = useNavigate();

  function handleFormValues(event) {
    setFormValues({ ...formValues, [event.target.name]: event.target.value });
  }

  let handleSubmit = async (event) => {
    event.preventDefault();

    const sendingData = {
      age: formValues.age,
      advice: formValues.advice,
    };

    try {
      await fetch('https://advice-coloumn.onrender.com/addAdvice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sendingData),
      });
      navigate('/adviceFilter', { state: sendingData });
    } catch {
      alert('The Data is not sending big man');
    }

    console.log(event.target.value);
    console.log(formValues);
  };

  const [formValues, setFormValues] = useState({
    age: '',
    advice: '',
  });

  return (
    <>
      <h1>
        To gain valuable advice, you must first offer the wisdom you wish you
        had received.
      </h1>

      <form className='form' onSubmit={handleSubmit}>
        <label htmlFor='Age'> </label>
        <input
          className='agebox'
          type='number'
          id='age'
          name='age'
          placeholder=' Current Age '
          value={formValues.age}
          onChange={handleFormValues}
          required
        />

        <label htmlFor='advice'> </label>
        <input
          className='advicebox'
          type='text'
          id='advice'
          name='advice'
          placeholder='Enter your Advice'
          value={formValues.advice}
          onChange={handleFormValues}
          required
        />
        <button className='submitButton' type='submit'>
          Share Your Insight
        </button>
      </form>
    </>
  );
}
