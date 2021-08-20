package com.example.demo.jwtLogin.service;

import java.util.ArrayList;

import com.example.demo.service.member.MemberService;
import com.example.demo.vo.member.MemberVo;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    MemberService memberService;

    final Logger log = LoggerFactory.getLogger(JwtUserDetailsService.class);

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        log.info("사용자 인증 execute ");

        // parameter 로 넘어온 username 값으로 DB에 있는 유저 정보 및 권한 조회
        MemberVo memberVo = new MemberVo();
        memberVo.setMemId(username);

        // DB에서 회원의 권한 정보 조회
        ArrayList<MemberVo> memberInfo = memberService.findByUserId(memberVo);
        memberVo = memberInfo.get(0);

        
        log.info("사용자 비밀번호 암호화 start");
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
        String encodePw = bCryptPasswordEncoder.encode(memberVo.getMemPw());

        if(username.equals(memberVo.getMemId())){
            
            log.info("User Create > " + memberVo.getMemId());
            return new User(username, encodePw, new ArrayList<>());
        }
        else{
            throw new UsernameNotFoundException("User not found with username" + username);
        }
    }

    // OVERLOAD
    public UserDetails loadUserByUsername(String username, String password) throws UsernameNotFoundException {
        log.info("사용자 인증 execute ");

        // parameter 로 넘어온 username 값으로 DB에 있는 유저 정보 및 권한 조회
        MemberVo memberVo = new MemberVo();
        memberVo.setMemId(username);

        // DB에서 회원의 권한 정보 조회
        ArrayList<MemberVo> memberInfo = memberService.findByUserId(memberVo);
        if(memberInfo.size() > 0){
            memberVo = memberInfo.get(0);

            log.info("사용자 비밀번호 암호화");
    
            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
            log.info("사용자 비밀번호 매칭여부 조회");
            if(bCryptPasswordEncoder.matches(password, memberVo.getMemPw())){
                log.info("사용자 비밀번호 매칭 성공");
                log.info("User Create > user id is " + memberVo.getMemId());
                return new User(username, memberVo.getMemPw(), new ArrayList<>());
            }else{
                log.info("사용자 비밀번호 매칭 실패 로그인 에러");
                throw new UsernameNotFoundException("Invalid User Password > user id is " + username);
            }
        }
        else{
            throw new UsernameNotFoundException("User not found with username > user id is " + username);
        }
    }
    
}
