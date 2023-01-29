import './App.css';
import { Routes, Route } from "react-router-dom";
// import MyDashboardPage from './pages/auth/MyDashboardPage';
import PrivateRoute from './pages/auth/PrivateRoute';
import LoginPage from './pages/auth/LoginPage';
import HomePage from './pages/base/HomePage';

function App() {
  return (
    <Routes>
      <Route path={'/'} element={<LoginPage />} />
      <Route path={'/Login'} element={<LoginPage />} />
      <Route element={<PrivateRoute />}>
        <Route path={'/Home'} element={<HomePage />} />
      </Route>
    </Routes>
  );
}

export default App;
