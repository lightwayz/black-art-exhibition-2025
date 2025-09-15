import "../styles/styles.css"; // ✅ global styles import

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}
