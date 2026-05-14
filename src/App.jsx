import { useState, useEffect, useMemo, useRef } from "react";
import { Users, Calendar, ClipboardList, LayoutDashboard, Search, AlertTriangle, CheckCircle2, X, Plus, MapPin, BookOpen, Filter, ChevronDown, AlertCircle, UserCheck, UserX, Sparkles, Pencil, Trash2, Download, Upload, RotateCcw, Save, Database } from "lucide-react";

const SEED_DATA = {"teachers":[{"id":"t_2","code":"T6-0001","name":"Chu Thị Hải Yến","role":"Giáo Viên","locations":{"Times City":true,"Smart City":false,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":true},"IGCSE":{"Math":false,"Science":true,"Biology":true,"Chemistry":true,"Physics":true},"AS":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false}}},{"id":"t_3","code":"T6-0002","name":"Chử Nguyễn Tuấn Hoàng","role":"Giáo Viên","locations":{"Times City":true,"Smart City":false,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":true},"IGCSE":{"Math":false,"Science":false,"Biology":true,"Chemistry":true,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_4","code":"T6-0003","name":"Trần Quang Hưng","role":"Giáo Viên","locations":{"Times City":true,"Smart City":false,"Online":true,"Tại nhà":true},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":true,"Chemistry":true,"Physics":false},"AS":{"Math":false,"Biology":true,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":true,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":true,"Chemistry":false,"Physics":false}}},{"id":"t_5","code":"T6-0007","name":"Kiều Khánh Linh","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":false,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":true,"Science":false},"IGCSE":{"Math":true,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_6","code":"T6-0008","name":"Dương Khánh Linh","role":"Giáo Viên","locations":{"Times City":true,"Smart City":false,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":true,"Science":false},"IGCSE":{"Math":true,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":true,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":true,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":true,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_7","code":"T6-0013","name":"Nguyễn Đức Long","role":"Giáo Viên","locations":{"Times City":true,"Smart City":false,"Online":false,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_8","code":"T518265","name":"Lý Quảng Văn","role":"Giáo Viên","locations":{"Times City":true,"Smart City":true,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":true},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":true},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":true},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":true},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":true}}},{"id":"t_9","code":"T841198","name":"Josh","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_10","code":"","name":"Nguyễn Đình Hải","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_11","code":"","name":"Nguyễn Yến Linh","role":"Giáo Viên","locations":{"Times City":false,"Smart City":true,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":true,"Science":false},"IGCSE":{"Math":true,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":true,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":true,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":true,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_12","code":"","name":"Nguyễn Quý Thịnh","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":true,"Biology":false,"Chemistry":false,"Physics":true},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_13","code":"","name":"Trần Toàn Thịnh","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":false,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_14","code":"","name":"Chu Kim Khánh","role":"Giáo Viên","locations":{"Times City":true,"Smart City":true,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":true,"Science":true},"IGCSE":{"Math":true,"Science":true,"Biology":true,"Chemistry":true,"Physics":true},"AS":{"Math":true,"Biology":false,"Chemistry":false,"Physics":true},"A LEVEL":{"Math":true,"Biology":false,"Chemistry":false,"Physics":true},"IB":{"Math":true,"Biology":false,"Chemistry":false,"Physics":true}}},{"id":"t_15","code":"","name":"Trần Đức Thắng","role":"Giáo Viên","locations":{"Times City":false,"Smart City":true,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":true},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":true,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false}}},{"id":"t_16","code":"","name":"Trần Thị Hương","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":true,"Tại nhà":true},"subjects":{"Checkpoint":{"Math":false,"Science":true},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":true,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":true,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_22","code":"T6-0006","name":"Trần Quốc Tuấn","role":"Giáo Viên","locations":{"Times City":true,"Smart City":false,"Online":true,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_28","code":"","name":"Đinh Hồng Châu","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":false,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_29","code":"","name":"Phương Anh Math","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":false,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_30","code":"","name":"Nguyễn Thị Thơ","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":false,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}},{"id":"t_31","code":"","name":"Nguyễn Văn Nghĩa","role":"Giáo Viên","locations":{"Times City":false,"Smart City":false,"Online":false,"Tại nhà":false},"subjects":{"Checkpoint":{"Math":false,"Science":false},"IGCSE":{"Math":false,"Science":false,"Biology":false,"Chemistry":false,"Physics":false},"AS":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"A LEVEL":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false},"IB":{"Math":false,"Biology":false,"Chemistry":false,"Physics":false}}}],"assignments":[{"id":"a_2","hinhthuc":"Offline Times City","program":"Checkpoint","grade":6,"subject":"Math","teacher":"Chu Kim Khánh"},{"id":"a_3","hinhthuc":"Offline Times City","program":"Checkpoint","grade":6,"subject":"Science","teacher":"Chử Nguyễn Tuấn Hoàng"},{"id":"a_4","hinhthuc":"Offline Times City","program":"Checkpoint","grade":7,"subject":"Math","teacher":"Chu Kim Khánh"},{"id":"a_5","hinhthuc":"Offline Times City","program":"Checkpoint","grade":7,"subject":"Science","teacher":"Chử Nguyễn Tuấn Hoàng"},{"id":"a_6","hinhthuc":"Offline Times City","program":"Checkpoint","grade":8,"subject":"Math","teacher":"Dương Khánh Linh"},{"id":"a_7","hinhthuc":"Offline Times City","program":"Checkpoint","grade":8,"subject":"Science","teacher":"Chử Nguyễn Tuấn Hoàng"},{"id":"a_8","hinhthuc":"Offline Times City","program":"IGCSE","grade":9,"subject":"Math","teacher":"Dương Khánh Linh"},{"id":"a_9","hinhthuc":"Offline Times City","program":"IGCSE","grade":9,"subject":"Biology","teacher":"Trần Quang Hưng"},{"id":"a_10","hinhthuc":"Offline Times City","program":"IGCSE","grade":9,"subject":"Chemistry","teacher":"Trần Quang Hưng"},{"id":"a_11","hinhthuc":"Offline Times City","program":"IGCSE","grade":9,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_12","hinhthuc":"Offline Times City","program":"IGCSE","grade":10,"subject":"Math","teacher":"Dương Khánh Linh"},{"id":"a_13","hinhthuc":"Offline Times City","program":"IGCSE","grade":10,"subject":"Biology","teacher":"Trần Quang Hưng"},{"id":"a_14","hinhthuc":"Offline Times City","program":"IGCSE","grade":10,"subject":"Chemistry","teacher":"Trần Quang Hưng"},{"id":"a_15","hinhthuc":"Offline Times City","program":"IGCSE","grade":10,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_16","hinhthuc":"Offline Times City","program":"AS","grade":11,"subject":"Math","teacher":"Dương Khánh Linh"},{"id":"a_17","hinhthuc":"Offline Times City","program":"AS","grade":11,"subject":"Biology","teacher":"Trần Quang Hưng"},{"id":"a_18","hinhthuc":"Offline Times City","program":"AS","grade":11,"subject":"Chemistry","teacher":"Chu Thị Hải Yến"},{"id":"a_19","hinhthuc":"Offline Times City","program":"AS","grade":11,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_20","hinhthuc":"Offline Times City","program":"A LEVEL","grade":12,"subject":"Math","teacher":"Dương Khánh Linh"},{"id":"a_21","hinhthuc":"Offline Times City","program":"A LEVEL","grade":12,"subject":"Biology","teacher":"Trần Quang Hưng"},{"id":"a_22","hinhthuc":"Offline Times City","program":"A LEVEL","grade":12,"subject":"Chemistry","teacher":"Chu Thị Hải Yến"},{"id":"a_23","hinhthuc":"Offline Times City","program":"A LEVEL","grade":12,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_27","hinhthuc":"Offline Smart City","program":"Checkpoint","grade":6,"subject":"Math","teacher":"Nguyễn Yến Linh"},{"id":"a_28","hinhthuc":"Offline Smart City","program":"Checkpoint","grade":6,"subject":"Science","teacher":"Đinh Hồng Châu"},{"id":"a_29","hinhthuc":"Offline Smart City","program":"Checkpoint","grade":7,"subject":"Math","teacher":"Nguyễn Yến Linh"},{"id":"a_30","hinhthuc":"Offline Smart City","program":"Checkpoint","grade":7,"subject":"Science","teacher":"Đinh Hồng Châu"},{"id":"a_31","hinhthuc":"Offline Smart City","program":"Checkpoint","grade":8,"subject":"Math","teacher":"Nguyễn Yến Linh"},{"id":"a_32","hinhthuc":"Offline Smart City","program":"Checkpoint","grade":8,"subject":"Science","teacher":"Đinh Hồng Châu"},{"id":"a_33","hinhthuc":"Offline Smart City","program":"IGCSE","grade":9,"subject":"Math","teacher":"Nguyễn Yến Linh"},{"id":"a_34","hinhthuc":"Offline Smart City","program":"IGCSE","grade":9,"subject":"Biology","teacher":"Nguyễn Thị Thơ"},{"id":"a_35","hinhthuc":"Offline Smart City","program":"IGCSE","grade":9,"subject":"Chemistry","teacher":"Trần Đức Thắng"},{"id":"a_36","hinhthuc":"Offline Smart City","program":"IGCSE","grade":9,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_37","hinhthuc":"Offline Smart City","program":"IGCSE","grade":10,"subject":"Math","teacher":"Nguyễn Yến Linh"},{"id":"a_38","hinhthuc":"Offline Smart City","program":"IGCSE","grade":10,"subject":"Biology","teacher":"Nguyễn Thị Thơ"},{"id":"a_39","hinhthuc":"Offline Smart City","program":"IGCSE","grade":10,"subject":"Chemistry","teacher":"Trần Đức Thắng"},{"id":"a_40","hinhthuc":"Offline Smart City","program":"IGCSE","grade":10,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_41","hinhthuc":"Offline Smart City","program":"AS","grade":11,"subject":"Math","teacher":"Nguyễn Yến Linh"},{"id":"a_42","hinhthuc":"Offline Smart City","program":"AS","grade":11,"subject":"Biology","teacher":"Nguyễn Thị Thơ"},{"id":"a_43","hinhthuc":"Offline Smart City","program":"AS","grade":11,"subject":"Chemistry","teacher":"Trần Đức Thắng"},{"id":"a_44","hinhthuc":"Offline Smart City","program":"AS","grade":11,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_45","hinhthuc":"Offline Smart City","program":"A LEVEL","grade":12,"subject":"Math","teacher":"Nguyễn Yến Linh"},{"id":"a_46","hinhthuc":"Offline Smart City","program":"A LEVEL","grade":12,"subject":"Biology","teacher":"Nguyễn Thị Thơ"},{"id":"a_47","hinhthuc":"Offline Smart City","program":"A LEVEL","grade":12,"subject":"Chemistry","teacher":"Trần Đức Thắng"},{"id":"a_48","hinhthuc":"Offline Smart City","program":"A LEVEL","grade":12,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_52","hinhthuc":"Online","program":"Checkpoint","grade":6,"subject":"Math","teacher":"Nguyễn Phương Anh"},{"id":"a_53","hinhthuc":"Online","program":"Checkpoint","grade":6,"subject":"Science","teacher":"Chử Nguyễn Tuấn Hoàng"},{"id":"a_54","hinhthuc":"Online","program":"Checkpoint","grade":7,"subject":"Math","teacher":"Nguyễn Phương Anh"},{"id":"a_55","hinhthuc":"Online","program":"Checkpoint","grade":7,"subject":"Science","teacher":"Chử Nguyễn Tuấn Hoàng"},{"id":"a_56","hinhthuc":"Online","program":"Checkpoint","grade":8,"subject":"Math","teacher":"Nguyễn Phương Anh"},{"id":"a_57","hinhthuc":"Online","program":"Checkpoint","grade":8,"subject":"Science","teacher":"Chử Nguyễn Tuấn Hoàng"},{"id":"a_58","hinhthuc":"Online","program":"IGCSE","grade":9,"subject":"Math","teacher":"Nguyễn Phương Anh"},{"id":"a_59","hinhthuc":"Online","program":"IGCSE","grade":9,"subject":"Biology","teacher":"Trần Thị Hương"},{"id":"a_60","hinhthuc":"Online","program":"IGCSE","grade":9,"subject":"Chemistry","teacher":"Trần Thị Hương"},{"id":"a_61","hinhthuc":"Online","program":"IGCSE","grade":9,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_62","hinhthuc":"Online","program":"IGCSE","grade":10,"subject":"Math","teacher":"Nguyễn Phương Anh"},{"id":"a_63","hinhthuc":"Online","program":"IGCSE","grade":10,"subject":"Biology","teacher":"Trần Thị Hương"},{"id":"a_64","hinhthuc":"Online","program":"IGCSE","grade":10,"subject":"Chemistry","teacher":"Trần Thị Hương"},{"id":"a_65","hinhthuc":"Online","program":"IGCSE","grade":10,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_66","hinhthuc":"Online","program":"AS","grade":11,"subject":"Math","teacher":"Nguyễn Phương Anh"},{"id":"a_67","hinhthuc":"Online","program":"AS","grade":11,"subject":"Biology","teacher":"Trần Quang Hưng"},{"id":"a_68","hinhthuc":"Online","program":"AS","grade":11,"subject":"Chemistry","teacher":"Trần Thị Hương"},{"id":"a_69","hinhthuc":"Online","program":"AS","grade":11,"subject":"Physics","teacher":"Lý Quảng Văn"},{"id":"a_70","hinhthuc":"Online","program":"A LEVEL","grade":12,"subject":"Math","teacher":"Nguyễn Phương Anh"},{"id":"a_71","hinhthuc":"Online","program":"A LEVEL","grade":12,"subject":"Biology","teacher":"Trần Quang Hưng"},{"id":"a_72","hinhthuc":"Online","program":"A LEVEL","grade":12,"subject":"Chemistry","teacher":"Trần Thị Hương"},{"id":"a_73","hinhthuc":"Online","program":"A LEVEL","grade":12,"subject":"Physics","teacher":"Lý Quảng Văn"}],"availability":{"Chu Thị Hải Yến":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":true,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":true,"14:00-16:00":true,"16:00-18:00":true,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":true,"16:00-18:00":true,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Chử Nguyễn Tuấn Hoàng":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Trần Quang Hưng":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":true},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":true,"16:00-18:00":true,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Trần Quốc Tuấn":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Kiều Khánh Linh":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Dương Khánh Linh":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T7":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":true,"16:00-18:00":true,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"CN":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":true,"16:00-18:00":true,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false}},"Lý Quảng Văn":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":true,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":true},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":true,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T7":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":true,"16:00-18:00":true,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Nguyễn Đình Hải":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Nguyễn Yến Linh":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false}},"Nguyễn Quý Thịnh":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":true,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":true,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":true,"18:00-19:30":true,"19:30-21:00":false,"Sau 21:00":false}},"Chu Kim Khánh":{"T2":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":true},"T3":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":true},"T4":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":true},"T5":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":true},"T6":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":true},"T7":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":true},"CN":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":true,"Sau 21:00":true}},"Trần Đức Thắng":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false}},"Trần Thị Hương":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":true},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":true},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":true},"CN":{"8:00-10:00":true,"10:00-12:00":true,"14:00-16:00":true,"16:00-18:00":true,"18:00-19:30":true,"19:30-21:00":true,"Sau 21:00":true}},"Nguyễn Thị Thơ":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Nguyễn Đức Long":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Josh":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Trần Toàn Thịnh":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Đinh Hồng Châu":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Phương Anh Math":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}},"Nguyễn Văn Nghĩa":{"T2":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T3":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T4":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T5":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T6":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"T7":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false},"CN":{"8:00-10:00":false,"10:00-12:00":false,"14:00-16:00":false,"16:00-18:00":false,"18:00-19:30":false,"19:30-21:00":false,"Sau 21:00":false}}},"days":["T2","T3","T4","T5","T6","T7","CN"],"slots":["8:00-10:00","10:00-12:00","14:00-16:00","16:00-18:00","18:00-19:30","19:30-21:00","Sau 21:00"],"locations":["Times City","Smart City","Online","Tại nhà"],"programs":["Checkpoint","IGCSE","AS","A LEVEL","IB"],"gradesByProgram":{"Checkpoint":[6,7,8],"IGCSE":[9,10],"AS":[11],"A LEVEL":[12],"IB":[11,12]},"subjectsByProgram":{"Checkpoint":["Math","Science"],"IGCSE":["Math","Biology","Chemistry","Physics"],"AS":["Math","Biology","Chemistry","Physics"],"A LEVEL":["Math","Biology","Chemistry","Physics"],"IB":["Math","Biology","Chemistry","Physics"]}};

