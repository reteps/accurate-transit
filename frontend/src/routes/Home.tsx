import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <p>
        This is our landing page. Click{' '}
        <Link to="/overview" className="text-blue-700 font-bold">
          here
        </Link>{' '}
        to open the main app.
      </p>
    </div>
  );
}
