/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import Moment from 'react-moment';
import Authentication from 'views/authentication/AuthenticationService.js';

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

const NoticeView = ({match}) => {

    let boardNo = match.params.boardNo;

    // 로그인한 ID 확인
    let [loginId, setLoginId] = useState(Authentication.getLoggedInUserName());

    // 게시글
    let [viewData, setViewData] = useState([{}]);

    // 댓글
    let [replyData, setReplyData] = useState({
        replyCnt : '',
        replyList : []
    });

    // 등록할 댓글
    let [replyCntn, setReplyCntn] = useState('');

    // 수정할 댓글
    let [editCntn, setEditCntn] = useState('');

    // 수정할 댓글 번호
    let [editRepNo, setEditRepNo] = useState('');

    // 대댓달 댓글 번호
    let [reRepNo, setReRepNo] = useState('');

    // 대댓 내용
    let [reRepCntn, setReRepCntn] = useState('');

    function viewReset(){
        // 게시글, 댓글 불러오기
        fetch('/notice-page/view/'+boardNo)
        .then(res => res.json())
        .then((data) => {
            setViewData(data);
        })
        .catch(err => {
            console.log('error' + JSON.stringify(err))
        });
        
        fetch("reply/"+boardNo)
        .then(res => res.json())
        .then((replyData) => {
            setReplyData({
                ...replyData,
                replyCnt : replyData.replyCnt,
                replyList : replyData.replyList
            })
        })
        .catch(err => {console.log('error')});
    }

    useEffect(()=>{viewReset()},[]);

    function replyWrite(props){
        // 댓글 등록
        if(props.replyCntn == ''){
            alert('내용을 입력해주세요.');
        } else {
            fetch('/notice-page/view/replyWrite',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    'regMemId' : Authentication.getLoggedInUserName(),
                    'boardNo' : props.boardNo,
                    'replyCntn' : props.replyCntn 
                })
            })
            .then(response => {
                if(response.status === 200){
                    // 댓글 등록 성공
                    setReplyCntn('');
                    viewReset();
                } else {
                    alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
                    return;
                }
            })
        }
    }

    function replyDelete(replyNo){
        // 댓글 삭제
        if(window.confirm("댓글을 삭제하시겠습니까?")){
            fetch('/notice-page/view/replyDelete/'+replyNo)
            .then(response => {
                if(response.status === 200){
                    viewReset();
                } else {
                    alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
                }
            })
        }
    }

    function replyEdit(props){
        // 댓글 수정
        if(props.editCntn == ''){
            alert('내용을 입력해주세요.');
        } else {
            fetch('/notice-page/view/replyEdit',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    'replyNo' : props.replyNo,
                    'replyCntn' : props.editCntn 
                })
            })
            .then(response => {
                if(response.status === 200){
                    // 댓글 수정 성공
                    setEditRepNo('');
                    viewReset();
                } else {
                    alert('댓글 수정에 실패했습니다. 다시 시도해주세요.');
                    return;
                }
            })
        }
    }

    function reReplyWrite(props){
        // 대댓글 작성
        if(props.reRepCntn == ''){
            alert('내용을 입력해주세요.');
        } else {
            fetch('/notice-page/view/replyWrite',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    'regMemId' : Authentication.getLoggedInUserName(),
                    'boardNo' : boardNo,
                    'upReplyNo' : props.replyNo,
                    'replyCntn' : props.reRepCntn
                })
            })
            .then(response => {
                if(response.status === 200){
                    // 대댓글 등록 성공
                    setReRepCntn('');
                    setReRepNo('');
                    viewReset();
                } else {
                    alert('댓글 등록에 실패했습니다. 다시 시도해주세요.');
                    return;
                }
            })
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
                            <h2 className="text-center">NOTICE</h2>
                            <Form className="text-center">
                                <FormGroup>
                                    <br/>
                                    <div>
                                        <Link to="/notice-page/list">
                                            <Button type="button" id="notice_list_btn" className="btn mr-1 float-left" color="default" outline>
                                                LIST                                              
                                            </Button>
                                        </Link>
                                        <MasterBtn boardNo={match.params.boardNo}/>
                                    </div>
                                    <br/><br/><br/>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th colSpan="2" width="100%">{viewData.boardTtl}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td align="left" width="50%">Writer : {viewData.regMemId}</td>
                                                <td align="right">Date : <Moment format="YYYY/MM/DD">
                                                                    {viewData.crtDt}
                                                                </Moment></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" height="200px">
                                                    <div dangerouslySetInnerHTML={ {__html: viewData.boardCntn} }/>
                                                </td>
                                            </tr>

                                            <tr>
                                                <td align="left">{replyData.replyCnt}개의 댓글</td>
                                                <td></td>
                                            </tr>
                                            { replyData.replyList.map(replyData => {
                                                return (
                                                    <>
                                                    <tr>
                                                        <td align="left">
                                                            
                                                            <h6 style={{display:'inline'}}>{ replyData.upReplyNo > 0 ? "　➥" : ""}{replyData.regMemId}</h6> / <Moment format="YYYY/MM/DD">{replyData.crtDt}</Moment>
                                                        </td>
                                                        <td align="right">
                                                            {
                                                                loginId == replyData.regMemId
                                                                ?
                                                                <>
                                                                <Button type="button" color="default" outline
                                                                    className="btn mr-1 float-right"
                                                                    onClick={()=>{replyDelete(replyData.replyNo)}}>
                                                                        삭제
                                                                </Button>
                                                                <Button type="button" color="default" outline
                                                                    className="btn mr-1 float-right"
                                                                    onClick={()=>{setEditRepNo(replyData.replyNo); setReRepNo(''); setEditCntn(replyData.replyCntn);}}>
                                                                        수정
                                                                </Button>
                                                                </>
                                                                :
                                                                <>
                                                                <Button type="button" color="default" outline
                                                                    className="btn mr-1 float-right"
                                                                    onClick={()=>{setReRepNo(replyData.replyNo); setEditRepNo('');}}>
                                                                        답글
                                                                </Button>
                                                                </>
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" colSpan="2">{ replyData.upReplyNo > 0 ? "　　" : ""}{replyData.replyCntn}</td>
                                                    </tr>
                                                    {
                                                        replyData.replyNo == editRepNo
                                                        ?
                                                        <>
                                                        <tr>
                                                            <td colSpan="2">
                                                                <textarea className="form-control"
                                                                        value={editCntn}
                                                                        onChange={(e)=>{setEditCntn(e.target.value)}}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" colSpan="2">
                                                                <Button type="button"
                                                                    className="btn mr-1 float-right"
                                                                    color="default" outline
                                                                    onClick={()=>{replyEdit({replyNo:replyData.replyNo, editCntn:editCntn})}}>
                                                                        수정완료
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                        </>
                                                        :
                                                        <></>
                                                    }
                                                    {
                                                        replyData.replyNo == reRepNo
                                                        ?
                                                        <>
                                                        <tr>
                                                            <td colSpan="2">
                                                                <textarea className="form-control"
                                                                        onChange={(e)=>{setReRepCntn(e.target.value)}}
                                                                />
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <td align="right" colSpan="2">
                                                                <Button type="button"
                                                                    className="btn mr-1 float-right"
                                                                    color="default" outline
                                                                    onClick={()=>{reReplyWrite({replyNo:replyData.replyNo, reRepCntn:reRepCntn})}}>
                                                                        작성
                                                                </Button>
                                                            </td>
                                                        </tr>
                                                        </>
                                                        :
                                                        <></>
                                                    }
                                                    </>
                                                )
                                            })}

                                            <tr>
                                                <td colSpan="2">
                                                    <textarea className="form-control"
                                                              style={{height:'100px'}}
                                                              placeholder="댓글을 입력해주세요."
                                                              value={replyCntn}
                                                              onChange={(e)=>{setReplyCntn(e.target.value)}}/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right" colSpan="2">
                                                    <Button type="button"
                                                            className="btn mr-1 float-right"
                                                            color="default" outline
                                                            onClick={()=>{replyWrite({boardNo:viewData.boardNo, replyCntn:replyCntn})}}>
                                                        등록
                                                    </Button>
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


function MasterBtn(props){

    let history = useHistory();

    function deleteNotice(){
        if(window.confirm("게시글을 삭제하시겠습니까?")){
            history.push('/notice-page/del/'+props.boardNo);
        }
    }

    if(Authentication.getLoggedInUserAuth() == 'MASTER' ){
        return (
            <>
            <Button type="button"
                id="notice_delete_btn"
                className="btn mr-1 float-right"
                color="default" outline
                onClick={()=>{deleteNotice()}}>
                    DELETE
            </Button>
            <Link to={`/notice-page/edit/${props.boardNo}`}>
                <Button type="button" id="notice_edit_btn" className="btn mr-1 float-right" color="default" outline>
                    EDIT
                </Button>
            </Link>
            </>
        )
    } else {
        return (
            <>
            </>
        )
    }
}

function ReplyBtn(props){

    const [replyEditModal, setReplyEditModal] = React.useState(false);
    const toggleReplyEdit = () => {
        setReplyEditModal(!replyEditModal);
    }

    let [editCntn, setEditCntn] = useState(props.replyCntn);

    function replyDelete(){
        if(window.confirm("댓글을 삭제하시겠습니까?")){
            fetch('/notice-page/view/replydelete/'+props.replyData.replyNo)
            .then(response => {
                if(response.status === 200){
                    viewReset();
                } else {
                    alert('댓글 삭제에 실패했습니다. 다시 시도해주세요.');
                }
            })
        }
    }

    function replyEdit(){
        if(window.confirm("댓글을 수정하시겠습니까?")){
            fetch('/notice-page/view/replyEdit',{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                },
                body : JSON.stringify({
                    'replyNo' : props.replyNo,
                    'replyCntn' : props.replyCntn
                })
            })
            .then(response => {
                if(response.status === 200){
                    // 댓글 수정 성공
                    alert('댓글 수정 성공');
                    setReplyCntn('');
                } else {
                    alert('댓글 수정에 실패했습니다. 다시 시도해주세요.');
                    return;
                }
            })
        }
    }

    if(Authentication.getLoggedInUserName() == props.replyData.regMemId ){
        return (
            <>
            <Button type="button"
                className="btn mr-1 float-right"
                color="default" outline
                onClick={()=>{replyDelete()}}>
                    삭제
            </Button>
            <Button type="button"
                className="btn mr-1 float-right"
                color="default" outline
                onClick={toggleReplyEdit}>
                    수정
            </Button>
            <Modal isOpen={replyEditModal} toggle={toggleReplyEdit}>
                <div className="modal-header">
                    <button aria-label="Close"
                            className="close"
                            type="button"
                            onClick={toggleReplyEdit}>
                        <span aria-hidden={true}>×</span>
                    </button>
                    <h5>Reply Edit</h5>
                </div>
                <div className="modal-footer">
                    <Table>
                        <thead>
                            <th>
                                <textarea className="form-control"
                                        value={props.replyData.replyCntn}
                                        onChange={(e)=>{setEditCntn(e.target.value)}}/>
                            </th>
                        </thead>
                        <tbody>
                            <tr>
                                <td align="right"><Button>수정</Button></td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </Modal>
            </>
        )
    } else {
        return (
            <>
            <Button type="button"
                className="btn mr-1 float-right"
                color="default" outline
                onClick={()=>{}}>
                    답글
            </Button>
            </>
        )
    }

    // return (
    //     <>
    //     <Button type="button"
    //         className="btn mr-1 float-right"
    //         color="default" outline
    //         onClick={()=>{replyDelete()}}>
    //             삭제
    //     </Button>
    //     <Button type="button"
    //         className="btn mr-1 float-right"
    //         color="default" outline
    //         onClick={toggleReplyEdit}>
    //             수정
    //     </Button>
    //     <Modal isOpen={replyEditModal} toggle={toggleReplyEdit}>
    //         <div className="modal-header">
    //             <button aria-label="Close"
    //                     className="close"
    //                     type="button"
    //                     onClick={toggleReplyEdit}>
    //                 <span aria-hidden={true}>×</span>
    //             </button>
    //             <h5>Reply Edit</h5>
    //         </div>
    //         <div className="modal-footer">
    //             <Table>
    //                 <thead>
    //                     <th>
    //                         <input type="text" class="form-control"
    //                                 placeholder="Please enter a title."
    //                                 value={props.replyData.replyCntn}/>
    //                     </th>
    //                 </thead>
    //                 <tbody>
    //                     <tr>
    //                         <td align="right"><Button>수정</Button></td>
    //                     </tr>
    //                 </tbody>
    //             </Table>
    //         </div>
    //     </Modal>
    //     </>
    // )
}

export default NoticeView;