package com.example.demo.mapper.board;

import java.util.List;

import com.example.demo.vo.board.BoardNoticeVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BoardMemberMapper {
    List<BoardNoticeVo> selectAll();
    BoardNoticeVo selectOne(int boardNo);
}