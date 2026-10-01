import React, { useContext } from 'react';
import { Navigate } from 'react'
import { DataContext } from '../DataContext/DataContext';

function ProtectedRoute({ children, msg, redirect }) {
  const [{ user }] = useContext(DataContext);

   if (!user) {
    return (
      <Navigate 
        to="/auth" 
        state={{ msg, redirect }} 
      />
    );
  }

   return children;
}

export default ProtectedRoute;