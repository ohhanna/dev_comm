package com.example.demo.vo.board;

import java.sql.Blob;
import java.util.Date;

public class BoardNoticeVo {

    int board_no;
    String board_ttl;
    Blob board_cntn;
    Date crt_dt;
    Date mod_dt;
    String reg_mem_id;
    String is_del;

    public int getBoard_no() {
        return this.board_no;
    }

    public void setBoard_no(int board_no) {
        this.board_no = board_no;
    }

    public String getBoard_ttl() {
        return this.board_ttl;
    }

    public void setBoard_ttl(String board_ttl) {
        this.board_ttl = board_ttl;
    }

    public Blob getBoard_cntn() {
        return this.board_cntn;
    }

    public void setBoard_cntn(Blob board_cntn) {
        this.board_cntn = board_cntn;
    }

    public Date getCrt_dt() {
        return this.crt_dt;
    }

    public void setCrt_dt(Date crt_dt) {
        this.crt_dt = crt_dt;
    }

    public Date getMod_dt() {
        return this.mod_dt;
    }

    public void setMod_dt(Date mod_dt) {
        this.mod_dt = mod_dt;
    }

    public String getReg_mem_id() {
        return this.reg_mem_id;
    }

    public void setReg_mem_id(String reg_mem_id) {
        this.reg_mem_id = reg_mem_id;
    }

    public String getIs_del() {
        return this.is_del;
    }

    public void setIs_del(String is_del) {
        this.is_del = is_del;
    }

    // int boardNo;
    // String boardTtl;
    // Blob boardCntn;
    // Date crtDt;
    // Date modDt;
    // String regMemId;
    // String isDel;

    // public int getBoardNo() {
    //     return this.boardNo;
    // }

    // public void setBoardNo(int boardNo) {
    //     this.boardNo = boardNo;
    // }

    // public String getBoardTtl() {
    //     return this.boardTtl;
    // }

    // public void setBoardTtl(String boardTtl) {
    //     this.boardTtl = boardTtl;
    // }

    // public Blob getBoardCntn() {
    //     return this.boardCntn;
    // }

    // public void setBoardCntn(Blob boardCntn) {
    //     this.boardCntn = boardCntn;
    // }

    // public Date getCrtDt() {
    //     return this.crtDt;
    // }

    // public void setCrtDt(Date crtDt) {
    //     this.crtDt = crtDt;
    // }

    // public Date getModDt() {
    //     return this.modDt;
    // }

    // public void setModDt(Date modDt) {
    //     this.modDt = modDt;
    // }

    // public String getRegMemId() {
    //     return this.regMemId;
    // }

    // public void setRegMemId(String regMemId) {
    //     this.regMemId = regMemId;
    // }

    // public String getIsDel() {
    //     return this.isDel;
    // }

    // public void setIsDel(String isDel) {
    //     this.isDel = isDel;
    // }



}