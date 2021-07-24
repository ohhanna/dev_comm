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

    public List<BoardFreeVo> selectTest() {
        return mapper.selectTest();
    }

}