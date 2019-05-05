// pages/video/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tempFilePath: null
  },

  chooseVideo() {
    let me = this
    wx.chooseVideo({
      sourceType: ['album', 'camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        me.setData({
          tempFilePath: res.tempFilePath
        });
        console.log(res.tempFilePath)
      }
    })
  },

  upload() {
    //var filename = '/weapp/' + this.data.tempFilePath.substr(this.data.tempFilePath.lastIndexOf('/') + 1);
    for(var i=30;i<60;i++) {
      let filename = 'weapp/' + i + ".mp4"
      getApp().globalData.cos.postObject({
        Bucket: 'store-1256528427',
        Region: 'ap-guangzhou',
        Key: filename,
        FilePath: this.data.tempFilePath,
        onProgress: function (info) {
          console.log(JSON.stringify(info));
        }
      }, function (err, data) {
        console.log(err || data);
      });
    }
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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