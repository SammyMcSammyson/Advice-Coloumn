import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../css/Advice-Filter.css';

export default function AdviceFilter() {
  let location = useLocation();
  let { age } = location.state || {};
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

  let handleUpvote = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/advice/upvote/${id}`,
        {
          method: 'POST',
        }
      );
      const updatedAdvice = await response.json();
      console.log(updatedAdvice);
      setAdvice((prevData) =>
        prevData.map((advice) =>
          advice.id === id
            ? { ...advice, upvotes: updatedAdvice.upvotes }
            : advice
        )
      );
      console.log(id);
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  // Handle downvote
  const handleDownvote = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8080/advice/downvote/${id}`,
        {
          method: 'POST',
        }
      );
      const updatedAdvice = await response.json();
      setAdvice((prevData) =>
        prevData.map((advice) =>
          advice.id === id
            ? { ...advice, downvotes: updatedAdvice.downvotes }
            : advice
        )
      );
    } catch (error) {
      console.error('Error downvoting:', error);
    }
  };

  let adviceFilter = adviceData
    .filter((advice) => {
      return age ? advice.age === Number(age) + 1 : true;
    })
    .sort((a, b) => {
      if (b.upvotes !== a.upvotes) {
        return b.upvotes - a.upvotes;
      } else {
        return a.downvotes - b.downvotes;
      }
    });

  //!once you have finished your app and deployment ins ready replace your local host urls with the render urls
  return (
    <>
      <h1> Posts </h1>

      <div className='LinksContainer'>
        <Link to='/adviceFilter' className='Links' state={{ age }}>
          Next Years Wisdom
        </Link>
        <Link to='/adviceFilter5' className='Links' state={{ age }}>
          The Five-Year Foresight
        </Link>
        <Link to='/adviceFilter10' className='Links' state={{ age }}>
          The Decade Perspective
        </Link>
      </div>
      <h2> Advice for the you of next year</h2>

      <div className='mainCointainer'>
        {adviceFilter.length > 0 ? (
          adviceFilter.map((item) => (
            <div key={item.id} className='adviceEntry'>
              <div className='tablecontainer'>
                <p className='static'>Advice</p>
                <p>{item.advice}</p>
                <div className='buttonContainerUV'>
                  <button onClick={() => handleUpvote(item.id)}>▴</button>
                  <p> {item.upvotes}</p>
                </div>
                <div className='buttonContainerDV'>
                  <button onClick={() => handleDownvote(item.id)}>▾</button>
                  <p>{item.downvotes}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No Advice for you .</p>
        )}
        <Link to='/' className='Links'>
          Submit More Advice
        </Link>
      </div>
    </>
  );
}
