// 1. import `NextUIProvider` component
import { NextUIProvider } from "@nextui-org/react";

interface MyAppProps {
    Component: React.ComponentType;
    pageProps: Record<string, unknown>;
}

function MyApp({ Component, pageProps }: MyAppProps) {
    return (
        // 2. Use at the root of your app
        <NextUIProvider>
            <Component {...pageProps} />
        </NextUIProvider>
    );
}

export default MyApp;
