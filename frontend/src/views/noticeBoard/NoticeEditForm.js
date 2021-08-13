import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
    Button,
    Form,
    Input,
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

const NoticeEditForm = ({match}) => {

    const data = useFetch("/notice-page/view/"+match.params.board_no);

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
                                        <ListModal/>
                                        {/* <Link to="/notice-page/editProcess"> */}
                                            <Button type="button" id="notice_edit_btn" className="btn mr-1 float-right" color="default" outline>
                                                SAVE
                                            </Button>
                                        {/* </Link> */}
                                    </div>
                                    <br/><br/><br/>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th><input type="text" class="form-control">{data.board_ttl}</input></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <textarea rows="4" class="form-control"></textarea>
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

export default NoticeEditForm;