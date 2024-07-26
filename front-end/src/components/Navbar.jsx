import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { Avatar } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import logo from "../assets/login/logo.svg";
import '../styles/navbar.css';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.35),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
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
      width: '20ch',
    },
  },
}));

export default function PrimarySearchAppBar({ user }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [modules, setModules] = useState([]);
  const [openMenus, setOpenMenus] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false); 
  const [hoveredMenuIndex, setHoveredMenuIndex] = useState(null); 
  const navigate = useNavigate(); 
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const userData = sessionStorage.getItem('user');
    if (userData) {
        const parsedData = JSON.parse(userData);
        setModules(parsedData.roles[0].modules);
        setOpenMenus(parsedData.roles[0].modules.map(() => false));
    } else {
        navigate('/');
    }
  }, [navigate]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClick = (index) => {
    setOpenMenus(prevState => {
        const newState = [...prevState];
        newState[index] = !newState[index];
        return newState;
    });
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen); 
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleProfileClick = () => {
    handleMenuClose();
    navigate('/perfil'); 
  };

  const handleHomeClick = () => {
    navigate('/home'); 
  };

  const handleLogout = () => {
    sessionStorage.removeItem('token'); 
    navigate('/'); 
  };

  const handleMenuEnter = (index) => {
    setHoveredMenuIndex(index);
    setOpenMenus(prevState => {
      const newState = [...prevState];
      newState[index] = true;
      return newState;
    });
  };

  const handleMenuLeave = (index) => {
    setHoveredMenuIndex(null);
    setOpenMenus(prevState => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  const handleSearchChange = async (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      setLoading(true);
      setError('');
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }

        const response = await axios.get('http://26.127.175.34:5000/user/list', {
          headers: {
            'tokenapp': token
          }
        });

        if (response.data.result) {
          const results = response.data.message.filter(user => {
            const nameParts = user.nombres.toLowerCase().split(' ');
            return nameParts.some(part => part.startsWith(query.toLowerCase()));
          });
          setSearchResults(results);
        } else {
          setError(response.data.message || 'Error al obtener los usuarios');
        }
      } catch (error) {
        setError(error.message || 'Error al obtener los usuarios');
      } finally {
        setLoading(false);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleResultClick = (userId) => {
    setIsSearchFocused(false);
    setSearchQuery('');
    setSearchResults([]);
    navigate(`/amigo/${userId}`);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleProfileClick}>Perfil</MenuItem>
      <MenuItem onClick={handleLogout}>Cerrar Sesion</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >     
      <MenuItem onClick={handleProfileClick}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
          sx={{
            '&:hover': {
              backgroundColor: '#00539f',
            },
          }}
        >
          <AccountCircle />
        </IconButton>
        <p>Perfil</p>    
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <Typography>
          Cerrar Sesion
        </Typography>
      </MenuItem>
    </Menu>
  );

  const drawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onMouseLeave={() => handleMenuLeave(hoveredMenuIndex)}
      onClick={handleDrawerToggle}
      onKeyDown={handleDrawerToggle}
    >
      <List>
        {modules.map((module, index) => (
          <React.Fragment key={module.mod_id}>
            <ListItem 
              button 
              onMouseEnter={() => handleMenuEnter(index)}
            >
              <ListItemText primary={module.nombre} />
            </ListItem>
            {openMenus[index] && module.menu.map(menuItem => (
              <List component="div" disablePadding key={menuItem.menu_id}>
                <ListItem button sx={{ pl: 4 }} onClick={() => navigate(menuItem.route)}> {/* Asegúrate de tener la ruta correcta */}
                  <ListItemText primary={menuItem.nombre} />
                </ListItem>
              </List>
            ))}
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#3f629e' }}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            sx={{ 
              mr: 2,
              '&:hover': {
                backgroundColor: '#00539f',
              },
            }}
          >
          <MenuIcon />
          </IconButton>
          <Drawer
            anchor="left"
            open={drawerOpen}
            onClose={handleDrawerToggle}
          >
            {drawerList}
          </Drawer>
          <Box className="volver_home" sx={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }} onClick={handleHomeClick}>
            <img className="logo" src={logo} alt="logo" />
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ alignContent: 'center'}}
              >
              SocialUG
            </Typography>
          </Box>
          
          <Search ref={searchRef}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Buscar…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => setIsSearchFocused(true)}
            />
            {isSearchFocused && searchQuery && (
              <Box sx={{ position: 'absolute', top: '100%', left: 0, width: '100%', backgroundColor: 'white', zIndex: 1, borderRadius: 1, boxShadow: 1, maxHeight: 200, overflowY: 'auto', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                className="custom-scroll">
                {loading ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                    <CircularProgress size={24} />
                  </Box>
                ) : (
                  searchResults.map((result) => (
                    <ListItem key={result.Id_user} sx={{ color: 'black', cursor: 'pointer', '&:hover': { backgroundColor: '#f0f0f0' }}} onClick={() => handleResultClick(result.Id_user)}>
                      <Avatar sx={{ width: 24, height: 24, margin: '8px' }} />
                      <ListItemText primary={result.nombres || result.usuario} />
                    </ListItem>
                  ))
                )}
                {error && (
                  <Typography color="error" sx={{ padding: 2 }}>{error}</Typography>
                )}
              </Box>
            )}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>          
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{
                '&:hover': {
                  backgroundColor: '#00539f',
                },
              }}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
