import React from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import styles from './welcome.module.css';

const Welcome: React.FC = () =>  {
  return (
    <Paper className={styles['welcome-card']} elevation={1}>
      <Typography variant="h6" className={styles['welcome-title']}>
        Welcome to the new Passport
      </Typography>
      <Typography variant="body2" className={styles['welcome-subtitle']}>
        Your journey to data insights starts here
      </Typography>
      <List>
        <ListItem className={styles['welcome-item']}>
          <ListItemIcon className={styles['welcome-icon-box']}>
            <SearchIcon className={styles['welcome-icon']} />
          </ListItemIcon>
          <ListItemText
            primary="Search & Browse"
            secondary="Explore our comprehensive data and reports"
          />
        </ListItem>
        <ListItem className={styles['welcome-item']}>
          <ListItemIcon className={styles['welcome-icon-box']}>
            <BookmarkIcon className={styles['welcome-icon']} />
          </ListItemIcon>
          <ListItemText
            primary="Create projects"
            secondary="Save and organise your important findings"
          />
        </ListItem>
        <ListItem className={styles['welcome-item']}>
          <ListItemIcon className={styles['welcome-icon-box']}>
            <CheckBoxIcon className={styles['welcome-icon']} />
          </ListItemIcon>
          <ListItemText
            primary="Track your work"
            secondary="This widget will show your recent or auto-loaded projects"
          />
        </ListItem>
      </List>
    </Paper>
  );
}

export default Welcome;
