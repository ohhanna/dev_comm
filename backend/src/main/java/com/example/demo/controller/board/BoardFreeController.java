package com.example.demo.controller.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.service.board.BoardFreeService;
import com.example.demo.vo.board.BoardFreeVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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

    //게시판 리스트, 총 갯수 get
    @GetMapping("/freeBoard/list")
    public Map<String, Object> freeBoardList(@RequestParam(value = "currentPage", required=false) Integer pageNum,
                                             @RequestParam(value = "pageSize", required=false) Integer pageSize) {

        System.out.println("freeBoardList Controller");
        System.out.println("pageNum ::: " + pageNum);
        System.out.println("pageSize ::: " + pageSize);

        Map<String, Object> freeMap = new HashMap<String, Object>();

        int freeListCount = boardFreeService.BoardFreeListCount();
        List<BoardFreeVo> freeList =  boardFreeService.BoardFreeList(pageNum, pageSize);

        freeMap.put("freeListCount", freeListCount);
        freeMap.put("freeList", freeList);

        System.out.println("freeList :::" + freeList);
        System.out.println("freeList Size :::" + freeList.size());
        return freeMap;
    }

    //게시판 리스트 글 상세보기
    @GetMapping("/freeBoard/detail")
    public List<BoardFreeVo> BoardFreeListDetail(@RequestParam(value = "boardNo", required=false) Integer boardNo) {
        System.out.println("freeBoardList Controller Detail");

        List<BoardFreeVo> freeDetail = boardFreeService.BoardFreeListDetail(boardNo);
        return freeDetail;
    }

    //게시판 글 추가
    @PostMapping("/freeBoard/add")
    public void freeBoardAdd(@RequestBody BoardFreeVo boardFreeVo) {
        System.out.println("freeBoardList Controller Add");

        boardFreeService.BoardFreeAdd(boardFreeVo);
    }

}