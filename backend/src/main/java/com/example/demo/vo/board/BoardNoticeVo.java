package com.example.demo.vo.board;

import java.sql.Blob;
import java.util.Date;

public class BoardNoticeVo {

    int boardNo;
    String boardTtl;
    Blob boardCntn;
    Date crtDt;
    Date modDt;
    String regMemId;
    String isDel;

    public int getBoardNo() {
        return this.boardNo;
    }

    public void setBoardNo(int boardNo) {
        this.boardNo = boardNo;
    }

    public String getBoardTtl() {
        return this.boardTtl;
    }

    public void setBoardTtl(String boardTtl) {
        this.boardTtl = boardTtl;
    }

    public Blob getBoardCntn() {
        return this.boardCntn;
    }

    public void setBoardCntn(Blob boardCntn) {
        this.boardCntn = boardCntn;
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

    public String getRegMemId() {
        return this.regMemId;
    }

    public void setRegMemId(String regMemId) {
        this.regMemId = regMemId;
    }

    public String getIsDel() {
        return this.isDel;
    }

    public void setIsDel(String isDel) {
        this.isDel = isDel;
    }

}