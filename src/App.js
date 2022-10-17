import { lazy, Suspense } from "react";
import "./App.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Login = lazy(() => import("./Pages/Login"));
const Register = lazy(() => import("./Pages/Register"));
const Recipes = lazy(() => import("./Pages/Recipes"));
const Favourites = lazy(() => import("./Pages/Favourites"));
const LoginProtected = lazy(() =>
  import("./Components/Protected Routes/LoginProtected")
);
const LoginPageProtected = lazy(() =>
  import("./Components/Protected Routes/LoginPageProtected")
);

const App = () => {
  return (
    <Router>
      <Suspense
        fallback={
          <div className="suspense-loader-cont">
            <p>Loading...</p>
          </div>
        }>
        <Routes>
          /** Login Page */
          <Route
            exact
            path="/login"
            element={
              <LoginPageProtected>
                <Login />
              </LoginPageProtected>
            }
          />
          /** Register Page */
          <Route
            exact
            path="/register"
            element={
              <LoginPageProtected>
                <Register />
              </LoginPageProtected>
            }
          />
          /** All Recipes Page */
          <Route
            exact
            path="/"
            element={
              <LoginProtected>
                <Recipes />
              </LoginProtected>
            }
          />
          /** Favourite Recipes Page */
          <Route
            exact
            path="/favourites"
            element={
              <LoginProtected>
                <Favourites />
              </LoginProtected>
            }
          />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
