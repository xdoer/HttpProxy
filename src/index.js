const router = require('./proxy/router')
const { createServer } = require('http')
const checkProxies = require('./proxy/checkProxies')
const proxyController = require('./proxy/proxyController')
const app = createServer(router)
const io = require('socket.io')(app)

io.on('connection', async function (socket) {
  socket.emit('news', {
    state: true,
    data: '连接已建立',
    msg: '成功'
  })
  await checkProxies({ socket, t: 1000, ...await proxyController(1) })
  await checkProxies({ socket, t: 1000, ...await proxyController(2) })
})

app.listen(80, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('端口已经打开')
  }
})

