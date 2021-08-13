package com.example.demo.controller.board;


import com.example.demo.service.board.BoardMemberService;

import java.util.ArrayList;
import com.example.demo.vo.board.BoardMemberVo;
import com.example.demo.vo.board.PageVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class BoardMemberController {

    @Autowired
    BoardMemberService boardMemberService;

    @RequestMapping("/board/member/list")
    @ResponseBody
    public ArrayList<BoardMemberVo> getBoardList(PageVo pageVo) {
        // start page setting
        pageVo.createStartPage(pageVo.getPageIndex(), pageVo.getPageSize());

        ArrayList<BoardMemberVo> list = boardMemberService.selectBoardList(pageVo);
        
        return list;
    }

    @GetMapping("/board/member/getBoard")
    public String enterList() { 
        System.out.println("success2 - 새로 추가한거. "); 
        return "안녕하세요. 현재 서버시간은 입니다. \n";
    }
}