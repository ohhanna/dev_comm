package com.example.demo.service.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.board.BoardFreeMapper;
import com.example.demo.vo.board.BoardFreeVo;
import com.example.demo.vo.reply.ReplyFreeVo;

@Service
public class BoardFreeService {
    @Autowired(required = true)
    public BoardFreeMapper mapper;

    //게시판 글 총 갯수
    public int boardFreeListCount() {
        return mapper.boardFreeListCount();
    }

    //게시판 리스트 get
    public List<BoardFreeVo> boardFreeList(int pageNum, int pageSize) {
        return mapper.boardFreeList(pageNum, pageSize);
    }

    //게시판 리스트 글 상세보기
    public List<BoardFreeVo> boardFreeDetail(int boardNo) {
        return mapper.boardFreeDetail(boardNo);
    }

    //게시판 글 추가
    public int boardFreeAdd(BoardFreeVo boardFreeVo) {
        return mapper.boardFreeAdd(boardFreeVo);
    }

    //게시판 글 수정
    public int boardFreeModify(BoardFreeVo boardFreeVo) {
        return mapper.boardFreeModify(boardFreeVo);
    }

    /* 댓글 시작 */

    //댓글 총 갯수
    public int freeReplyCount(int boardNo) {
        return mapper.freeReplyCount(boardNo);
    }

    //댓글 리스트 get
    public List<ReplyFreeVo> freeReplyList(int boardNo, int pageNum, int pageSize) {
        return mapper.freeReplyList(boardNo, pageNum, pageSize);
    }

    //댓글 등록
    public int freeReplyAdd(ReplyFreeVo replyFreeVo) {
        return mapper.freeReplyAdd(replyFreeVo);
    }

    //댓글 삭제
    public int freeReplyDelete(int replyNo) {
        return mapper.freeReplyDelete(replyNo);
    }

}