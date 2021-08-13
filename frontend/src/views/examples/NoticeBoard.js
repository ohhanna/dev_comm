/* eslint-disable */
import React, { useState } from "react";

// core components
import IndexNavbar from "components/Navbars/IndexNavbar.js";
import LandingPageHeader from "components/Headers/LandingPageHeader.js";
import NoticeList from "views/noticeBoard/NoticeList.js";
import NoticeView from "views/noticeBoard/NoticeView.js";
import NoticeWriteForm from "views/noticeBoard/NoticeWriteForm.js";
import NoticeEditForm from "views/noticeBoard/NoticeEditForm.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import { Route, Switch, Redirect } from "react-router-dom";

function NoticeBoard(match) {

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });

  return (
    <>
      <IndexNavbar />
      <LandingPageHeader />

      <Switch>
        <Route exact path="/notice-page/list">
          <NoticeList/>
        </Route>
        <Route exact path="/notice-page/writeForm">
          <NoticeWriteForm/>
        </Route>
        <Route exact path="/notice-page/view/:boardNo" component={NoticeView}>
          {/* <NoticeView params={match.params.boardNo}/> */}
        </Route>
        <Route exact path="/notice-page/write">
          <NoticeWriteForm/>
        </Route>
        <Route exact path="/notice-page/edit/:boardNo" component={NoticeEditForm}>
          {/* <NoticeEditForm/> */}
        </Route>
        <Route exact path="/notice-page/del/:boardNo" component={DeleteCom}>
        </Route>
      </Switch>

      {/* shoes.map((a, i)=>{
        return <Card shoes={shoes[i]} i={i}/>
      }) */}

      <DemoFooter />
    </>
  );
}

const DeleteCom = ({match}) => {

  console.log(match.params.boardNo);

  const [msg, setMsg] = useState("hi");

  fetch(match.params.boardNo)
  .then( res => res.json())
  .then( res => {
    if(res == 1){
      // 삭제 성공
      alert('삭제되었습니다.');
      // setMsg("삭제되었습니다");
    } else {
      // 삭제 실패
      alert('삭제에 실패했습니다. 다시 시도해주세요.');
      // setMsg("삭제에 실패했습니다. 다시 시도해주세요.");
    }
  })

  console.log(msg);

  return (
    <>
      {/* <AlertModal msg={msg}/> */}
      <Redirect to={{
        pathname:"/notice-page/list"
      }}/>
    </>
  )
}

// function AlertModal(props){
//   const [alertModal, setAlertModal] = React.useState(false);
//   const toggleModal = () =>{
//     setAlertModal(!alertModal);
//   }

//   return (
//     <>
//     <Modal isOpen={alertModal} toggle={toggleModal}>
//       <div className="modal-header">
//           <button aria-label="Close"
//                   className="close"
//                   type="button"
//                   onClick={toggleModal}>
//               <span aria-hidden={true}>×</span>
//           </button>
//           <h5></h5>
//       </div>
//       <div className="modal-body text-center">
//           {props.msg}
//       </div>
//       <div className="modal-footer" margin="auto">
//         <div className="left-side">
//         <Button className="btn-link"
//                 color="default"
//                 type="button"
//                 width="50%"
//                 onClick={toggleModal}>
//             확인
//         </Button>
//         </div>
//       </div>
//     </Modal>
//     </>
//   )
// }


export default NoticeBoard;