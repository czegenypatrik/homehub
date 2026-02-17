import { useEffect, useState } from 'react';
import supabase from './db/supabase';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css'
import { useAuth } from './types/useAuth';
import AppLayout from './components/AppLayout';
import Dashboard from './views/Dashboard';
import Login from './views/Login';
import Pukszi from './views/Pukszi';

function App() {
  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

    const user = useAuth();

    return (
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            {!user ? (
              <Route path="*" element={<Login />} />
            ) : (
              <Route element={<AppLayout />}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/pukszi" element={<Pukszi />} />
              </Route>
            )}
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    )
  }

  export default App
