package com.example.demo.service.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.mapper.board.BoardFreeMapper;
import com.example.demo.vo.board.BoardFreeVo;

@Service
public class BoardFreeService {
    @Autowired(required = true)
    public BoardFreeMapper mapper;

    //게시판 글 총 갯수
    public int BoardFreeListCount() {
        return mapper.BoardFreeListCount();
    }

    //게시판 리스트 get
    public List<BoardFreeVo> BoardFreeList(int pageNum, int pageSize) {
        return mapper.BoardFreeList(pageNum, pageSize);
    }

    //게시판 리스트 글 상세보기
    public List<BoardFreeVo> BoardFreeDetail(int boardNo) {
        return mapper.BoardFreeDetail(boardNo);
    }

    //게시판 글 추가
    public int BoardFreeAdd(BoardFreeVo boardFreeVo) {
        return mapper.BoardFreeAdd(boardFreeVo);
    }

    //게시판 글 수정
    public int BoardFreeModify(BoardFreeVo boardFreeVo) {
        return mapper.BoardFreeModify(boardFreeVo);
    }

}