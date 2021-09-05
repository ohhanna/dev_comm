package com.example.demo.controller.board;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.example.demo.service.board.BoardFreeService;
import com.example.demo.vo.board.BoardFreeVo;
import com.example.demo.vo.reply.ReplyFreeVo;

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
                                             @RequestParam(value = "pageSize", required=false) Integer pageSize,
                                             @RequestParam(value = "type", required=false) String type,
                                             @RequestParam(value = "keyword", required=false) String keyword) {

        System.out.println("freeBoardList Controller");
        System.out.println("pageNum ::: " + pageNum);
        System.out.println("pageSize ::: " + pageSize);
        System.out.println("type ::: " + type);
        System.out.println("keyword ::: " + keyword);

        Map<String, Object> freeMap = new HashMap<String, Object>();

        int freeListCount = boardFreeService.boardFreeListCount();
        List<BoardFreeVo> freeList =  boardFreeService.boardFreeList(pageNum, pageSize, type, keyword);

        freeMap.put("freeListCount", freeListCount);
        freeMap.put("freeList", freeList);

        System.out.println("freeList :::" + freeList);
        System.out.println("freeList Size :::" + freeList.size());
        return freeMap;
    }

    //게시판 리스트 글 상세보기
    @GetMapping("/freeBoard/detail")
    public List<BoardFreeVo> BoardFreeDetail(@RequestParam(value = "boardNo", required=false) Integer boardNo) {
        System.out.println("freeBoardList Controller Detail");

        List<BoardFreeVo> freeDetail = boardFreeService.boardFreeDetail(boardNo);
        return freeDetail;
    }

    //게시판 글 추가
    @PostMapping("/freeBoard/add")
    public void freeBoardAdd(@RequestBody BoardFreeVo boardFreeVo) {
        System.out.println("freeBoardList Controller Add");

        boardFreeService.boardFreeAdd(boardFreeVo);
    }

    //게시판 글 수정
    @PostMapping("/freeBoard/modify")
    public void freeBoardModify(@RequestBody BoardFreeVo boardFreeVo) {
        System.out.println("freeBoardList Controller Modify");

        boardFreeService.boardFreeModify(boardFreeVo);
    }

    /* 댓글 시작 */

    @GetMapping("/freeBoard/reply/list")
    public Map<String, Object> freeReplyList(@RequestParam(value = "boardNo", required=false) Integer boardNo) {
        System.out.println("freeBoardList Controller replyList");

        Map<String, Object> freeReplyMap = new HashMap<String, Object>();

        int replyCount = boardFreeService.freeReplyCount(boardNo);
        List<ReplyFreeVo> replyList = boardFreeService.freeReplyList(boardNo);

        freeReplyMap.put("replyCount", replyCount);
        freeReplyMap.put("replyList", replyList);

        return freeReplyMap;
    }

    @PostMapping("/freeBoard/reply/add")
    public void freeReplyAdd(@RequestBody ReplyFreeVo replyFreeVo) {
        System.out.println("freeBoardList Controller replyAdd");

        boardFreeService.freeReplyAdd(replyFreeVo);
    }

    @PostMapping("/freeBoard/reply/modify")
    public void freeReplyModify(@RequestParam(value = "replyNo", required=false) Integer replyNo,
                                @RequestParam(value = "replyCntn", required=false) String replyCntn) {
        System.out.println("freeBoardList Controller replyModify");

        boardFreeService.freeReplyModify(replyNo, replyCntn);
        freeReplyList(replyNo);

    }

    @PostMapping("/freeBoard/reply/delete")
    public String freeReplyDelete(@RequestParam(value = "replyNo", required=false) Integer replyNo) {
        System.out.println("freeBoardList Controller replyDelete"); 
        
        boardFreeService.freeReplyDelete(replyNo);
        return "success";
    }

}