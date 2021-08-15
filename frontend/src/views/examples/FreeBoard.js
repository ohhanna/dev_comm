import React from "react";

import { Route, Switch } from "react-router-dom";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import FreePageList from "views/freeBoard/FreeList.js";
import FreePageForm from "views/freeBoard/FreeListForm.js";
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
      <Switch>      
        <Route
          path="/freeBoard/list"
          component={FreePageList}
        />
        <Route
          path="/freeBoard/addForm"
          component={FreePageForm}
        />
      </Switch>
      <DemoFooter />
    </>
  );
}

export default FreePage;
