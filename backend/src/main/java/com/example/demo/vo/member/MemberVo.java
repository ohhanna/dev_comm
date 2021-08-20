package com.example.demo.vo.member;

public class MemberVo {
    private String memId;
    private String memPw;
    private String grade;
    private String isDel;

    public String getMemId() {
        return this.memId;
    }

    public void setMemId(String memId) {
        this.memId = memId;
    }

    public String getMemPw() {
        return this.memPw;
    }

    public void setMemPw(String memPw) {
        this.memPw = memPw;
    }

    public String getGrade() {
        return this.grade;
    }

    public void setGrade(String grade) {
        this.grade = grade;
    }

    public String getIsDel() {
        return this.isDel;
    }

    public void setIsDel(String isDel) {
        this.isDel = isDel;
    }

}