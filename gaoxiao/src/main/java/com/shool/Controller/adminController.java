package com.shool.Controller;

import com.shool.domain.Administrators;
import com.shool.domain.Result;
import com.shool.service.AdministratorsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("admin")
@RestController
public class adminController {


    @Autowired
    private AdministratorsService administratorsService;


    @GetMapping()
    public Result list() {
        List<Administrators> list = administratorsService.list();
        return Result.ok(list);
    }

    @GetMapping("{id}")
    public Result find(@PathVariable("id") Integer id) {

        Administrators byId = administratorsService.getById(id);
        return Result.ok(byId);
    }

    @PostMapping("save")
    public Result save(@RequestBody Administrators administrators) {
        boolean save = administratorsService.save(administrators);
        return Result.ok("添加成功");
    }

    @PostMapping("update")
    public Result update(@RequestBody Administrators administrators, HttpSession session) {
        boolean save = administratorsService.updateById(administrators);
        return Result.ok("修改成功");
    }

    @PostMapping("del/{id}")
    public Result del(@PathVariable("id") Integer id) {
        boolean byId = administratorsService.removeById(id);
        return Result.ok("删除成功");
    }
}
