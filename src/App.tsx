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
import { ThemeProvider } from './context/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
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
    </ThemeProvider>
  );
};

export default App;
