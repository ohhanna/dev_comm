package com.example.demo.service.member;

import java.util.ArrayList;

import com.example.demo.mapper.member.MemberMapper;
import com.example.demo.vo.member.MemberVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired(required=true)
    public MemberMapper mapper;

    public ArrayList<MemberVo> findByUserId(MemberVo memberVo){
        return mapper.selectUserInfo(memberVo);
    }

    public void registerMember(MemberVo memberVo){
        mapper.insertMember(memberVo);
    }
}