import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
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

function FreeList() {

  let [currentPage, setCurrentPage] = useState(1);  //현재 페이지
  let [pageSize, setPageSize] = useState(10);       //페이지 갯수
  let [datas, setDatas] = useState({                //총 갯수, 목록
    freeListCount : '',
    freeList : []
  }); 

  //목록 가져오기
  let url = '/freeBoard/list?' + new URLSearchParams({currentPage : pageSize * (currentPage - 1), 
                                                      pageSize : pageSize})
  
  //목록 setting
  useEffect(() => {
      fetch(url) 
     .then(res => res.json())
     .then((datas) => {setDatas({
                          ...datas,
                        freeListCount: datas.freeListCount,
                        freeList: datas.freeList
                      })
           })
     .catch(err => { console.log('error' + JSON.stringify(err))});
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
                  <h2 className="text-center">자유게시판</h2>
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
          <Button type="button" id="notice_write" className="btn mr-1 float-right" color="default" outline
                  tag={Link} to="/freeBoard/addForm">
             Write
          </Button>
          <br/><br/><br/>

          <Table>
            <thead>
              <tr>
                <th width="10%">No</th>
                <th width="45%">제목</th>
                <th width="15%">등록일</th>
                <th width="15%">수정일</th>
                <th width="15%">작성자</th>
              </tr>
            </thead>
            <tbody>
            { 
              datas && datas.freeList.map(data => {
                return <tr key = {data.boardNo}>
                          <td> {data.boardNo} </td>
                          <td> {data.boardTtl} </td>
                          <td><Moment format="YYYY/MM/DD">
                                {data.crtDt}
                              </Moment>
                          </td>
                          <td><Moment format="YYYY/MM/DD">
                                {data.modDt}
                              </Moment>
                          </td>
                          <td> {data.regMemId} </td>
                      </tr>
              })
            } 
            </tbody>
          </Table>
          <br/>

          <Row>
          <div className="ml-auto mr-auto">
            <nav>
            <Pagination activePage={currentPage} 
                        itemsCountPerPage={pageSize} 
                        totalItemsCount={datas.freeListCount} 
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

export default FreeList;