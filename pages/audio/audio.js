// pages/audio/audio.js
let interval, time = 0
let COS = require('../../utils/cos-wx-sdk-v5.js')
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
Page({
  /**
   * 页面的初始数据
   */
  data: {
    time: 0,
    startAudio: false,
    tempFile: null
  },

  testMutilsUpload() {
    if (this.data.tempFile!=null) {
      var filename = '/weapp/' + this.data.tempFile.path.substr(this.data.tempFile.path.lastIndexOf('/') + 1);
      for(var i=0;i<30;i++) {
        filename = 'weapp/' + i+".mp3";
        cos.postObject({
          Bucket: 'store-1256528427',
          Region: 'ap-guangzhou',
          Key: filename,
          FilePath: this.data.tempFile.path,
          onProgress: function (info) {
            console.log(JSON.stringify(info));
          }
        }, function (err, data) {
          console.log(err || data);
        });
      }
      
    }
  },

  play() {
    if(this.data.tempFile) {
      let innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.autoplay = true
      innerAudioContext.src = this.data.tempFile.path
      innerAudioContext.play()
    }
  },

  clear() {
    this.setData({
      tempFile: null
    })
  },

  doAudio: function() {
    var status = !this.data.startAudio,
        me = this
    if (status) {
      wx.getRecorderManager().start({
        format: 'mp3'
      })
    } else {
      wx.getRecorderManager().stop()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let me = this
    wx.getRecorderManager().onStart(() => {
      console.log('recorder start')
      me.setData({
        startAudio: true
      })
      interval = setInterval(function () {
        if (time >= 60) {
          wx.getRecorderManager().stop()
        } else {
          me.setData({
            time: ++time
          })
        }
      }, 1000)
    })
    wx.getRecorderManager().onStop((res) => {
      clearInterval(interval)
      const { tempFilePath } = res
      let tempFile = {
        path: tempFilePath,
        time: this.data.time
      }
      time = 0
      me.setData({
        time: 0,
        startAudio: false,
        tempFile: tempFile
      })
      
      console.log(this.data.tempFile)
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})