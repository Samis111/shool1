package com.shool.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shool.domain.Administrators;
import com.shool.domain.Result;
import com.shool.domain.Students;
import com.shool.service.AdministratorsService;
import com.shool.service.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("user")
@RestController
public class UserController {


    @Autowired
    private StudentsService administratorsService;

    @GetMapping("list")
    public Result list() {
        List<Students> list = administratorsService.list();
        return Result.ok(list);
    }

    @GetMapping()
    public Result list(
            @RequestParam("pageIndex") Integer pageIndex,
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam(name = "searchValue", defaultValue = "") String searchValue
    ) {
        QueryWrapper<Students> studentsQueryWrapper = new QueryWrapper<>();
        if (!searchValue.equals("")) {
            studentsQueryWrapper.like("student_name", searchValue);
        }
        IPage<Students> objectIPage = new Page<>(pageIndex, pageSize);
        IPage<Students> page = administratorsService.page(objectIPage, studentsQueryWrapper);

        return Result.ok(page);
    }

    @GetMapping("{id}")
    public Result find(@PathVariable("id") Integer id) {

        Students byId = administratorsService.getById(id);
        return Result.ok(byId);
    }

    @PostMapping("save")
    public Result save(@RequestBody Students administrators) {
        boolean save = administratorsService.save(administrators);
        return Result.ok("添加成功");
    }

    @PostMapping("update")
    public Result update(@RequestBody Students administrators, HttpSession session) {


        boolean save = administratorsService.updateById(administrators);
        return Result.ok("修改成功");
    }

    @PostMapping("del/{id}")
    public Result del(@PathVariable("id") Integer id) {
        boolean byId = administratorsService.removeById(id);
        return Result.ok("删除成功");
    }

}
