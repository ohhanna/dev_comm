import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import Pagination from 'react-js-pagination';
import Loader from './Loader';

// reactstrap components
import {
    Button,
    Input,
    Container,
    Table
  } from "reactstrap";

  import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown
  } from "reactstrap";

function FreeList() {
  
  let [loading, setLoading] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);  //현재 페이지
  let [pageSize, setPageSize] = useState(10);       //페이지 갯수
  let [datas, setDatas] = useState({                //총 갯수, 목록
    freeListCount : '',
    freeList : []
  });
  let history = useHistory();

  //목록 가져오기
  let url = '/freeBoard/list?' + new URLSearchParams({currentPage : pageSize * (currentPage - 1), 
                                                      pageSize : pageSize})
  
  //목록 setting
  useEffect(() => {
      setLoading(true);
      fetch(url) 
     .then(res => res.json())
     .then((datas) => {setDatas({
                          ...datas,
                        freeListCount: datas.freeListCount,
                        freeList: datas.freeList
                      })
          })
     .then(res => setLoading(false))
     .catch(err => { console.log('error' + JSON.stringify(err))});     
  }, [currentPage]);

  //상세보기
  function ListDetail(props) {
    history.push("/freeBoard/detail/" + props);
  }

  if (loading) return <Loader />; //로딩 이미지

  return (
    <>
      <div className="main">
        <div className="section text-center">
          <Container>
          <div className="section landing-section">
            <Container>
            <h2 className="text-center">자유게시판</h2>
            <div className="custom-flex">
              <UncontrolledDropdown className="custom-item">
                <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="secondary"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="dropdownMenuLink"
                  onClick={e => e.preventDefault()}
                  role="button"
                >
                  검색어
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuLink">
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    제목
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    작성자
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={e => e.preventDefault()}>
                    내용
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Input placeholder="Please enter a search term" className="custom-item custom-input"/>
              <Button type="button" className="btn mr-1 custom-item" color="default" outline
                onClick={()=>{console.log('search')}}>
                검색
              </Button>
            </div>          
            </Container>
          </div>
          <Button type="button" id="notice_write" className="btn mr-1 float-right" color="default" outline
                  tag={Link} to="/freeBoard/addForm">
             새 글 쓰기
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
                          <td>
                            <a onClick={ () => { ListDetail(data.boardNo) } } href="#!"> 
                              {data.boardTtl} 
                            </a>
                          </td>
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

          <div className="ml-auto mr-auto custom-flex">
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
          </Container>
        </div>
      </div>  
    </>
  );
}

export default FreeList;