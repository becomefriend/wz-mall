// 数据库新建管理员模型文件
const mongoose=require('mongoose')
const schema= new mongoose.Schema({
    username:{type:String},
    // 密码不会被显示出来，不会
    // select:false,
    password:{type:String,select:false,set(val){ return require('bcryptjs').hashSync(val,10)}}

})
module.exports=mongoose.model('AdminUser',schema)