/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import Pagination from 'react-js-pagination';
import Authentication from 'views/authentication/AuthenticationService.js';

// reactstrap components
import {
  Button,
  Form,
  Input,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Table
} from "reactstrap";

function NoticeList() {

  let [currentPage, setCurrentPage] = useState(1);
  let [pageSize, setPageSize] = useState(10);
  let [post, setPost] = useState({
    noticeListCount : '',
    noticeList : []
  });

  let url = '/notice-page/list?' + new URLSearchParams({
    currentPage : pageSize * (currentPage - 1),
    pageSize : pageSize
  });

  let [searchType, setSearchType] = useState('');
  let [searchKeyWord, setSearchKeyWord] = useState('');

  const onChangeRadio = function(e) {
    const checked = e.target.value;
    setSearchType(checked);
    console.log(searchType);
  };

  let searchUrl = 'notice-page/list/search?' + new URLSearchParams({
    currentPage : pageSize * (currentPage - 1),
    pageSize : pageSize,
    searchType : searchType,
    searchKeyWord : searchKeyWord
  });

  function goSearch(){
    console.log(searchType);
    console.log(searchKeyWord);
    if(searchType == ''){
      alert('검색 타입을 선택해주세요');
      return ;
    } else if(searchKeyWord == ''){
      alert('검색 키워드를 입력해주세요');
      return ;
    } else {
      alert('검색을.. 해야하는데.. 안되네..');
        // fetch(searchUrl)
        // .then(res => res.json())
        // .then((post) => {setPost({
        //       ...post,
        //     noticeListCount: post.noticeListCount,
        //     noticeList: post.noticeList
        //   })
        // })
        // .catch(err => { console.log('error! ' + JSON.stringify(err))});
    }
  }

  useEffect(() => {
    fetch(url)
    .then(res => res.json())
    .then((post) => {setPost({
          ...post,
        noticeListCount: post.noticeListCount,
        noticeList: post.noticeList
      })
    })
    .catch(err => { console.log('error! ' + JSON.stringify(err))});
  }, [currentPage]);

  return (
    <>
      <div className="main">
        <div className="section text-center">
          <Container>
          <div className="section landing-section">
          <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="6">
                <h2 className="text-center">NOTICE</h2>
                <Form className="text-center">
                  <FormGroup>
                  <br/>
                    <Row>
                      <Col>
                        <Label check>
                          <Input type="radio" defaultValue="writer" name="search_notice" onChange={onChangeRadio}/>
                          Writer <span className="form-check-sign" />
                        </Label>
                      </Col>
                      <Col>
                        <Label check>
                          <Input type="radio" defaultValue="title" name="search_notice" onChange={onChangeRadio}/>
                          Title  <span className="form-check-sign" />
                        </Label>
                      </Col>
                      <Col>
                        <Label check>
                          <Input type="radio" defaultValue="content" name="search_notice" onChange={onChangeRadio}/>
                          Content  <span className="form-check-sign" />
                        </Label>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col className="text-center">
                        <Input type="text" id="search_notice_input" placeholder="Please enter a search term"
                          onChange={(e)=>{setSearchKeyWord(e.target.value)}}/>
                      </Col>
                      <Col>
                        <Button type="button" id="search_notice" className="btn mr-1" color="default" outline
                          onClick={()=>{goSearch()}}>
                          Search
                        </Button>
                      </Col>
                    </Row>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
        <MasterBtn/>
        <br/><br/><br/>
        <Lists post={post}/>
        <br/>
        <Row>
        <div className="ml-auto mr-auto">
          <nav>
            <Pagination activePage={currentPage} 
                        itemsCountPerPage={pageSize} 
                        totalItemsCount={post.noticeListCount} 
                        pageRangeDisplayed={5}
                        prevPageText={"‹"} 
                        nextPageText={"›"} 
                        onChange={(page) => setCurrentPage(page)} />
          </nav>
        </div>
        </Row>
        </Container>
      </div>
    </div>
    </>
  );
}

function MasterBtn(){
  
  if(Authentication.getLoggedInUserAuth() == 'MASTER' ){
    return(
      <Link to="/notice-page/write">
        <Button type="button" id="notice_write" className="btn mr-1 float-right" color="default" outline>
            Write
        </Button>
      </Link>
    )
  } else {
    return null;
  }
}

const Lists = ({post}) => {
  return (
    <>
    <Table>
      <thead>
        <tr>
          <th width="10%">#</th>
          <th width="60%">Title</th>
          <th width="15%">Date</th>
          <th width="15%">Writer</th>
        </tr>
      </thead>
      <tbody>
      { 
        post.noticeList.map( post =>
        <tr key={post.boardNo}>
          <td>{post.boardNo}</td>
          <td><Link to={`/notice-page/view/${post.boardNo}`}>{post.boardTtl}</Link></td>
          <td>
            <Moment format="YYYY/MM/DD">
              {post.crtDt}
            </Moment></td>
          <td>{post.regMemId}</td>
        </tr>
        )
      }
      </tbody>
    </Table>
    </>
  )
}

export default NoticeList;