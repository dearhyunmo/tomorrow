package com.Tomorrow.myapp.controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.lang.ProcessBuilder.Redirect;
import java.math.BigInteger;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.tomcat.util.json.JSONParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.Tomorrow.myapp.dao.MemberDao;
import com.Tomorrow.myapp.dao.MemberDaoImpl;
import com.Tomorrow.myapp.model.MemberDto;
import com.Tomorrow.myapp.service.JwtService;
import com.Tomorrow.myapp.service.MemberService;
import com.Tomorrow.myapp.service.WalletService;
import com.google.common.net.HttpHeaders;
import com.sun.el.parser.ParseException;

import io.swagger.annotations.ApiOperation;


@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://j4a305.p.ssafy.io"})
@RequestMapping("/member")
public class MemberController {

   private final String SUCCESS = "SUCCESS";
   private final String FAIL = "FAIL";
   // service
   private final MemberService memberService;

   private String naver_CLIENT_ID = "9Iq4lB5v8rOAjG6u6MbW"; // ?????????????????? ??????????????? ????????????";
   private String naver_CLI_SECRET = "txH0k0U4_k"; // ?????????????????? ??????????????? ????????????";

   @Autowired
   public MemberController(MemberService memberService) {
      this.memberService = memberService;
   }
   
   @Autowired
   private WalletService walletService;
   @Autowired
   private JwtService jwtService;
   @Autowired
   public JavaMailSender javaMailSender;

   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @GetMapping("/{id}")
   public ResponseEntity<MemberDto> getMemberInfo(@PathVariable(value = "id") String memberid, HttpServletRequest req)
         throws SQLException {
      System.out.println(memberid);
      System.out.println(req);
      MemberDto membertmp = memberService.getMemberInfo(memberid);
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member done");
      System.out.println("????????????");
      return new ResponseEntity<MemberDto>(membertmp, status);
   }
   @ApiOperation(value = "isseller", notes = "isseller", response = Map.class)
   @GetMapping("/isseller/{id}")
   public ResponseEntity<String> getMemberSeller(@PathVariable(value = "id") String memberid, HttpServletRequest req)
         throws SQLException {
      System.out.println(memberid);
      System.out.println(req);
      MemberDto membertmp = memberService.getMemberInfo(memberid);
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member done");
      System.out.println("????????????2");
      if(membertmp.getSeller() == 1) {
         return new ResponseEntity<String>(SUCCESS, status);
      }
      else {
         return new ResponseEntity<String>(FAIL, status);
      }
   }

   // ?????????
   @ApiOperation(value = "?????????", notes = "?????????", response = Map.class)
   @PostMapping("/login")
   public ResponseEntity<Map<String, String>> loginMember(@RequestBody MemberDto memberbody, HttpServletRequest req)
         throws SQLException, NoSuchAlgorithmException {
      System.out.println(req);
      String conclusion = "";
      Map<String, String> conclusionmap = new HashMap<String, String>();
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("post to /member/login done");
      System.out.println("?????????");
      System.out.println(memberbody);
      memberbody.setPw(sha256(memberbody.getPw()));
      if (memberService.login(memberbody)) {
         conclusion = SUCCESS;
         MemberDto tmpmember = memberService.getMemberInfo(memberbody.getId());
         String token = jwtService.create("member", tmpmember, "id");
         conclusionmap.put("message", SUCCESS);
         conclusionmap.put("name", tmpmember.getName());
         if(tmpmember.getSeller() == 1) {
            conclusionmap.put("isseller", "seller");
         }
         else {
            conclusionmap.put("isseller", "buyer");
         }
         conclusionmap.put("token", token);
      } else {
         conclusionmap.put("message", FAIL);
      }
      return new ResponseEntity<Map<String, String>>(conclusionmap, status);
   }
   
