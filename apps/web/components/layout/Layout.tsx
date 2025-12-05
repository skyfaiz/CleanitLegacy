import { Box } from '@chakra-ui/react';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <Box minH="100vh" display="flex" flexDirection="column">
            <Header />
            <Box flex={1}>{children}</Box>
            <Footer />
        </Box>
    );
}
