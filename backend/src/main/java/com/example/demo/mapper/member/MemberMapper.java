package com.example.demo.mapper.member;

import java.util.ArrayList;

import com.example.demo.vo.member.MemberVo;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface MemberMapper {
    ArrayList<MemberVo> selectUserInfo(MemberVo memberVo);
    void insertMember(MemberVo memberVo);
}