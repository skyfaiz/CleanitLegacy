import { Box, Container, Text, HStack, Link } from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box bg="gray.50" py={8} mt={16}>
            <Container maxW="6xl">
                <HStack justify="space-between">
                    <Text color="gray.600">© 2024 Cleanit. All rights reserved.</Text>
                    <HStack spacing={6}>
                        <Link href="/about">About</Link>
                        <Link href="/contact">Contact</Link>
                        <Link href="/terms">Terms</Link>
                        <Link href="/privacy">Privacy</Link>
                    </HStack>
                </HStack>
            </Container>
        </Box>
    );
}
