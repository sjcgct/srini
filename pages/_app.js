import "../styles/globals.css";
import Layout from "../components/Layout";
import ThemeToggle from "../components/ThemeToggle";

function MyApp({ Component, pageProps }) {
  return (
    <div className="min-h-screen bg-white dark:bg-grey-900 transition-colors duration-300">
    <Layout>
      <ThemeToggle />
      <Component {...pageProps}></Component>
    </Layout>
    </div>
  );
}

export default MyApp;
