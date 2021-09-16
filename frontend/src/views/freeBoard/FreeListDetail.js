import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';
import Authentication from 'views/authentication/AuthenticationService.js';

import {
    Col,
    Table,
    Container,
    Modal
  } from "reactstrap";


function FreeListDetail(props) {

    let [datas, setDatas] = useState([{}]);

    let [replyDatas, setReplyDatas] = useState({
      replyCount : '',
      replyList : []
    });

    let [regMemId, setregMemId] = useState('');
    let [replyPw, setreplyPw] = useState('');
    let [replyCntn, setReplyCntn] = useState('');

    let [modYn, setModYn] = useState('');
    let [replyModCntn, setReplyModCntn] = useState('');

    let[replyToastYn, setReplyToastYn] =useState('');
    let[upReplyNo, setUpReplyNo] = useState(null);

    let editorRef = useRef();
    let history = useHistory();

    let boardNo = props.match.params.param;
    let detailUrl = '/freeBoard/detail?' + new URLSearchParams({boardNo : boardNo});
    let deleteUrl = '/freeBoard/delete?' + new URLSearchParams({boardNo : boardNo});
    let replyUrl  = '/freeBoard/reply/list?' + new URLSearchParams({boardNo : boardNo});

    //상세보기
    useEffect(() => {
        fetch(detailUrl)
       .then(res => res.json())
       .then(datas => {setDatas(datas); editorRef.current.getInstance().setMarkdown(datas[0].boardCntn);} )
       .catch(err => { console.log('error' + JSON.stringify(err))});
    }, []);
    
    //목록으로 돌아가기
    function goBackToList() {
      
    }

    //글 수정
    function listModify(props) {
      history.push("/freeBoard/modify/" + props);
    }

    //글 삭제
    function listDelete() {
      if(window.confirm("정말 삭제하시겠습니까?")) {
         fetch(deleteUrl, {method: 'POST'})
         .then(response => {
          if (response.status === 200) {
            alert('삭제 완료!');
            history.push('/freeBoard/list');
          }
        })
      } else {
        return false;
      }
    }

    //댓글 목록
    function replyList() {
      fetch(replyUrl)
     .then(res => res.json())
     .then((replyDatas) => {setReplyDatas({
                              ...replyDatas,
                              replyCount: replyDatas.replyCount,
                              replyList: replyDatas.replyList
                            })
     })
     .catch(err => { console.log('error' + JSON.stringify(err))});
    }

    useEffect(() => {
      replyList()
    }, []);

    //댓글 등록
    function freeReplyAdd() {
      fetch('/freeBoard/reply/add',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'boardNo' : datas[0].boardNo,
            'regMemId': regMemId,
            'upReplyNo' : upReplyNo,
            'replyPw': replyPw,
            'replyCntn': replyCntn
        }),
        redirect : 'follow'
      })
      .then(response => {
        if (response.status === 200) {
          setregMemId('');
          setreplyPw('');
          setReplyCntn('');
          
          alert('등록 완료!');
          replyList();
        }
      })
    }

    function freeReplyModify(props) {
      fetch('/freeBoard/reply/modify?' + new URLSearchParams({replyCntn : replyModCntn, replyNo : props}),{
        method: 'POST'})
      .then(response => {
        if (response.status === 200) {
          setModYn('');
          replyList();
          alert('수정 완료!');
        }
      })
    }

    function freeReplyDelete(props) {
      fetch('/freeBoard/reply/delete?' + new URLSearchParams({replyNo : props}),{
        method: 'POST'})
      .then(response => {
        if (response.status === 200) {
          replyList();
          alert('삭제 완료!');
        }
      })
    }


    return (
        <>
          <div className="main">
            <div className="section">
                <div className="section landing-section">
                  <Container>
                      <Col className="ml-auto mr-auto">
                          <h2 className="text-center">{ datas[0].boardTtl }</h2>
                          <br/>
                          <div>
                          <button className="ml-1 custom-transparent"
                                  onClick={ () => { goBackToList() } }>
                            <img alt="목록"
                                src={
                                      require("assets/img/menu.png").default
                                    }/>
                          </button>
                          { Authentication.getLoggedInUserName() == datas[0].regMemId ?
                          <>
                            <button className="ml-1 custom-transparent"
                                    onClick={ () => { listDelete() } }>
                              <img alt="삭제하기"
                                  src={
                                        require("assets/img/delete.png").default
                                      }/>
                            </button>
                            <button className="ml-1 float-right custom-transparent"
                                    onClick={ () => { listModify(datas[0].boardNo) } }>
                              <img alt="수정하기"
                                  src={
                                        require("assets/img/modify.png").default
                                      }/>
                            </button>
                          </> :
                          null
                          }
                          </div>
                          <br/><br/><br/>
                            <Table>
                              <tbody>
                                <tr>
                                  <td>
                                    <Viewer ref={editorRef}/>
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                            <fieldset className="custom-fieldset-free">
                              { replyToastYn == '' ? 
                              <><h4>{ replyDatas.replyCount }개의 댓글</h4>
                              {/* <ReplyAddForm /> */}
                              <div className="custom-reply-flex-free">
                                <input className="form-control custom-reply-input-free"
                                        placeholder='Name'
                                        value={regMemId}
                                        onChange={ (e) => { setregMemId(e.target.value) } } />
                                <input className="form-control custom-reply-input-free"
                                      placeholder='Password'
                                      value={replyPw}
                                      type='password'
                                      onChange={ (e) => { setreplyPw(e.target.value) } } />
                            </div>
                              <div>
                                <textarea className="form-control custom-reply-textarea-free"
                                          value={replyCntn}
                                          onChange={ (e) => { setReplyCntn(e.target.value) } } >
                                </textarea>
                              </div>
                              <div className="custom-reply-textarea-free">
                                <button className="btn-round float-right mt-2 mr-1 mb-2 btn btn-outline-default" 
                                           onClick={ () => { setUpReplyNo(null); freeReplyAdd() } }>등록
                                </button>
                              </div></> :
                              <><h4>{ replyToastYn }의 댓글</h4>
                              {/* <ReplyAddForm /> */}
                              <div className="custom-reply-flex-free">
                                <input className="form-control custom-reply-input-free"
                                        placeholder='Name'
                                        value={regMemId}
                                        onChange={ (e) => { setregMemId(e.target.value) } } />
                                <input className="form-control custom-reply-input-free"
                                      placeholder='Password'
                                      value={replyPw}
                                      type='password'
                                      onChange={ (e) => { setreplyPw(e.target.value) } } />
                            </div>
                              <div>
                                <textarea className="form-control custom-reply-textarea-free"
                                          value={replyCntn}
                                          onChange={ (e) => { setReplyCntn(e.target.value) } } >
                                </textarea>
                              </div>
                              <div className="custom-reply-textarea-free">
                                <button className="btn-round float-right mt-2 mr-1 mb-2 btn btn-outline-default" 
                                           onClick={ () => { freeReplyAdd() } }>등록
                                </button>    
                                <button className="btn-round float-right mt-2 mr-1 mb-2 btn btn-outline-danger" 
                                           onClick={ () => { setReplyToastYn(''); 
                                                             setUpReplyNo(''); } }>취소
                                </button>                            
                              </div></>
                              }
                            </fieldset>
                            <ul className="custom-reply-ul-free pl-3">
                                { replyDatas.replyList.map(replyData => {
                                    return <li className={"custom-reply-li-free mb-3 pl-" + (replyData.depthLevel * 2)}
                                               key={replyData.replyNo}>
                                            <div className="custom-reply-flex-free mt-3 mb-2">
                                              {/* <img alt="..." class="custom-reply-img-free" src="/paper-kit-react/static/media/kaci-baum-2.9b929eea.jpg" /> */}
                                              <div>
                                                <b>{replyData.regMemId}</b>
                                                <div>
                                                  <Moment format="YYYY/MM/DD">
                                                    {replyData.modDt}
                                                  </Moment>  
                                                </div>
                                              </div>
                                              { replyData.isDel == 'N'?
                                              <div className="custom-reply-buttons-free">
                                                <button className="mr-1 btn btn-outline-default btn-sm"
                                                        onClick={ () => { setReplyToastYn(replyData.replyNo); 
                                                                          setUpReplyNo(replyData.replyNo); } }>
                                                  댓글 달기
                                                </button>
                                                <button className="mr-1 btn btn-outline-success btn-sm"
                                                        onClick={ () => { setModYn(replyData.replyNo); 
                                                                          setReplyModCntn(replyData.replyCntn) } }>
                                                  수정
                                                </button>
                                                <button className="mr-1 btn btn-outline-danger btn-sm"
                                                        onClick={ () => { freeReplyDelete(replyData.replyNo) } }>
                                                  삭제
                                                </button>
                                              </div>
                                              : null}
                                            </div>
                                              { modYn != replyData.replyNo ?
                                                <p>{replyData.replyCntn}</p>:
                                                <div className="custom-replyToast-free">
                                                  <textarea className="form-control custom-reply-textarea-free"
                                                            value={replyModCntn}
                                                            onChange={ (e) => { setReplyModCntn(e.target.value) } }>
                                                  </textarea>
                                                  <div className="custom-reply-buttons-free mt-2">
                                                    <button className="mr-1 btn btn-outline-default btn-sm"
                                                            onClick={ () => { freeReplyModify(replyData.replyNo); } }>
                                                      등록
                                                    </button>
                                                    <button className="mr-1 btn btn-outline-danger btn-sm"
                                                            onClick={ () => {setModYn('')} }>
                                                      취소
                                                    </button>
                                                  </div>
                                                </div>
                                              }
                                            </li>
                                }) }
                            </ul>                            
                      </Col>
                  </Container>
                  </div>
              </div>
          </div>
          </>
      )

      
};

// function ReplyAddForm() {

//   return (
//     <>
//     <div className="custom-reply-flex-free">
//         <input className="form-control custom-reply-input-free"
//                 placeholder='Name'
//                 value={regMemId}
//                 onChange={ (e) => { setregMemId(e.target.value) } } />
//         <input className="form-control custom-reply-input-free"
//               placeholder='Password'
//               value={replyPw}
//               type='password'
//               onChange={ (e) => { setreplyPw(e.target.value) } } />
//     </div>
//       <div>
//         <textarea className="form-control custom-reply-textarea-free"
//                   value={replyCntn}
//                   onChange={ (e) => { setReplyCntn(e.target.value) } } >
//         </textarea>
//       </div>
//       </>
//   )
// }

export default FreeListDetail;