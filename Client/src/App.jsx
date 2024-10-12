import Form from './Components/Form';
import AdviceFilter from './Components/Advice-Filter-1Year';
import AdviceFilter5 from './Components/Advice-Filter-5Year';
import AdviceFilter10 from './Components/Advice-Filter-10year';
import Advice from './Components/Advice';
import Header from './Components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Header />}>
            <Route index element={<Form />} />
            <Route path='advice' element={<Advice />} />
            <Route path='adviceFilter' element={<AdviceFilter />} />
            <Route path='adviceFilter5' element={<AdviceFilter5 />} />
            <Route path='adviceFilter10' element={<AdviceFilter10 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
