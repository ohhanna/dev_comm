package com.example.demo.mapper.board;

import java.util.List;

import com.example.demo.vo.board.BoardNoticeVo;
import com.example.demo.vo.board.PageVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BoardNoticeMapper {
    // List<BoardNoticeVo> selectAll(PageVo pageVo);
    List<BoardNoticeVo> selectAll();
    BoardNoticeVo selectOne(int boardNo);
    int delOne(int boardNo);
}