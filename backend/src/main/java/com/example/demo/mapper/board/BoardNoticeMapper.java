package com.example.demo.mapper.board;

import java.util.List;

import com.example.demo.vo.board.BoardNoticeVo;
import com.example.demo.vo.reply.ReplyVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BoardNoticeMapper {

    // LIST
    int boardNoticeListCount();
    List<BoardNoticeVo> boardNoticeList(int pageNum, int pageSize);

    // VIEW
    BoardNoticeVo selectOne(int boardNo);

    // WRITE
    int boardNoticeWrite(BoardNoticeVo boardNoticeVo);

    // EDIT
    int boardNoticeEdit(BoardNoticeVo boardNoticeVo);

    // DELETE
    int delOne(int boardNo);

    // REPLY - COUNT
    int noticeReplyCnt(int boardNo);

    // REPLY - LIST
    List<ReplyVo> noticeReplyList(int boardNo);

    // REPLY - WRITE

    // REPLY - EDIT

    // REPLY - DELETE
    int noticeReplyDel(int replyNo);
}