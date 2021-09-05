package com.example.demo.controller.board;


import com.example.demo.service.board.BoardMemberService;

import java.util.ArrayList;
import com.example.demo.vo.board.BoardMemberVo;
import com.example.demo.vo.board.PageVo;
import com.example.demo.vo.reply.ReplyVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class BoardMemberController {

    @Autowired
    BoardMemberService boardMemberService;

    @RequestMapping("/board/member/list")
    @ResponseBody
    public ArrayList<BoardMemberVo> getBoardList(BoardMemberVo pageVo) {
        // start page setting
        pageVo.createStartPage(pageVo.getPageIndex(), pageVo.getPageSize());

        System.out.println("SEARCH CONDITION : >>> " + pageVo.getSearchCondition());
        ArrayList<BoardMemberVo> list = boardMemberService.selectBoardList(pageVo);
        
        return list;
    }

    @RequestMapping("/board/member/getDetail")
    @ResponseBody
    public BoardMemberVo getBoardDtl(BoardMemberVo boardMemberVo) { 
        System.out.println(boardMemberVo.getBoardNo()); 

        BoardMemberVo result = boardMemberService.selectBoardDtl(boardMemberVo);

        return result;
    }

    @RequestMapping("/board/member/getReply")
    @ResponseBody
    public ArrayList<ReplyVo> getReply(ReplyVo replyVo){
        System.out.println("Board NO : " + replyVo.getBoardNo());

        ArrayList<ReplyVo> list = boardMemberService.selectReply(replyVo);

        return list;
    }

    @RequestMapping("/board/member/save")
    @ResponseBody
    public String insertBoardDtl(BoardMemberVo boardMemberVo){
        System.out.println("before boardNo : " + boardMemberVo.getBoardNo());
        boardMemberService.insertBoardDtl(boardMemberVo);

        int result = boardMemberVo.getBoardNoProperty();

        return Integer.toString(result);
    }


    @RequestMapping("/board/member/saveReply")
    @ResponseBody
    public String insertBoardDtl(ReplyVo replyVo){
        System.out.println("before boardNo : " + replyVo.getReplyCntn());

        int result = boardMemberService.insertReply(replyVo);

        return Integer.toString(result);
    }

    @RequestMapping("/board/member/deleteReply")
    @ResponseBody
    public void deleteReply(ReplyVo replyVo){
        System.out.println("delete reply : " + replyVo.getReplyNo());

        boardMemberService.deleteReply(replyVo);
    } 

    @RequestMapping("/board/member/updateReply")
    @ResponseBody
    public void updateReply(ReplyVo replyVo){
        System.out.println("updateReply : " + replyVo.getReplyNo());
        boardMemberService.updateReply(replyVo);
    } 
    
}