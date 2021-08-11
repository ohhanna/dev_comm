import React, { useState } from "react";
// nodejs library that concatenates strings
import classnames from "classnames";
import { NavLink } from 'react-router-dom';
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
  const toggleModal = () => {
    setModal(!modal);
  };

  const [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  });

  function emailChange(e) {
    const data = { ...userInfo };
    data.email = e.currentTarget.value; // input 태그에 입력된 값 지정
    setUserInfo(data);
    console.log(userInfo);
  }

  function passChange(e) {
    const data = { ...userInfo };
    data.password = e.currentTarget.value; // input 태그에 입력된 값 지정
    setUserInfo(data);
    console.log(userInfo);
  }

  // function loginHandler(e) {
  //   const { name, value } = e.target;
  //   this.setState({ [name]: value });
  // } 

  function loginClickHandler (props){
    alert('hi');
    const email = props.email;
    const password = props.password;
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }; 

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
              <NavLink className="navbar-brand" to="/notice-page">
                공지사항
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-brand" to="/profile-page">
                회원게시판
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="navbar-brand" to="/register-pages">
                자유게시판
              </NavLink>
            </NavItem>
            <Button
                className="btn-round mr-1 btn btn-outline-default"
                onClick={toggleModal}
              >
                로그인(임시)
              </Button>
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
                <Form className="register-form"  onSubmit={() => { loginClickHandler(userInfo) }} >
                  <label>Email</label>
                  <Input name="email"
                    className="loginId"
                    type="text"
                    placeholder="아이디"
                    onChange={(e) => { emailChange(e) }} />
                  <label>Password</label>
                  <Input name="password"
                    className="loginPw"
                    type="password"
                    placeholder="비밀번호"
                    onChange={(e) => { passChange(e) }} />          
                
                  <div className="left-side">
                  <Button className="mr-1 btn btn-link">
                    Login
                  </Button>                    
                  </div>
                  </Form>
                  <div className="divider" />
                  <div className="right-side">
                  <Button className="mr-1 btn btn-link">
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