   // jwt token??????
   @ApiOperation(value = "?????????", notes = "?????????", response = Map.class)
   @GetMapping("/jwttoken")
   public ResponseEntity<Map<String, String>> checkJwt(@RequestParam("jwt") String jwttoken, HttpServletRequest req)
         throws SQLException, NoSuchAlgorithmException {
      System.out.println(req);
      String conclusion = "";
      Map<String, String> conclusionmap = new HashMap<String, String>();
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/jwttoken done");
      System.out.println("jwt??????");
      if (jwtService.isUsable(jwttoken)) {
         LinkedHashMap linkhashmap = (LinkedHashMap) jwtService.get("member", jwttoken);
         System.out.println(linkhashmap);
         conclusionmap.put("message", SUCCESS);
         conclusionmap.put("id", (String) linkhashmap.get("id"));
         conclusionmap.put("nickname", (String) linkhashmap.get("nickname"));
         conclusionmap.put("name", (String) linkhashmap.get("name"));
         if((int)linkhashmap.get("seller") == 1) {
            conclusionmap.put("isseller", "seller");
         }
         else {
            conclusionmap.put("isseller", "buyer");
         }
      } else {
         conclusionmap.put("message", FAIL);
      }
      return new ResponseEntity<Map<String, String>>(conclusionmap, status);
   }
   
   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @PostMapping("/same")
   public ResponseEntity<String> sameMember(@RequestBody Map<String, String> memberbody, HttpServletRequest req)
         throws SQLException {
      System.out.println(req);
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/same done");
      System.out.println("????????????");
      if (memberService.sameId(memberbody.get("id"))) {
         conclusion = SUCCESS;
      } else {
         conclusion = FAIL;
      }
      return new ResponseEntity<String>(conclusion, status);
   }
   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @PostMapping("/samecert")
   public ResponseEntity<String> sameCert(@RequestBody Map<String, String> memberbody, HttpServletRequest req)
         throws SQLException {
      System.out.println(req);
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/samecert done");
      System.out.println("????????????");
      if (memberService.sameCert(memberbody.get("cert"))) {
         conclusion = SUCCESS;
      } else {
         conclusion = FAIL;
      }
      return new ResponseEntity<String>(conclusion, status);
   }
   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @PostMapping("/samenick")
   public ResponseEntity<String> sameNick(@RequestBody Map<String, String> memberbody, HttpServletRequest req)
         throws SQLException {
      System.out.println(req);
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/samenick done");
      System.out.println("????????????");
      System.out.println(memberbody.get("nickname"));
      if (memberService.sameNick(memberbody.get("nickname"))) {
         conclusion = SUCCESS;
      } else {
         conclusion = FAIL;
      }
      return new ResponseEntity<String>(conclusion, status);
   }
   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @PostMapping("/sameemail")
   public ResponseEntity<String> sameEmail(@RequestBody Map<String, String> memberbody, HttpServletRequest req)
         throws SQLException {
      System.out.println(req);
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/sameemail done");
      System.out.println("????????????");
      if (memberService.sameEmail(memberbody.get("email"))) {
         conclusion = SUCCESS;
      } else {
         conclusion = FAIL;
      }
      return new ResponseEntity<String>(conclusion, status);
   }

   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @PostMapping("/logout")
   public ResponseEntity<Map<String, Object>> logoutMember(HttpServletRequest req) {
      System.out.println(req);
      Map<String, Object> resultMap = new HashMap<>();
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("post to /member/logout done");
      System.out.println("????????????");
      return new ResponseEntity<Map<String, Object>>(resultMap, status);
   }

   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @PostMapping("join")
   public ResponseEntity<String> joinMember(@RequestBody MemberDto memberbody, HttpServletRequest req) throws NoSuchAlgorithmException {
      System.out.println(req);
      Map<String, Object> resultMap = new HashMap<>();
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("post to /member done");
      System.out.println("????????????");
      memberbody.setPw(sha256(memberbody.getPw()));
      if (memberService.join(memberbody)) {
         if(walletService.join(memberbody.getId())) {
            conclusion = SUCCESS;
         }
      } else {
         conclusion = FAIL;
      }
      return new ResponseEntity<String>(conclusion, status);
   }

   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @DeleteMapping("/{id}")
   public ResponseEntity<Map<String, Object>> deleteMember(@PathVariable(value = "id") String memberid,
         HttpServletRequest req) {
      System.out.println(req);
      Map<String, Object> resultMap = new HashMap<>();
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("delete to /member done");
      System.out.println("????????????");
      memberService.delete(memberid);
      return new ResponseEntity<Map<String, Object>>(resultMap, status);
   }

   // ????????????
   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @PutMapping("")
   public ResponseEntity<String> updateMember(@RequestBody MemberDto memberbody, HttpServletRequest req) throws NoSuchAlgorithmException {
      System.out.println(req);
      String conclusion = SUCCESS;
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("put to /member done");
      System.out.println("????????????");
      memberbody.setPw(sha256(memberbody.getPw()));
      memberService.update(memberbody);
      return new ResponseEntity<String>(conclusion, status);
   }

//   @ApiOperation(value = "???????????????", notes = "???????????????", response = Map.class)
//   @PostMapping("/email")
//   public ResponseEntity<String> email(@RequestBody Map<String, String> memberbody, HttpServletRequest req)
//         throws SQLException {
//      System.out.println(req);
//      HttpStatus status = HttpStatus.ACCEPTED;
//      System.out.println("post to /member/email done");
//      System.out.println("????????? ??????");
//      String token = "";
//      System.out.println(memberbody);
//      System.out.println(memberbody.containsKey("samecheck"));
//      System.out.println(memberService.sameEmail(memberbody.get("email")));
//      if (memberbody.containsKey("samecheck") && !memberService.sameEmail(memberbody.get("email"))) {
//         token = FAIL;
//      } else {
//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setTo(memberbody.get("email"));
//         message.setFrom("Leeting@naver.com");
//         message.setSubject("????????????????????????");
//         StringBuilder sb = new StringBuilder();
//         String tmp = getTempAuth();
//         sb.append("??????????????? ");
//         sb.append(tmp);
//         sb.append(" ?????????");
//         message.setText(tmp);
//         javaMailSender.send(message);
//         token = jwtService.create("email", tmp, "email");
//      }
//      return new ResponseEntity<String>(token, status);
//   }

