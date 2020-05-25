package com.calculator.customer.service;

import com.calculator.customer.entity.RecordVO;

import java.util.List;

/**
 * @author : zhoutiejun@youngyedu.com, 2020/5/25 0025 上午 11:03
 * @description :
 * @modified : zhoutiejun@youngyedu.com, 2020/5/25 0025 上午 11:03
 */
public interface RecordService {
    void uploadRecord(RecordVO recordVO);

    List<RecordVO> listRecord();
}
