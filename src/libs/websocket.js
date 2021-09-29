let websock = null
let websocketOpenOk = null
let messageCallback = null
let errorCallback = null
let wsUrl = 'ws://127.0.0.1:8088/wechat-mvc/websocket'
let token = null
let tryTime = 0

// 接收ws后端返回的数据
function websocketOnmessage(e) {
  const data =  JSON.parse(e.data);
  console.log("收到消息");
  console.log(data);
  messageCallback(data.url,data.body);
}

/**
 * 发起websocket连接
 *
 * @param {Object} agentData 需要向后台传递的参数数据
 */
function websocketSend(agentData) {
  // 加延迟是为了尽量让ws连接状态变为OPEN   
  setTimeout(() => {
    // 添加状态判断，当为OPEN时，发送消息
    if (websock.readyState === websock.OPEN) { // websock.OPEN = 1 
      // 发给后端的数据需要字符串化
      websock.send(agentData)
    }
    if (websock.readyState === websock.CLOSED) { // websock.CLOSED = 3 
      console.log('websock.readyState=3')
      // Message.error('ws连接异常，请稍候重试')
      errorCallback()
    }
  }, 500)
}

// 关闭ws连接
function websocketclose(e) {
  // e.code === 1000  表示正常关闭。 无论为何目的而创建, 该链接都已成功完成任务。
  // e.code !== 1000  表示非正常关闭。
  if (e && e.code !== 1000) {
    // Message.error('ws连接异常，请稍候重试')
    errorCallback()
    // // 如果需要设置异常重连则可替换为下面的代码，自行进行测试
    // if (tryTime < 10) {
    //   setTimeout(function() {
    //    websock = null
    //    tryTime++
    //    initWebSocket()
    //    console.log(`第${tryTime}次重连`)
    //  }, 3 * 1000)
    //} else {
    //  Message.error('重连失败！请稍后重试')
    //}
  }
}
// 建立ws连接
function websocketOpen(e) {
  console.log('连接成功')
  websocketOpenOk(e);
}

// 初始化weosocket
function initWebSocket() {
  if (typeof (WebSocket) === 'undefined') {
    alert('您的浏览器不支持WebSocket，无法获取数据');
    return false
  }
  // ws请求完整地址
  websock = new WebSocket(wsUrl, token)

  websock.onmessage = function (e) {
    websocketOnmessage(e)
  }
  websock.onopen = function () {
    websocketOpen()
  }
  websock.onerror = function () {
    errorCallback()
  }
  websock.onclose = function (e) {
    websocketclose(e)
  }
}

/**
 * 发起websocket请求函数
 *
 * @param {string} url ws连接地址
 * @param {string} open ws连接成功回调
 * @param {function} successCallback 接收到ws数据，对数据进行处理的回调函数
 * @param {function} errCallback ws连接错误的回调函数
 */
export function bulidWebsocket(url, reqtoken, open, successCallback, errCallback) {
  wsUrl = url
  token = reqtoken;
  messageCallback = successCallback;
  errorCallback = errCallback;
  websocketOpenOk = open;
  initWebSocket()
}

/**
 * 发起websocket请求函数
 *
 * @param {Object} agentData 传给后台的参数
 */
export function sendMessage(agentData) {
  websocketSend(JSON.stringify(agentData));
}


/**
 * 关闭websocket函数
 */
export function closeWebsocket() {
  if (websock) {
    websock.close()
    websock.onclose()
  }
}
