package com.shool.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shool.domain.Courses;
import com.shool.domain.Departments;
import com.shool.domain.Result;
import com.shool.service.CoursesService;
import com.shool.service.DepartmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RequestMapping("course")
@RestController
public class courseController {


    @Autowired
    private CoursesService coursesService;


    @GetMapping()
    public Result list(
            @RequestParam("pageIndex")Integer pageIndex,
            @RequestParam("pageSize")Integer pageSize,
            @RequestParam(name = "searchValue",defaultValue = "")String searchValue
    ) {
        IPage<Courses> objectIPage = new Page<>(pageIndex, pageSize);
        QueryWrapper<Courses> departmentsQueryWrapper = new QueryWrapper<>();
        if (!searchValue.equals("")){
            departmentsQueryWrapper.like("department_name",searchValue);
        }

        IPage<Courses> page = coursesService.page(objectIPage, departmentsQueryWrapper);

        return Result.ok(page);
    }

    @GetMapping("{id}")
    public Result find(@PathVariable("id") Integer id) {

        Courses byId = coursesService.getById(id);
        return Result.ok(byId);
    }

    @PostMapping("save")
    public Result save(@RequestBody Courses administrators) {
        boolean save = coursesService.save(administrators);
        return Result.ok("添加成功");
    }

    @PostMapping("update")
    public Result update(@RequestBody Courses administrators, HttpSession session) {
        boolean save = coursesService.updateById(administrators);
        return Result.ok("修改成功");
    }

    @PostMapping("del/{id}")
    public Result del(@PathVariable("id") Integer id) {
        boolean byId = coursesService.removeById(id);
        return Result.ok("删除成功");
    }

}
