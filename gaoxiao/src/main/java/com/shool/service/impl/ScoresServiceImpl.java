package com.shool.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.shool.domain.Scores;
import com.shool.service.ScoresService;
import com.shool.mapper.ScoresMapper;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

/**
 *
 */
@Service
public class ScoresServiceImpl extends ServiceImpl<ScoresMapper, Scores>
    implements ScoresService{

    @Override
    public List<Scores> getScoreCensus(Integer courseId) {
        // 查询指定课程的所有成绩
        LambdaQueryWrapper<Scores> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Scores::getCourseId, courseId);
        List<Scores> scores = this.list(wrapper);

        // 统计各等级成绩
        List<Scores> censusList = new ArrayList<>();
        int total = scores.size();
        
        // 定义成绩等级
        String[] levels = {"优", "良", "一般", "较差", "不及格"};
        double[] thresholds = {90, 80, 70, 60, 0};
        
        for (int i = 0; i < levels.length; i++) {
            Scores census = new Scores();
            census.setGradeLevel(levels[i]);
            
            // 统计该等级的人数
            int count = 0;
            for (Scores score : scores) {
                if (score.getScore() != null) {
                    double scoreValue = score.getScore().doubleValue();
                    if (i == levels.length - 1) {
                        if (scoreValue < thresholds[i]) {
                            count++;
                        }
                    } else {
                        if (scoreValue >= thresholds[i] && scoreValue < thresholds[i - 1]) {
                            count++;
                        }
                    }
                }
            }
            
            census.setCount(count);
            // 计算百分比
            if (total > 0) {
                census.setPercentage((double) count / total * 100);
            } else {
                census.setPercentage(0.0);
            }
            
            censusList.add(census);
        }
        
        return censusList;
    }
}




