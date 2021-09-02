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

// view
function useFetch(url){
    const [data, setData] = useState([]);

    async function fetchUrl(){
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
    }

    useEffect(()=>{
        fetchUrl();
    },[]);

    return data;
}

const NoticeView = ({match}) => {

    const data = useFetch("/notice-page/view/"+match.params.boardNo);

    let replyUrl = "reply/"+match.params.boardNo;
    console.log(replyUrl);
    let [replyData, setReplyData] = useState({
        replyCnt : '',
        replyList : []
    });

    let [replyCntn, setReplyCntn] = useState('');

    useEffect(()=>{
        fetch(replyUrl)
        .then(res => res.json())
        .then((replyData) => {
            setReplyData({
                ...replyData,
                replyCnt : replyData.replyCnt,
                replyList : replyData.replyList
            })
        })
        .catch(err => {console.log('error')})
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
                                                <th colSpan="2" width="100%">{data.boardTtl}</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td align="left" width="50%">Writer : {data.regMemId}</td>
                                                <td align="right">Date : <Moment format="YYYY/MM/DD">
                                                                    {data.crtDt}
                                                                </Moment></td>
                                            </tr>
                                            <tr>
                                                <td colSpan="2" height="200px">
                                                    <div dangerouslySetInnerHTML={ {__html: data.boardCntn} }/>
                                                    {/* {data.boardCntn} */}
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
                                                            <h6 style={{display:'inline'}}>{replyData.regMemId}</h6> / <Moment format="YYYY/MM/DD">{replyData.crtDt}</Moment>
                                                        </td>
                                                        <td align="right"><ReplyBtn replyData={replyData}/></td>
                                                    </tr>
                                                    <tr>
                                                        <td align="left" colSpan="2">{replyData.replyCntn}</td>
                                                    </tr>
                                                    </>
                                                )
                                            })}

                                            <tr>
                                                <td colSpan="2">
                                                    <textarea className="form-control"
                                                              style={{height:'100px'}}
                                                              placeholder="댓글을 입력해주세요."/>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td align="right" colSpan="2">
                                                    <Button>등록</Button>
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
    }
    else {
        return null;
    }
}

function ReplyBtn(props){

    const [replyEditModal, setReplyEditModal] = React.useState(false);
    const toggleReplyEdit = () => {
        setReplyEditModal(!replyEditModal);
    }

    function replyDelete(){
        if(window.confirm("댓글을 삭제하시겠습니까?")){
            fetch('/notice-page/view/replydelete/'+props.replyData.replyNo);
        }
    }

    if(Authentication.getLoggedInUserName() == props.replyData.regMemId ){
        /* master 대신에 작성자 ID랑 같은 지 확인하기.
            보내야할 것 : 작성자 ID, 댓글번호, 댓글내용 */
    }

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
                            <input type="text" class="form-control"
                                    placeholder="Please enter a title."
                                    value={props.replyData.replyCntn}/>
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
}

export default NoticeView;