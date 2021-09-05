package com.example.demo.vo.board;

import org.springframework.stereotype.Component;
import java.util.Date;

@Component
public class BoardMemberVo extends PageVo{

	private String boardNo;
	private int boardNoProperty;
	private String boardTtl;
    private String boardCntn;
    private Date crtDt;
    private Date modDt;
    private String regMemId;
    private String isDel;
	private int totCnt;
	private String searchCondition;
	private String searchCode;

	public String getSearchCode() {
		return this.searchCode;
	}

	public void setSearchCode(String searchCode) {
		this.searchCode = searchCode;
	}

	public String getBoardNo() {
		return this.boardNo;
	}

	public String getSearchCondition() {
		return searchCondition;
	}

	public void setSearchCondition(String searchCondition) {
		this.searchCondition = searchCondition;
	}

	public int getBoardNoProperty() {
		return boardNoProperty;
	}

	public void setBoardNoProperty(int boardNoProperty) {
		this.boardNoProperty = boardNoProperty;
	}

	public int getTotCnt() {
		return totCnt;
	}

	public void setTotCnt(int totCnt) {
		this.totCnt = totCnt;
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