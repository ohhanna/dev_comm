package com.example.demo.controller.board;

import java.util.List;

import com.example.demo.service.board.BoardNoticeService;
import com.example.demo.vo.board.BoardNoticeVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class BoardNoticeController {
    @Autowired
    BoardNoticeService boardNoticeService;

    // LIST - paging 필요
    @GetMapping("/notice-page/list")
    public List<BoardNoticeVo> noticeList(){
        System.out.println("(한나) BoardNoticeController - /notice-page/list");
        List<BoardNoticeVo> noticeList = boardNoticeService.selectAll();
<<<<<<< HEAD
        System.out.println("컨트롤러");
        System.out.println(noticeList.size());
        for(int i=0; i<noticeList.size(); i++){
            System.out.println("board no : " + noticeList.get(i).getBoard_no());
        }
=======
        // System.out.println("사이즈 : " + noticeList.size());

        // if(noticeList.size()>0){
        //     for(int i = 0; i<noticeList.size(); i++){
        //         System.out.println("board no : " + noticeList.get(i).getBoard_no());
        //         System.out.println("board title : " + noticeList.get(i).getBoard_ttl());
        //     }
        // }

>>>>>>> d03f666029320db2e0e25d9c7f5289b7902b094d
        return noticeList;
    }

    // VIEW - content(BLOB) 불러와야함
    @GetMapping("/notice-page/view/{board_no}")
    public BoardNoticeVo noticeView(@PathVariable int board_no){
        System.out.println("(한나) BoardNoticeController - /notice-page/view/{board_no}");
        BoardNoticeVo noticeView = boardNoticeService.selectOne(board_no);

        if(noticeView != null){
            System.out.println(noticeView.getBoard_no());
<<<<<<< HEAD
=======
            // System.out.println(noticeView.getBoard_ttl());
            // System.out.println(noticeView.getCrt_dt());
            // System.out.println(noticeView.getMod_dt());
            // System.out.println(noticeView.getReg_mem_id());
            // System.out.println(noticeView.getIs_del());
            // System.out.println(noticeView.getBoard_cntn());
>>>>>>> d03f666029320db2e0e25d9c7f5289b7902b094d
        }

        return noticeView;
    }

<<<<<<< HEAD
    // DELETE (update is_del = Y)
=======
    // DELETE - is_del = 'Y' 로 변경함
>>>>>>> d03f666029320db2e0e25d9c7f5289b7902b094d
    @GetMapping("/notice-page/del/{board_no}")
    public int noticeDel(@PathVariable int board_no){
        System.out.println("(한나) BoardNoticeController - /notice-page/del");    
        return boardNoticeService.noticeDel(board_no);
    }

<<<<<<< HEAD
=======
    @GetMapping("/notice-page/write")
    public String noticeWrite(){
        // NoticeWriteForm.js 화면 열어주기
        // 근데 화면을 열어줄 필요가 없음
        System.out.println("(한나) BoardNoticeController - /notice-page/write");
        return null;
    }

>>>>>>> d03f666029320db2e0e25d9c7f5289b7902b094d
    @GetMapping("/notice-page/writeProcess")
    public String noticeWriteProcess(){
        // write 작업 -> 서비스로 보내기
        return null;
    }
<<<<<<< HEAD
=======

    @GetMapping("/notice-page/edit")
    public String noticeEdit(){
        // NoticeEditForm.js 화면 열어주기
        // 화면을 열어줄 필요가 없음!
        System.out.println("(한나) BoardNoticeController - /notice-page/edit");
        return null;
    }
>>>>>>> d03f666029320db2e0e25d9c7f5289b7902b094d

    @GetMapping("/notice-page/editProcess")
    public String noticeEditProcess(){
        // edit 작업 -> 서비스로 보내기
        return null;
    }
}