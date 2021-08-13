import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from 'react-moment';

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
  Table,
  Pagination,
  PaginationItem,
  PaginationLink
} from "reactstrap";

function useFetch(url){

  const [data, setData] = useState([]);

  async function fetchUrl(){
    const response = await fetch(url);
    const json = await response.json();

    setData(json);
  }

  useEffect(()=>{
    fetchUrl();
  },[]);

  return data;

}

function NoticeList() {

  const data = useFetch("/notice-page/list");

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
            {data.map( data =>
              <tr key={data.board_no}>
                <td>{data.board_no}</td>
                <td><Link to={`/notice-page/view/${data.board_no}`}>{data.board_ttl}</Link></td>
                {/* <td><Link to={{
                  pathname : "/notice-page/view",
                  search : `?board_no=${data.board_no}`
                  }}>{data.board_ttl}</Link></td> */}
                <td>
                  <Moment format="YYYY/MM/DD">
                    {data.crt_dt}
                  </Moment></td>
                <td>{data.reg_mem_id}</td>
              </tr>
              )}
          </tbody>
        </Table>
        <br/>
        <Row>
        <div className="ml-auto mr-auto">
          <nav>
            <Pagination>
              <PaginationItem>
                <PaginationLink aria-label="Previous" href="#pablo"
                  onClick={(e) => e.preventDefault()}>
                  <i aria-hidden={true} className="fa fa-angle-left" />
                  <span className="sr-only">Previous</span>
                </PaginationLink>
              </PaginationItem>
              <PaginationItem active>
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#pablo" onClick={(e) => e.preventDefault()}>5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink aria-label="Next" href="#pablo"
                  onClick={(e) => e.preventDefault()}>
                  <i aria-hidden={true} className="fa fa-angle-right" />
                  <span className="sr-only">Next</span>
                </PaginationLink>
              </PaginationItem>
            </Pagination>
          </nav>
        </div>
        </Row>
        </Container>
      </div>
    </div>
    </>
  );
}

function NoticeBoardList(){
  return (
    <>
      {/* <Link to = {{

      }}>
        <tr>

        </tr>
      </Link>
      <tr key={data.board_no}>
        <td>{data.board_no}</td>
        <td><Link to="/notice-page/view">{data.board_ttl}</Link></td>
        <td>
          <Moment format="YYYY/MM/DD">
            {data.crt_dt}
          </Moment></td>
        <td>{data.reg_mem_id}</td>
      </tr> */}
    </>
  )
}

export default NoticeList;