/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80025
 Source Host           : localhost:3306
 Source Schema         : gaoxiaoshool

 Target Server Type    : MySQL
 Target Server Version : 80025
 File Encoding         : 65001

 Date: 27/05/2025 17:18:42
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for administrators
-- ----------------------------
DROP TABLE IF EXISTS `administrators`;
CREATE TABLE `administrators`  (
  `admin_id` int NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `contact_info` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`admin_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of administrators
-- ----------------------------
INSERT INTO `administrators` VALUES (1, '1', 'admin', '123456', '1');

-- ----------------------------
-- Table structure for college_announcements
-- ----------------------------
DROP TABLE IF EXISTS `college_announcements`;
CREATE TABLE `college_announcements`  (
  `announcement_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `publish_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `admin_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`announcement_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of college_announcements
-- ----------------------------

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses`  (
  `course_id` int NOT NULL AUTO_INCREMENT,
  `course_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `credits` int NULL DEFAULT NULL,
  `teacher` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `teacherName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`course_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 53524 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses
-- ----------------------------
INSERT INTO `courses` VALUES (1, '高等数学', 2, '2', '张三');
INSERT INTO `courses` VALUES (2, '大学英语', 2, '2', '张三');
INSERT INTO `courses` VALUES (3, '计算机基础', 2, '2', '张三');
INSERT INTO `courses` VALUES (4, '线性代数', 3, '2', '张三');
INSERT INTO `courses` VALUES (5, '数据结构', 4, '2', '王五');
INSERT INTO `courses` VALUES (6, '操作系统', 1, '2', '李四');
INSERT INTO `courses` VALUES (7, '离散数学', 3, '3', '赵教授');
INSERT INTO `courses` VALUES (8, '概率论与数理统计', 3, '4', '钱教授');
INSERT INTO `courses` VALUES (9, '程序设计基础', 4, '5', '孙教授');
INSERT INTO `courses` VALUES (10, '计算机网络', 3, '6', '李教授');
INSERT INTO `courses` VALUES (11, '数据库原理', 4, '7', '周教授');
INSERT INTO `courses` VALUES (12, 'Java程序设计', 4, '8', '吴教授');
INSERT INTO `courses` VALUES (13, '操作系统原理', 3, '9', '郑教授');
INSERT INTO `courses` VALUES (14, '软件工程', 3, '10', '王教授');

-- ----------------------------
-- Table structure for departments
-- ----------------------------
DROP TABLE IF EXISTS `departments`;
CREATE TABLE `departments`  (
  `department_id` int NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `dean_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`department_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of departments
-- ----------------------------
INSERT INTO `departments` VALUES (1, '人文学院中文系', NULL);
INSERT INTO `departments` VALUES (2, '计算机科学与技术系', NULL);
INSERT INTO `departments` VALUES (3, '教育学院学前教育系', NULL);
INSERT INTO `departments` VALUES (4, '商学院市场营销系', NULL);
INSERT INTO `departments` VALUES (5, '美术学院绘画系', NULL);

-- ----------------------------
-- Table structure for rewards_punishments
-- ----------------------------
DROP TABLE IF EXISTS `rewards_punishments`;
CREATE TABLE `rewards_punishments`  (
  `rp_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NULL DEFAULT NULL,
  `event_description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `event_date` date NULL DEFAULT NULL,
  `event_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`rp_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of rewards_punishments
-- ----------------------------
INSERT INTO `rewards_punishments` VALUES (1, 1, '一等奖学金', '2025-04-01', '奖励');
INSERT INTO `rewards_punishments` VALUES (2, 1, '不正常发色', '2025-04-16', '处分');

-- ----------------------------
-- Table structure for scores
-- ----------------------------
DROP TABLE IF EXISTS `scores`;
CREATE TABLE `scores`  (
  `score_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NULL DEFAULT NULL,
  `course_id` int NULL DEFAULT NULL,
  `score` decimal(5, 2) NULL DEFAULT NULL,
  PRIMARY KEY (`score_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of scores
-- ----------------------------
INSERT INTO `scores` VALUES (1, 1, 1, 85.00);
INSERT INTO `scores` VALUES (2, 1, 2, 90.00);
INSERT INTO `scores` VALUES (3, 1, 1, 85.00);
INSERT INTO `scores` VALUES (4, 1, 2, 90.00);
INSERT INTO `scores` VALUES (5, 1, 3, 78.00);
INSERT INTO `scores` VALUES (6, 1, 4, 92.00);
INSERT INTO `scores` VALUES (7, 1, 5, 88.00);
INSERT INTO `scores` VALUES (8, 1, 6, 76.00);
INSERT INTO `scores` VALUES (9, 1, 7, 89.00);
INSERT INTO `scores` VALUES (10, 1, 8, 91.00);
INSERT INTO `scores` VALUES (11, 1, 9, 83.00);
INSERT INTO `scores` VALUES (12, 1, 10, 79.00);
INSERT INTO `scores` VALUES (13, 1, 11, 86.00);
INSERT INTO `scores` VALUES (14, 1, 12, 84.00);
INSERT INTO `scores` VALUES (15, 1, 13, 80.00);
INSERT INTO `scores` VALUES (16, 1, 14, 87.00);
INSERT INTO `scores` VALUES (17, 25, 1, 72.00);
INSERT INTO `scores` VALUES (18, 25, 2, 80.00);
INSERT INTO `scores` VALUES (19, 25, 3, 75.00);
INSERT INTO `scores` VALUES (20, 25, 4, 68.00);
INSERT INTO `scores` VALUES (21, 25, 5, 79.00);
INSERT INTO `scores` VALUES (22, 25, 6, 82.00);
INSERT INTO `scores` VALUES (23, 25, 7, 73.00);
INSERT INTO `scores` VALUES (24, 25, 8, 77.00);
INSERT INTO `scores` VALUES (25, 25, 9, 70.00);
INSERT INTO `scores` VALUES (26, 25, 10, 81.00);
INSERT INTO `scores` VALUES (27, 25, 11, 74.00);
INSERT INTO `scores` VALUES (28, 25, 12, 76.00);
INSERT INTO `scores` VALUES (29, 25, 13, 78.00);
INSERT INTO `scores` VALUES (30, 25, 14, 71.00);
INSERT INTO `scores` VALUES (31, 3, 1, 95.00);
INSERT INTO `scores` VALUES (32, 3, 2, 92.00);
INSERT INTO `scores` VALUES (33, 3, 3, 96.00);
INSERT INTO `scores` VALUES (34, 3, 4, 94.00);
INSERT INTO `scores` VALUES (35, 3, 5, 98.00);
INSERT INTO `scores` VALUES (36, 3, 6, 93.00);
INSERT INTO `scores` VALUES (37, 3, 7, 97.00);
INSERT INTO `scores` VALUES (38, 3, 8, 95.00);
INSERT INTO `scores` VALUES (39, 3, 9, 99.00);
INSERT INTO `scores` VALUES (40, 3, 10, 94.00);
INSERT INTO `scores` VALUES (41, 3, 11, 96.00);
INSERT INTO `scores` VALUES (42, 3, 12, 98.00);
INSERT INTO `scores` VALUES (43, 3, 13, 93.00);
INSERT INTO `scores` VALUES (44, 3, 14, 95.00);
INSERT INTO `scores` VALUES (45, 4, 1, 88.00);
INSERT INTO `scores` VALUES (46, 4, 2, 91.00);
INSERT INTO `scores` VALUES (47, 4, 3, 89.00);
INSERT INTO `scores` VALUES (48, 4, 4, 87.00);
INSERT INTO `scores` VALUES (49, 4, 5, 90.00);
INSERT INTO `scores` VALUES (50, 4, 6, 86.00);
INSERT INTO `scores` VALUES (51, 4, 7, 89.00);
INSERT INTO `scores` VALUES (52, 4, 8, 92.00);
INSERT INTO `scores` VALUES (53, 4, 9, 88.00);
INSERT INTO `scores` VALUES (54, 4, 10, 90.00);
INSERT INTO `scores` VALUES (55, 4, 11, 87.00);
INSERT INTO `scores` VALUES (56, 4, 12, 89.00);
INSERT INTO `scores` VALUES (57, 4, 13, 91.00);
INSERT INTO `scores` VALUES (58, 4, 14, 88.00);
INSERT INTO `scores` VALUES (59, 5, 1, 76.00);
INSERT INTO `scores` VALUES (60, 5, 2, 78.00);
INSERT INTO `scores` VALUES (61, 5, 3, 75.00);
INSERT INTO `scores` VALUES (62, 5, 4, 77.00);
INSERT INTO `scores` VALUES (63, 5, 5, 74.00);
INSERT INTO `scores` VALUES (64, 5, 6, 79.00);
INSERT INTO `scores` VALUES (65, 5, 7, 76.00);
INSERT INTO `scores` VALUES (66, 5, 8, 78.00);
INSERT INTO `scores` VALUES (67, 5, 9, 75.00);
INSERT INTO `scores` VALUES (68, 5, 10, 77.00);
INSERT INTO `scores` VALUES (69, 5, 11, 74.00);
INSERT INTO `scores` VALUES (70, 5, 12, 79.00);
INSERT INTO `scores` VALUES (71, 5, 13, 76.00);
INSERT INTO `scores` VALUES (72, 5, 14, 78.00);
INSERT INTO `scores` VALUES (73, 6, 1, 92.00);
INSERT INTO `scores` VALUES (74, 6, 2, 89.00);
INSERT INTO `scores` VALUES (75, 6, 3, 94.00);
INSERT INTO `scores` VALUES (76, 6, 4, 91.00);
INSERT INTO `scores` VALUES (77, 6, 5, 93.00);
INSERT INTO `scores` VALUES (78, 6, 6, 90.00);
INSERT INTO `scores` VALUES (79, 6, 7, 92.00);
INSERT INTO `scores` VALUES (80, 6, 8, 94.00);
INSERT INTO `scores` VALUES (81, 6, 9, 91.00);
INSERT INTO `scores` VALUES (82, 6, 10, 93.00);
INSERT INTO `scores` VALUES (83, 6, 11, 90.00);
INSERT INTO `scores` VALUES (84, 6, 12, 92.00);
INSERT INTO `scores` VALUES (85, 6, 13, 94.00);
INSERT INTO `scores` VALUES (86, 6, 14, 91.00);
INSERT INTO `scores` VALUES (87, 7, 1, 68.00);
INSERT INTO `scores` VALUES (88, 7, 2, 70.00);
INSERT INTO `scores` VALUES (89, 7, 3, 69.00);
INSERT INTO `scores` VALUES (90, 7, 4, 71.00);
INSERT INTO `scores` VALUES (91, 7, 5, 67.00);
INSERT INTO `scores` VALUES (92, 7, 6, 72.00);
INSERT INTO `scores` VALUES (93, 7, 7, 68.00);
INSERT INTO `scores` VALUES (94, 7, 8, 70.00);
INSERT INTO `scores` VALUES (95, 7, 9, 69.00);
INSERT INTO `scores` VALUES (96, 7, 10, 71.00);
INSERT INTO `scores` VALUES (97, 7, 11, 67.00);
INSERT INTO `scores` VALUES (98, 7, 12, 72.00);
INSERT INTO `scores` VALUES (99, 7, 13, 68.00);
INSERT INTO `scores` VALUES (100, 7, 14, 70.00);
INSERT INTO `scores` VALUES (101, 8, 1, 85.00);
INSERT INTO `scores` VALUES (102, 8, 2, 87.00);
INSERT INTO `scores` VALUES (103, 8, 3, 86.00);
INSERT INTO `scores` VALUES (104, 8, 4, 84.00);
INSERT INTO `scores` VALUES (105, 8, 5, 88.00);
INSERT INTO `scores` VALUES (106, 8, 6, 83.00);
INSERT INTO `scores` VALUES (107, 8, 7, 85.00);
INSERT INTO `scores` VALUES (108, 8, 8, 87.00);
INSERT INTO `scores` VALUES (109, 8, 9, 86.00);
INSERT INTO `scores` VALUES (110, 8, 10, 84.00);
INSERT INTO `scores` VALUES (111, 8, 11, 88.00);
INSERT INTO `scores` VALUES (112, 8, 12, 83.00);
INSERT INTO `scores` VALUES (113, 8, 13, 85.00);
INSERT INTO `scores` VALUES (114, 8, 14, 87.00);
INSERT INTO `scores` VALUES (115, 9, 1, 79.00);
INSERT INTO `scores` VALUES (116, 9, 2, 81.00);
INSERT INTO `scores` VALUES (117, 9, 3, 80.00);
INSERT INTO `scores` VALUES (118, 9, 4, 78.00);
INSERT INTO `scores` VALUES (119, 9, 5, 82.00);
INSERT INTO `scores` VALUES (120, 9, 6, 77.00);
INSERT INTO `scores` VALUES (121, 9, 7, 79.00);
INSERT INTO `scores` VALUES (122, 9, 8, 81.00);
INSERT INTO `scores` VALUES (123, 9, 9, 80.00);
INSERT INTO `scores` VALUES (124, 9, 10, 78.00);
INSERT INTO `scores` VALUES (125, 9, 11, 82.00);
INSERT INTO `scores` VALUES (126, 9, 12, 77.00);
INSERT INTO `scores` VALUES (127, 9, 13, 79.00);
INSERT INTO `scores` VALUES (128, 9, 14, 81.00);
INSERT INTO `scores` VALUES (129, 10, 1, 83.00);
INSERT INTO `scores` VALUES (130, 10, 2, 85.00);
INSERT INTO `scores` VALUES (131, 10, 3, 84.00);
INSERT INTO `scores` VALUES (132, 10, 4, 82.00);
INSERT INTO `scores` VALUES (133, 10, 5, 86.00);
INSERT INTO `scores` VALUES (134, 10, 6, 81.00);
INSERT INTO `scores` VALUES (135, 10, 7, 83.00);
INSERT INTO `scores` VALUES (136, 10, 8, 85.00);
INSERT INTO `scores` VALUES (137, 10, 9, 84.00);
INSERT INTO `scores` VALUES (138, 10, 10, 82.00);
INSERT INTO `scores` VALUES (139, 10, 11, 86.00);
INSERT INTO `scores` VALUES (140, 10, 12, 81.00);
INSERT INTO `scores` VALUES (141, 10, 13, 83.00);
INSERT INTO `scores` VALUES (142, 10, 14, 85.00);

-- ----------------------------
-- Table structure for students
-- ----------------------------
DROP TABLE IF EXISTS `students`;
CREATE TABLE `students`  (
  `student_id` int NOT NULL AUTO_INCREMENT,
  `student_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `gender` enum('男','女') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `birth_date` date NULL DEFAULT NULL,
  `major` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `enrollment_date` date NULL DEFAULT NULL,
  `contact_info` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `department_id` int NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`student_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3663 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of students
-- ----------------------------
INSERT INTO `students` VALUES (1, '张三', '男', '2025-04-01', '1', '2025-04-01', '1', 1, '123456');
INSERT INTO `students` VALUES (3, '王五', '男', '2002-05-15', '计算机科学', '2020-09-01', '13800138003', 2, 'password3');
INSERT INTO `students` VALUES (4, '赵六', '女', '2001-11-22', '软件工程', '2020-09-01', '13800138004', 2, 'password4');
INSERT INTO `students` VALUES (5, '钱七', '男', '2002-03-08', '网络工程', '2020-09-01', '13800138005', 2, 'password5');
INSERT INTO `students` VALUES (6, '孙八', '女', '2001-07-18', '数据科学', '2020-09-01', '13800138006', 2, 'password6');
INSERT INTO `students` VALUES (7, '周九', '男', '2002-01-30', '人工智能', '2020-09-01', '13800138007', 2, 'password7');
INSERT INTO `students` VALUES (8, '吴十', '女', '2001-09-05', '计算机应用', '2020-09-01', '13800138008', 2, 'password8');
INSERT INTO `students` VALUES (9, '郑十一', '男', '2002-04-12', '数字媒体技术', '2020-09-01', '13800138009', 2, 'password9');
INSERT INTO `students` VALUES (10, '王十二', '女', '2001-12-25', '信息安全', '2020-09-01', '13800138010', 2, 'password10');
INSERT INTO `students` VALUES (25, '李四', '男', '2025-04-03', '1', '2025-04-03', '1', 1, '52');

-- ----------------------------
-- Table structure for suggestions_feedbacks
-- ----------------------------
DROP TABLE IF EXISTS `suggestions_feedbacks`;
CREATE TABLE `suggestions_feedbacks`  (
  `feedback_id` int NOT NULL AUTO_INCREMENT,
  `student_id` int NULL DEFAULT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `submit_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`feedback_id`) USING BTREE,
  INDEX `student_id`(`student_id`) USING BTREE,
  CONSTRAINT `suggestions_feedbacks_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `students` (`student_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of suggestions_feedbacks
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
