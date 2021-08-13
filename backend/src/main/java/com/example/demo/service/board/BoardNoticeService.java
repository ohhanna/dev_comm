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

    public List<BoardNoticeVo> selectAll(){
        System.out.println("(한나) BoardNoticeService - selectAll()");
        return boardNoticeMapper.selectAll();
    }

    public BoardNoticeVo selectOne(int board_no){
        return boardNoticeMapper.selectOne(board_no);
    }

    public int noticeDel(int board_no){
        return boardNoticeMapper.delOne(board_no);
    }

}