import Home from "./components/Home";
import Login from "./components/Login";
import NavMenu from "./components/NavMenu";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import { api } from "./components/axios/api";

function App(): React.ReactNode {
  const [routeState, handleRouteState] = useState("Home");
  const [authStatus, setAuthStatus] = useState(false);
  useEffect(() => {
    api
      .get("/verifyauth")
      .then(() => {
        setAuthStatus(true);
      })
      .catch(() => {
        setAuthStatus(false);
      });
  }, []);
  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-linear-to-b from-gray-100 to-gray-300">
      <NavMenu handleRoute={handleRouteState} />
      <div className="w-full h-screen flex flex-col items-center justify-center gap-6 lg:gap-10 pt-24 pb-12 px-4">
        {!authStatus && routeState !== "Home" ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="font-black text-3xl md:text-4xl lg:text-4xl text-center">
              👨‍🔧 Fix My Relationship! 👩‍🔧
            </h1>
            <Login
              setRouteState={handleRouteState}
              setAuthState={setAuthStatus}
            />
          </div>
        ) : (
          <></>
        )}
        {routeState === "Home" ? (
          <Home landingbuttonHandler={handleRouteState} />
        ) : (
          <></>
        )}
        {authStatus && routeState === "Profile" ? <p>Profile</p> : <></>}
        {authStatus && routeState === "Session" ? <p>Session</p> : <></>}
        {authStatus && routeState === "Friends" ? <p>Friends</p> : <></>}
      </div>
      <Footer />
    </div>
  );
}

export default App;
