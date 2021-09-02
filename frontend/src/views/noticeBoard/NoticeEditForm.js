/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor, Viewer } from '@toast-ui/react-editor';

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

// function useFetch(url){
//     const [data, setData] = useState([]);
//     let editorRef = useRef();

//     async function fetchUrl(){
//         const response = await fetch(url);
//         const json = await response.json();

//         setData(json);
//         editorRef.current.getInstance().setHTML(json[0].boardCntn);
//     }

//     useEffect(()=>{
//         fetchUrl();
//     },[]);

//     console.log(data);
//     return data;
// }

// function NoticeEdit(props){

//     let history = useHistory();

//     fetch('/notice-page/editProcess', {
//         method : 'POST',
//         headers : {
//             'Content-Type' : 'application/json',
//         },
//         body : JSON.stringify({
//             'boardNo' : props.boardNo,
//             'boardTtl' : props.title,
//             'boardCntn' : props.content
//         })
//     })
//     .then(response => {
//         if (response.status === 200) {
//             history.push('/notice-page/list');
//         }
//     })
// }

const NoticeEditForm = ({match}) => {

    let [data, setData] = useState([{}]);
    let [boardNo, setBoardNo] = useState();
    let [title, setTitle] = useState();
    let [content, setContent] = useState();
    let history = useHistory();
    let editorRef = useRef();

    let url = "/notice-page/view/"+match.params.boardNo;
    console.log(url);

    function NoticeEdit(props){

        if(props.title == null){
            alert('제목을 입력해주세요');
            return ;
        } else if (props.content == null){
            alert('내용을 입력해주세요');
            return ;
        } else {
            fetch('/notice-page/editProcess', {
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    'boardNo' : props.boardNo,
                    'boardTtl' : props.title,
                    'boardCntn' : props.content
                })
            })
            .then(response => {
                if (response.status === 200) {
                    history.push('/notice-page/view/'+props.boardNo);
                }
            })
        }
    }

    useEffect(()=>{
        fetch(url)
        .then(res => res.json())
        .then(data => {
            setData(data);
            editorRef.current.getInstance().setHTML(data.boardCntn);
            setTitle(data.boardTtl);
            setContent(editorRef.current.getInstance().getHTML(data.boardCntn));
            setBoardNo(data.boardNo);
        })
        .catch(err => {console.log('error!' + JSON.stringify(err))})
    },[]);


    return (
        <>
        <div className="main">
            <div className="section text-center">
            <Container>
                <div className="section landing-section">
                <Container>
                    <Row>
                        <Col className="ml-auto mr-auto">
                            <h2 className="text-center">NOTICE_EDIT</h2>
                            <Form className="text-center">
                                <FormGroup>
                                    <br/>
                                    <div>
                                        <ListModal boardNo={boardNo}/>
                                        <EditModal boardNo={boardNo} title={title} content={content} NoticeEdit={NoticeEdit}/>
                                    </div>
                                    <br/><br/><br/>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <input type="text"
                                                           className="form-control"
                                                           value={data.boardTtl}
                                                           onChange={(e) => setTitle(e.target.value)}/>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Editor ref={editorRef}
                                                            height="500px"
                                                            initialEditType="wysiwyg"
                                                            onChange={ () => setContent(editorRef.current.getInstance().getHTML()) }/>
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

function ListModal(props){

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
                지금까지 수정중인 내용이 취소됩니다.<br/>
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
                <Link to={`/notice-page/view/${props.boardNo}`}>
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

function EditModal(props){

    const [EditModal, setEditModal] = React.useState(false);
    const toggleModal = () => {
        setEditModal(!EditModal);
    }

    return (
        <>
        <Button type="button" 
                className="btn mr-1 float-right"
                color="default" outline
                onClick={toggleModal}>
            SAVE
        </Button>
        <Modal isOpen={EditModal} toggle={toggleModal}>
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
                수정하시겠습니까?
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
                <Button className="btn-link"
                        color="default"
                        type="button"
                        width="50%"
                        onClick={()=>{props.NoticeEdit({boardNo:props.boardNo, title:props.title, content:props.content})}}>
                    네
                </Button>
                </div>
            </div>
        </Modal>
        </>
    )
}

export default NoticeEditForm;