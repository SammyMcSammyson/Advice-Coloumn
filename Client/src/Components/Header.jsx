import { Outlet, Link } from 'react-router-dom';
import '../css/Header.css';

export default function Header() {
  return (
    <div>
      <section>
        <nav className='nav'>
          <ul className='mainnavbar'>
            <li>
              <Link to='/'></Link>
            </li>
          </ul>
        </nav>
      </section>
      <Outlet />
    </div>
  );
}
