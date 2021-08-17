import React,{ useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import {
    Button,
    Col,
    Table,
    Container
  } from "reactstrap";

function FreeListAdd(props) {

    fetch('/freeBoard/add', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'boardTtl': props.title,
            'boardCntn': props.content
        })
    })
    .then(response => {
    if (response.redirected) {
        window.location.href = 'localhost:3000/freeBoard/list'
    }
})
}

function FreeListForm() {

    let [title, setTitle] = useState();
    let [content, setContent] = useState();
    let editorRef = useRef();

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
                                  id="notice_save_btn" 
                                  className="btn mr-1 float-right" 
                                  color="default" 
                                  outline
                                  onClick={ () => { FreeListAdd({ title : title, content : content }) }}>
                                    SAVE
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

export default FreeListForm;