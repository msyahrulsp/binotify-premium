import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false
  },
  styles: {
    global: {
      '*': {
        body: {
          overflow: 'overlay'
        },
        '&::-webkit-scrollbar': {
          w: '10px'
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: 'transparent'
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'hsla(0,0%,100%,.3)',
          borderRadius: '15px'
        }
      }
    }
  }
});
