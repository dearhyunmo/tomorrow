package com.Tomorrow.myapp.service;

import com.Tomorrow.myapp.dao.MenuDao;
import com.Tomorrow.myapp.model.MenuDto;
import com.Tomorrow.myapp.model.ReviewDto;
import com.Tomorrow.myapp.utils.UtilsClass;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.logging.Logger;

@Service
public class MenuServiceImpl implements MenuService{
    private UtilsClass utils;
    private final MenuDao menuDao;
    public MenuServiceImpl(MenuDao menuDao) {
        this.menuDao = menuDao;
    }

    @Override
    public List<MenuDto> getMenu() {
        List<MenuDto> menuDtoList = null;
        try {
            menuDtoList = menuDao.getMenu();
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuDtoList;
    }

    @Override
    public List<MenuDto> getMenuByLowPrice() {
        List<MenuDto> menuDtoList = null;
        try {
            menuDtoList = menuDao.getMenuByLowPrice();
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuDtoList;
    }

    @Override
    public List<MenuDto> getMenuByHighPrice() {
        List<MenuDto> menuDtoList = null;
        try {
            menuDtoList = menuDao.getMenuByHighPrice();
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuDtoList;
    }

    @Override
    public List<MenuDto> getMenuByBest() {
        List<MenuDto> menuDtoList = null;
        try {
            menuDtoList = menuDao.getMenuByBest();
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuDtoList;
    }

    @Override
    public List<MenuDto> getMenuByNew() {
        List<MenuDto> menuDtoList = null;
        try {
            menuDtoList = menuDao.getMenuByNew();
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuDtoList;
    }

    @Override
    public List<HashMap<String, Object>> getMenuBySale() {
        List<HashMap<String, Object>> menuList = null;
        try {
            List<MenuDto> menuDtoList = menuDao.getMenuBySale();
            for(MenuDto menuDto : menuDtoList) {
                HashMap<String, Object> hashMap = new HashMap<>();
                hashMap.put("menu", menuDto);
                hashMap.put("sale_price", utils.getSalePrice(menuDto.getPrice(), menuDto.getDiscount_rate()));
                menuList.add(hashMap);
            }
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuList;
    }

    @Override
    public List<HashMap<String, Object>> getMenuByTodaySale() {
        List<HashMap<String, Object>> menuList = null;
        try {
            List<MenuDto> menuDtoList = menuDao.getMenuBySale();
            for(MenuDto menuDto : menuDtoList) {
                HashMap<String, Object> hashMap = new HashMap<>();
                hashMap.put("menu", menuDto);
                hashMap.put("sale_price", utils.getSalePrice(menuDto.getPrice(), menuDto.getTodaysale()));
                menuList.add(hashMap);
            }
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuList;
    }
	@Override
	public void menuUpdate(MenuDto menu) {
		 try {
			 menuDao.update(menu);
	        } catch (Exception e){
	            e.printStackTrace();
	            throw e;
	        }
		
	}

	@Override
	public MenuDto getMenuInfo(int id) {
		MenuDto menu = null;
        try {
        	menu = menuDao.getMenuInfo(id);
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menu;
	}

	@Override
	public List<MenuDto> searchAll(String keyword) {
		return menuDao.searchall(keyword);
	}

	@Override
	public List<MenuDto> searchByName(String keyword) {
		return menuDao.searchbyname(keyword);
	}

	@Override
	public List<MenuDto> searchById(String keyword) {
		 return menuDao.searchbyid(keyword);
	}

	@Override
	public List<ReviewDto> getReview(int id) {
		return menuDao.getReview(id);
	}

	@Override
	public boolean postReview(ReviewDto reviewDto) {
		return menuDao.postReview(reviewDto);
	}

	@Override
	public boolean updateReview(ReviewDto reviewDto) {
		return menuDao.updateReview(reviewDto);
	}

	@Override
	public boolean deleteReview(int id) {
		 return menuDao.deleteReview(id);
	}
}