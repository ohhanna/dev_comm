/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import axios from 'axios';
import Pagination from 'react-js-pagination';

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
  })

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

  // useEffect(()=>{
  //   async function fetchData(){
  //     const response = await axios.get('/notice-page/list');
  //     setPosts(response.data);
  //   }
  //   fetchData();
  // },[]);

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
                          <Input type="radio" defaultValue="option1" id="search_notice_writer" name="search_notice"/>
                          Writer <span className="form-check-sign" />
                        </Label>
                      </Col>
                      <Col>
                        <Label check>
                          <Input type="radio" defaultValue="option2" id="search_notice_title" name="search_notice"/>
                          Title  <span className="form-check-sign" />
                        </Label>
                      </Col>
                      <Col>
                        <Label check>
                          <Input type="radio" defaultValue="option3" id="search_notice_content" name="search_notice"/>
                          Content  <span className="form-check-sign" />
                        </Label>
                      </Col>
                    </Row>
                    <br/>
                    <Row>
                      <Col className="text-center">
                        <Input type="text" id="search_notice_input" placeholder="Please enter a search term"/>
                      </Col>
                      <Col>
                        <Button type="button" id="search_notice" className="btn mr-1" color="default" outline
                          onClick={()=>{console.log('search')}}>
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

        <Link to="/notice-page/write">
          <Button type="button" id="notice_write" className="btn mr-1 float-right" color="default" outline
            onClick={()=>{console.log('write')}}>
            Write
          </Button>
        </Link>
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