/* eslint-disable */
import React,{ useEffect, useState, useFocus, useRef } from "react";
import axios from 'axios';

import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';

// reactstrap components
import {
  Container,
  Input,
  Button,
  FormGroup
} from "reactstrap";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";

function MemberBoardEdit(prop) {

  const [boardDtl, setBoardDtl] = useState({boardNo: '', boardTtl:''});
  const [boardTitle, setBoardTitle] = useState('');
  const editorRef = useRef();

  useEffect(() => {
    getBoardDtl();
  }, []);


  // axios function
  function getBoardDtl(){
    const api = axios.create({
      baseURL: "/board/member"
    });
    api.get('/getDetail', { params : {boardNo : prop.match.params.boardNo} }
            ).then(function(response){
              let boardDtlState = {...boardDtl};
              boardDtlState = response.data;
              setBoardDtl(boardDtlState);
              setBoardTitle(boardDtlState.boardTtl);
              editorRef.current.getInstance().setHTML(response.data.boardCntn);
            }).catch(function(error){
              alert(error);
            });
  }

  function saveDtl(){
    const boardDtlState = {...boardDtl};
    boardDtlState.boardCntn = editorRef.current.getInstance().getHTML();
    console.log(boardDtlState.boardCntn);
    setBoardDtl(boardDtlState);

    const api = axios.create({
      baseURL: "/board/member"
    });

    console.log(boardDtl);
    api.post('/save', null, { params : {
                                    boardNo : boardDtl.boardNo,
                                    boardTtl : boardDtl.boardTtl,
                                    boardCntn : boardDtl.boardCntn
                                  } 
                            }
            ).then(function(response){
              console.log(response);
            }).catch(function(error){
              alert("System Error");
            });
  }

  function inputChange(e){
    let boardTtlState = {...boardTitle};
    //console.log(boardDtlState);
    boardTtlState = e.target.value;
    setBoardTitle(boardTtlState);
  }

  return (
    <>
      <IndexNavbar />
      <ProfilePageHeader />
      
      <div className="section profile-content" >
        <Container className="ml-auto mr-auto" md="9">
          <h3 className="font-weight-bold">Member Board Edit</h3>
          <br/>
          {/* Title */}
          <FormGroup>
            <Input autoFocus placeholder="put in title" type="text" size="sm" value={boardTitle} onChange={(e)=>{inputChange(e)}}/>
          </FormGroup>



          {/* Content */}
          <Editor 
              previewStyle="vertical"
              height="300px"
              initialEditType="wysiwyg"
              ref={editorRef}
          />


          <br/>

          {/* Save Button */}
          <Button className="btn-round mr-1"
                  color="default"
                  size="sm"
                  outline
                  type="button"
                  onClick={()=>{saveDtl()}}
          >
                  SAVE
          </Button>
        </Container>
      </div>
      <DemoFooter />
    </>
  );
}

export default MemberBoardEdit;
