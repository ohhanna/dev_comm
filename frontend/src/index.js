import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";

// styles
import "bootstrap/scss/bootstrap.scss";
import "assets/scss/paper-kit.scss?v=1.3.0";
import "assets/demo/demo.css?v=1.3.0";

// pages
import Index from "views/Index.js";
import NucleoIcons from "views/NucleoIcons.js";
import NoticePage from "views/examples/NoticeBoard.js";
import FreePage from "views/examples/FreeBoard.js";
import MemberBoardList from "views/memberBoard/MemberBoardList";
import MemberBoardEdit from "views/memberBoard/MemberBoardEdit";
// others

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/index" render={(props) => <Index {...props} />} />
      <Route
        path="/nucleo-icons"
        render={(props) => <NucleoIcons {...props} />}
      />
      <Route
        path="/notice-page/:d"
        render={(props) => <NoticePage {...props} />}
      />
      <Route
        path="/memberBoardList"
        render={(props) => <MemberBoardList {...props} />}
      />
      <Route
        path="/memberBoardEdit/:boardNo"
        render={(props) => <MemberBoardEdit {...props} />}
      />
      <Route
        path="/freeBoard/:param"
        render={(props) => <FreePage {...props} />}
      />
      <Redirect to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);
