package com.example.demo.vo.reply;

import java.util.Date;

import com.example.demo.vo.member.MemberVo;

public class ReplyVo extends MemberVo{
    private String replyNo;
    private String boardNo;
    private String replyCntn;
    private String upReplyNo;
    private String depth;
    private String isDel;
    private String regMemId;
    private Date crtDt;
    private Date modDt;
    private int replyCnt;
    private int depthLevel;

    public int getDepthLevel() {
        return this.depthLevel;
    }

    public void setDepthLevel(int depthLevel) {
        this.depthLevel = depthLevel;
    }

    public String getReplyNo() {
        return this.replyNo;
    }

    public void setReplyNo(String replyNo) {
        this.replyNo = replyNo;
    }

    public String getBoardNo() {
        return this.boardNo;
    }

    public void setBoardNo(String boardNo) {
        this.boardNo = boardNo;
    }

    public String getReplyCntn() {
        return this.replyCntn;
    }

    public void setReplyCntn(String replyCntn) {
        this.replyCntn = replyCntn;
    }

    public String getUpReplyNo() {
        return this.upReplyNo;
    }

    public void setUpReplyNo(String upReplyNo) {
        this.upReplyNo = upReplyNo;
    }

    public String getDepth() {
        return this.depth;
    }

    public void setDepth(String depth) {
        this.depth = depth;
    }

    public String getIsDel() {
        return this.isDel;
    }

    public void setIsDel(String isDel) {
        this.isDel = isDel;
    }

    public String getRegMemId() {
        return this.regMemId;
    }

    public void setRegMemId(String regMemId) {
        this.regMemId = regMemId;
    }

    public Date getCrtDt() {
        return this.crtDt;
    }

    public void setCrtDt(Date crtDt) {
        this.crtDt = crtDt;
    }

    public Date getModDt() {
        return this.modDt;
    }

    public void setModDt(Date modDt) {
        this.modDt = modDt;
    }

    public int getReplyCnt() {
        return this.replyCnt;
    }

    public void setReplyCnt(int replyCnt) {
        this.replyCnt = replyCnt;
    }

}
