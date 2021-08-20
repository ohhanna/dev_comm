package com.example.demo.vo.board;

import org.springframework.stereotype.Component;

@Component
public class PageVo {
    private int pageIndex;
    private int startPage;
    private int pageSize;
    private int totCnt;
    
    public int getPageIndex() {
        return pageIndex;
    }
    public int getTotCnt() {
        return totCnt;
    }
    public void setTotCnt(int totCnt) {
        this.totCnt = totCnt;
    }
    public int getPageSize() {
        return pageSize;
    }
    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }
    public int getStartPage() {
        return startPage;
    }
    public void setStartPage(int startPage) {
        this.startPage = startPage;
    }
    public void setPageIndex(int pageIndex) {
        this.pageIndex = pageIndex;
    }

    public void createStartPage(int pageIndex, int pageSize){
        // DEFAULT PAGE SETTING
        if (pageIndex == 0){
            this.pageIndex = 1;
        }else{
            this.pageIndex = pageIndex;
        }
        if (pageSize == 0) {
            this.pageSize = 10;
        }else{
            this.pageSize = pageSize;
        }

        // 1 페이지 의 경우 startpage 0 2페이지의 경우 11 부터 시작
        System.out.println("pageIndex : " + this.pageIndex);
        this.startPage = (this.pageIndex - 1) * this.pageSize + (this.pageIndex == 1 ? 0 : 1);

        System.out.println("START PAGE : " + this.startPage);
    }
}
