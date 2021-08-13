package com.example.demo.vo.board;

import java.util.Date;

import org.springframework.stereotype.Component;

@Component
public class BoardFreeVo {
	private String boardNo;
	private String boardTtl;
    private String boardCntn;
    private Date crtDt;
    private Date modDt;
    private String regMemId;
    private String isDel;

	public String getBoardNo() {
		return this.boardNo;
	}

	public void setBoardNo(String boardNo) {
		this.boardNo = boardNo;
	}

	public String getBoardTtl() {
		return this.boardTtl;
	}

	public void setBoardTtl(String boardTtl) {
		this.boardTtl = boardTtl;
	}

	public String getBoardCntn() {
		return this.boardCntn;
	}

	public void setBoardCntn(String boardCntn) {
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