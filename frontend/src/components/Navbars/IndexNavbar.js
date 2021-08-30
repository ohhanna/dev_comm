import React, { useState,useRef, useEffect } from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Authentication from 'views/authentication/AuthenticationService.js';
// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  //NavLink,
  Nav,
  Container,
  Button,
  Modal,
  Form,
  Input
} from "reactstrap";

function IndexNavbar() {

  // 모달
  const [modal, setModal] = React.useState(false);
  const [isLogin, setIsLogin] = React.useState(false);


  useEffect(() => {
    if(Authentication.isUserLoggedIn()){
      setIsLogin(true);
    }else{
      setIsLogin(false);
    }
  }, []);

  const toggleModal = () => {
    setModal(!modal);
  };

  const [userInfo, setUserInfo] = useState({
    memId: '',
    memPw: '',
  });

  function idChange(e) {
    const data = { ...userInfo };
    data.memId = e.currentTarget.value; // input 태그에 입력된 값 지정
    setUserInfo(data);
  }

  function passChange(e) {
    const data = { ...userInfo };
    data.memPw = e.currentTarget.value; // input 태그에 입력된 값 지정
    setUserInfo(data);
  }

  // function loginHandler(e) {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // } 

  function loginClickHandler (){
    Authentication.executeJwtAuthenticationService(userInfo.memId,userInfo.memPw)
                  .then((response)=>{

                    let auth = "";
                    for(var i = 0; i < response.data.auth.length; i++){
                      auth += response.data.auth[i].authority + ",";
                    }
                    auth = auth.substr(0, auth.length-1);

                    Authentication.registerSuccessfulLoginForJwt(userInfo.memId, response.data.token, auth);
                    alert("로그인에 성공하였습니다.");

                    setModal(false);
                    setIsLogin(Authentication.isUserLoggedIn());
                  })
                  .catch((err)=>{
                    alert("아이디 및 비밀번호를 확인해주세요.");
                  });
  }; 

  function logoutClickHandler(){
    Authentication.logout();

    const data = {...userInfo};
    data.memId = '';
    data.memPw = '';
    setUserInfo(data);

    setIsLogin(Authentication.isUserLoggedIn());
  }

  function registerHandler(){

    if(userInfo.memId == null || userInfo.memId == undefined || userInfo.memId == ''){
      alert("아이디를 입력해주세요.");
      return;
    }else if(userInfo.memPw == null || userInfo.memPw == undefined || userInfo.memPw == ''){
      alert("비밀번호를 입력해주세요.");
      return;
    }

    const api = axios.create({
      baseURL: "/member"
    });
    api.post('/register', null, { params : {
                                    memId : userInfo.memId,
                                    memPw : userInfo.memPw
                                  } }
            ).then(function(response){
              alert("회원 등록이 완료되었습니다.");
              console.log(response.data);
            }).catch(function(error){
              //alert(error);
              alert("System Error");
            });
  }

  const [navbarColor, setNavbarColor] = React.useState("navbar-transparent");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);

  const toggleNavbarCollapse = () => {
    setNavbarCollapse(!navbarCollapse);
    document.documentElement.classList.toggle("nav-open");
  };

  React.useEffect(() => {
    const updateNavbarColor = () => {
      if (
        document.documentElement.scrollTop > 299 ||
        document.body.scrollTop > 299
      ) {
        setNavbarColor("");
      } else if (
        document.documentElement.scrollTop < 300 ||
        document.body.scrollTop < 300
      ) {
        setNavbarColor("navbar-transparent");
      }
    };

    window.addEventListener("scroll", updateNavbarColor);

    return function cleanup() {
      window.removeEventListener("scroll", updateNavbarColor);
    };
  });
  return (
    <Navbar className={classnames("fixed-top", navbarColor)} expand="lg">
      <Container>
        <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            href="/index"
            target="_blank"
            title="Coded by Creative Tim"
          >
            Developer Community
          </NavbarBrand>
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler", {
              toggled: navbarCollapse,
            })}
            onClick={toggleNavbarCollapse}
          >right toggle
          </button>
        </div>
        <Collapse
          className="justify-content-end"
          navbar
          isOpen={navbarCollapse}
        >
          <Nav navbar>
            <NavItem>
              <NavLink className="navbar-brand" to="/notice-page/list">
                공지사항
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-brand" to="/memberBoardList">
                회원게시판
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-brand" to="/freeBoard/list">
                자유게시판
              </NavLink>
            </NavItem>
            {
              isLogin == false 
              ? 
              <Button
                  className="btn-round mr-1 btn btn-outline-default"
                  onClick={toggleModal}
                >
                  로그인
              </Button>
              :
              <Button
                  className="btn-round mr-1 btn btn-outline-default"
                  onClick={logoutClickHandler}
                >
                  로그아웃
              </Button>
            }
              {/* Modal */}
              <Modal isOpen={modal} toggle={toggleModal}>
                <div className="modal-header">
                  <button
                    aria-label="Close"
                    className="close"
                    type="button"
                    onClick={toggleModal}
                  >
                    <span aria-hidden={true}>×</span>
                  </button>
                  <h5
                    className="modal-title text-center"
                    id="exampleModalLabel"
                  >
                    LOGIN
                  </h5>
                </div>
                <div className="modal-body">
                  <label>Email</label>
                  <Input name="email"
                    className="loginId"
                    type="text"
                    placeholder="아이디"
                    onChange={(e) => { idChange(e) }} />
                  <label>Password</label>
                  <Input name="password"
                    className="loginPw"
                    type="password"
                    placeholder="비밀번호"
                    onChange={(e) => { passChange(e) }} />          
                
                  <div className="left-side">
                    <Button className="mr-1 btn btn-link" onClick={loginClickHandler}>
                      Login
                    </Button>                    
                </div>
                <div className="divider" />
                  <div className="right-side">
                    <Button className="mr-1 btn btn-link" onClick={registerHandler}>
                      Register
                    </Button>
                  </div>
                </div>
              </Modal>
          </Nav>
        </Collapse>
      </Container>
    </Navbar>
  );
}

export default IndexNavbar;
