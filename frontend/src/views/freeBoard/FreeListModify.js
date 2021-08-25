import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import {
    Button,
    Col,
    Table,
    Container
  } from "reactstrap";

const FreeListModify = (props) => {

    let[ datas, setDatas ] = useState([{}]);
    let[ title, setTitle ] = useState("");
    let[ content, setContent ] = useState("");
    let history = useHistory();
    let editorRef = useRef();

    let boardNo = props.match.params.param;
    let url = '/freeBoard/detail?' + new URLSearchParams({boardNo : boardNo});

    useEffect(() => {
        fetch(url)
       .then(res => res.json())
       .then(datas => { setDatas(datas); 
                        setTitle(datas[0].boardTtl); 
                        setContent(datas[0].boardCntn);
                        editorRef.current.getInstance().setHTML(datas[0].boardCntn);})
       .catch(err => { console.log('error' + JSON.stringify(err))});
    }, []);

    function FreeListModifyFn(props) {
      fetch('/freeBoard/modify', {
        method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              'boardNo': props.boardNo,
              'boardTtl': props.title,
              'boardCntn': props.content
          })
      })
      .then(response => {
        if (response.status === 200) {
          history.push('/freeBoard/list');
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
                        <h2 className="text-center">게시글 수정</h2>
                        <br/>
                        <div>
                          <Button type="button" 
                                  id="notice_save_btn" 
                                  className="btn mr-1 float-right" 
                                  color="default" 
                                  outline
                                  onClick={ () => { FreeListModifyFn({ boardNo : datas[0].boardNo, 
                                                                       title : title, 
                                                                       content : content }) }}>
                                    저장
                          </Button>
                        </div>
                        <br/><br/><br/>
                          <Table>
                            <thead>
                              <tr>
                                <th>
                                  <input class="form-control" 
                                         value={ title } 
                                         onChange={ (e) => setTitle(e.target.value) } />
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <Editor previewStyle="vertical"
                                          height="300px"
                                          initialEditType="wysiwyg"
                                          onChange={ () => setContent(editorRef.current.getInstance().getHTML()) }
                                          ref={editorRef}/>
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                    </Col>
                </Container>
                </div>
            </div>
        </div>
        </>
    );
};

export default FreeListModify;