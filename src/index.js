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
    const { mode = 'xici' , timeout = 1000 } = data
    const t = isNaN(timeout) ? 1000 : Number.parseInt(timeout)
    checkProxies({ socket, t, ...await proxyController(mode === 'xici' ? 1 : 2)})
  })
})

app.listen(process.env.PORT || PORT, err => {
  if (err) {
    console.log(err)
  } else {
    console.log('端口已经打开')
  }
})

