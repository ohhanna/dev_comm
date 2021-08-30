package com.example.demo.mapper.board;

import java.util.ArrayList;

import com.example.demo.vo.board.BoardMemberVo;
import com.example.demo.vo.board.PageVo;
import com.example.demo.vo.reply.ReplyVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BoardMemberMapper {
    ArrayList<BoardMemberVo> selectBoardList(PageVo pageVo);
    BoardMemberVo selectBoardDtl(BoardMemberVo boardMemberVo);
    int insertBoardDtl(BoardMemberVo boardMemberVo);
    ArrayList<ReplyVo> selectReply(ReplyVo replyVo);
    int insertReply(ReplyVo replyVo);
}