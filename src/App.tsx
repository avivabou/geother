import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import MenuBar from './Components/MenuBar/MenuBar';
import HomePage from './Pages/HomePage/HomePage';
import FavoritesPage from './Pages/FavoritesPage/FavoritesPage';

const menuItems = [
  { title: 'Home', path: '/' },
  { title: 'Favorites', path: '/favorites' },
];

const menuLogoItem = {
  logoUrl:
    // eslint-disable-next-line max-len
    'https://img.freepik.com/free-vector/snowflake-sunny-weather-icon_1308-128681.jpg?t=st=1725725589~exp=1725729189~hmac=69740bdfb8af3ba9449522a46d3a949061be19e97c91c696562b8a9acabd6e5a&w=1060',
};

function App() {
  return (
    <Router>
      <div className="App">
        <MenuBar menuItems={menuItems} menuLogoItem={menuLogoItem} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          {/* Add more routes as needed */}
        </Routes>
        <ToastContainer />
      </div>
    </Router>
  );
}

export default App;
