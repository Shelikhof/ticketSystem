import React from "react";
import Footer from "../components/Footer/Footer";

interface IProp extends React.HTMLProps<HTMLDivElement> {}

const PageTemplate: React.FC<IProp> = ({ children }) => {
  return (
    <>
      <div id="content">{children}</div>
      <Footer />
    </>
  );
};

export default PageTemplate;
