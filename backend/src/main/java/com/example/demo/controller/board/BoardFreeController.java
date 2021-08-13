package com.example.demo.controller.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.service.board.BoardFreeService;
import com.example.demo.vo.board.BoardFreeVo;

@RestController
public class BoardFreeController {
    @Autowired
    BoardFreeService boardFreeService;

    @GetMapping("/api/login")
    public String loginGet(String email, String password) {
        System.out.println("login test");
        System.out.println(email);
        System.out.println(password);
        return "success";
    }

    @PostMapping("/api/login")
    public String loginPost(String email, String password) {
        System.out.println("login test");
        System.out.println(email);
        System.out.println(password);
        return "success";
    }


    @GetMapping("/freeBoard/list")
    public String freeBoardList() {
        System.out.println("board test");

        int limit = 10;
        int offset = 1;

        List<BoardFreeVo> freeList =  boardFreeService.BoardFreeList(limit, offset);
        System.out.println("freeList :::" + freeList);
        return "board success";
    }

}