import React, { useEffect, useContext } from 'react';
import AppRouter from './Router';  
import { auth } from './Utility/firebase';  
import { DataContext } from './DataContext/DataContext';
import { Type } from './Utility/action.type';
import './App.css';

function App() {
  const [{ user }, dispatch] = useContext(DataContext);

  useEffect(() => {
     const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch({
          type: Type.SET_USER,
          user: authUser,
        });
      } else {
        dispatch({
          type: Type.SET_USER,
          user: null,
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
       <AppRouter />
    </div>
  );
}

export default App;