// === DESIGN TOKENS ===
const T = {
  bg: "#F4EFE6", surface: "#FBF8F3", surfaceAlt: "#EFE8D9",
  ink: "#1A1A1A", inkSoft: "#4A4742", muted: "#8A8377",
  border: "#E0D5BD", borderStrong: "#C9BBA0",
  accent: "#B85C38", accentDark: "#8F3F22",
  teal: "#1E5F5F", tealLight: "#D4E2DE",
  sage: "#7A8B6F", sageLight: "#DDE5D3",
  amber: "#D4A056", amberLight: "#F4E5C3",
  danger: "#A63E2C", dangerLight: "#F0D5CE",
};

const injectFonts = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById("astar-fonts")) return;
  const link = document.createElement("link");
  link.id = "astar-fonts";
  link.rel = "stylesheet";
  link.href = "https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&display=swap";
  document.head.appendChild(link);
};

const F_DISPLAY = "'Fraunces', 'Times New Roman', serif";
const F_BODY = "'Be Vietnam Pro', system-ui, sans-serif";

const DAYS = SEED_DATA.days;
const SLOTS = SEED_DATA.slots;
const LOCATIONS = SEED_DATA.locations;
const PROGRAMS = SEED_DATA.programs;
const HINHTHUCS = ["Offline Times City", "Offline Smart City", "Online", "Tại nhà"];
const ALL_SUBJECTS = ["Math", "Science", "Biology", "Chemistry", "Physics"];

// === HELPERS ===
const teacherCanTeach = (teacher, program, subject) => !!teacher?.subjects?.[program]?.[subject];
const teacherTeachesLocation = (teacher, hinhthuc) => {
  const locs = teacher?.locations;
  if (!locs) return false;
  if (hinhthuc.includes("Times City")) return locs["Times City"];
  if (hinhthuc.includes("Smart City")) return locs["Smart City"];
  if (hinhthuc.includes("Online")) return locs["Online"];
  if (hinhthuc.includes("Tại nhà") || hinhthuc.includes("nhà")) return locs["Tại nhà"];
  return false;
};
const hinhthucShort = (h) => h.replace("Offline ", "");
const emptyAvailability = () => Object.fromEntries(DAYS.map(d => [d, Object.fromEntries(SLOTS.map(s => [s, false]))]));
const newId = (prefix) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;

