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

function MemberBoardEdit() {

  function getBoardList(option){
    const api = axios.create({
      baseURL: "/board/member"
    });

    api.post('/list', null, { params : { pageIndex : option.data.pageIndex, pageSize : option.data.pageSize } }
            ).then(function(response){
              // SEARCH 전 기존 state 초기화
              setBoardList([]);
              // board list deep copy
              var boardListState = response.data.map((item, i)=>{return item;});
              // DB data set state
              setBoardList(boardListState);
              setTotCnt(boardListState[0].totCnt);
            }).catch(function(error){
              alert("System Error");
            });
    }

  return (
    <>
      <IndexNavbar />
      <ProfilePageHeader />
      
      <div className="section profile-content">
        <Container className="ml-auto mr-auto" md="9">
          <h3 className="font-weight-bold">Member Board Edit</h3>
          <br/>
          <ToastEditor/>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default MemberBoardEdit;
