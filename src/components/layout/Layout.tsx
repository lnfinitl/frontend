import React, { useState } from 'react';
import { Box, AppBar, Toolbar, IconButton, Typography, Avatar, Menu, MenuItem } from '@mui/material';
import { Sidebar, Menu as ProMenu, MenuItem as ProMenuItem } from 'react-pro-sidebar';
import MenuIcon from '@mui/icons-material/Menu';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PaymentsIcon from '@mui/icons-material/Payments';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link, useLocation } from 'react-router-dom';
import { APP_CONFIG } from '../../types';
import './Layout.scss';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleUserMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { path: '/bank', label: 'Банк', icon: <AccountBalanceIcon /> },
    { path: '/expenses', label: 'Витрати', icon: <ReceiptIcon /> },
    { path: '/salary', label: 'Зарплата', icon: <PaymentsIcon /> },
    { path: '/analytics', label: 'Аналітика', icon: <AnalyticsIcon /> },
  ];

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            onClick={() => setCollapsed(!collapsed)}
            edge="start"
            sx={{ marginRight: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Фінансовий облік
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2">
              {APP_CONFIG.CURRENT_DATETIME}
            </Typography>
            <IconButton
              onClick={handleUserMenuClick}
              size="small"
              sx={{ ml: 2 }}
            >
              <Avatar sx={{ width: 32, height: 32 }}>
                {APP_CONFIG.CURRENT_USER.charAt(0).toUpperCase()}
              </Avatar>
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleUserMenuClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
          >
            <MenuItem onClick={handleUserMenuClose}>
              <AccountCircleIcon sx={{ mr: 1 }} /> Профіль
            </MenuItem>
            <MenuItem onClick={handleUserMenuClose}>Вийти</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Sidebar
        collapsed={collapsed}
        style={{ height: '100%', top: 'auto' }}
      >
        <Box sx={{ mt: 8 }}>
          <ProMenu>
            {menuItems.map((item) => (
              <ProMenuItem
                key={item.path}
                component={<Link to={item.path} />}
                icon={item.icon}
                active={location.pathname === item.path}
              >
                {item.label}
              </ProMenuItem>
            ))}
          </ProMenu>
        </Box>
      </Sidebar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          backgroundColor: '#f5f5f5',
          minHeight: '100vh'
        }}
      >
        {children}
      </Box>
    </Box>
  );
};