const buildEmptyTeacher = () => ({
  id: newId("t"),
  code: "",
  name: "",
  role: "Giáo Viên",
  locations: { "Times City": false, "Smart City": false, "Online": false, "Tại nhà": false },
  subjects: {
    Checkpoint: { Math: false, Science: false },
    IGCSE: { Math: false, Science: false, Biology: false, Chemistry: false, Physics: false },
    AS: { Math: false, Biology: false, Chemistry: false, Physics: false },
    "A LEVEL": { Math: false, Biology: false, Chemistry: false, Physics: false },
    IB: { Math: false, Biology: false, Chemistry: false, Physics: false },
  },
});

const STORAGE_KEY = "astar_v2_state";

// === MAIN APP ===
export default function App() {
  const [tab, setTab] = useState("dashboard");
  const [teachers, setTeachers] = useState(SEED_DATA.teachers);
  const [availability, setAvailability] = useState(SEED_DATA.availability);
  const [assignments, setAssignments] = useState(SEED_DATA.assignments);
  const [schedules, setSchedules] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => { injectFonts(); }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const s = JSON.parse(saved);
        if (Array.isArray(s.teachers)) setTeachers(s.teachers);
        if (s.availability) setAvailability(s.availability);
        if (Array.isArray(s.assignments)) setAssignments(s.assignments);
        if (Array.isArray(s.schedules)) setSchedules(s.schedules);
      }
    } catch (e) {}
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ teachers, availability, assignments, schedules }));
    } catch (e) {}
  }, [teachers, availability, assignments, schedules, loaded]);

  const showToast = (msg, tone = "ok") => {
    setToast({ msg, tone });
    setTimeout(() => setToast(null), 2800);
  };

  // === CRUD: Teachers ===
  const saveTeacher = (oldName, teacher, newAvailability) => {
    setTeachers(prev => {
      const idx = prev.findIndex(t => t.id === teacher.id);
      if (idx < 0) return [...prev, teacher];
      const copy = [...prev]; copy[idx] = teacher; return copy;
    });
    setAvailability(prev => {
      const copy = { ...prev };
      if (oldName && oldName !== teacher.name) delete copy[oldName];
      copy[teacher.name] = newAvailability || emptyAvailability();
      return copy;
    });
    if (oldName && oldName !== teacher.name) {
      setAssignments(prev => prev.map(a => a.teacher === oldName ? { ...a, teacher: teacher.name } : a));
    }
    showToast(oldName ? `Đã cập nhật ${teacher.name}` : `Đã thêm GV ${teacher.name}`);
  };

  const deleteTeacher = (teacher) => {
    if (!confirm(`Xóa giáo viên "${teacher.name}"?\nMọi phân công và lịch xếp của GV này sẽ bị bỏ.`)) return;
    setTeachers(prev => prev.filter(t => t.id !== teacher.id));
    setAvailability(prev => { const c = { ...prev }; delete c[teacher.name]; return c; });
    setAssignments(prev => prev.map(a => a.teacher === teacher.name ? { ...a, teacher: null } : a));
    showToast(`Đã xóa ${teacher.name}`, "danger");
  };

  // === CRUD: Assignments ===
  const saveAssignment = (assignment) => {
    setAssignments(prev => {
      const idx = prev.findIndex(a => a.id === assignment.id);
      if (idx < 0) return [...prev, assignment];
      const copy = [...prev]; copy[idx] = assignment; return copy;
    });
    showToast("Đã lưu phân công");
  };

  const deleteAssignment = (assignment) => {
    if (!confirm(`Xóa môn "${assignment.subject} - Lớp ${assignment.grade}" ở ${hinhthucShort(assignment.hinhthuc)}?\nMọi lịch xếp của môn này sẽ bị bỏ.`)) return;
    setAssignments(prev => prev.filter(a => a.id !== assignment.id));
    setSchedules(prev => prev.filter(s => s.assignmentId !== assignment.id));
    showToast("Đã xóa môn", "danger");
  };

  const updateAssignmentTeacher = (id, teacherName) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, teacher: teacherName || null } : a));
  };

  // === Data Management ===
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ teachers, availability, assignments, schedules, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `astar_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Đã xuất file backup");
  };

  const teacherByName = useMemo(() => Object.fromEntries(teachers.map(t => [t.name, t])), [teachers]);

  // === Insights ===
  const insights = useMemo(() => {
    const unassigned = assignments.filter(a => !a.teacher);
    const wrongCapability = assignments.filter(a => {
      if (!a.teacher) return false;
      const t = teacherByName[a.teacher];
      if (!t) return true;
      return !teacherCanTeach(t, a.program, a.subject) || !teacherTeachesLocation(t, a.hinhthuc);
    });
    const slotMap = {};
    schedules.forEach(s => {
      const a = assignments.find(x => x.id === s.assignmentId);
      if (!a || !a.teacher) return;
      const k = `${a.teacher}|${s.day}|${s.slot}`;
      if (!slotMap[k]) slotMap[k] = [];
      slotMap[k].push({ schedule: s, assignment: a });
    });
    const conflicts = Object.values(slotMap).filter(arr => arr.length > 1);
    const availViolations = [];
    schedules.forEach(s => {
      const a = assignments.find(x => x.id === s.assignmentId);
      if (!a?.teacher) return;
      const av = availability[a.teacher];
      if (av && av[s.day]?.[s.slot] === false) availViolations.push({ schedule: s, assignment: a });
    });
    return { unassigned, wrongCapability, scheduled: schedules.length, conflicts, availViolations };
  }, [assignments, schedules, teacherByName, availability]);

  if (!loaded) {
    return <div style={{ fontFamily: F_BODY, background: T.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: T.muted }}>Đang tải dữ liệu Astar…</div>;
  }

  return (
    <div style={{ fontFamily: F_BODY, background: T.bg, minHeight: "100vh", color: T.ink }}>
      <Header tab={tab} setTab={setTab} insights={insights} onExport={exportData} />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {tab === "dashboard" && <Dashboard insights={insights} assignments={assignments} schedules={schedules} teachers={teachers} />}
        {tab === "teachers" && <TeachersTab teachers={teachers} availability={availability} assignments={assignments} onSave={saveTeacher} onDelete={deleteTeacher} />}
        {tab === "assignments" && <AssignmentsTab assignments={assignments} setAssignments={setAssignments} teachers={teachers} onSave={saveAssignment} onDelete={deleteAssignment} onUpdateTeacher={updateAssignmentTeacher} />}
        {tab === "schedule" && <ScheduleTab assignments={assignments} schedules={schedules} setSchedules={setSchedules} teachers={teachers} availability={availability} teacherByName={teacherByName} />}
      </main>
      <Footer />
      {toast && <Toast msg={toast.msg} tone={toast.tone} />}
    </div>
  );
}

// === HEADER ===
function Header({ tab, setTab, insights, onExport }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const tabs = [
    { id: "dashboard", label: "Tổng quan", Icon: LayoutDashboard },
    { id: "teachers", label: "Giáo viên", Icon: Users },
    { id: "assignments", label: "Phân công", Icon: ClipboardList },
    { id: "schedule", label: "Thời khóa biểu", Icon: Calendar },
  ];
  const alertCount = insights.unassigned.length + insights.wrongCapability.length + insights.conflicts.length + insights.availViolations.length;

  return (
    <header style={{ background: T.surface, borderBottom: `1px solid ${T.border}` }}>
      <div className="max-w-7xl mx-auto px-6 pt-6 pb-0">
        <div className="flex items-baseline justify-between mb-5">
          <div>
            <div style={{ fontFamily: F_DISPLAY, fontSize: 32, fontWeight: 600, lineHeight: 1, letterSpacing: "-0.02em" }}>
              OneSpace <span style={{ color: T.accent, fontStyle: "italic" }}>Astar</span>
            </div>
            <div className="mt-1" style={{ fontSize: 13, color: T.muted, letterSpacing: "0.04em" }}>
              HỆ THỐNG PHÂN CÔNG & XẾP LỊCH GIẢNG DẠY
            </div>
          </div>
          <div className="flex items-center gap-3">
            {alertCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ background: T.dangerLight, color: T.danger, fontSize: 12, fontWeight: 600 }}>
                <AlertTriangle size={14} /> {alertCount} cảnh báo
              </div>
            )}
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)} className="flex items-center gap-1.5 px-3 py-1.5 rounded" style={{ background: T.bg, border: `1px solid ${T.border}`, fontSize: 12, color: T.inkSoft }}>
                <Database size={13} /> Dữ liệu <ChevronDown size={12} />
              </button>
              {menuOpen && (
                <>
                  <div className="fixed inset-0" style={{ zIndex: 40 }} onClick={() => setMenuOpen(false)} />
                  <div className="absolute right-0 mt-1 rounded-lg overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.borderStrong}`, boxShadow: "0 10px 30px rgba(0,0,0,0.1)", zIndex: 50, minWidth: 220 }}>
                    <button onClick={() => { onExport(); setMenuOpen(false); }} className="w-full text-left px-4 py-2.5 flex items-center gap-2" style={{ fontSize: 13 }}>
                      <Download size={13} /> Xuất file backup (JSON)
                    </button>
                  </div>
                </>
              )}
              </div>
          </div>
        </div>
        <nav className="flex gap-1 -mb-px">
          {tabs.map(({ id, label, Icon }) => {
            const active = tab === id;
            return (
              <button key={id} onClick={() => setTab(id)} className="flex items-center gap-2 px-4 py-3"
                style={{
                  fontSize: 14, fontWeight: active ? 600 : 500,
                  color: active ? T.ink : T.muted,
                  borderBottom: active ? `2px solid ${T.accent}` : "2px solid transparent",
                  marginBottom: -1,
                }}>
                <Icon size={16} /> {label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

// === DASHBOARD ===
function Dashboard({ insights, assignments, schedules, teachers }) {
  const stats = [
    { label: "Giáo viên", value: teachers.length, Icon: Users, color: T.teal },
    { label: "Môn cần phân công", value: assignments.length, Icon: BookOpen, color: T.ink },
    { label: "Đã phân GV", value: assignments.filter(a => a.teacher).length, Icon: UserCheck, color: T.sage },
    { label: "Đã xếp TKB", value: schedules.length, Icon: Calendar, color: T.accent },
  ];
  return (
    <div className="space-y-8">
      <SectionHeading eyebrow="Tổng quan" title="Tình hình giảng dạy" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map(({ label, value, Icon, color }) => (
          <div key={label} className="p-5 rounded-lg" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
            <Icon size={18} style={{ color }} />
            <div style={{ fontFamily: F_DISPLAY, fontSize: 38, fontWeight: 600, lineHeight: 1, color, marginTop: 12 }}>{value}</div>
            <div className="mt-2" style={{ fontSize: 13, color: T.inkSoft }}>{label}</div>
          </div>
        ))}
      </div>
      <div className="grid md:grid-cols-2 gap-6">
        <AlertCard title="Lớp chưa có GV" count={insights.unassigned.length} tone="danger"
          items={insights.unassigned.slice(0, 6).map(a => `${hinhthucShort(a.hinhthuc)} • Lớp ${a.grade} • ${a.subject} (${a.program})`)}
          empty="Tất cả lớp đã có GV phụ trách." />
        <AlertCard title="GV chưa đủ năng lực dạy môn" count={insights.wrongCapability.length} tone="amber"
          items={insights.wrongCapability.slice(0, 6).map(a => `${a.teacher} → ${a.subject} (${a.program}) tại ${hinhthucShort(a.hinhthuc)}`)}
          empty="Mọi phân công đều khớp năng lực GV." />
        <AlertCard title="Xung đột giờ dạy của GV" count={insights.conflicts.length} tone="danger"
          items={insights.conflicts.slice(0, 6).map(c => `${c[0].assignment.teacher} bị xếp ${c.length} lớp cùng ${c[0].schedule.day} ${c[0].schedule.slot}`)}
          empty="Không có GV nào bị trùng lịch." />
        <AlertCard title="GV không rảnh slot đã xếp" count={insights.availViolations.length} tone="amber"
          items={insights.availViolations.slice(0, 6).map(v => `${v.assignment.teacher} • ${v.schedule.day} ${v.schedule.slot} → ${v.assignment.subject}`)}
          empty="Mọi lớp đã xếp đều rơi vào slot GV rảnh." />
      </div>
      <div className="p-6 rounded-lg" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-2 mb-4">
          <Sparkles size={16} style={{ color: T.accent }} />
          <h3 style={{ fontFamily: F_DISPLAY, fontSize: 20, fontWeight: 600 }}>Hướng dẫn nhanh</h3>
        </div>
        <div className="grid md:grid-cols-3 gap-5" style={{ fontSize: 13, color: T.inkSoft, lineHeight: 1.55 }}>
          <div><div style={{ color: T.ink, fontWeight: 600, marginBottom: 4 }}>1. Quản lý Giáo viên</div>Thêm/sửa GV, click ô lịch để bật-tắt slot rảnh, tick năng lực dạy theo môn.</div>
          <div><div style={{ color: T.ink, fontWeight: 600, marginBottom: 4 }}>2. Phân công môn</div>Thêm môn-lớp mới, chọn GV từ danh sách app gợi ý theo năng lực.</div>
          <div><div style={{ color: T.ink, fontWeight: 600, marginBottom: 4 }}>3. Xếp TKB</div>Gắn lớp vào ngày + giờ. App tự cảnh báo trùng giờ và GV bận.</div>
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${T.border}`, fontSize: 12, color: T.muted }}>
          💾 <strong>Nhớ backup:</strong> Vào menu "Dữ liệu" ở góc phải để xuất file JSON. Lưu file đó vào Drive/máy để phòng mất dữ liệu khi xóa cache trình duyệt.
        </div>
      </div>
    </div>
  );
}

function AlertCard({ title, count, tone, items, empty }) {
  const colors = { danger: { bg: T.dangerLight, text: T.danger, Icon: AlertTriangle }, amber: { bg: T.amberLight, text: T.amber, Icon: AlertCircle } };
  const c = colors[tone];
  const ok = count === 0;
  return (
    <div className="p-5 rounded-lg" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      <div className="flex items-center justify-between mb-3">
        <h4 style={{ fontFamily: F_DISPLAY, fontSize: 17, fontWeight: 600 }}>{title}</h4>
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full" style={{ background: ok ? T.sageLight : c.bg, color: ok ? T.sage : c.text, fontSize: 12, fontWeight: 600 }}>
          {ok ? <CheckCircle2 size={12} /> : <c.Icon size={12} />} {count}
        </div>
      </div>
      {ok ? <div style={{ fontSize: 13, color: T.muted, fontStyle: "italic" }}>{empty}</div> : (
        <ul className="space-y-1.5" style={{ fontSize: 13, color: T.inkSoft }}>
          {items.map((it, i) => <li key={i} className="flex gap-2"><span style={{ color: c.text }}>—</span><span>{it}</span></li>)}
        </ul>
      )}
    </div>
  );
}

function SectionHeading({ eyebrow, title, action }) {
  return (
    <div className="flex items-end justify-between">
      <div>
        <div style={{ fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: T.accent, fontWeight: 600 }}>{eyebrow}</div>
        <h2 style={{ fontFamily: F_DISPLAY, fontSize: 28, fontWeight: 600, letterSpacing: "-0.01em", marginTop: 4 }}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

// === TEACHERS TAB ===
function TeachersTab({ teachers, availability, assignments, onSave, onDelete }) {
  const [search, setSearch] = useState("");
  const [filterSubject, setFilterSubject] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [editing, setEditing] = useState(null); // { teacher, availability, isNew }

  const filtered = teachers.filter(t => {
    if (search && !t.name.toLowerCase().includes(search.toLowerCase())) return false;
    if (filterLocation !== "all" && !t.locations[filterLocation]) return false;
    if (filterSubject !== "all" && !Object.values(t.subjects).some(p => p[filterSubject] === true)) return false;
    return true;
  });

  const openNew = () => setEditing({ teacher: buildEmptyTeacher(), availability: emptyAvailability(), isNew: true, oldName: null });
  const openEdit = (t) => setEditing({ teacher: JSON.parse(JSON.stringify(t)), availability: JSON.parse(JSON.stringify(availability[t.name] || emptyAvailability())), isNew: false, oldName: t.name });

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Đội ngũ" title={`${teachers.length} giáo viên`}
        action={<button onClick={openNew} className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: T.ink, color: T.surface, fontSize: 13, fontWeight: 500 }}><Plus size={14} /> Thêm giáo viên</button>} />
      <div className="flex flex-wrap gap-3 items-center p-4 rounded-lg" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <div className="flex items-center gap-2 px-3 py-2 rounded flex-1 min-w-64" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
          <Search size={14} style={{ color: T.muted }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm theo tên giáo viên…" className="bg-transparent outline-none flex-1" style={{ fontSize: 14 }} />
        </div>
        <Select label="Môn" value={filterSubject} onChange={setFilterSubject} options={[{ value: "all", label: "Tất cả môn" }, ...ALL_SUBJECTS.map(s => ({ value: s, label: s }))]} />
        <Select label="Cơ sở" value={filterLocation} onChange={setFilterLocation} options={[{ value: "all", label: "Tất cả cơ sở" }, ...LOCATIONS.map(l => ({ value: l, label: l }))]} />
        <div style={{ fontSize: 13, color: T.muted }}>{filtered.length} kết quả</div>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map(t => (
          <TeacherCard key={t.id} teacher={t} availability={availability[t.name]} assignments={assignments.filter(a => a.teacher === t.name)} onEdit={() => openEdit(t)} onDelete={() => onDelete(t)} />
        ))}
      </div>
      {editing && (
        <TeacherEditModal
          initial={editing}
          onSave={(t, av) => { onSave(editing.oldName, t, av); setEditing(null); }}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  );
}

function TeacherCard({ teacher, availability, assignments, onEdit, onDelete }) {
  const locs = Object.entries(teacher.locations).filter(([, v]) => v).map(([k]) => k);
  const capable = [];
  Object.entries(teacher.subjects).forEach(([prog, subs]) => {
    Object.entries(subs).forEach(([sub, can]) => { if (can) capable.push(`${prog} ${sub}`); });
  });
  const uniqCapable = Array.from(new Set(capable));
  const hasAvail = availability && Object.values(availability).some(day => Object.values(day).some(v => v === true));
  return (
    <div className="p-5 rounded-lg group relative" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      <div className="absolute top-3 right-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={onEdit} title="Sửa" className="p-1.5 rounded" style={{ background: T.bg, color: T.inkSoft }}><Pencil size={13} /></button>
        <button onClick={onDelete} title="Xóa" className="p-1.5 rounded" style={{ background: T.bg, color: T.danger }}><Trash2 size={13} /></button>
      </div>
      <div className="mb-3 pr-16">
        <div style={{ fontFamily: F_DISPLAY, fontSize: 20, fontWeight: 600, lineHeight: 1.2 }}>{teacher.name}</div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 2 }}>{teacher.code || "Chưa có mã"} • {teacher.role}</div>
      </div>
      <div className="mb-3">
        <Label>Cơ sở</Label>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {locs.length > 0 ? locs.map(l => <Chip key={l} bg={T.tealLight} color={T.teal}>{l}</Chip>) : <span style={{ fontSize: 12, color: T.muted, fontStyle: "italic" }}>Chưa khai báo</span>}
        </div>
      </div>
      <div className="mb-3">
        <Label>Năng lực giảng dạy ({uniqCapable.length})</Label>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {uniqCapable.length > 0 ? uniqCapable.slice(0, 10).map(s => <Chip key={s} bg={T.sageLight} color={T.sage}>{s}</Chip>) : <span style={{ fontSize: 12, color: T.muted, fontStyle: "italic" }}>Chưa khai báo</span>}
        </div>
      </div>
      <div>
        <Label>Lịch rảnh {assignments.length > 0 && <span style={{ color: T.teal, fontWeight: 700 }}>• {assignments.length} môn được giao</span>}</Label>
        {hasAvail ? <AvailabilityHeatmap availability={availability} /> : <div style={{ fontSize: 12, color: T.amber, fontStyle: "italic", marginTop: 4 }}>Chưa cập nhật lịch — click "Sửa" để thêm</div>}
      </div>
    </div>
  );
}

function AvailabilityHeatmap({ availability, cellSize = 16 }) {
  return (
    <div className="mt-2">
      <div className="flex gap-1" style={{ fontSize: 9, color: T.muted }}>
        {DAYS.map(d => <div key={d} style={{ width: cellSize * SLOTS.length + (SLOTS.length - 1) * 2, textAlign: "center" }}>{d}</div>)}
      </div>
      <div className="flex gap-1 mt-1">
        {DAYS.map(d => (
          <div key={d} className="flex gap-0.5">
            {SLOTS.map(s => (
              <div key={s} title={`${d} ${s}: ${availability?.[d]?.[s] ? "Rảnh" : "Bận"}`}
                style={{ width: cellSize, height: cellSize, background: availability?.[d]?.[s] ? T.sage : T.surfaceAlt, borderRadius: 2 }} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// === TEACHER EDIT MODAL ===
function TeacherEditModal({ initial, onSave, onClose }) {
  const [t, setT] = useState(initial.teacher);
  const [av, setAv] = useState(initial.availability);
  const [step, setStep] = useState("info"); // info / capabilities / availability

  const toggleLocation = (loc) => setT(prev => ({ ...prev, locations: { ...prev.locations, [loc]: !prev.locations[loc] } }));
  const toggleSubject = (prog, sub) => setT(prev => {
    const newSubjects = { ...prev.subjects };
    newSubjects[prog] = { ...newSubjects[prog], [sub]: !newSubjects[prog][sub] };
    // Mirror AS <-> A LEVEL (same teacher capability)
    if (prog === "AS") newSubjects["A LEVEL"] = { ...newSubjects["A LEVEL"], [sub]: !prev.subjects[prog][sub] };
    if (prog === "A LEVEL") newSubjects["AS"] = { ...newSubjects["AS"], [sub]: !prev.subjects[prog][sub] };
    return { ...prev, subjects: newSubjects };
  });
  const toggleSlot = (day, slot) => setAv(prev => ({ ...prev, [day]: { ...prev[day], [slot]: !prev[day][slot] } }));

  const valid = t.name.trim().length > 0;

  const subjectsByProgram = {
    Checkpoint: ["Math", "Science"],
    IGCSE: ["Math", "Science", "Biology", "Chemistry", "Physics"],
    AS: ["Math", "Biology", "Chemistry", "Physics"],
    "A LEVEL": ["Math", "Biology", "Chemistry", "Physics"],
    IB: ["Math", "Biology", "Chemistry", "Physics"],
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ background: "rgba(26,26,26,0.45)", zIndex: 100 }} onClick={onClose}>
      <div className="rounded-lg max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col" style={{ background: T.surface, border: `1px solid ${T.borderStrong}` }} onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt }}>
          <div>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>{initial.isNew ? "Thêm giáo viên mới" : "Sửa thông tin giáo viên"}</div>
            <div style={{ fontFamily: F_DISPLAY, fontSize: 22, fontWeight: 600, marginTop: 2 }}>{t.name || "(chưa đặt tên)"}</div>
          </div>
          <button onClick={onClose} style={{ color: T.muted }}><X size={20} /></button>
        </div>

        <div className="flex" style={{ borderBottom: `1px solid ${T.border}` }}>
          {[
            { id: "info", label: "Thông tin & cơ sở" },
            { id: "capabilities", label: "Năng lực dạy" },
            { id: "availability", label: "Lịch rảnh" },
          ].map((s) => (
            <button key={s.id} onClick={() => setStep(s.id)} className="px-5 py-3"
              style={{
                fontSize: 13, fontWeight: step === s.id ? 600 : 500,
                color: step === s.id ? T.ink : T.muted,
                borderBottom: step === s.id ? `2px solid ${T.accent}` : "2px solid transparent",
                marginBottom: -1,
              }}>{s.label}</button>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 p-6">
          {step === "info" && (
            <div className="space-y-4">
              <Field label="Họ tên">
                <input value={t.name} onChange={(e) => setT({ ...t, name: e.target.value })} className="w-full px-3 py-2 rounded outline-none" style={{ background: T.bg, border: `1px solid ${T.border}`, fontSize: 14 }} placeholder="VD: Nguyễn Văn A" />
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field label="Mã nhân viên">
                  <input value={t.code} onChange={(e) => setT({ ...t, code: e.target.value })} className="w-full px-3 py-2 rounded outline-none" style={{ background: T.bg, border: `1px solid ${T.border}`, fontSize: 14 }} placeholder="VD: T6-0001" />
                </Field>
                <Field label="Chức vụ">
                  <select value={t.role} onChange={(e) => setT({ ...t, role: e.target.value })} className="w-full px-3 py-2 rounded outline-none" style={{ background: T.bg, border: `1px solid ${T.border}`, fontSize: 14, fontFamily: F_BODY }}>
                    <option>Giáo Viên</option><option>Trợ giảng</option><option>Trợ giảng - Admin</option>
                  </select>
                </Field>
              </div>
              <Field label="Cơ sở dạy được">
                <div className="grid grid-cols-2 gap-2 mt-1">
                  {LOCATIONS.map(loc => (
                    <button key={loc} onClick={() => toggleLocation(loc)} className="flex items-center gap-2 px-3 py-2 rounded text-left"
                      style={{ background: t.locations[loc] ? T.tealLight : T.bg, border: `1px solid ${t.locations[loc] ? T.teal : T.border}`, fontSize: 13, color: t.locations[loc] ? T.teal : T.inkSoft, fontWeight: t.locations[loc] ? 600 : 400 }}>
                      {t.locations[loc] ? <CheckCircle2 size={14} /> : <span style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${T.border}` }} />}
                      {loc}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
          )}

          {step === "capabilities" && (
            <div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>Tick các môn GV này có thể dạy. AS và A Level dùng chung (vì cùng GV thường dạy cả hai).</div>
              <div className="rounded-lg overflow-hidden" style={{ border: `1px solid ${T.border}` }}>
                <table className="w-full" style={{ fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: T.surfaceAlt }}>
                      <th style={{ padding: 10, textAlign: "left", fontSize: 11, color: T.muted }}>CHƯƠNG TRÌNH</th>
                      {ALL_SUBJECTS.map(s => <th key={s} style={{ padding: 10, fontSize: 11, color: T.muted }}>{s}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {PROGRAMS.filter(p => p !== "A LEVEL").map(prog => (
                      <tr key={prog} style={{ borderTop: `1px solid ${T.border}` }}>
                        <td style={{ padding: 10, fontWeight: 500 }}>{prog === "AS" ? "AS / A Level" : prog}</td>
                        {ALL_SUBJECTS.map(sub => {
                          const allowed = subjectsByProgram[prog]?.includes(sub);
                          if (!allowed) return <td key={sub} style={{ textAlign: "center", color: T.border }}>—</td>;
                          const on = t.subjects[prog][sub];
                          return (
                            <td key={sub} style={{ textAlign: "center", padding: 6 }}>
                              <button onClick={() => toggleSubject(prog, sub)}
                                style={{ width: 30, height: 30, borderRadius: 6, background: on ? T.sage : T.bg, border: `1.5px solid ${on ? T.sage : T.border}`, color: on ? "white" : T.muted, fontWeight: 700 }}>
                                {on ? "✓" : ""}
                              </button>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {step === "availability" && (
            <div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 12 }}>Click vào ô để bật/tắt slot rảnh.</div>
              <AvailabilityEditor availability={av} onToggle={toggleSlot} />
            </div>
          )}
        </div>

        <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: `1px solid ${T.border}`, background: T.surfaceAlt }}>
          <div style={{ fontSize: 12, color: T.muted }}>{!valid && "⚠️ Cần nhập tên GV trước khi lưu"}</div>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded" style={{ background: T.bg, color: T.inkSoft, fontSize: 13, border: `1px solid ${T.border}` }}>Hủy</button>
            <button onClick={() => onSave(t, av)} disabled={!valid} className="px-4 py-2 rounded flex items-center gap-2"
              style={{ background: valid ? T.ink : T.muted, color: T.surface, fontSize: 13, fontWeight: 500, opacity: valid ? 1 : 0.5 }}>
              <Save size={13} /> Lưu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AvailabilityEditor({ availability, onToggle }) {
  return (
    <div className="rounded-lg overflow-x-auto" style={{ border: `1px solid ${T.border}` }}>
      <table className="w-full" style={{ fontSize: 12 }}>
        <thead>
          <tr style={{ background: T.surfaceAlt }}>
            <th style={{ padding: 8, textAlign: "left", fontSize: 10, color: T.muted, width: 100 }}>KHUNG GIỜ</th>
            {DAYS.map(d => <th key={d} style={{ padding: 8, fontFamily: F_DISPLAY, fontWeight: 600 }}>{d}</th>)}
          </tr>
        </thead>
        <tbody>
          {SLOTS.map(slot => (
            <tr key={slot} style={{ borderTop: `1px solid ${T.border}` }}>
              <td style={{ padding: 8, fontSize: 11, color: T.inkSoft, background: T.bg }}>{slot}</td>
              {DAYS.map(d => {
                const on = availability[d]?.[slot];
                return (
                  <td key={d} style={{ padding: 4, textAlign: "center", borderLeft: `1px solid ${T.border}` }}>
                    <button onClick={() => onToggle(d, slot)}
                      style={{ width: "100%", height: 32, borderRadius: 4, background: on ? T.sage : T.bg, border: `1px solid ${on ? T.sage : T.border}`, color: on ? "white" : T.muted, fontSize: 11, fontWeight: 600 }}>
                      {on ? "Rảnh" : ""}
                    </button>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// === ASSIGNMENTS TAB ===
function AssignmentsTab({ assignments, teachers, onSave, onDelete, onUpdateTeacher }) {
  const [filterHinhthuc, setFilterHinhthuc] = useState("all");
  const [filterProgram, setFilterProgram] = useState("all");
  const [showOnlyIssues, setShowOnlyIssues] = useState(false);
  const [adding, setAdding] = useState(false);
  const teacherByName = useMemo(() => Object.fromEntries(teachers.map(t => [t.name, t])), [teachers]);
  const allHinhthuc = Array.from(new Set([...assignments.map(a => a.hinhthuc), ...HINHTHUCS]));

  const filtered = assignments.filter(a => {
    if (filterHinhthuc !== "all" && a.hinhthuc !== filterHinhthuc) return false;
    if (filterProgram !== "all" && a.program !== filterProgram) return false;
    if (showOnlyIssues) {
      if (!a.teacher) return true;
      const t = teacherByName[a.teacher];
      if (!t) return true;
      return !(teacherCanTeach(t, a.program, a.subject) && teacherTeachesLocation(t, a.hinhthuc));
    }
    return true;
  });

  const grouped = filtered.reduce((acc, a) => { (acc[a.hinhthuc] = acc[a.hinhthuc] || []).push(a); return acc; }, {});

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Phân công môn" title={`${assignments.length} môn theo cơ sở`}
        action={<button onClick={() => setAdding(true)} className="flex items-center gap-2 px-4 py-2 rounded" style={{ background: T.ink, color: T.surface, fontSize: 13, fontWeight: 500 }}><Plus size={14} /> Thêm môn - lớp</button>} />
      <div className="flex flex-wrap gap-3 items-center p-4 rounded-lg" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <Select label="Cơ sở" value={filterHinhthuc} onChange={setFilterHinhthuc} options={[{ value: "all", label: "Tất cả cơ sở" }, ...allHinhthuc.map(h => ({ value: h, label: hinhthucShort(h) }))]} />
        <Select label="Chương trình" value={filterProgram} onChange={setFilterProgram} options={[{ value: "all", label: "Tất cả chương trình" }, ...PROGRAMS.map(p => ({ value: p, label: p }))]} />
        <button onClick={() => setShowOnlyIssues(!showOnlyIssues)} className="px-3 py-2 rounded flex items-center gap-2"
          style={{ fontSize: 13, background: showOnlyIssues ? T.dangerLight : T.bg, color: showOnlyIssues ? T.danger : T.inkSoft, border: `1px solid ${showOnlyIssues ? T.danger : T.border}`, fontWeight: 500 }}>
          <AlertTriangle size={13} /> Chỉ hiển thị có vấn đề
        </button>
        <div style={{ fontSize: 13, color: T.muted, marginLeft: "auto" }}>{filtered.length} kết quả</div>
      </div>

      {Object.entries(grouped).map(([hinhthuc, items]) => (
        <div key={hinhthuc} className="rounded-lg overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
          <div className="px-5 py-3 flex items-center gap-2" style={{ background: T.surfaceAlt, borderBottom: `1px solid ${T.border}` }}>
            <MapPin size={14} style={{ color: T.accent }} />
            <span style={{ fontFamily: F_DISPLAY, fontSize: 18, fontWeight: 600 }}>{hinhthucShort(hinhthuc)}</span>
            <span style={{ fontSize: 12, color: T.muted, marginLeft: "auto" }}>{items.length} môn</span>
          </div>
          <table className="w-full" style={{ fontSize: 13 }}>
            <thead>
              <tr style={{ background: T.bg }}>
                <Th>Chương trình</Th><Th>Lớp</Th><Th>Môn</Th>
                <Th style={{ width: 280 }}>Giáo viên</Th>
                <Th>Trạng thái</Th><Th style={{ width: 40 }}></Th>
              </tr>
            </thead>
            <tbody>
              {items.map(a => {
                const t = a.teacher ? teacherByName[a.teacher] : null;
                const capOk = t && teacherCanTeach(t, a.program, a.subject);
                const locOk = t && teacherTeachesLocation(t, a.hinhthuc);
                const status = !a.teacher ? "missing" : (!capOk ? "wrong-subject" : (!locOk ? "wrong-location" : "ok"));
                return (
                  <tr key={a.id} style={{ borderTop: `1px solid ${T.border}` }}>
                    <Td>{a.program}</Td><Td>Lớp {a.grade}</Td><Td><span style={{ fontWeight: 500 }}>{a.subject}</span></Td>
                    <Td><TeacherPicker value={a.teacher} onChange={(n) => onUpdateTeacher(a.id, n)} teachers={teachers} program={a.program} subject={a.subject} hinhthuc={a.hinhthuc} /></Td>
                    <Td><StatusBadge status={status} /></Td>
                    <Td><button onClick={() => onDelete(a)} title="Xóa" style={{ color: T.danger, padding: 4 }}><Trash2 size={13} /></button></Td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ))}

      {adding && <AssignmentAddModal onSave={(a) => { onSave(a); setAdding(false); }} onClose={() => setAdding(false)} teachers={teachers} />}
    </div>
  );
}

function AssignmentAddModal({ onSave, onClose, teachers }) {
  const [hinhthuc, setHinhthuc] = useState("Offline Times City");
  const [program, setProgram] = useState("Checkpoint");
  const [grade, setGrade] = useState(6);
  const [subject, setSubject] = useState("Math");
  const [teacher, setTeacher] = useState(null);

  const gradesByProgram = { Checkpoint: [6, 7, 8], IGCSE: [9, 10], AS: [11], "A LEVEL": [12], IB: [11, 12] };
  const subjectsByProgram = { Checkpoint: ["Math", "Science"], IGCSE: ["Math", "Biology", "Chemistry", "Physics"], AS: ["Math", "Biology", "Chemistry", "Physics"], "A LEVEL": ["Math", "Biology", "Chemistry", "Physics"], IB: ["Math", "Biology", "Chemistry", "Physics"] };

  useEffect(() => {
    const g = gradesByProgram[program]?.[0];
    if (g !== undefined) setGrade(g);
    const s = subjectsByProgram[program]?.[0];
    if (s) setSubject(s);
  }, [program]);

  const save = () => {
    onSave({ id: newId("a"), hinhthuc, program, grade: Number(grade), subject, teacher });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ background: "rgba(26,26,26,0.45)", zIndex: 100 }} onClick={onClose}>
      <div className="rounded-lg max-w-lg w-full overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.borderStrong}` }} onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt }}>
          <div style={{ fontFamily: F_DISPLAY, fontSize: 20, fontWeight: 600 }}>Thêm môn - lớp mới</div>
          <button onClick={onClose} style={{ color: T.muted }}><X size={20} /></button>
        </div>
        <div className="p-6 space-y-4">
          <Field label="Cơ sở / Hình thức">
            <select value={hinhthuc} onChange={(e) => setHinhthuc(e.target.value)} className="w-full px-3 py-2 rounded outline-none" style={{ background: T.bg, border: `1px solid ${T.border}`, fontSize: 14, fontFamily: F_BODY }}>
              {HINHTHUCS.map(h => <option key={h} value={h}>{h}</option>)}
            </select>
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="Chương trình">
              <select value={program} onChange={(e) => setProgram(e.target.value)} className="w-full px-3 py-2 rounded outline-none" style={{ background: T.bg, border: `1px solid ${T.border}`, fontSize: 14, fontFamily: F_BODY }}>
                {PROGRAMS.map(p => <option key={p}>{p}</option>)}
              </select>
            </Field>
            <Field label="Lớp">
              <select value={grade} onChange={(e) => setGrade(e.target.value)} className="w-full px-3 py-2 rounded outline-none" style={{ background: T.bg, border: `1px solid ${T.border}`, fontSize: 14, fontFamily: F_BODY }}>
                {(gradesByProgram[program] || []).map(g => <option key={g} value={g}>Lớp {g}</option>)}
              </select>
            </Field>
            <Field label="Môn">
              <select value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full px-3 py-2 rounded outline-none" style={{ background: T.bg, border: `1px solid ${T.border}`, fontSize: 14, fontFamily: F_BODY }}>
                {(subjectsByProgram[program] || []).map(s => <option key={s}>{s}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Giáo viên phụ trách (có thể bỏ trống, gán sau)">
            <TeacherPicker value={teacher} onChange={setTeacher} teachers={teachers} program={program} subject={subject} hinhthuc={hinhthuc} />
          </Field>
        </div>
        <div className="px-6 py-4 flex justify-end gap-2" style={{ borderTop: `1px solid ${T.border}`, background: T.surfaceAlt }}>
          <button onClick={onClose} className="px-4 py-2 rounded" style={{ background: T.bg, color: T.inkSoft, fontSize: 13, border: `1px solid ${T.border}` }}>Hủy</button>
          <button onClick={save} className="px-4 py-2 rounded flex items-center gap-2" style={{ background: T.ink, color: T.surface, fontSize: 13, fontWeight: 500 }}><Save size={13} /> Thêm</button>
        </div>
      </div>
    </div>
  );
}

function TeacherPicker({ value, onChange, teachers, program, subject, hinhthuc }) {
  const [open, setOpen] = useState(false);
  const eligible = teachers.filter(t => teacherCanTeach(t, program, subject) && teacherTeachesLocation(t, hinhthuc));
  const others = teachers.filter(t => !eligible.includes(t));
  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)} className="w-full text-left px-3 py-1.5 rounded flex items-center justify-between gap-2"
        style={{ fontSize: 13, background: T.bg, border: `1px solid ${T.border}`, color: value ? T.ink : T.muted }}>
        <span>{value || "Chưa chọn GV…"}</span><ChevronDown size={14} style={{ color: T.muted }} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0" style={{ zIndex: 40 }} onClick={() => setOpen(false)} />
          <div className="absolute left-0 right-0 mt-1 rounded-lg overflow-hidden max-h-72 overflow-y-auto" style={{ background: T.surface, border: `1px solid ${T.borderStrong}`, boxShadow: "0 10px 30px rgba(0,0,0,0.08)", zIndex: 50 }}>
            <div className="px-3 py-1.5" style={{ background: T.sageLight, fontSize: 10, color: T.sage, fontWeight: 700, letterSpacing: "0.08em" }}>
              GỢI Ý ({eligible.length} GV ĐỦ NĂNG LỰC + DẠY CƠ SỞ NÀY)
            </div>
            {eligible.length === 0 ? (
              <div className="px-3 py-2" style={{ fontSize: 12, color: T.muted, fontStyle: "italic" }}>Không có GV đủ điều kiện.</div>
            ) : eligible.map(t => (
              <button key={t.id} onClick={() => { onChange(t.name); setOpen(false); }} className="w-full text-left px-3 py-2 flex items-center justify-between"
                style={{ fontSize: 13, background: value === t.name ? T.tealLight : "transparent" }}>
                <span>{t.name}</span>{value === t.name && <CheckCircle2 size={13} style={{ color: T.teal }} />}
              </button>
            ))}
            {others.length > 0 && (
              <>
                <div className="px-3 py-1.5" style={{ background: T.amberLight, fontSize: 10, color: T.amber, fontWeight: 700, letterSpacing: "0.08em" }}>KHÔNG ĐỦ ĐIỀU KIỆN</div>
                {others.map(t => (
                  <button key={t.id} onClick={() => { onChange(t.name); setOpen(false); }} className="w-full text-left px-3 py-2 flex items-center justify-between" style={{ fontSize: 13, color: T.muted }}>
                    <span>{t.name}</span><span style={{ fontSize: 10 }}>{teacherCanTeach(t, program, subject) ? "Khác cơ sở" : "Thiếu môn"}</span>
                  </button>
                ))}
              </>
            )}
            {value && <button onClick={() => { onChange(null); setOpen(false); }} className="w-full text-left px-3 py-2" style={{ fontSize: 12, color: T.danger, borderTop: `1px solid ${T.border}` }}>✕ Bỏ phân công</button>}
          </div>
        </>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    ok: { label: "Hợp lệ", bg: T.sageLight, color: T.sage, Icon: CheckCircle2 },
    missing: { label: "Thiếu GV", bg: T.dangerLight, color: T.danger, Icon: UserX },
    "wrong-subject": { label: "Sai môn", bg: T.amberLight, color: T.amber, Icon: AlertTriangle },
    "wrong-location": { label: "Sai cơ sở", bg: T.amberLight, color: T.amber, Icon: AlertTriangle },
  };
  const s = map[status];
  return <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full" style={{ background: s.bg, color: s.color, fontSize: 11, fontWeight: 600 }}><s.Icon size={11} /> {s.label}</span>;
}

// === SCHEDULE TAB ===
function ScheduleTab({ assignments, schedules, setSchedules, teachers, availability, teacherByName }) {
  const [filterHinhthuc, setFilterHinhthuc] = useState(assignments[0]?.hinhthuc || "all");
  const [filterTeacher, setFilterTeacher] = useState("all");
  const [modalSlot, setModalSlot] = useState(null);
  const allHinhthuc = Array.from(new Set(assignments.map(a => a.hinhthuc)));
  const allTeachers = Array.from(new Set(assignments.filter(a => a.teacher).map(a => a.teacher))).sort();
  const baseAssignments = filterHinhthuc === "all" ? assignments : assignments.filter(a => a.hinhthuc === filterHinhthuc);
  const visibleAssignments = filterTeacher === "all" ? baseAssignments : baseAssignments.filter(a => a.teacher === filterTeacher);
  const visibleSchedules = schedules.filter(s => visibleAssignments.some(a => a.id === s.assignmentId));

  const cellMap = {};
  visibleSchedules.forEach(s => {
    const key = `${s.day}|${s.slot}`;
    if (!cellMap[key]) cellMap[key] = [];
    const a = assignments.find(x => x.id === s.assignmentId);
    cellMap[key].push({ schedule: s, assignment: a });
  });

  const globalSlotMap = {};
  schedules.forEach(s => {
    const a = assignments.find(x => x.id === s.assignmentId);
    if (!a?.teacher) return;
    const k = `${a.teacher}|${s.day}|${s.slot}`;
    globalSlotMap[k] = (globalSlotMap[k] || 0) + 1;
  });

  const addSchedule = (aId, day, slot) => setSchedules(prev => [...prev, { id: newId("sch"), assignmentId: aId, day, slot }]);
  const removeSchedule = (id) => setSchedules(prev => prev.filter(s => s.id !== id));

  return (
    <div className="space-y-6">
      <SectionHeading eyebrow="Thời khóa biểu" title="Lịch dạy theo tuần" />
      <div className="flex flex-wrap gap-3 items-center p-4 rounded-lg" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <Select label="Cơ sở" value={filterHinhthuc} onChange={setFilterHinhthuc} options={[{ value: "all", label: "Tất cả cơ sở" }, ...allHinhthuc.map(h => ({ value: h, label: hinhthucShort(h) }))]} />
        <Select label="GV" value={filterTeacher} onChange={setFilterTeacher} options={[{ value: "all", label: "Tất cả GV" }, ...allTeachers.map(t => ({ value: t, label: t }))]} />
        <div style={{ fontSize: 13, color: T.muted, marginLeft: "auto" }}>{visibleSchedules.length} lớp đã xếp / {visibleAssignments.filter(a => a.teacher).length} cần xếp</div>
      </div>

      <div className="rounded-lg overflow-hidden" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
        <div className="overflow-x-auto">
          <table className="w-full" style={{ fontSize: 12 }}>
            <thead>
              <tr style={{ background: T.surfaceAlt }}>
                <th style={{ padding: 10, textAlign: "left", fontSize: 11, color: T.muted, fontWeight: 600, width: 110 }}>KHUNG GIỜ</th>
                {DAYS.map(d => <th key={d} style={{ padding: 10, fontSize: 12, fontFamily: F_DISPLAY, fontWeight: 600 }}>{d}</th>)}
              </tr>
            </thead>
            <tbody>
              {SLOTS.map(slot => (
                <tr key={slot} style={{ borderTop: `1px solid ${T.border}` }}>
                  <td style={{ padding: 8, fontSize: 11, color: T.inkSoft, fontWeight: 500, background: T.bg, verticalAlign: "top" }}>{slot}</td>
                  {DAYS.map(day => {
                    const items = cellMap[`${day}|${slot}`] || [];
                    return (
                      <td key={day} style={{ padding: 4, verticalAlign: "top", minWidth: 130, borderLeft: `1px solid ${T.border}` }}>
                        <div className="space-y-1">
                          {items.map(({ schedule, assignment }) => {
                            const av = assignment.teacher && availability[assignment.teacher];
                            const conflict = assignment.teacher && globalSlotMap[`${assignment.teacher}|${day}|${slot}`] > 1;
                            const notFree = av && av[day]?.[slot] === false;
                            const tone = conflict ? "danger" : (notFree ? "amber" : "ok");
                            const tc = { ok: { bg: T.tealLight, border: T.teal, text: T.teal }, amber: { bg: T.amberLight, border: T.amber, text: T.amber }, danger: { bg: T.dangerLight, border: T.danger, text: T.danger } }[tone];
                            return (
                              <div key={schedule.id} className="p-2 rounded relative group" style={{ background: tc.bg, borderLeft: `3px solid ${tc.border}`, fontSize: 11 }}>
                                <div style={{ fontWeight: 600, color: T.ink }}>{assignment.subject} • Lớp {assignment.grade}</div>
                                <div style={{ color: T.inkSoft, marginTop: 1 }}>{assignment.teacher || "Chưa có GV"}</div>
                                <div style={{ fontSize: 9, color: T.muted, marginTop: 1 }}>{hinhthucShort(assignment.hinhthuc)}</div>
                                {(conflict || notFree) && (
                                  <div className="flex items-center gap-1 mt-1" style={{ fontSize: 9, color: tc.text, fontWeight: 600 }}>
                                    <AlertTriangle size={9} /> {conflict ? "Trùng giờ GV" : "GV không rảnh"}
                                  </div>
                                )}
                                <button onClick={() => removeSchedule(schedule.id)} className="absolute top-1 right-1 opacity-0 group-hover:opacity-100" style={{ color: T.danger }}><X size={11} /></button>
                              </div>
                            );
                          })}
                          <button onClick={() => setModalSlot({ day, slot })} className="w-full py-1.5 rounded flex items-center justify-center gap-1"
                            style={{ fontSize: 10, color: T.muted, background: "transparent", border: `1px dashed ${T.border}` }}>
                            <Plus size={10} /> Thêm
                          </button>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3" style={{ fontSize: 12 }}>
        <Legend color={T.teal} bg={T.tealLight} label="Lớp xếp đúng" />
        <Legend color={T.amber} bg={T.amberLight} label="GV không rảnh slot này" />
        <Legend color={T.danger} bg={T.dangerLight} label="GV bị trùng giờ" />
      </div>

      {modalSlot && (
        <AddScheduleModal day={modalSlot.day} slot={modalSlot.slot}
          assignments={visibleAssignments.filter(a => a.teacher)} schedules={schedules} availability={availability} allAssignments={assignments}
          onAdd={(aId) => { addSchedule(aId, modalSlot.day, modalSlot.slot); setModalSlot(null); }}
          onClose={() => setModalSlot(null)} />
      )}
    </div>
  );
}

function AddScheduleModal({ day, slot, assignments, schedules, availability, allAssignments, onAdd, onClose }) {
  const [search, setSearch] = useState("");
  const annotated = assignments.map(a => {
    const alreadyScheduled = schedules.some(s => s.assignmentId === a.id);
    const av = availability[a.teacher];
    const free = av && av[day]?.[slot] === true;
    const teacherBusy = schedules.some(s => {
      const aa = allAssignments.find(x => x.id === s.assignmentId);
      return aa && aa.teacher === a.teacher && s.day === day && s.slot === slot;
    });
    return { a, alreadyScheduled, free, teacherBusy };
  });
  const filtered = annotated.filter(({ a }) => !search || `${a.subject} ${a.grade} ${a.teacher} ${a.program}`.toLowerCase().includes(search.toLowerCase()));
  filtered.sort((x, y) => ((x.free ? 0 : 1) + (x.teacherBusy ? 2 : 0) + (x.alreadyScheduled ? 4 : 0)) - ((y.free ? 0 : 1) + (y.teacherBusy ? 2 : 0) + (y.alreadyScheduled ? 4 : 0)));

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4" style={{ background: "rgba(26,26,26,0.45)", zIndex: 100 }} onClick={onClose}>
      <div className="rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col" style={{ background: T.surface, border: `1px solid ${T.borderStrong}` }} onClick={(e) => e.stopPropagation()}>
        <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${T.border}`, background: T.surfaceAlt }}>
          <div>
            <div style={{ fontSize: 11, color: T.muted, letterSpacing: "0.08em", textTransform: "uppercase" }}>Thêm lớp vào khung giờ</div>
            <div style={{ fontFamily: F_DISPLAY, fontSize: 22, fontWeight: 600, marginTop: 2 }}>{day} • {slot}</div>
          </div>
          <button onClick={onClose} style={{ color: T.muted }}><X size={20} /></button>
        </div>
        <div className="p-4" style={{ borderBottom: `1px solid ${T.border}` }}>
          <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: T.bg, border: `1px solid ${T.border}` }}>
            <Search size={14} style={{ color: T.muted }} />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Tìm lớp / môn / GV…" className="bg-transparent outline-none flex-1" style={{ fontSize: 14 }} autoFocus />
          </div>
        </div>
        <div className="overflow-y-auto flex-1">
          {filtered.length === 0 ? (
            <div className="p-8 text-center" style={{ color: T.muted, fontSize: 13 }}>Không có lớp phù hợp.</div>
          ) : filtered.map(({ a, alreadyScheduled, free, teacherBusy }) => {
            const warn = !free || teacherBusy || alreadyScheduled;
            return (
              <button key={a.id} onClick={() => !alreadyScheduled && onAdd(a.id)} disabled={alreadyScheduled}
                className="w-full text-left px-4 py-3 flex items-center justify-between gap-3"
                style={{ borderBottom: `1px solid ${T.border}`, opacity: alreadyScheduled ? 0.55 : 1, cursor: alreadyScheduled ? "not-allowed" : "pointer", background: warn && !alreadyScheduled ? "rgba(212, 160, 86, 0.05)" : "transparent" }}>
                <div className="flex-1">
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{a.subject} • Lớp {a.grade} <span style={{ color: T.muted, fontWeight: 400 }}>({a.program})</span></div>
                  <div style={{ fontSize: 12, color: T.inkSoft, marginTop: 2 }}>{a.teacher} • {hinhthucShort(a.hinhthuc)}</div>
                </div>
                <div>
                  {alreadyScheduled && <Chip bg={T.surfaceAlt} color={T.muted}>Đã xếp lịch khác</Chip>}
                  {!alreadyScheduled && teacherBusy && <Chip bg={T.dangerLight} color={T.danger}>GV trùng giờ</Chip>}
                  {!alreadyScheduled && !teacherBusy && !free && <Chip bg={T.amberLight} color={T.amber}>GV không rảnh</Chip>}
                  {!alreadyScheduled && !teacherBusy && free && <Chip bg={T.sageLight} color={T.sage}>GV rảnh</Chip>}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// === SHARED UI ===
function Field({ label, children }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}
function Select({ label, value, onChange, options }) {
  return (
    <div className="flex items-center gap-2">
      <Filter size={12} style={{ color: T.muted }} />
      <span style={{ fontSize: 11, color: T.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="px-2 py-1.5 rounded outline-none"
        style={{ fontSize: 13, background: T.bg, border: `1px solid ${T.border}`, color: T.ink, fontFamily: F_BODY }}>
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );
}
function Chip({ children, bg, color }) {
  return <span style={{ background: bg, color, padding: "3px 8px", borderRadius: 999, fontSize: 11, fontWeight: 500, display: "inline-block" }}>{children}</span>;
}
function Label({ children }) {
  return <div style={{ fontSize: 10, letterSpacing: "0.08em", color: T.muted, fontWeight: 600, textTransform: "uppercase" }}>{children}</div>;
}
function Th({ children, style }) {
  return <th style={{ padding: "10px 14px", textAlign: "left", fontSize: 11, color: T.muted, fontWeight: 600, letterSpacing: "0.05em", textTransform: "uppercase", ...style }}>{children}</th>;
}
function Td({ children }) {
  return <td style={{ padding: "10px 14px", verticalAlign: "middle" }}>{children}</td>;
}
function Legend({ color, bg, label }) {
  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded" style={{ background: T.surface, border: `1px solid ${T.border}` }}>
      <span style={{ width: 12, height: 12, borderRadius: 2, background: bg, borderLeft: `3px solid ${color}`, display: "inline-block" }} />
      <span style={{ color: T.inkSoft }}>{label}</span>
    </div>
  );
}
function Toast({ msg, tone }) {
  const colors = { ok: { bg: T.sage, color: "white" }, danger: { bg: T.danger, color: "white" } }[tone] || { bg: T.ink, color: "white" };
  return (
    <div className="fixed bottom-6 left-1/2 px-5 py-3 rounded-lg" style={{ transform: "translateX(-50%)", background: colors.bg, color: colors.color, fontSize: 13, fontWeight: 500, boxShadow: "0 10px 25px rgba(0,0,0,0.2)", zIndex: 200 }}>
      {msg}
    </div>
  );
}
function Footer() {
  return (
    <footer className="max-w-7xl mx-auto px-6 py-6" style={{ fontSize: 11, color: T.muted, borderTop: `1px solid ${T.border}`, marginTop: 32 }}>
      <div className="flex justify-between items-center">
        <span>OneSpace Astar • Hệ thống nội bộ phân công & xếp lịch giảng dạy</span>
        <span>Dữ liệu lưu cục bộ — backup thường xuyên qua menu Dữ liệu</span>
      </div>
    </footer>
  );
}
