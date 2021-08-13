package com.example.demo.mapper.board;

import java.util.List;

import com.example.demo.vo.board.BoardFreeVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BoardFreeMapper {

    // List<BoardFreeVo> selectTest();

    List<BoardFreeVo> BoardFreeList(int limit, int offset);
}