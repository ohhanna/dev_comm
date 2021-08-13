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
        System.out.println("컨트롤러");
        System.out.println(noticeList.size());
        for(int i=0; i<noticeList.size(); i++){
            System.out.println("board no : " + noticeList.get(i).getBoard_no());
        }
        return noticeList;
    }

    // VIEW - content(BLOB) 불러와야함
    @GetMapping("/notice-page/view/{board_no}")
    public BoardNoticeVo noticeView(@PathVariable int board_no){
        System.out.println("(한나) BoardNoticeController - /notice-page/view/{board_no}");
        BoardNoticeVo noticeView = boardNoticeService.selectOne(board_no);

        if(noticeView != null){
            System.out.println(noticeView.getBoard_no());
        }

        return noticeView;
    }

    // DELETE (update is_del = Y)
    @GetMapping("/notice-page/del/{board_no}")
    public int noticeDel(@PathVariable int board_no){
        System.out.println("(한나) BoardNoticeController - /notice-page/del");    
        return boardNoticeService.noticeDel(board_no);
    }

    @GetMapping("/notice-page/writeProcess")
    public String noticeWriteProcess(){
        // write 작업 -> 서비스로 보내기
        return null;
    }

    @GetMapping("/notice-page/editProcess")
    public String noticeEditProcess(){
        // edit 작업 -> 서비스로 보내기
        return null;
    }
}