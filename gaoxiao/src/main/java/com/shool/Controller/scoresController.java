package com.shool.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shool.domain.*;
import com.shool.service.CoursesService;
import com.shool.service.DepartmentsService;
import com.shool.service.ScoresService;
import com.shool.service.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("scores")
public class scoresController {

    @Autowired
    private ScoresService scoresService;

    @Autowired
    private StudentsService studentsService;

    @Autowired
    private CoursesService departmentsService;

    @GetMapping()
    public Result list(
            @RequestParam("pageIndex") Integer pageIndex,
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam(name = "searchValue", defaultValue = "") String searchValue,
            @RequestParam(name = "userid", defaultValue = "") String userid
    ) {
        QueryWrapper<Scores> studentsQueryWrapper = new QueryWrapper<>();
        if (!searchValue.equals("")) {
            studentsQueryWrapper.like("student_name", searchValue);
        }

        if (!userid.equals("")){
            studentsQueryWrapper.eq("student_id",userid);
        }

        IPage<Scores> objectIPage = new Page<>(pageIndex, pageSize);
        IPage<Scores> page = scoresService.page(objectIPage, studentsQueryWrapper);

        List<Courses> departmentsList = departmentsService.list();
        List<Students> studentsList = studentsService.list();

        HashMap<String, Courses> hashMap1 = new HashMap<>();
        for (Courses departments : departmentsList) {
            hashMap1.put(departments.getCourseId() + "", departments);
        }

        HashMap<String, Students> hashMap2 = new HashMap<>();
        for (Students departments : studentsList) {
            hashMap2.put(departments.getStudentId() + "", departments);
        }

        for (Scores scores : page.getRecords()) {
            Courses departments = hashMap1.get(scores.getCourseId() + "");
            scores.setDepartments(departments);
            Students students = hashMap2.get(scores.getStudentId() + "");
            scores.setStudents(students);

        }

        return Result.ok(page);
    }

    @GetMapping("{id}")
    public Result find(@PathVariable("id") Integer id) {

        Scores byId = scoresService.getById(id);
        return Result.ok(byId);
    }

    @PostMapping("save")
    public Result save(@RequestBody Scores administrators) {
        boolean save = scoresService.save(administrators);
        return Result.ok("添加成功");
    }

    @PostMapping("update")
    public Result update(@RequestBody Scores administrators, HttpSession session) {


        boolean save = scoresService.updateById(administrators);
        return Result.ok("修改成功");
    }

    @PostMapping("del/{id}")
    public Result del(@PathVariable("id") Integer id) {
        boolean byId = scoresService.removeById(id);
        return Result.ok("删除成功");
    }
}
