// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const openid = wxContext.OPENID

  //  管理员后台数据
  if(!openid)
  return db.collection("bill")
  .aggregate()
  .match({"status": event.status})
  .sort({
    "type": 1,
    "times.submitTime": -1
  })
  .lookup({
    from: "user",
    localField: "openid",
    foreignField: "_id",
    as: "user",
  })
  .unwind("$user")
  .end()

  // 个人数据
  else{
    return db.collection("bill")
    .aggregate()
    .match({"openid": openid})
    .sort({
      "times.submitTime": -1
    })
    .lookup({
      from: "user",
      localField: "openid",
      foreignField: "_id",
      as: "user",
    })
    .unwind("$user")
    .end()
  }
}