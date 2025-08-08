// src/components/common/Appbar.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useNotifications } from '@/context/NotificationContext';
import { formatDistanceToNow } from 'date-fns';
import {
  AppBar,
  Toolbar,
  IconButton,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  InputBase,
  Box,
  Typography,
  Divider,
  ListItemIcon,
  ListItemText,
  Tooltip,
  useMediaQuery,
  useTheme,
  Chip, // Import Chip for notification count
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Logout as LogoutIcon,
  //Settings as SettingsIcon,
  //Person as PersonIcon,
} from '@mui/icons-material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.1),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.15),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
    transition: theme.transitions.create(['background-color', 'border-color', 'box-shadow']),
    '&:focus-within': {
      borderColor: theme.palette.primary.main,
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`,
    }
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '25ch',
      '&:focus': {
        width: '35ch',
      },
    },
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));

export default function Appbar() {
  const { user, logout } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchorEl, setNotificationAnchorEl] = useState<null | HTMLElement>(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const isMenuOpen = Boolean(anchorEl);
  const isNotificationMenuOpen = Boolean(notificationAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchorEl(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    markAsRead();
    setNotificationAnchorEl(null);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/dashboard/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    handleMenuClose();
  };

  return (
    <AppBar
      position="sticky"
      elevation={2}
      sx={{
        backdropFilter: 'blur(20px)',
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
        color: 'text.primary',
        borderBottom: '1px solid',
        borderColor: theme.palette.divider,
      }}
    >
      <Toolbar>
        {/* Search Bar */}
        {isMobile ? (
          <IconButton color="inherit" onClick={() => navigate('/dashboard/search')}>
            <SearchIcon />
          </IconButton>
        ) : (
          <Search>
            <form onSubmit={handleSearch}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search menus..."
                inputProps={{ 'aria-label': 'search' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </Search>
        )}

        <Box sx={{ flexGrow: 1 }} />

        {/* Notification Icon */}
        <Tooltip title="Notifications">
          <IconButton
            size="large"
            aria-label={`show ${unreadCount} new notifications`}
            color="inherit"
            onClick={handleNotificationMenuOpen}
            sx={{
              mr: 1,
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
                color: theme.palette.primary.main,
              },
            }}
          >
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Tooltip>

        {/* Profile Avatar */}
        <Tooltip title={user?.name || "Profile"}>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
            sx={{
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.1)',
              },
            }}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              variant="dot"
            >
              <Avatar alt={user?.name} src={user?.imgurl} sx={{ width: 32, height: 32 }} />
            </StyledBadge>
          </IconButton>
        </Tooltip>

        {/* Notification Menu */}
        <Menu
          anchorEl={notificationAnchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isNotificationMenuOpen}
          onClose={handleNotificationMenuClose}
          PaperProps={{
            sx: {
              width: 380,
              maxHeight: 440,
              overflow: 'auto',
              mt: 1.5,
              borderRadius: theme.shape.borderRadius * 2,
              boxShadow: theme.shadows[6],
            },
          }}
        >
          <MenuItem disabled sx={{ pb: 0, pt: 1.5 }}>
            <Typography variant="h6" fontWeight="bold">Notifications</Typography>
            {unreadCount > 0 && (
              <Chip
                label={`${unreadCount} new`}
                color="primary"
                size="small"
                sx={{ ml: 1, fontWeight: 'bold' }}
              />
            )}
          </MenuItem>
          <Divider sx={{ my: 1 }} />

          {Array.isArray(notifications) && notifications.length > 0 ? (
            notifications.map((notification) => (
              <MenuItem
                key={notification.id}
                onClick={handleNotificationMenuClose}
                sx={{
                  backgroundColor: !notification.read ? alpha(theme.palette.primary.light, 0.1) : 'inherit',
                  '&:hover': {
                    backgroundColor: alpha(theme.palette.action.hover, 0.8),
                    boxShadow: theme.shadows[1],
                  },
                  py: 1.5,
                  display: 'flex',
                  alignItems: 'flex-start',
                  borderRadius: theme.shape.borderRadius,
                  mx: 1,
                  mb: 0.5,
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, mt: 0.5 }}>
                  <Avatar sx={{ bgcolor: theme.palette.primary.main, width: 36, height: 36 }}>
                    <NotificationsIcon fontSize="small" sx={{ color: theme.palette.common.white }} />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" fontWeight={!notification.read ? 'medium' : 'normal'} component="div">
                      {notification.message}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="caption" color="text.secondary">
                      {formatDistanceToNow(new Date(notification.createdAt)) + ' ago'}
                    </Typography>
                  }
                  sx={{ ml: 1 }}
                />
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled sx={{ justifyContent: 'center', py: 2 }}>
              <ListItemText primary={
                <Typography variant="body2" color="text.secondary" sx={{ fontStyle: 'italic' }}>
                  No new notifications
                </Typography>
              } />
            </MenuItem>
          )}
        </Menu>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMenuOpen}
          onClose={handleMenuClose}
          PaperProps={{
            sx: {
              width: 220,
              overflow: 'visible',
              mt: 1.5,
              borderRadius: theme.shape.borderRadius * 2,
              boxShadow: theme.shadows[6],
            },
          }}
        >

          <Divider />
          <MenuItem onClick={handleLogout}
            sx={{ '&:hover': { bgcolor: alpha(theme.palette.error.light, 0.2) } }}
          >
            <ListItemIcon>
              <LogoutIcon fontSize="small" color="error" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}