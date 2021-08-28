package com.example.demo.jwtLogin.controller;

import java.util.HashMap;

import com.example.demo.jwtLogin.config.JwtTokenUtil;
import com.example.demo.jwtLogin.model.JwtRequest;
import com.example.demo.jwtLogin.model.JwtResponse;
import com.example.demo.jwtLogin.service.JwtUserDetailsService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "*")
public class JwtAuthenticationController {
    
    // @Autowired
    // private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private JwtUserDetailsService userDetailsService;
    
    final Logger log = LoggerFactory.getLogger(JwtUserDetailsService.class);

    @RequestMapping(value="/authenticate", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtRequest authenticationRequest) throws Exception {
        //authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        System.out.println(userDetails);
        final String token = jwtTokenUtil.generateToken(userDetails);

        HashMap<String, Object> responseMap = new HashMap<String, Object>();

        responseMap.put("token", new JwtResponse(token));
        responseMap.put("auth", userDetails.getAuthorities());
        
        return ResponseEntity.ok(responseMap);
    }


}
