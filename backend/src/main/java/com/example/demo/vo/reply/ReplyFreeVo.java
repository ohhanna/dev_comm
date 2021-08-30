package com.example.demo.vo.reply;

import java.util.Date;

public class ReplyFreeVo {
    private String replyNo;
    private String boardNo;
    private String replyPw;
    private String replyCntn;
    private String upReplyNo;
    private String depth;
    private String isDel;
    private String regMemId;
    private Date crtDt;
    private Date modDt;

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

        public String getReplyPw() {
        return this.replyPw;
    }

    public void setReplyPw(String replyPw) {
        this.replyPw = replyPw;
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


}
