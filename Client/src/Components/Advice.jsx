import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Advice() {
  let [adviceData, setAdvice] = useState([]);

  useEffect(() => {
    let fetchAdvice = async () => {
      try {
        let adviceResponse = await fetch('http://localhost:8080/advice');
        let adviceRecived = await adviceResponse.json();
        console.log('Fetched data:', adviceRecived);

        setAdvice(adviceRecived);
      } catch (error) {
        console.error('Error fetching advice:', error);
      }
    };

    fetchAdvice();
  }, []);

  //!once you have finished your app and deployment ins ready replace your local host urls with the render urls
  return (
    <>
      <h1> Posts </h1>
      <Link to='/Advice'>All Advice</Link>
      <Link to='/'>Submit Advice</Link>

      <div className='mainCointainer'>
        {adviceData.map((advice) => (
          <div key={advice.id}>
            <p> Age </p>
            <p>{advice.age}</p>
            <p>Advice</p>
            <p>{advice.advice}</p>
          </div>
        ))}
      </div>
    </>
  );
}
