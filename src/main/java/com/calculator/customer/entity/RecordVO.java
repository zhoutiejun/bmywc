package com.calculator.customer.entity;

import lombok.Data;

/**
 * @author : zhoutiejun@youngyedu.com, 2020/5/25 0025 上午 11:05
 * @description :
 * @modified : zhoutiejun@youngyedu.com, 2020/5/25 0025 上午 11:05
 */
@Data
public class RecordVO {

    private Integer id;
    /** 用户名*/
    private String username;

    /** 用户提交记录*/
    private String content;

    /** 提交时间*/
    private String createTime;

    /** 用时*/
    private double userTime;
}
