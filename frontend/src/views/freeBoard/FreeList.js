import React, { useEffect, useState, useRef } from 'react';
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
  let searchFocus = useRef(null);
  
  let [loading, setLoading] = useState(null);
  let [currentPage, setCurrentPage] = useState(1);  //현재 페이지
  let [pageSize, setPageSize] = useState(10);       //페이지 갯수
  let [datas, setDatas] = useState({                //총 갯수, 목록
    freeListCount : '',
    freeList : []
  });

  let[type, setType] = useState('');
  let[keyword, setKeyword] = useState('');

  let history = useHistory();
  

  //목록 가져오기
  let url = '/freeBoard/list?' + new URLSearchParams({currentPage : pageSize * (currentPage - 1), 
                                                      pageSize : pageSize,
                                                      type : type,
                                                      keyword : keyword})
  
  function freeList() {
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
  }                                                    

  //목록 setting
  useEffect(() => {
      setLoading(true);
      freeList();
  }, [currentPage]);

  //enter로 검색
  let enterEffect = (e) => {
    if(e.key == 'Enter') {
      freeList();
    }
  }

  //search input에 focus주기
  function focusOnSearch() {
    searchFocus.current.focus();
  };

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
            <div className="custom-search-flex-free">
              <UncontrolledDropdown className="custom-item-free">
                <DropdownToggle
                  aria-expanded={false}
                  aria-haspopup={true}
                  caret
                  color="secondary"
                  data-toggle="dropdown"
                  href="#pablo"
                  id="dropdownMenuLink"
                  value={type}
                  onClick={ () => { setType(''); focusOnSearch(); } }
                  role="button"
                >
                  {type}
                </DropdownToggle>
                <DropdownMenu aria-labelledby="dropdownMenuLink">
                  <DropdownItem href="#pablo" onClick={ () => { setType('제목'); focusOnSearch(); }}>
                    제목
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={ () => { setType('작성자'); focusOnSearch(); } }>
                    작성자
                  </DropdownItem>
                  <DropdownItem href="#pablo" onClick={ () => { setType('내용'); focusOnSearch(); } }>
                    내용
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <input placeholder="Please enter a search term" 
                     className="form-control custom-item-free custom-search-input-free"
                     value={keyword}
                     onChange={ (e) => { setKeyword(e.target.value) } }
                     onKeyPress={enterEffect}
                     ref={searchFocus}/>
              <button className="vmr-1 custom-item-free custom-transparent"
                      onClick={()=>{ freeList() }}>
                <img alt="검색"
                     src={
                          require("assets/img/search.png").default
                         }/>
              </button>
            </div>          
            </Container>
          </div>

          <button className="float-right custom-transparent">
            <Link to="/freeBoard/addForm">
             <img alt="새 글 작성"
                  src={
                        require("assets/img/add.png").default
                      }/>
            </Link>
          </button>
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

          <div className="ml-auto mr-auto custom-search-flex-free">
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