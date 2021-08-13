/* eslint-disable */
import React,{ useEffect, useState } from "react";
import axios from 'axios';

// reactstrap components
import {
  Card,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

function PageControlModule({getPageIndex, pageCnt, pageIndex, pageSize, totCnt}) {
  return (
    <>
      <Card body style={{width:'250px', position:'fixed',top:'250px', right:'60px'}}>
        <nav className="text-center">
          <Pagination>
            <CreatePaginationItem getPageIndex={getPageIndex} pageCnt={pageCnt} pageIndex={pageIndex} pageSize={pageSize} totCnt={totCnt}/>
          </Pagination>
        </nav>
      </Card>
    </>
  );
}


function CreatePaginationItem({getPageIndex, pageCnt, pageIndex, pageSize, totCnt}){
    // 총 세개의 페이지 index button 생성
    const renderButton = () =>{
        const result = [];
        result.push(
            <PaginationLink
                aria-label="Previous"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
            >
                <i aria-hidden={true} className="fa fa-angle-up" />
            </PaginationLink>
        );


        // 현재 페이지에 앞뒤로 -1 + 1 있음.
        // 그리고 현재 페이지가 1페이지이면 -1은 해당안됨
        // 마지막 페이지는 +1 은 해당안됨
        // 즉 1페이지의 경우 1,2,3 
        // 마지막 페이지가 6인 경우 4, 5, 6 이 나와야함
        let pageArr = [];
        let lastPageIndex = (totCnt / pageSize) + 1;
        if (pageIndex == 1){
            pageArr = [1,2,3];
        }
        else if (lastPageIndex == pageIndex){
                // 991 / 10 91
            pageArr = [lastPageIndex-2, lastPageIndex-1, lastPageIndex];
        }
        else{
            pageArr = [pageIndex-1, pageIndex, pageIndex+1];
        }

        for(let i = 0; i < pageArr.length; i++){
            result.push(
                <PaginationLink
                    href="#pablo"
                    onClick={(e) => {sendPageIndex(pageArr[i], 10)}}
                    key={i + "a"}
                >
                    {pageArr[i]}
                </PaginationLink>
            );
        }

        result.push(
            <PaginationLink
              aria-label="Next"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <i aria-hidden={true} className="fa fa-angle-down" />
            </PaginationLink>
        );

        return result;
    }

    const sendPageIndex = (index, size) => {
        getPageIndex(index, size);
    }

    return(
        <>
        <PaginationItem>
            {renderButton()}
        </PaginationItem>
        </>
    );
}

export default PageControlModule;
