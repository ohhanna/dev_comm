package com.example.demo.service.board;

import java.util.List;

import com.example.demo.mapper.board.BoardNoticeMapper;
import com.example.demo.vo.board.BoardNoticeVo;
import com.example.demo.vo.reply.ReplyVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardNoticeService {
    @Autowired(required = true)
    public BoardNoticeMapper boardNoticeMapper;

    // LIST - COUNT
    public int boardNoticeListCount(){
        return boardNoticeMapper.boardNoticeListCount();
    }

    // LIST
    public List<BoardNoticeVo> boardNoticeList(int pageNum, int pageSize){
        return boardNoticeMapper.boardNoticeList(pageNum, pageSize);
    }

    // VIEW
    public BoardNoticeVo selectOne(int boardNo){
        return boardNoticeMapper.selectOne(boardNo);
    }

    // WRITE
    public int boardNoticeWrite(BoardNoticeVo boardNoticeVo){
        return boardNoticeMapper.boardNoticeWrite(boardNoticeVo);
    }

    // EDIT
    public int boardNoticeEdit(BoardNoticeVo boardNoticeVo){
        return boardNoticeMapper.boardNoticeEdit(boardNoticeVo);
    }

    // DELETE
    public int noticeDel(int boardNo){
        return boardNoticeMapper.delOne(boardNo);
    }

    // REPLY - Count
    public int noticeReplyCnt(int boardNo){
        return boardNoticeMapper.noticeReplyCnt(boardNo);
    }

    // REPLY - LIST
    public List<ReplyVo> noticeReplyList(int boardNo){
        return boardNoticeMapper.noticeReplyList(boardNo);
    }

    // REPLY - WRITE

    // REPLY - EDIT

    // REPLY - DELETE
    public int noticeReplyDel(int replyNo){
        return boardNoticeMapper.noticeReplyDel(replyNo);
    }

}