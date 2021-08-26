package com.example.demo.controller.board;

import java.util.*;

import com.example.demo.service.board.BoardNoticeService;
import com.example.demo.vo.board.BoardNoticeVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BoardNoticeController {
    @Autowired
    BoardNoticeService boardNoticeService;

    // LIST
    @GetMapping("/notice-page/list")
    public Map<String, Object> noticeList(
        @RequestParam(value = "currentPage", required=false) Integer pageNum,
        @RequestParam(value = "pageSize", required=false) Integer pageSize)
    {

        System.out.println("(한나) BoardNoticeController - /notice-page/list");
        
        Map<String, Object> noticeMap = new HashMap<String, Object>();
        int noticeListCount = boardNoticeService.boardNoticeListCount();
        List<BoardNoticeVo> noticeList = boardNoticeService.boardNoticeList(pageNum, pageSize);

        noticeMap.put("noticeListCount", noticeListCount);
        noticeMap.put("noticeList", noticeList);

        return noticeMap;
    }

    // VIEW, EDIT 하나 불러오기
    @GetMapping("/notice-page/view/{boardNo}")
    public BoardNoticeVo noticeView(@PathVariable int boardNo){
        System.out.println("(한나) BoardNoticeController - /notice-page/view/{boardNo}");
        BoardNoticeVo noticeView = boardNoticeService.selectOne(boardNo);

        if(noticeView != null){
            System.out.println("★★★★★★★");
            System.out.println(noticeView.getBoardNo());
            System.out.println(noticeView.getBoardTtl());
            System.out.println(noticeView.getBoardCntn());
            System.out.println("★★★★★★★");
        }

        return noticeView;
    }

    // DELETE - is_del = 'Y' 로 변경함
    @GetMapping("/notice-page/del/{boardNo}")
    public int noticeDel(@PathVariable int boardNo){
        System.out.println("(한나) BoardNoticeController - /notice-page/del");    
        return boardNoticeService.noticeDel(boardNo);
    }

    // WRITE
    @PostMapping("/notice-page/writeProcess")
    public void noticeWriteProcess(
        @RequestBody BoardNoticeVo boardNoticeVo)
    {
        System.out.println("(한나) BoardNoticeController - /notice-page/writeProcess"); 
        boardNoticeService.boardNoticeWrite(boardNoticeVo);
    }

    // EDIT
    @PostMapping("/notice-page/editProcess")
    public void noticeEditProcess(
        @RequestBody BoardNoticeVo boardNoticeVo)
    {
        System.out.println("(한나) BoardNoticeController - /notice-page/editProcess");
        System.out.println("board no : " + boardNoticeVo.getBoardNo());
        System.out.println("title : " + boardNoticeVo.getBoardTtl());
        System.out.println("content : " + boardNoticeVo.getBoardCntn());
        boardNoticeService.boardNoticeEdit(boardNoticeVo);
    }
}