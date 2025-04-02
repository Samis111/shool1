package com.shool.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shool.domain.Administrators;
import com.shool.domain.Departments;
import com.shool.domain.Result;
import com.shool.domain.Students;
import com.shool.service.AdministratorsService;
import com.shool.service.DepartmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.List;

@RequestMapping("departments")
@RestController
public class departmentsController {


    @Autowired
    private DepartmentsService administratorsService;


    @GetMapping()
    public Result list(
            @RequestParam("pageIndex")Integer pageIndex,
            @RequestParam("pageSize")Integer pageSize,
            @RequestParam(name = "searchValue",defaultValue = "")String searchValue
    ) {
        IPage<Departments> objectIPage = new Page<>(pageIndex, pageSize);
        QueryWrapper<Departments> departmentsQueryWrapper = new QueryWrapper<>();
        if (!searchValue.equals("")){
            departmentsQueryWrapper.like("department_name",searchValue);
        }

        IPage<Departments> page = administratorsService.page(objectIPage, departmentsQueryWrapper);

        return Result.ok(page);
    }

    @GetMapping("{id}")
    public Result find(@PathVariable("id") Integer id) {

        Departments byId = administratorsService.getById(id);
        return Result.ok(byId);
    }

    @PostMapping("save")
    public Result save(@RequestBody Departments administrators) {
        boolean save = administratorsService.save(administrators);
        return Result.ok("添加成功");
    }

    @PostMapping("update")
    public Result update(@RequestBody Departments administrators, HttpSession session) {
        boolean save = administratorsService.updateById(administrators);
        return Result.ok("修改成功");
    }

    @PostMapping("del/{id}")
    public Result del(@PathVariable("id") Integer id) {
        boolean byId = administratorsService.removeById(id);
        return Result.ok("删除成功");
    }


}
