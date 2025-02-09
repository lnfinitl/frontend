import React, { useState } from 'react';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Box, IconButton, Typography, useTheme as useMuiTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import AssessmentOutlinedIcon from '@mui/icons-material/AssessmentOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useTheme } from '../theme/ThemeProvider';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { mode } = useTheme();
  const muiTheme = useMuiTheme();

  return (
    <Box
      sx={{
        '& .ps-sidebar-container': {
          background: mode === 'light' ? '#fff' : muiTheme.palette.background.default,
          height: '100vh',
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu>
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h4">
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <MenuItem icon={<HomeOutlinedIcon />} component={<Link to="/" />}>
            Головна
          </MenuItem>

          <SubMenu icon={<AccountBalanceWalletOutlinedIcon />} label="Банк">
            <MenuItem component={<Link to="/documents/bank" />}>
              Банківські операції
            </MenuItem>
            <MenuItem component={<Link to="/reports/bank" />}>
              Банківські звіти
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<ReceiptLongOutlinedIcon />} label="Витрати">
            <MenuItem component={<Link to="/documents/expenses" />}>
              Витрати
            </MenuItem>
            <MenuItem component={<Link to="/documents/monthlyExpenses" />}>
              Щомісячні витрати
            </MenuItem>
            <MenuItem component={<Link to="/reports/expenses" />}>
              Звіти по витратам
            </MenuItem>
          </SubMenu>

          <SubMenu icon={<MonetizationOnOutlinedIcon />} label="Зарплата">
            <MenuItem component={<Link to="/documents/salary" />}>
              Зарплатні відомості
            </MenuItem>
            <MenuItem component={<Link to="/reports/salary" />}>
              Звіти по зарплаті
            </MenuItem>
          </SubMenu>

          <MenuItem 
            icon={<AssessmentOutlinedIcon />} 
            component={<Link to="/analytics" />}
          >
            Аналітика
          </MenuItem>
        </Menu>
      </ProSidebar>
    </Box>
  );
};