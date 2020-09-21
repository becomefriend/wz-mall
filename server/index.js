const express=require('express')

const app=express()
app.set('secret','sdfsfsfsdsdfgn')
app.use(require('cors')())
app.use(express.json())
// 图片上传静态文件托管
app.use('/uploads',express.static(__dirname+'/uploads'))
require('./Plugins/db')(app)
require('./routes/admin/index')(app)
require('./routes/web')(app)

app.listen(3000,()=>{
    console.log('服务器启动')
})