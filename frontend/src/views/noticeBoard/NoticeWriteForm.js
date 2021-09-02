/* eslint-disable */
import React,{ useRef, useState } from 'react';
import { useHistory } from "react-router-dom";
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import Authentication from 'views/authentication/AuthenticationService.js';

import {
    Button,
    Form,
    Row,
    Col,
    FormGroup,
    Table,
    Container,
  } from "reactstrap";

function NoticeWriteForm() {

    let [title, setTitle] = useState();
    let [content, setContent] = useState();
    let editorRef = useRef();
    let history = useHistory();

    function NoticeWrite(props){
        if(props.title == null){
            alert('제목을 입력해주세요.');
            return ;
        } else if (props.content == null){
            alert('내용을 입력해주세요.');
            return ;
        } else {
            if(window.confirm("저장하시겠습니까?")){
                fetch('/notice-page/writeProcess', {
                    method : 'POST',
                    headers : {
                        'Content-Type' : 'application/json',
                    },
                    body : JSON.stringify({
                        'regMemId' : Authentication.getLoggedInUserName(),
                        'boardTtl' : props.title,
                        'boardCntn' : props.content
                    })
                })
                .then(response => {
                    if (response.status === 200) {
                        alert('작성되었습니다.');
                        history.push('/notice-page/list');
                    } else {
                        alert('작성에 실패되었습니다.');
                        history.push('/notice-page/list');
                    }
                })
            }
        }
    }

    function NoticeList(){
        if(window.confirm("작성 중인 글쓰기를 종료하시겠습니까?")){
            history.push('/notice-page/list');
        }
    }

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
                                        <Button type="button"
                                            id="notice_list_btn"
                                            className="btn mr-1 float-left"
                                            color="default" outline
                                            onClick={()=>{NoticeList()}}>
                                                CANCEL
                                        </Button>
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

// function ListModal(){

//     const [listModal, setListModal] = React.useState(false);
//     const toggleModal = () => {
//         setListModal(!listModal);
//     }

//     return (
//         <>
//         <Button type="button"
//             id="notice_list_btn"
//             className="btn mr-1 float-left"
//             color="default" outline
//             onClick={toggleModal}>
//                 CANCEL
//         </Button>
//         <Modal isOpen={listModal} toggle={toggleModal}>
//             <div className="modal-header">
//                 <button aria-label="Close"
//                         className="close"
//                         type="button"
//                         onClick={toggleModal}>
//                     <span aria-hidden={true}>×</span>
//                 </button>
//                 <h5>NOTICE!</h5>
//             </div>
//             <div className="modal-body text-center">
//                 지금까지 작성중인 내용이 취소됩니다.<br/>
//                 목록으로 돌아가시겠습니까?
//             </div>
//             <div className="modal-footer" flex-wrap="inherit">
//                 <div className="left-side">
//                 <Button className="btn-link"
//                         color="default"
//                         type="button"
//                         width="50%"
//                         onClick={toggleModal}>
//                     아니오
//                 </Button>
//                 </div>
//                 <div className="right-side">
//                 <Link to="/notice-page/list">
//                     <Button className="btn-link"
//                             color="default"
//                             type="button"
//                             width="50%"
//                             onClick={toggleModal}>
//                         네
//                     </Button>
//                 </Link>
//                 </div>
//             </div>
//         </Modal>
//         </>
//     )
// }

export default NoticeWriteForm;