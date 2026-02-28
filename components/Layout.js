import Navbar from "./Navbar";
// import Nav2 from "./test";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-grey-900 transition-colors duration-300">
      <Navbar />
      <div>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
