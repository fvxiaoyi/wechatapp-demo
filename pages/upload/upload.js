// pages/upload/upload.js
Page({
  data: {
    src: null,
    videoSrc: null,
    uploadVideoSrc: null
  },
  onLoad() {
    this.ctx = wx.createCameraContext()
  },
  takePhoto() {
    this.ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath
        })
      }
    })
  },
  startRecord() {
    this.ctx.startRecord({
      success: (res) => {
        console.log('startRecord')
      }
    })
  },
  stopRecord() {
    this.ctx.stopRecord({
      success: (res) => {
        this.setData({
          src: res.tempThumbPath,
          videoSrc: res.tempVideoPath
        })
      }
    })
  },
  uploadRecord() {
    let me = this
    if(me.data.videoSrc){
      wx.showLoading({
        title: '上传中',
      })
      wx.uploadFile({
        url: 'https://blcow.cn/upload', // 仅为示例，非真实的接口地址
        filePath: me.data.videoSrc,
        name: 'file',
        success(res) {
          const data = JSON.parse(res.data)
          me.setData({
            uploadVideoSrc: data.data.original_url
          })
          wx.hideLoading()
        }
      })
    }
  },
  error(e) {
    console.log(e.detail)
  }
})