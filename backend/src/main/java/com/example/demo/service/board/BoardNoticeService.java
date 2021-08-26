package com.example.demo.service.board;

import java.util.List;

import com.example.demo.mapper.board.BoardNoticeMapper;
import com.example.demo.vo.board.BoardNoticeVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardNoticeService {
    @Autowired(required = true)
    public BoardNoticeMapper boardNoticeMapper;

    // LIST
    public int boardNoticeListCount(){
        return boardNoticeMapper.boardNoticeListCount();
    }

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

}