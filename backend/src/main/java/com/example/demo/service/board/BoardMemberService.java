package com.example.demo.service.board;

import java.util.ArrayList;

import com.example.demo.mapper.board.BoardMemberMapper;
import com.example.demo.vo.board.BoardMemberVo;
import com.example.demo.vo.board.PageVo;
import com.example.demo.vo.reply.ReplyVo;

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

    public int insertBoardDtl(BoardMemberVo boardMemberVo){
        return mapper.insertBoardDtl(boardMemberVo);
    }

    public ArrayList<ReplyVo> selectReply(ReplyVo replyVo){
        return mapper.selectReply(replyVo);
    }

    public int insertReply(ReplyVo replyVo){
        return mapper.insertReply(replyVo);
    }

    public void deleteReply(ReplyVo replyVo){
        mapper.deleteReply(replyVo);
    }

    public void updateReply(ReplyVo replyVo){
        mapper.updateReply(replyVo);
    }
}