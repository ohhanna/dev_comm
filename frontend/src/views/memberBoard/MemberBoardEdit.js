/* eslint-disable */
import React,{ useEffect, useState } from "react";
import axios from 'axios';

// reactstrap components
import {
  Container,
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import ToastEditor from "views/toast/toast-editor.js";

function MemberBoardEdit(prop) {

  const [boardDtl, setBoardDtl] = React.useState();
  const [isLoad, setIsLoad] = useState(false);
  const [isEditor, setIsEditor] = useState(true);

  getBoardDtl();
  // axios function
  function getBoardDtl(){
    const api = axios.create({
      baseURL: "/board/member"
    });

    if (isLoad == false){
      api.get('/getDetail', { params : {boardNo : prop.match.params.boardNo} }
              ).then(function(response){
                setIsLoad(true);

                let boardDtlState = {...boardDtl};
                boardDtlState = response.data;
                setBoardDtl(boardDtlState);

                console.log(boardDtl);
              }).catch(function(error){
                alert("System Error");
                setIsLoad(true);
              });
    }
  }



  return (
    <>
      <IndexNavbar />
      <ProfilePageHeader />
      
      <div className="section profile-content" onLoad={()=>{getBoardDtl()}}>
        <Container className="ml-auto mr-auto" md="9">
          <h3 className="font-weight-bold">Member Board Edit</h3>
          <br/>
          {
            isLoad == true ? <ToastEditOrViewer prop={boardDtl, isEditor}/> : <div></div>
          }
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

function ToastEditOrViewer(prop){

  console.log(">>> " + prop.boardDtl);

  return(
    <div></div>
  );
}

export default MemberBoardEdit;
