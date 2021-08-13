package com.example.demo.mapper.board;

import com.example.demo.vo.board.BoardMemberVo;
import com.example.demo.vo.board.PageVo;

import java.util.ArrayList;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BoardMemberMapper {
    ArrayList<BoardMemberVo> selectBoardList(PageVo pageVo);
}