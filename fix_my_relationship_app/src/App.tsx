import Login from "./components/Login";
import NavMenu from "./components/NavMenu";
import { useState } from "react";

function App(): React.ReactNode {
  const [routeState, handleRouteState] = useState("Home");
  const isLoggedIn = false;
  return (
    <div className="w-screen flex flex-col items-center justify-center gap-4">
      <NavMenu handleRoute={handleRouteState} />
      {!isLoggedIn ? <Login /> : <></>}
      {routeState === "Home" ? <p>Home</p> : <></>}
      {routeState === "Profile" ? <p>Profile</p> : <></>}
      {routeState === "Session" ? <p>Session</p> : <></>}
      {routeState === "Friends" ? <p>Friends</p> : <></>}
    </div>
  );
}

export default App;
