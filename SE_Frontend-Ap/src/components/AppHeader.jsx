    import React from 'react';
    import { Link, useLocation, useNavigate } from 'react-router-dom';
    import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
    import './AppHeader.css';

    const AppHeader = () => {
        const navigate = useNavigate();
        const location = useLocation();

        const isLoginPage = location.pathname === '/login';
        const isRegistrationPage = location.pathname === '/register';
        const isDisplayEventsPage = location.pathname.includes('/events');

        const navigateToResponses = () => navigate('/responses');
        const handleLogout = () => {
            // Perform logout operations here
            // Example: localStorage.removeItem('authToken');
            navigate('/login');
        };

        return (
            <header>
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                    {isDisplayEventsPage || isLoginPage || isRegistrationPage ? (
            <Link to="/login" className="navbar-brand">
              EventEase
            </Link>
          ) : (
            <Link to="/home" className="navbar-brand">
              EventEase
            </Link>
          )}
          {!(isDisplayEventsPage || isLoginPage || isRegistrationPage) ? (
            <div className="d-flex">
              {/* Button for Responses tab with onClick handler */}
              <button onClick={navigateToResponses} className="btn btn-outline-primary me-2">
                Responses
              </button>
              {/* Button for LogOut with onClick handler */}
              <button onClick={handleLogout} className="btn btn-outline-secondary">
                LogOut
              </button>
            </div>
          ) : (
            <div className="d-flex">
              {isLoginPage ? (
                // Button for Responses tab with onClick handler
                <button onClick={() => navigate('/register')} className="btn btn-outline-primary me-2">
                  Register
                </button>
              ) : isRegistrationPage ? (
                // Button for Responses tab with onClick handler
                <button onClick={() => navigate('/login')} className="btn btn-outline-primary me-2">
                  Login
                </button>
              ) : null}
            </div>
          )}
                        
                    </div>
                </nav>
            </header>
        );
    };

    export default AppHeader;
