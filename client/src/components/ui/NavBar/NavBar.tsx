import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './NavBar.module.css';

export default function NavBar(): React.JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>): void =>
    setAnchorEl(event.currentTarget);
  const handleMobileMenuClose = (): void => setMobileMoreAnchorEl(null);
  const handleMenuClose = (): void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>): void =>
    setMobileMoreAnchorEl(event.currentTarget);

  const menuId = 'primary-search-account-menu';
  const mobileMenuId = 'primary-search-account-menu-mobile';

  return (
    <Box className={styles.container}>
      <AppBar position="fixed" className={styles.appBar}>
        <Toolbar>
          <Box className={styles.toolbar}>
            <Box className={styles.logoSection}>
              <NavLink to="/" className={styles.navLink}>
                <img src="/logo.png" alt="logo" />
                <Typography variant="h6" noWrap>
                  Citadel Hub
                </Typography>
              </NavLink>
            </Box>

            <Box className={styles.navigationSection}>
              <NavLink to="/card" className={styles.navLink}>
                Cards
              </NavLink>
              <NavLink to="/episode" className={styles.navLink}>
                Episodes
              </NavLink>
            </Box>

            <Box className={styles.accountSection}>
              <Box className={styles.desktopMenu}>
                <Typography className={styles.separator}>|</Typography>
                <Typography className={styles.userName}>Guest</Typography>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>

              <NavLink to="/" className={styles.navLink}>
                <Button size="large" variant="contained" className={styles.buttonSupport}>
                  Support Us
                </Button>
              </NavLink>

              <Box className={styles.mobileMenu}>
                <IconButton
                  size="large"
                  aria-label="menu"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Menu
        anchorEl={anchorEl}
        id={menuId}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>

      <Menu
        anchorEl={mobileMoreAnchorEl}
        id={mobileMenuId}
        keepMounted
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton color="inherit">
            <AccountCircle />
          </IconButton>
          <Typography>Profile</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}
