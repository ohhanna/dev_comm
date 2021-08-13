package com.example.demo.service.board;

import java.util.ArrayList;

import com.example.demo.mapper.board.BoardMemberMapper;
import com.example.demo.vo.board.BoardMemberVo;
import com.example.demo.vo.board.PageVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BoardMemberService {

    @Autowired(required=true)
    public BoardMemberMapper mapper;

    public ArrayList<BoardMemberVo> selectBoardList(PageVo pageVo){
        return mapper.selectBoardList(pageVo);
    }

    public BoardMemberVo selectBoardDtl(BoardMemberVo boardMemberVo){
        return mapper.selectBoardDtl(boardMemberVo);
    }
}