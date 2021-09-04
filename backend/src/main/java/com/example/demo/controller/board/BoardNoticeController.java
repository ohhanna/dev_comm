package com.example.demo.controller.board;

import java.util.*;

import com.example.demo.service.board.BoardNoticeService;
import com.example.demo.vo.board.BoardNoticeVo;
import com.example.demo.vo.reply.ReplyVo;

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

        return noticeView;
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
        boardNoticeService.boardNoticeEdit(boardNoticeVo);
    }

    // DELETE - is_del = 'Y' 로 변경함
    @GetMapping("/notice-page/del/{boardNo}")
    public int noticeDel(@PathVariable int boardNo){
        System.out.println("(한나) BoardNoticeController - /notice-page/del");    
        return boardNoticeService.noticeDel(boardNo);
    }

    // REPLY - LIST
    @GetMapping("/notice-page/view/reply/{boardNo}")
    public Map<String, Object> noticeReply(@PathVariable int boardNo){
        System.out.println("(한나) BoardNoticeController - /notice-page/view/reply/{boardNo}");

        Map<String, Object> replyMap = new HashMap<String, Object>();

        int replyCnt = boardNoticeService.noticeReplyCnt(boardNo);
        List<ReplyVo> replyList = boardNoticeService.noticeReplyList(boardNo);

        replyMap.put("replyCnt", replyCnt);
        replyMap.put("replyList", replyList);

        // List<ReplyVo> orderedList = new ArrayList<ReplyVo>();

        // for(int i=0; i<replyList.size(); i++){
        //     for(int j=1; j<replyList.size(); j++){
        //         if(replyList.get(j).getUpReplyNo() == replyList.get(i).getReplyNo()){
        //             orderedList.add(i+1, replyList.get(j));
        //             break;
        //         } else {
        //             orderedList.add(i, replyList.get(i));
        //             break;
        //         }
        //     }
        // }

        // System.out.println(orderedList.size());
        // for(int i=0; i<orderedList.size(); i++){
        //     System.out.println(orderedList.get(i).getReplyNo());
        // }

        return replyMap;
    }

    // REPLY - WRITE
    @PostMapping("/notice-page/view/replyWrite")
    public int noticeReplyWrite(@RequestBody ReplyVo replyVo) {
        System.out.println("(한나) BoardNoticeController - /notice-page/view/replyWrite");
        if(replyVo.getUpReplyNo() == null){
            // 대댓이 아닌 경우 :D
            replyVo.setUpReplyNo("0");
        }
        return boardNoticeService.noticeReplyWrite(replyVo);
    }

    // REPLY - EDIT
    @PostMapping("/notice-page/view/replyEdit")
    public int noticeReplyEdit(@RequestBody ReplyVo replyVo) {
        System.out.println("(한나) BoardNoticeController - /notice-page/view/replyEdit");

        return boardNoticeService.noticeReplyEdit(replyVo);
    }

    // REPLY - DELETE
    @GetMapping("/notice-page/view/replyDelete/{replyNo}")
    public int noticeReplyDel(@PathVariable int replyNo){
        System.out.println("(한나) BoardNoticeController - /notice-page/view/reply-delete/{replyNo}");
        int result = boardNoticeService.noticeReplyDel(replyNo);

        return result;
    }
}