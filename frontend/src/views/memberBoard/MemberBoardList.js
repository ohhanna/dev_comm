/* eslint-disable */
import React,{ useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import '@toast-ui/editor/dist/toastui-editor.css';
import {Viewer} from '@toast-ui/editor/dist/toastui-editor-viewer';
import Moment from 'react-moment';


// reactstrap components
import {
  Button,
  FormGroup,
  Input,
  Container,
  Row,
  Col,
  Alert
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import Pagination from 'react-js-pagination';

function MemberBoardList() {

  ////////////////////////////////////////////////////////////////////
  ///////////////// STATE
  ////////////////////////////////////////////////////////////////////
  const [alertDanger, setAlertDanger] = React.useState(true);
  const [pageIndex, setPageIndex] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totCnt, setTotCnt] = useState(0);
  const [boardList, setBoardList] = useState([]);
  const history = useHistory();

  ////////////////////////////////////////////////////////////////////
  ///////////////// 전역변수 
  ////////////////////////////////////////////////////////////////////
  const option ={
    url : '/board/member/list',
    method:'GET',
    header:{
       'Accept':'application/json'
    },
    data:{
      'pageIndex' : pageIndex,
      'pageSize' : pageSize
    }
  };

  ////////////////////////////////////////////////////////////////////
  ///////////////// 개발자 함수
  ////////////////////////////////////////////////////////////////////
  useEffect(() => {
    getPageIndex(pageIndex, 10);
  }, [pageIndex]);

  function getPageIndex(pageIndex, pageSize){
    setPageIndex(pageIndex);
    setPageSize(pageSize);
    option.data.pageIndex = pageIndex;
    option.data.pageSize = pageSize;
    
    getBoardList(option);
  }

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
              alert(error);
            });
  }

  function goToDetail(boardNo){
    let boardNoUrl = boardNo == null && boardNo == undefined ? 'new' : boardNo;
    history.push("/memberBoardEdit/" + boardNoUrl);
  }

  ////////////////////////////////////////////////////////////////////
  ///////////////// Render
  ////////////////////////////////////////////////////////////////////
  return (
    <>
      <IndexNavbar />
      <ProfilePageHeader />
      
      <div className="section profile-content">
        {/* Page Control Module */}

        <Alert className="alert-with-icon" color="danger" isOpen={alertDanger}>
          <Container>
            <div className="alert-wrapper">
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                aria-label="Close"
                onClick={() => setAlertDanger(false)}
              >
                <i className="nc-icon nc-simple-remove" />
              </button>
              <div className="message">
                <i className="nc-icon nc-bell-55 mr-2" /> 
                  회원전용 게시판입니다.
              </div>
            </div>
          </Container>
        </Alert>

        <Container className="ml-auto mr-auto" md="9">
          <div style={{'height':'80px', 'margin':'0auto'}}>
              <p className="h3 font-weight-bold float-left">Member Board</p>
          </div>
          <Row>
            <Col >
              <FormGroup>
                <Input type="text" size="sm" onChange={(e)=>{console.log(e.target.value)}}/>
              </FormGroup>
            </Col>
            <Col sm="0">
              <Button
                className="btn-round mr-1"
                color="default"
                size="sm"
                outline
                type="button"
                onClick={()=>{getBoardList(option)}}
              >
                Search
              </Button>

              <Button
                className="btn-round mr-1 "
                color="default"
                size="sm"
                outline
                type="button"
                onClick={()=>{goToDetail()}}
              >
                Write
              </Button>
            </Col>
          </Row>


          {/* Board List Component */}
          <BoardList getBoardList={getBoardList} boardListState={boardList} goToDetail={goToDetail}/>
          <br />

          <Row>
            <div className="ml-auto mr-auto">
              <nav>
                <Pagination activePage={pageIndex} 
                            itemsCountPerPage={pageSize} 
                            totalItemsCount={totCnt} 
                            pageRangeDisplayed={5} 
                            prevPageText={"‹"} 
                            nextPageText={"›"} 
                            onChange={(page) => setPageIndex(page)} />

              </nav>
            </div>
          </Row>       

        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

////////////////////////////////////////////////////////////////////
///////////////// COMPONENT
////////////////////////////////////////////////////////////////////
// BoardList Component
function BoardList(prop){
  let boardListProp = prop.boardListState;

  const option ={
    url : '/board/member/list',
    method:'GET',
    header:{
       'Accept':'application/json'
    },
    data:{
      'pageIndex' : 1,
      'pageSize' : 10
    }
  }

  const renderList = () =>{
    const result = [];
    const boardListArr = boardListProp;
      
    if(boardListArr != undefined && boardListArr != null && boardListArr.length != 0){
      for(let i = 0; i < boardListArr.length; i++){
          result.push(
            <Row className="mt-3 text-left" key={i} style={{cursor: 'pointer'}} onClick={()=>{prop.goToDetail(boardListArr[i].boardNo)}}>
              <Col>
                <h6 key={i + "a"} >
                  {boardListArr[i].boardTtl}
                </h6>
                <p>
                  {boardListArr[i].boardCntn}
                </p>
                <br />
              </Col>
              <Col sm="0" key={i + "c"} >
                <Moment format="YYYY.MM.DD">
                  {boardListArr[i].crtDt}
                </Moment>
              </Col>
            </Row>
          );
      }
    }

    return result;
  }

  return renderList();
}

export default MemberBoardList;
