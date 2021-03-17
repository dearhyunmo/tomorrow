package com.Tomorrow.myapp.service;

import com.Tomorrow.myapp.dao.MenuDao;
import com.Tomorrow.myapp.model.MenuDto;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.util.List;
import java.util.logging.Logger;

@Service
public class MenuServiceImpl implements MenuService{
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
    public List<MenuDto> getMenuBySale() {
        List<MenuDto> menuDtoList = null;
        try {
            menuDtoList = menuDao.getMenuBySale();
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuDtoList;
    }

    @Override
    public List<MenuDto> getMenuByTodaySale() {
        List<MenuDto> menuDtoList = null;
        try {
            menuDtoList = menuDao.getMenuByTodaySale();
        } catch (Exception e){
            e.printStackTrace();
            throw e;
        }
        return menuDtoList;
    }
}