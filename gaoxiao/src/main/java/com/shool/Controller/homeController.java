package com.shool.Controller;

import com.shool.domain.Administrators;
import com.shool.domain.Courses;
import com.shool.domain.Result;
import com.shool.domain.Students;
import com.shool.service.AdministratorsService;
import com.shool.service.CoursesService;
import com.shool.service.StudentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@RequestMapping("home")
@RestController
public class homeController {

    @Autowired
    private StudentsService studentsService;

    @Autowired
    private CoursesService coursesService;

    @GetMapping("/")
    public Result homeList() {
        HashMap<String, String> hashMap = new HashMap<>();

        List<Students> list = studentsService.list();
        int size = list.size();
        hashMap.put("Students", size + "");
        List<Courses> list1 = coursesService.list();
        int size1 = list1.size();
        hashMap.put("Courses", size1 + "");
        HashSet<String> strings = new HashSet<>();
        for (Courses courses : list1) {
            boolean add = strings.add(courses.getTeachername());
        }
        hashMap.put("strings", strings.size() + "");

        return Result.ok(hashMap);
    }


}
