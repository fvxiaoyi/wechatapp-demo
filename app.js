//app.js
let COS = require('utils/cos-wx-sdk-v5.js')
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })

    
    var cos = new COS({
      // path style 指正式请求时，Bucket 是在 path 里，这样用途相同园区多个 bucket 只需要配置一个园区域名
      // ForcePathStyle: true,
      getAuthorization: function (options, callback) {
        var authorization = COS.getAuthorization({
          SecretId: 'AKIDOhpocFk2LaowsepeswrdGk4C8sRoRAB1',
          SecretKey: 'kJhttmUzK1fIk05ygEbmlY9ZqwqY5QZW',
          Method: options.Method,
          Pathname: options.Pathname,
          Query: options.Query,
          Headers: options.Headers,
          Expires: 60,
        });
        callback({
          Authorization: authorization,
          // XCosSecurityToken: credentials.sessionToken, // 如果使用临时密钥，需要传 XCosSecurityToken
        });
      }
    });
    this.globalData.cos = cos
  },
  globalData: {
    userInfo: null,
    cos: null
  }
})