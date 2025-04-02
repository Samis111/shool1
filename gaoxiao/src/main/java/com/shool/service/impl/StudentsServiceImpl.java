package com.shool.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.shool.domain.Students;
import com.shool.service.StudentsService;
import com.shool.mapper.StudentsMapper;
import org.springframework.stereotype.Service;

/**
 *
 */
@Service
public class StudentsServiceImpl extends ServiceImpl<StudentsMapper, Students>
    implements StudentsService{

}




