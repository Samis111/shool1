package com.shool.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shool.domain.Departments;
import com.shool.domain.Result;
import com.shool.domain.Scores;
import com.shool.domain.Students;
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
    private DepartmentsService departmentsService;

    @GetMapping()
    public Result list(
            @RequestParam("pageIndex") Integer pageIndex,
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam(name = "searchValue", defaultValue = "") String searchValue
    ) {
        QueryWrapper<Scores> studentsQueryWrapper = new QueryWrapper<>();
        if (!searchValue.equals("")) {
            studentsQueryWrapper.like("student_name", searchValue);
        }
        IPage<Scores> objectIPage = new Page<>(pageIndex, pageSize);
        IPage<Scores> page = scoresService.page(objectIPage, studentsQueryWrapper);


        List<Departments> departmentsList = departmentsService.list();
        List<Students> studentsList = studentsService.list();

        HashMap<String, Departments> hashMap1 = new HashMap<>();
        for (Departments departments : departmentsList) {
            hashMap1.put(departments.getDepartmentId() + "", departments);
        }

        HashMap<String, Students> hashMap2 = new HashMap<>();
        for (Students departments : studentsList) {
            hashMap2.put(departments.getStudentId() + "", departments);
        }

        for(Scores scores:page.getRecords()){

            Departments departments = hashMap1.get(scores.getCourseId()+"");
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
