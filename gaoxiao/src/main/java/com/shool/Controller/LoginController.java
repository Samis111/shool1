package com.shool.Controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.shool.domain.Administrators;
import com.shool.domain.Result;
import com.shool.domain.Students;
import com.shool.service.AdministratorsService;
import com.shool.service.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.kafka.KafkaProperties;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Date;
import java.util.List;

@RequestMapping()
@RestController
public class LoginController {

    @Autowired
    private AdministratorsService studentsService;


    @RequestMapping("login")
    public Result login(@RequestBody Administrators user, HttpSession session) {

        String username = null;
        String password = null;

        username = user.getUsername() + "";
        password = user.getPassword();

        QueryWrapper<Administrators> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("username", username).eq("password", password);
        List<Administrators> list = studentsService.list(queryWrapper);
        if (list.size() >= 1) {
            Administrators user1 = list.get(0);
            session.setAttribute("info", user1);

            user1.setToken("fwagwagwagwag3a4wg4wa3g4a4a37gaaawgawg");

            return Result.ok(user1);
        }

        return Result.fail("账号密码不存在");
    }

}
