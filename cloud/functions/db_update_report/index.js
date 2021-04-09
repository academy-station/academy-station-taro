// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  return db.collection("bill")
  .doc(event._id)
  .update({
    data: event.report_seq === 1 ? 
    {report1: true} : {report2: true}
  })
}