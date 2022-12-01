import React from 'react';
import { Box } from '@chakra-ui/react';
import { PaginationItemProps } from '../../@types/pagination';

export const PaginationItem = ({
  isCurrent = false,
  page,
  onPageChange
}: PaginationItemProps) => {
  if (isCurrent) {
    return (
      <Box
        display='flex'
        alignItems='center'
        justifyContent='center'
        fontSize='xs'
        width='8'
        height='8'
        bg='green.500'
        cursor='pointer'
        color='#FFFFFF'
        borderRadius={6}
        fontWeight='semibold'
      >
        {page}
      </Box>
    );
  }

  return (
    <Box
      display='flex'
      alignItems='center'
      justifyContent='center'
      fontSize='xs'
      width='8'
      height='8'
      bg='inherit'
      color='black'
      _hover={{
        bg: 'green.500',
        color: '#FFFFFF'
      }}
      cursor='pointer'
      borderRadius={6}
      onClick={() => onPageChange(page)}
      fontWeight='semibold'
    >
      {page}
    </Box>
  );
};
