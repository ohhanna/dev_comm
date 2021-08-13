package com.example.demo.controller.board;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.service.board.BoardFreeService;
import com.example.demo.vo.board.BoardFreeVo;

@RestController
public class BoardFreeController {
    @Autowired
    BoardFreeService boardFreeService;

    // @GetMapping("/api/hello")
    // public String enter() {
    //     List<BoardFreeVo> testList = testService.selectTest();

    //     for (BoardFreeVo tt : testList) {
    //         System.out.println(tt.toString());
    //     }

    //     System.out.println("success"); 
    //     System.out.println("success2 - hanna_test"); 
    //     System.out.println("success2 - yeongwoo_test"); 
    //     System.out.println("success2 - jinju_test"); 
    //     return "안녕하세요. 현재 서버시간은 " + new Date() + "입니다. \n";
    // }

    // public ModelAndView test() {
    //     ModelAndView mav = new ModelAndView(); 

    //     List<BoardFreeVo> testList = testService.selectTest();
    //     mav.addObject("list", testList);

    //     return mav;
    // }

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