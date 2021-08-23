package com.example.demo.mapper.board;

import java.util.List;

import com.example.demo.vo.board.BoardFreeVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BoardFreeMapper {

    //게시판 글 총 갯수
    int BoardFreeListCount();

    //게시판 리스트 get
    List<BoardFreeVo> BoardFreeList(int pageNum, int pageSize);

    //게시판 리스트 글 상세보기
    List<BoardFreeVo> BoardFreeDetail(int boardNo);

    //게시판 글 추가
    int BoardFreeAdd(BoardFreeVo boardFreeVo);
    
    //게시판 글 수정
    int BoardFreeModify(BoardFreeVo boardFreeVo);
}