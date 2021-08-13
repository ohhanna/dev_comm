/* eslint-disable */
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Moment from 'react-moment';

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
                                        <DeleteModal boardNo={match.params.boardNo}/>
                                        <Link to={`/notice-page/edit/${match.params.boardNo}`}>
                                            <Button type="button" id="notice_edit_btn" className="btn mr-1 float-right" color="default" outline>
                                                EDIT
                                            </Button>
                                        </Link>
                                    </div>
                                    <br/><br/><br/>
                                    <Table>
                                        <thead>
                                            <tr>
                                                {/* <th width="10%">No.{data.boardNo}</th> */}
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
                                                <td colSpan="2">
                                                    나 오늘 리액트 공부했당<br/>
                                                    abc<br/>
                                                    abc<br/>
                                                    abc<br/>
                                                    ㅋㅋㅋㅋㅋㅋㅋㅋㅋㅋ
                                                </td>
                                            </tr>
                                            <tr><td/><td/></tr>
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

function DeleteModal(props){

    const [deleteModal, setDeleteModal] = React.useState(false);
    const toggleModal = () => {
        setDeleteModal(!deleteModal);
    }

    const boardNo = props.boardNo;

    return (
        <>
        <Button type="button"
            id="notice_delete_btn"
            className="btn mr-1 float-right"
            color="default" outline
            onClick={toggleModal}>
                DELETE
        </Button>
        <Modal isOpen={deleteModal} toggle={toggleModal}>
            <div className="modal-header">
                <button aria-label="Close"
                        className="close"
                        type="button"
                        onClick={toggleModal}>
                    <span aria-hidden={true}>×</span>
                </button>
                <h5>NOTICE</h5>
            </div>
            <div className="modal-body text-center">
                게시글을 삭제하시겠습니까?
            </div>
            <div className="modal-footer">
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
                <Link to={`/notice-page/del/${boardNo}`}>
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

export default NoticeView;