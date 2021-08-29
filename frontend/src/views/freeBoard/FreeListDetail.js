import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

import {
    Button,
    Col,
    Table,
    Container
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
    let editorRef = useRef();
    let history = useHistory();

    let boardNo = props.match.params.param;
    let detailUrl = '/freeBoard/detail?' + new URLSearchParams({boardNo : boardNo});
    let replyUrl  = '/freeBoard/reply/list?' + new URLSearchParams({boardNo : boardNo});

    //상세보기
    useEffect(() => {
        fetch(detailUrl)
       .then(res => res.json())
       .then(datas => {setDatas(datas); editorRef.current.getInstance().setMarkdown(datas[0].boardCntn);} )
       .catch(err => { console.log('error' + JSON.stringify(err))});
    }, []);

    //댓글 목록
    useEffect(() => {
      fetch(replyUrl)
     .then(res => res.json())
     .then((replyDatas) => {setReplyDatas({
                              ...replyDatas,
                              replyCount: replyDatas.replyCount,
                              replyList: replyDatas.replyList
                            })
          })
     .catch(err => { console.log('error' + JSON.stringify(err))});
    }, []);

    
    function ListModify(props) {
      history.push("/freeBoard/modify/" + props);
    }

    function FreeReplyAdd() {

      fetch('/freeBoard/reply/add',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'boardNo' : datas[0].boardNo,
            'regMemId': regMemId,
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
                            <Button type="button" 
                                    id="notice_save_btn" 
                                    className="btn mr-1 float-right"
                                    onClick={ () => { ListModify(datas[0].boardNo) } }
                                    color="default" 
                                    outline>
                                      수정하기
                            </Button>
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
                              <h4>{ replyDatas.replyCount }개의 댓글</h4>
                              <div className="custom-reply-flex-free">
                                
                                  <input className="form-control custom-reply-input-free"
                                         value={ regMemId }
                                         placeholder='Name'
                                         onChange={ (e) => { setregMemId(e.target.value) } } />
                                
                                
                                  <input className="form-control custom-reply-input-free"
                                         value={ replyPw }
                                         placeholder='Password'
                                         type='password'
                                         onChange={ (e) => { setreplyPw(e.target.value) } } />
                                
                              </div>
                              <div>
                                <textarea className="form-control custom-reply-textarea-free"
                                          value={ replyCntn } 
                                          onChange={ (e) => { setReplyCntn(e.target.value) } } >
                                </textarea>
                              </div>
                              <div className="custom-reply-textarea-free">
                                <button className="btn-round float-right mt-2 mr-1 mb-2 btn btn-outline-default" 
                                           onClick={ () => { FreeReplyAdd() } }>등록
                                </button>
                              </div>
                            </fieldset>
                            <ul className="listReply">
                                { replyDatas.replyList.map(replyData => {
                                    return <li>
                                            <div>
                                              <span>{replyData.regMemId}</span>
                                              <span>
                                                <Moment format="YYYY/MM/DD">
                                                  {replyData.modDt}
                                                </Moment>  
                                              </span>
                                            </div>
                                              <p>{replyData.replyCntn}</p>
                                            <div>
                                              <button>수정</button>
                                              <button>삭제</button>
                                            </div>
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

export default FreeListDetail;