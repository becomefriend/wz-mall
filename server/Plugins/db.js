// 数据库连接文件
module.exports=app=>{
    const mongoose=require('mongoose')
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser:true
    })
    // 将一个文件里面的所有东西引用一次
require('require-all')(__dirname+'/../models')
}