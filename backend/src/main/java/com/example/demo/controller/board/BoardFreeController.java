package com.example.demo.controller.board;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.example.demo.service.board.BoardFreeService;
import com.example.demo.vo.board.BoardFreeVo;

@RestController
public class BoardFreeController {
    @Autowired
    BoardFreeService testService;

    @GetMapping("/api/hello")
    public String enter() {
        List<BoardFreeVo> testList = testService.selectTest();

        for (BoardFreeVo tt : testList) {
            System.out.println(tt.toString());
        }

        System.out.println("success"); 
        return "안녕하세요. 현재 서버시간은 " + new Date() + "입니다. \n";
    }

    public ModelAndView test() {
        ModelAndView mav = new ModelAndView(); 

        List<BoardFreeVo> testList = testService.selectTest();
        mav.addObject("list", testList);

        return mav;
    }
}