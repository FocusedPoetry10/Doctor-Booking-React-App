import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Routers from "../routes/Routers";
const Layout = () => {
  return (
  <>
  <main>
    <Header />
    <Routers />
    <Footer />
    </main>
    </>
  );
};
export default Layout;