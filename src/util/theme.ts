import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  styles: {
    global: {
      '*': {
        '&::-webkit-scrollbar': {
          w: '2'
        }
        // '&::-webkit-scrollbar-track': {
        //   backgroundColor: 'cyan'
        // },
        // '&::-webkit-scrollbar-thumb': {
        //   backgroundColor: 'blue'
        // }
      }
    }
  }
});
