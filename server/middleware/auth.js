// 登录校验中间件
module.exports=options=>{
    // 引入token模块
    const jwt=require('jsonwebtoken')
    //根据用户名找用户
    const assert=require('http-assert')
    const AdminUser=require('../models/AdminUser')
    return async (req,res,next)=>{
        // 中间件校验用户获取数据
        const token=String(req.headers.authorization || ' ').split(' ').pop()
        console.log(token)
        assert(token,401,'请先登录')
        // if(!token){
        //     return res.status(401).send({
        //         message:'请提供jwt token'
        //     })
        // }
        const {id}=jwt.verify(token,req.app.get('secret'))
        assert(id,401,'请先登录')
        // if(!id){
        //     return res.status(401).send({
        //         message:'无效的jwt token'
        //     })
        // }
        // assert(id,401,'无效的jwt token')
        req.user=await AdminUser.findById(id)
        assert(req.user,401,'请先登录')
        // if(!id){
        //     return res.status(401).send({
        //         message:'请先登录'
        //     })
        // }
        console.log(req.user)
        await next()
    }
}