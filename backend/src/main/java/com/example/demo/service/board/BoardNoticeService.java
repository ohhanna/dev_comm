package com.example.demo.service.board;

import java.util.List;

import com.example.demo.mapper.board.BoardNoticeMapper;
import com.example.demo.vo.board.BoardNoticeVo;
import com.example.demo.vo.board.PageVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardNoticeService {
    @Autowired(required = true)
    public BoardNoticeMapper boardNoticeMapper;

    public List<BoardNoticeVo> selectAll(){
        System.out.println("(한나) BoardNoticeService - selectAll()");
        
        // return boardNoticeMapper.selectAll(pageVo);
        return boardNoticeMapper.selectAll();
    }

    public BoardNoticeVo selectOne(int boardNo){
        return boardNoticeMapper.selectOne(boardNo);
    }

    public int noticeDel(int boardNo){
        return boardNoticeMapper.delOne(boardNo);
    }

}