import Login from "./components/Login";
import NavMenu from "./components/NavMenu";
import { useState } from "react";

function App(): React.ReactNode {
  const [routeState, handleRouteState] = useState("Home");
  const isLoggedIn = false;
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center bg-linear-to-b from-gray-100 to-gray-300">
      <NavMenu handleRoute={handleRouteState} />
      <div className="w-full h-full flex flex-col items-center justify-center gap-6 lg:gap-10">
        {!isLoggedIn ? (
          <>
            <h1 className="font-black text-3xl md:text-4xl lg:text-5xl">
              👨‍🔧 Fix My Relationship! 👩‍🔧
            </h1>
            <Login />
          </>
        ) : (
          <></>
        )}
        {routeState === "Home" ? <p>Home</p> : <></>}
        {routeState === "Profile" ? <p>Profile</p> : <></>}
        {routeState === "Session" ? <p>Session</p> : <></>}
        {routeState === "Friends" ? <p>Friends</p> : <></>}
      </div>
    </div>
  );
}

export default App;
