import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Tabs, Tab, Toolbar, Typography } from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PeopleIcon from '@mui/icons-material/People';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { APP_CONFIG } from '../../types';

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="default">
      <Toolbar>
        <Tabs value={location.pathname} sx={{ flexGrow: 1 }}>
          <Tab
            label="Банк"
            icon={<AccountBalanceIcon />}
            value="/bank"
            component={Link}
            to="/bank"
          />
          <Tab
            label="Витрати"
            icon={<ReceiptIcon />}
            value="/expenses"
            component={Link}
            to="/expenses"
          />
          <Tab
            label="Зарплата"
            icon={<PeopleIcon />}
            value="/salary"
            component={Link}
            to="/salary"
          />
          <Tab
            label="Аналітика"
            icon={<AssessmentIcon />}
            value="/analytics"
            component={Link}
            to="/analytics"
          />
        </Tabs>
        <Typography variant="body2" sx={{ ml: 2 }}>
          {APP_CONFIG.CURRENT_USER}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};