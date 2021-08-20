package com.example.demo.controller.member;

import com.example.demo.service.member.MemberService;
import com.example.demo.vo.member.MemberVo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MemberController {
    
    @Autowired
    MemberService memberService;

    @RequestMapping("/member/register")
    @ResponseBody
    public void registerMember(MemberVo memberVo) {
        
        System.out.println("member register controller");

        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        memberVo.setMemPw(bCryptPasswordEncoder.encode(memberVo.getMemPw())); 

        memberService.registerMember(memberVo);
    }
}