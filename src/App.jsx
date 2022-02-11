import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// pages
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import PageNotFound from "./pages/PageNotFound";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            exact
            element={
              <div className="bg-secondary p-5">
                <LandingPage />
              </div>
            }
          />
          <Route path="/home" exact element={<HomePage />} />
          <Route
            path="*"
            element={
              <div className="bg-secondary p-5">
                <PageNotFound />
              </div>
            }
          />
        </Routes>
      </Router>
    </>
  );
};

export default App;
