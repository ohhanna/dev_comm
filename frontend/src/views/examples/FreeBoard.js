import React from "react";

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col } from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import FreeList from "views/freeBoard/FreeList.js"
import DemoFooter from "components/Footers/DemoFooter.js";

function FreePage() {
  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      <IndexNavbar />
      <LandingPageHeader />
        <FreeList />
        <DemoFooter />
    </>
  );
}

export default FreePage;
