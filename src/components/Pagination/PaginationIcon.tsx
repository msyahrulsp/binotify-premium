import React from 'react';
import { Box } from '@chakra-ui/react';
import { PaginationIconProps } from '../../@types/pagination';

export const PaginationItemIcon = ({
  icon,
  page,
  onPageChange
}: PaginationIconProps) => {
  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      fontSize='xs'
      width='8'
      height='8'
      borderRadius={6}
      cursor='pointer'
      bg='green.500'
      color='#FFFFFF'
      _hover={{
        bg: 'green.500'
      }}
      onClick={() => onPageChange(page)}
    >
      {icon}
    </Box>
  );
};
