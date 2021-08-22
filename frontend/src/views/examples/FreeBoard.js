import React from "react";

import { Route, Switch } from "react-router-dom";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import FreePageList from "views/freeBoard/FreeList.js";
import FreePageForm from "views/freeBoard/FreeListAdd.js";
import FreePageDetail from "views/freeBoard/FreeListDetail.js"
import FreePageModify from "views/freeBoard/FreeListModify.js"
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
        <Route
          path="/freeBoard/detail/:param"
          component={FreePageDetail}
        />
        <Route
          path="/freeBoard/modify/:param"
          component={FreePageModify}
        />
      </Switch>
      <DemoFooter />
    </>
  );
}

export default FreePage;
