package com.example.demo.mapper.board;

import java.util.List;

import com.example.demo.vo.board.BoardFreeVo;
import com.example.demo.vo.reply.ReplyFreeVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface BoardFreeMapper {

    //게시판 글 총 갯수
    int boardFreeListCount();

    //게시판 리스트 get
    List<BoardFreeVo> boardFreeList(int pageNum, int pageSize, String type, String keyword);

    //게시판 리스트 글 상세보기
    List<BoardFreeVo> boardFreeDetail(int boardNo);

    //게시판 글 추가
    int boardFreeAdd(BoardFreeVo boardFreeVo);
    
    //게시판 글 수정
    int boardFreeModify(BoardFreeVo boardFreeVo);

    /*댓글 시작*/

    //댓글 총 갯수
    int freeReplyCount(int boardNo);

    //댓글 리스트 get
    List<ReplyFreeVo> freeReplyList(int boardNo);

    //댓글 등록
    int freeReplyAdd(ReplyFreeVo replyFreeVo);

    //댓글 수정
    int freeReplyModify(int replyNo, String replyCntn);

    //댓글 삭제
    int freeReplyDelete(int replyNo);
}