package com.shool.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.shool.domain.Scores;
import java.util.List;

/**
 *
 */
public interface ScoresService extends IService<Scores> {
    
    /**
     * 获取成绩统计信息
     * @param courseId 课程ID
     * @return 成绩统计结果列表
     */
    List<Scores> getScoreCensus(Integer courseId);
}
