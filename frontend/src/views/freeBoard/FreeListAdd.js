import React,{ useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import {
    Button,
    Col,
    Table,
    Container
  } from "reactstrap";

function FreeListAdd() {

    let [title, setTitle] = useState();
    let [content, setContent] = useState();
    let history = useHistory();
    let editorRef = useRef();

    function FreeListAddFn(props) {
      fetch('/freeBoard/add', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              'boardTtl': props.title,
              'boardCntn': props.content
          }),
          redirect : 'follow'
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
                        <h2 className="text-center">게시글 등록</h2>
                        <br/>
                        <div>
                          <Button type="button"
                                  className="btn-round mr-1 float-right"
                                  onClick={ () => { FreeListAddFn({ title : title, content : content }) }}>
                                    등록
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
    )
} 

export default FreeListAdd;