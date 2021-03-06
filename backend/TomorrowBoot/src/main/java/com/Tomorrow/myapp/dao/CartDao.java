package com.Tomorrow.myapp.dao;

import java.util.List;
import java.util.Map;

import com.Tomorrow.myapp.model.CartDto;

public interface CartDao {
	List<CartDto> getCart(String memberId);
	void insertCart(CartDto cart);
	void deleteCart(int id);
	void updateCart(CartDto cartDto);
	CartDto getOne(CartDto cartDto);
	void updatePlus(Map<String, Object> map);
	void updateMinus(Map<String, Object> map);
}
