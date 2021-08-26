/* eslint-disable */
import React,{ useRef, useState } from 'react';
import { Link } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

import {
    Button,
    Form,
    Row,
    Col,
    FormGroup,
    Table,
    Container,
    Modal
  } from "reactstrap";

function NoticeWrite(props){
    fetch('/notice-page/writeProcess', {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json',
        },
        body : JSON.stringify({
            'boardTtl' : props.title,
            'boardCntn' : props.content
        })
    })
    .then(response => {
        if(response.redirected){
            // window.location.href = '/notice-page/list'
        }
    })
}

function NoticeWriteForm() {

    let [title, setTitle] = useState();
    let [content, setContent] = useState();
    let editorRef = useRef();

    return (
        <>
        <div className="main">
            <div className="section text-center">
            <Container>
                <div className="section landing-section">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto">
                            <h2 className="text-center">NOTICE_WRITE</h2>
                            <Form className="text-center">
                                <FormGroup>
                                    <br/>
                                    <div>
                                        <ListModal/>
                                        <Button type="button"
                                                className="btn mr-1 float-right"
                                                color="default" outline
                                                onClick={()=>{NoticeWrite({title:title, content:content})}}>
                                            SAVE
                                        </Button>
                                    </div>
                                    <br/><br/><br/>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="text" class="form-control"
                                                           placeholder="Please enter a title."
                                                           onChange={(e) => setTitle(e.target.value)}/>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Editor previewStyle="vertical"
                                                            height="500px"
                                                            initialEditType="wysiwyg"
                                                            onChange={ () => setContent(editorRef.current.getInstance().getHTML()) }
                                                            ref={editorRef}/>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </FormGroup>
                            </Form>
                        </Col>
                    </Row>
                </Container>
                </div>
            </Container>
            </div>
        </div>
        </>
    )
}

function ListModal(){

    const [listModal, setListModal] = React.useState(false);
    const toggleModal = () => {
        setListModal(!listModal);
    }

    return (
        <>
        <Button type="button"
            id="notice_list_btn"
            className="btn mr-1 float-left"
            color="default" outline
            onClick={toggleModal}>
                CANCEL
        </Button>
        <Modal isOpen={listModal} toggle={toggleModal}>
            <div className="modal-header">
                <button aria-label="Close"
                        className="close"
                        type="button"
                        onClick={toggleModal}>
                    <span aria-hidden={true}>×</span>
                </button>
                <h5>NOTICE!</h5>
            </div>
            <div className="modal-body text-center">
                지금까지 작성중인 내용이 취소됩니다.<br/>
                목록으로 돌아가시겠습니까?
            </div>
            <div className="modal-footer" flex-wrap="inherit">
                <div className="left-side">
                <Button className="btn-link"
                        color="default"
                        type="button"
                        width="50%"
                        onClick={toggleModal}>
                    아니오
                </Button>
                </div>
                <div className="right-side">
                <Link to="/notice-page/list">
                    <Button className="btn-link"
                            color="default"
                            type="button"
                            width="50%"
                            onClick={toggleModal}>
                        네
                    </Button>
                </Link>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default NoticeWriteForm;