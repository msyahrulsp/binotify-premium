import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Routing } from '../routing';
import { Box, List, ListItem } from '@chakra-ui/react';

const Sidebar = () => {
  const [path, setPath] = useState('/');
  const singerID = 1;

  const navItem = [
    { path: '/', title: 'Home' },
    { path: `/singer/${singerID}/songs`, title: 'Song List' }
  ];

  return (
    <List w='full' fontSize='xl' pt={4}>
      {navItem.map((item) => (
        <ListItem
          pl={4}
          py={2}
          _hover={{ backgroundColor: 'gray.300', color: 'black' }}
        >
          <Link to={item.path}>
            <Box w='full'>{item.title}</Box>
          </Link>
        </ListItem>
      ))}
    </List>
  );
};

export default Sidebar;
