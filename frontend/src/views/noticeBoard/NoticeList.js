import React from "react";

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

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { useState } from "react/cjs/react.production.min";

function NoticeList() {

  // let [변수, 변수변경] = useState();

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
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

        <Button type="button" id="notice_write" className="btn mr-1 float-right" color="default" outline
          onClick={()=>{console.log('write')}}>
          Write
        </Button>
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
            <tr>
              <td>5</td>
              <td>다섯번째 공지사항</td>
              <td>2021.08.07</td>
              <td>Manager</td>
            </tr>
            <tr>
              <td>4</td>
              <td>네번째 공지사항</td>
              <td>2021.08.07</td>
              <td>Manager</td>
            </tr>
            <tr>
              <td>3</td>
              <td>세번째 공지사항</td>
              <td>2021.08.07</td>
              <td>Manager</td>
            </tr>
            <NoticeBoardList/>
            <NoticeBoardList/>
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
    <DemoFooter />
    </>
  );
}

function NoticeBoardList(){
  return (
    <>
      <tr>
        <td>1</td>
        <td>첫번째 공지사항</td>
        <td>2021.08.07</td>
        <td>Manager</td>
      </tr>
    </>
  )
}

export default NoticeList;