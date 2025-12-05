import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
    colors: {
        green: {
            50: '#e6f7ed',
            100: '#b3e6cc',
            200: '#80d6ab',
            300: '#4dc689',
            400: '#1ab568',
            500: '#00a550',
            600: '#008440',
            700: '#006330',
            800: '#004220',
            900: '#002110'
        }
    },
    fonts: {
        heading: 'Inter, sans-serif',
        body: 'Inter, sans-serif'
    }
});

export default theme;