   @ApiOperation(value = "????????????", notes = "????????????", response = Map.class)
   @PostMapping("/auth")
   public ResponseEntity<String> authToken(@RequestBody Map<String, String> memberbody, HttpServletRequest req)
         throws SQLException {
      System.out.println(req);
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/auth done");
      System.out.println("????????????");
      if (jwtService.get("email", memberbody.get("token")).equals(memberbody.get("auth"))) {
         conclusion = SUCCESS;
      } else {
         conclusion = FAIL;
      }
      return new ResponseEntity<String>(conclusion, status);
   }

   @ApiOperation(value = "???????????????", notes = "???????????????", response = Map.class)
   @GetMapping("/findid")
   public ResponseEntity<String> findid(@RequestParam("name") String membername,
         @RequestParam("email") String memberemail, HttpServletRequest req) throws SQLException {
      System.out.println(req);
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/findid done");
      System.out.println("???????????????");
      MemberDto memberbody = new MemberDto();
      memberbody.setName(membername);
      memberbody.setEmail(memberemail);
      System.out.println(memberbody);
      conclusion = memberService.findid(memberbody);
      System.out.println(conclusion);
      if (conclusion == null) {
         conclusion = FAIL;
      }
      return new ResponseEntity<String>(conclusion, status);
   }

   @ApiOperation(value = "??????????????????", notes = "??????????????????", response = Map.class)
   @GetMapping("/findpw")
   public ResponseEntity<String> findpw(@RequestParam("name") String membername,
         @RequestParam("email") String memberemail, @RequestParam("id") String memberid, HttpServletRequest req)
         throws SQLException {
      System.out.println(req);
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/findpw done");
      System.out.println("??????????????????");
      MemberDto memberbody = new MemberDto();
      memberbody.setName(membername);
      memberbody.setEmail(memberemail);
      memberbody.setId(memberid);
      conclusion = memberService.findpw(memberbody);
      if (conclusion == null) {
         conclusion = FAIL;
      }
      else {
         conclusion = SUCCESS;
      }
      return new ResponseEntity<String>(conclusion, status);
   }
   @ApiOperation(value = "??????????????????", notes = "??????????????????", response = Map.class)
   @PutMapping("/findpw")
   public ResponseEntity<String> changepw(@RequestBody MemberDto memberbody, HttpServletRequest req)
         throws SQLException, NoSuchAlgorithmException {
      System.out.println(req);
      String conclusion = "";
      HttpStatus status = HttpStatus.ACCEPTED;
      System.out.println("get to /member/changepw done");
      System.out.println("??????????????????");
      MemberDto newmemberbody = memberService.getMemberInfo(memberbody.getId());
      newmemberbody.setPw(sha256(memberbody.getPw()));
      memberService.update(newmemberbody);
      conclusion = SUCCESS;
      return new ResponseEntity<String>(conclusion, status);
   }

   public String getTempAuth() {
      char[] charSet = new char[] { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F',
            'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z' };

      String str = "";

      int idx = 0;
      for (int i = 0; i < 10; i++) {
         idx = (int) (charSet.length * Math.random());
         str += charSet[idx];
      }
      return str;
   }

   private String requestToServer(String apiURL, String headerStr) throws IOException {
      URL url = new URL(apiURL);
      HttpURLConnection con = (HttpURLConnection) url.openConnection();
      con.setRequestMethod("GET");
      if (headerStr != null && !headerStr.equals("")) {
         con.setRequestProperty("Authorization", headerStr);
      }
      int responseCode = con.getResponseCode();
      BufferedReader br;
      if (responseCode == 200) { // ?????? ??????
         br = new BufferedReader(new InputStreamReader(con.getInputStream()));
      } else { // ?????? ??????
         br = new BufferedReader(new InputStreamReader(con.getErrorStream()));
      }
      String inputLine;
      StringBuffer res = new StringBuffer();
      while ((inputLine = br.readLine()) != null) {
         res.append(inputLine);
      }
      br.close();
      if (responseCode == 200) {
         return res.toString();
      } else {
         return null;
      }
   }

   private String requestToServer(String apiURL) throws IOException {
      return requestToServer(apiURL, "");
   }
   //sha256 ??????
   public static String sha256(String msg) throws NoSuchAlgorithmException  {

       MessageDigest md = MessageDigest.getInstance("SHA-256");
       md.update(msg.getBytes());
       StringBuilder sb = new StringBuilder();
       for(final byte b: md.digest())
           sb.append(String.format("%02x ", b&0xff));
       return sb.toString();
   }

}
