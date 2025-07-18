import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  ListItemButton
} from '@mui/material';
import { MenuListItems } from '@/components/common/Sidentmenu'; // Ensure this path is correct

export default function SearchResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const [results, setResults] = useState<typeof MenuListItems>([]);

  useEffect(() => {
    const query = new URLSearchParams(location.search).get('q');
    if (query) {
      const filtered = MenuListItems.filter(item =>
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
    } else {
      setResults([]); // Clear results if no query is present
    }
  }, [location.search]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Search Results
      </Typography>
      <Typography variant="body2" color="text.secondary" gutterBottom>
        Found {results.length} matches
      </Typography>
      <Divider sx={{ my: 2 }} />

      {results.length > 0 ? (
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {results.map((item) => (
            <ListItem
              key={item.id}
              disablePadding
              sx={{
                mb: 1,
                borderRadius: 1,
                overflow: 'hidden'
              }}
            >
              <ListItemButton
                onClick={() => navigate(item.path)}
                sx={{
                  '&:hover': {
                    bgcolor: 'action.hover',
                    boxShadow: 1
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.title}
                  secondary={item.path.replace('/dashboard', '') || 'Home'}
                />
                <Chip
                  label="Menu Item"
                  size="small"
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      ) : (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: 4
        }}>
          <Typography variant="h6" color="text.secondary">
            No results found
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Try different search terms
          </Typography>
        </Box>
      )}
    </Box>
  );
}