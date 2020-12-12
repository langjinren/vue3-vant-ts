import request from '@/utils/request'

interface SendDanmuType {
  user_id: string;
}
// 发送弹幕
export function sendDanmu(data: SendDanmuType ) {
  return request({
    url: '/bullet_screen/add_bullet_screen_by_web',
    method: 'post',
    headers: data,
    data
  })
}