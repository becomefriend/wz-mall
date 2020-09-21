module.exports=app=>{
    const express=require('express')
    // 引入token模块
    const jwt=require('jsonwebtoken')
    //根据用户名找用户
    const assert=require('http-assert')
    const AdminUser=require('../../models/AdminUser')
    const router=express.Router({
        // 父级参数合并到路由里面
        mergeParams:true
    })
    // 登录校验中间件
    const auth=require('../../middleware/auth')
    //创建资源接口
    router.post('/',async(req,res)=>{

         const model=await req.Model.create(req.body)
        res.send(model)
    })
    //修改资源接口
    router.put('/:id',async(req,res)=>{
        const model=await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)

    })
    //删除资源接口
    router.delete('/:id',async(req,res)=>{
        const model=await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send(model)
        // res.send({
        //     success:true
        // })
    })
    // 分类列表接口
    router.get('/',auth(),async(req,res)=>{
        // 查询10条数据populate('parent')关联查询操作
         const queryOptions={}
if(req.Model.modelName==='Category'){
    queryOptions.populate='parent'
}
        const items=await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })
    //获取详情页的接口
    router.get('/:id',async(req,res)=>{
        // 查询10条数据
        const model=await req.Model.findById(req.params.id)
        res.send(model)
    })

    // 这套接口后面可以跟任意字符
app.use('/admin/api/rest/:resource',auth(),async(req,res,next)=>{
    // 设置中间间预处理接口
    // inflection包转类名，复数变单数
    const modelName=require('inflection').classify(req.params.resource)
    // 给请求对象挂载model
    req.Model=require(`../../models/${modelName}`)
    next()
},router)
    // 上传文件的中间件包
    const multer =require('multer')
    const upload=multer({dest:__dirname+'/../../uploads'})
    app.post('/admin/api/upload',auth(),upload.single('file'), async (req,res)=>{
     const file=req.file
        // 返回的文件地址
        file.url=`http://localhost:3000/uploads/${file.filename}`
        res.send(file)
 })
    // 登录的路由
    app.post('/admin/api/login',async (req,res)=>{
           const {username,password}=req.body
           const user=await AdminUser.findOne({username:username}).select('+password')
        assert(user,422,'用户名不存在')
           // if(!user){
           //     return res.status(422).send({
           //         message:'用户名不存在,请联系管理员注册'
           //     })
           // }
        // 校验密码
         const isValid=require('bcryptjs').compareSync(password,user.password)
         if(!isValid){
          return res.status(422).send({
                message:'密码错误'
          })
         }
          //  返回token

           const token=jwt.sign({id:user._id},app.get('secret'))
        res.send({token})
    })
    //错误处理函数
    app.use(async (err,req,res,next)=>{
     res.status(err.statusCode||500).send({
         message:err.message
     })
    })
}