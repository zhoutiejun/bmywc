package com.calculator.customer.controller;

import com.calculator.customer.entity.RecordVO;
import com.calculator.customer.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * @author : zhoutiejun@youngyedu.com, 2020/5/25 0025 上午 11:04
 * @description :
 * @modified : zhoutiejun@youngyedu.com, 2020/5/25 0025 上午 11:04
 */
@RestController
public class RecordController {

    @Autowired
    private RecordService recordService;

    @PostMapping("/record/upload")
    public void uploadRecord(RecordVO recordVO){
        recordService.uploadRecord(recordVO);
    }

    @GetMapping("/record/list")
    public List<RecordVO> uploadRecord(){
        return recordService.listRecord();
    }
}
