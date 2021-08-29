import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Viewer } from '@toast-ui/react-editor';

import {
    Button,
    Col,
    Table,
    Container
  } from "reactstrap";


function FreeListDetail(props) {

    let[datas, setDatas] = useState([{}]);
    let[replyTtl, setReplyTtl] = useState('');
    let[replyCntn, setReplyCntn] = useState('');
    let editorRef = useRef();
    let history = useHistory();

    let boardNo = props.match.params.param;
    let url = '/freeBoard/detail?' + new URLSearchParams({boardNo : boardNo});

    useEffect(() => {
        fetch(url)
       .then(res => res.json())
       .then(datas => {setDatas(datas); editorRef.current.getInstance().setMarkdown(datas[0].boardCntn);})
       .catch(err => { console.log('error' + JSON.stringify(err))});
    }, []);

    
    function ListModify(props) {
      history.push("/freeBoard/modify/" + props);
    }

    function FreeReplyAdd() {
      console.log('title : ' + replyTtl);
      console.log('content : ' + replyCntn);
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
                            <ul className="listReply">

                            </ul>
                            <fieldset>
                              <div>
                                <span><input value={ replyTtl } onChange={ (e) => { setReplyTtl(e.target.value) } } /></span>
                              </div>
                              <div>
                                <textarea  value={ replyCntn } onChange={ (e) => { setReplyCntn(e.target.value) } } ></textarea>
                              </div>
                              <div>
                                <button onClick={ () => { FreeReplyAdd() } }>등록</button>
                              </div>
                            </fieldset>
                      </Col>
                  </Container>
                  </div>
              </div>
          </div>
          </>
      )
};

export default FreeListDetail;