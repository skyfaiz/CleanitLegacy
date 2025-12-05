import { Html, Head, Main, NextScript } from 'next/document';
import { ColorModeScript } from '@chakra-ui/react';
import theme from '../styles/theme';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <script src="https://checkout.razorpay.com/v1/checkout.js" async></script>
            </Head>
            <body>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
