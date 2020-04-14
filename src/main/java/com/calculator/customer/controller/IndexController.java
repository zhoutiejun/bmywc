package com.calculator.customer.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 * @author : zhoutiejun@youngyedu.com, 2020/4/14 0014 上午 7:55
 * @description :
 * @modified : zhoutiejun@youngyedu.com, 2020/4/14 0014 上午 7:55
 */
@Controller
public class IndexController {

    @RequestMapping("/index")
    public ModelAndView index(){
        return new ModelAndView("index");
    }
}
