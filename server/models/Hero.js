// 数据库新建英雄模型文件
const mongoose=require('mongoose')
const schema= new mongoose.Schema({
    name:{type:String},
    avatar:{type:String},
    banner:{type:String},
    title:{type:String},
    // 英雄定位查询
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    // 评分
    scores:{
        // 难度
        difficult:{type:Number},
        // 技能
        skill:{type:Number},
        // 攻击
        attack:{type:Number},
        // 生存
        survive:{type:Number},

    },
    // 技能介绍
    skills:[{
        icon:{type:String},
        name:{type:String},
        description:{type:String},
        tips:{type:String},
        delay:{type:String},
        cost:{type:String},

    }],
    // 出装
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    // 技巧
    usageTips:{type:String},
    battleTips:{type:String},
    teamTips:{type:String},
// 英雄关系
    partners:[{
        hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
        description:{type:String},
    }]
})
module.exports=mongoose.model('Hero',schema,'heroes')