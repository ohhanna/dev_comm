import React, { useState, useEffect, useRef } from 'react';
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
    let editorRef = useRef();

    let boardNo = props.match.params.param;
    let url = '/freeBoard/detail?' + new URLSearchParams({boardNo : boardNo});

    useEffect(() => {
        fetch(url)
       .then(res => res.json())
       .then(datas => {setDatas(datas); editorRef.current.getInstance().setMarkdown(datas[0].boardCntn);})
       .catch(err => { console.log('error' + JSON.stringify(err))});
    }, []);

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
                                    color="default" 
                                    outline>
                                      SAVE
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
                      </Col>
                  </Container>
                  </div>
              </div>
          </div>
          </>
      )
};

export default FreeListDetail;