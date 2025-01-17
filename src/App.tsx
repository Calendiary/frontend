import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './global.css';
import List from './pages/List/List';
import Main from './pages/Main/Main';
import KakaoCallback from './auth/kakao/kakaoCallback';
import Navigator from './components/Navbar/Navbar';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/list" element={<List />} />
        <Route
          path="/auth/kakao/callback"
          element={<KakaoCallback />}
        />
      </Routes>
      <Navigator />
    </Router>
  );
};

export default App;
