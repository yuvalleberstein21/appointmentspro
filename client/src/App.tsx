import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import Header from './components/Header';
import AuthPageSignUp from './pages/AuthPageSignUp';
import HomePage from './pages/HomePage';
import SingleBusinessPage from './pages/SingleBusinessPage';
import CreateBusiness from './pages/CreateBusiness';

function App() {
  return (
    <>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/auth/register" element={<AuthPageSignUp />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/business/:id" element={<SingleBusinessPage />} />
            <Route path="/createbusiness" element={<CreateBusiness />} />
            {/* <Route path="/homepage" element={<HomeScreen />} />
            <Route path="/business/:id" element={<SingleBusiness />} />
            <Route
              path="/business/:id/editbusiness"
              element={<BusinessEditScreen />}
            />
            <Route path="/createbusiness" element={<CreateBusiness />} />
            <Route path="/manager" element={<AdminHomeScreen />} /> */}
          </Routes>

          {/* <Navbar /> */}
        </div>
      </Router>
    </>
  );
}

export default App;
