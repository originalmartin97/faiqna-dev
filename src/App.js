import { React, useEffect } from 'react'
import useStore from './store'
import { auth } from './firebase'
import DashboardScreen from './screens/DashboardScreen'
import PublicRoute from './utils/PublicRoute'
import PrivateRoute from './utils/PrivateRoute'
import { onAuthStateChanged } from 'firebase/auth'
import AuthenticationScreen from './screens/AuthenticationScreen'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {
  const { loading, setLoginStatus } = useStore()
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoginStatus(!!user);
    });
    return () => unsubscribe();
  }, [setLoginStatus]);
  return (
    <Router>
      <Routes>
        {/*        <Route path="/history/:id" element={<ShowResponse />} /> */}
        <Route path="/" element={<PublicRoute Component={AuthenticationScreen} />} />
        <Route path="/dashboard" element={<PrivateRoute Component={DashboardScreen} />} />
      </Routes>
    </Router>
  );
}

export default App;