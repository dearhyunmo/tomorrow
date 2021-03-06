package com.Tomorrow.myapp.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.UUID;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.Tomorrow.myapp.model.MemberDto;
import com.Tomorrow.myapp.model.NowPayDto;
import com.Tomorrow.myapp.model.PayApprovalDto;
import com.Tomorrow.myapp.model.PayDto;


@Service
public class PayServiceImpl implements PayService{
	private static final String HOST = "https://kapi.kakao.com";
	private static final String APPROVAL_URL ="http://localhost:8080/myapp/pay/PaySuccess";//성공 URL
	private static final String CANCEL_URL ="http://localhost:8080/myapp/pay/kakaoPayCancel";//취소 URL
	private static final String FAIL_URL ="http://localhost:8080/myapp/pay/kakaoPaySuccessFail";//실패 URL
	private static  String partner_order_id ;//주문 고유번호 생성 위해서 or random?

    private PayDto payDto;
    private PayApprovalDto payapprovalDto;
    @Autowired
	private SqlSession sqlSession;
	
    public String kakaoPayReady(String id, List<NowPayDto> nowpay) {
        RestTemplate restTemplate = new RestTemplate();
        partner_order_id = make();
        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + "77776689222371028c2b592fd2b3ca19");
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
        
        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("partner_order_id", partner_order_id);//주문번호
        params.add("partner_user_id", id);//
        String itemname = "";
        String itemcode = "";
        int total = nowpay.get(0).getTotal_amount();
        int tax = 0;
        int point = nowpay.get(0).getPoint();
        for(int i=0;i<nowpay.size();i++) {
        	itemname+=nowpay.get(i).getItem_name()+",";
        	itemcode+=nowpay.get(i).getItem_code()+",";
//        	total += nowpay.get(i).getTotal_mount();
 //       	tax += nowpay.get(i).getTax_free_amount();
        }
        params.add("item_name", itemname);//상품이름 or 서비스이름
        params.add("item_code", itemcode);//상품번호
        params.add("quantity", Integer.toString(nowpay.size()));//총 수량 - > 장바구니 수량
        params.add("total_amount", Integer.toString(total));//총 가격 -> 장바구니 총 가격
        params.add("tax_free_amount", Integer.toString(tax));//세금
        params.add("approval_url", APPROVAL_URL+"/"+id+"/"+Integer.toString(total));
        params.add("cancel_url", CANCEL_URL);
        params.add("fail_url", FAIL_URL);
         HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);
 
        try {
        	payDto = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, PayDto.class);
            
            System.out.println("" + payDto);
            
            return payDto.getNext_redirect_pc_url();
 
        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return "/pay";
        
    }
    public PayApprovalDto kakaoPayInfo(String pg_token,String id,int total) {
    	 
    	System.out.println("KakaoPayInfoVO............................................");
        
        RestTemplate restTemplate = new RestTemplate();
 
        // 서버로 요청할 Header
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "KakaoAK " + "77776689222371028c2b592fd2b3ca19");
        headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
 
        // 서버로 요청할 Body
        MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
        params.add("cid", "TC0ONETIME");
        params.add("tid", payDto.getTid());//결제고유번호
        params.add("partner_order_id", partner_order_id);//주문번호
        params.add("partner_user_id", id);
        params.add("pg_token", pg_token);
        params.add("total_amount", Integer.toString(total));//총가격
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);
        
        try {
        	payapprovalDto = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, PayApprovalDto.class);
           System.out.println("" + payapprovalDto);
           sqlSession.insert("pay.approval",payapprovalDto);
//           String[] splited = payapprovalDto.getItem_code().split(",");
//           for(int cnt = 0; cnt<splited.length;cnt++) {
//        	   Map<String, Object> map = new HashMap<String, Object>();
//           }
//           sqlSession.insert("pay.detail",payapprovalDto);
            return payapprovalDto;
        
        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
        return null;
    }
    public String make() {
		String pattern = "yyMMdd";
		SimpleDateFormat simpleDateFormat =
		        new SimpleDateFormat(pattern, new Locale("ko", "KR"));
		String date = simpleDateFormat.format(new Date());
		System.out.println(date);
		String ordernum = "";
		String s = "";
		if(sqlSession.selectOne("pay.paynum") != null) {
			ordernum=sqlSession.selectOne("pay.paynum");
		String[] splited = ordernum.split("-");
		int num = Integer.parseInt(splited[1]);
		num++;
		s = String.format("%06d", num);
		}
		else s = "0000001";
		System.out.println(s);
		return date+"-"+s;
    }
}
