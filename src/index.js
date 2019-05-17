const router = require('./proxy/router')
const { createServer } = require('http')
const checkProxies = require('./proxy/checkProxies')
const proxyController = require('./proxy/proxyController')
const isNaN = require('./utils/isNaN')
const { PORT } = require('./config')
const app = createServer(router)
const io = require('socket.io')(app)

io.on('connection', async function (socket) {
  socket.emit('news', {
    state: true,
    data: '连接已建立',
    msg: '成功'
  })
  socket.on('proxy', async data => {
    let { mode = 'xici' , timeout = 1000 } = data
    timeout = Number.parseInt(timeout)
    const t = isNaN(timeout) ? 1000 : [500, 1000, 2000, 5000].indexOf(timeout) === -1 ? 1000 : timeout 
    await checkProxies({ socket, t, ...await proxyController(mode)})
    socket.emit('checkDown')
  })
})

app.listen(process.env.PORT || PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('端口已经打开')
  }
})

