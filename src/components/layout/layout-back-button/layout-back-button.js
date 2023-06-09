import { Button } from '@mui/material';
import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useLocation, useNavigate } from 'react-router-dom';

export function LayoutBackButton() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === '/') return null;

  const onClick = () => navigate(-1);

  return (
    <Button
      onClick={onClick}
      size="small"
      startIcon={<ArrowBackIcon />}
      variant="outlined"
    >
      Back
    </Button>
  );
}
