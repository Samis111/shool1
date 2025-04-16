package com.shool.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shool.domain.Departments;
import com.shool.domain.Result;
import com.shool.domain.RewardsPunishments;
import com.shool.domain.Students;
import com.shool.service.RewardsPunishmentsService;
import com.shool.service.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.List;

@RequestMapping("rewardsPunishments")
@RestController
public class rewardsPunishmentsController {

    @Autowired
    private RewardsPunishmentsService punishmentsService;

    @Autowired
    private StudentsService studentsService;

    @GetMapping()
    public Result list(
            @RequestParam("pageIndex") Integer pageIndex,
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam(name = "searchValue", defaultValue = "") String searchValue
    ) {
        IPage<RewardsPunishments> objectIPage = new Page<>(pageIndex, pageSize);
        QueryWrapper<RewardsPunishments> departmentsQueryWrapper = new QueryWrapper<>();
        IPage<RewardsPunishments> page = punishmentsService.page(objectIPage, departmentsQueryWrapper);
        List<Students> list = studentsService.list();
        HashMap<Integer, Students> hashMap = new HashMap<>();
        for (Students students:list){
            hashMap.put(students.getStudentId(),students);
        }
        for (RewardsPunishments rewardsPunishments:page.getRecords()){
            Students students = hashMap.get(rewardsPunishments.getStudentId());
            rewardsPunishments.setStudents(students);
        }
        return Result.ok(page);
    }

    @GetMapping("{id}")
    public Result find(@PathVariable("id") Integer id) {

        RewardsPunishments byId = punishmentsService.getById(id);
        return Result.ok(byId);
    }

    @PostMapping("save")
    public Result save(@RequestBody RewardsPunishments administrators) {
        boolean save = punishmentsService.save(administrators);
        return Result.ok("添加成功");
    }

    @PostMapping("update")
    public Result update(@RequestBody RewardsPunishments administrators, HttpSession session) {
        boolean save = punishmentsService.updateById(administrators);
        return Result.ok("修改成功");
    }

    @PostMapping("del/{id}")
    public Result del(@PathVariable("id") Integer id) {
        boolean byId = punishmentsService.removeById(id);
        return Result.ok("删除成功");
    }


}
