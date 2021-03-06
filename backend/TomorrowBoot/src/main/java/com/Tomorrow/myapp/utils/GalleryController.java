package com.Tomorrow.myapp.utils;

import com.Tomorrow.myapp.utils.GalleryService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import io.swagger.annotations.ApiOperation;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.sql.SQLException;

@RestController
@CrossOrigin(origins = {"http://localhost:3000", "https://j4a305.p.ssafy.io"})
@RequestMapping("/gallery")
public class GalleryController {
    private final GalleryService galleryService;

    public GalleryController(GalleryService galleryService) {
        this.galleryService = galleryService;
    }

    @ApiOperation(value = "데이터 등록", notes = "데이터 등록")
    @RequestMapping(value=("/upload"), headers = ("content-type=multipart/form-data"), method=RequestMethod.POST)
    public String uploadGallery(@RequestParam("data") MultipartFile multipartFile,
                                @RequestParam("hostid") String id,
                                @RequestParam("dirNum") int dirNum) throws IOException, SQLException {

        // 현재 dirName: "static", 이후 페이지별 디렉토리 추가 가능
        String dirName = "static";
        if(dirNum == 0){
            dirName = "menu";
        }else if(dirNum == 1){
            dirName = "member";
        }else if(dirNum == 2) {
            dirName = "notice";
        }else if(dirNum == 3) {
            dirName = "review";
        }
        return galleryService.upload(dirName, id, multipartFile);
    }
}
