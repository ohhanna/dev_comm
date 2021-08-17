package com.example.demo.controller.board;

import java.util.List;

import com.example.demo.service.board.BoardNoticeService;
import com.example.demo.vo.board.BoardNoticeVo;
import com.example.demo.vo.board.PageVo;

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
        
        // pageVo.createStartPage(pageVo.getPageIndex(), pageVo.getPageSize());
        // List<BoardNoticeVo> noticeListByPaging = boardNoticeService.selectAll(pageVo);

        List<BoardNoticeVo> noticeList = boardNoticeService.selectAll();

        return noticeList;
    }

    // VIEW - content(BLOB) 불러와야함
    @GetMapping("/notice-page/view/{boardNo}")
    public BoardNoticeVo noticeView(@PathVariable int boardNo){
        System.out.println("(한나) BoardNoticeController - /notice-page/view/{boardNo}");
        BoardNoticeVo noticeView = boardNoticeService.selectOne(boardNo);

        if(noticeView != null){
            System.out.println(noticeView.getBoardNo());
        }

        return noticeView;
    }

    // DELETE - is_del = 'Y' 로 변경함
    @GetMapping("/notice-page/del/{boardNo}")
    public int noticeDel(@PathVariable int boardNo){
        System.out.println("(한나) BoardNoticeController - /notice-page/del");    
        return boardNoticeService.noticeDel(boardNo);
    }

    @GetMapping("/notice-page/write")
    public String noticeWrite(){
        // NoticeWriteForm.js 화면 열어주기
        // 근데 화면을 열어줄 필요가 없음
        System.out.println("(한나) BoardNoticeController - /notice-page/write");
        return null;
    }

    @GetMapping("/notice-page/writeProcess")
    public String noticeWriteProcess(){
        // write 작업 -> 서비스로 보내기
        return null;
    }

    @GetMapping("/notice-page/edit")
    public String noticeEdit(){
        // NoticeEditForm.js 화면 열어주기
        // 화면을 열어줄 필요가 없음!
        System.out.println("(한나) BoardNoticeController - /notice-page/edit");
        return null;
    }

    @GetMapping("/notice-page/editProcess")
    public String noticeEditProcess(){
        // edit 작업 -> 서비스로 보내기
        return null;
    }
}