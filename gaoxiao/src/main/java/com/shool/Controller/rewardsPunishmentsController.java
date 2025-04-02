package com.shool.Controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.shool.domain.Departments;
import com.shool.domain.Result;
import com.shool.domain.RewardsPunishments;
import com.shool.service.RewardsPunishmentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RequestMapping("rewardsPunishments")
@RestController
public class rewardsPunishmentsController {

    @Autowired
    private RewardsPunishmentsService punishmentsService;


    @GetMapping()
    public Result list(
            @RequestParam("pageIndex") Integer pageIndex,
            @RequestParam("pageSize") Integer pageSize,
            @RequestParam(name = "searchValue", defaultValue = "") String searchValue
    ) {
        IPage<RewardsPunishments> objectIPage = new Page<>(pageIndex, pageSize);
        QueryWrapper<RewardsPunishments> departmentsQueryWrapper = new QueryWrapper<>();
//        if (!searchValue.equals("")) {
//            departmentsQueryWrapper.like("department_name", searchValue);
//        }

        IPage<RewardsPunishments> page = punishmentsService.page(objectIPage, departmentsQueryWrapper);

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
