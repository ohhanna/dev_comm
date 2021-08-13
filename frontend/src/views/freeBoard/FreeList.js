import React, { useEffect } from 'react';

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

function FreeList() {

    useEffect(() => {
        fetch('/freeBoard/list') 
        .then(response => response.text()) 
        .then(message => { //setMessage(message); 
            });
      }, []);

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
              <th width="10%">No</th>
              <th width="60%">제목</th>
              <th width="15%">등록일</th>
              <th width="15%">수정일</th>
              <th width="15%">작성자</th>
            </tr>
          </thead>
          <tbody>
          <tr>
                        <td> No </td>
                        <td> 제목 </td>
                        <td> 등록일 </td>
                        <td> 수정일 </td>
                        <td> 작성자 </td>
                    </tr>
          {/* { 
                this.state.boards.map(
                    board => 
                    <tr key = {board.no}>
                        <td> {board.no} </td>
                        <td> {board.title} </td>
                        <td> {board.createdTime} </td>
                        <td> {board.updatedTime} </td>
                        <td> {board.counts} </td>
                    </tr>
                 )
            }  */}
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

export default FreeList;