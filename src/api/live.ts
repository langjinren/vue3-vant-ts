import request from '@/utils/request'

interface sendBulletType {
  user_id: string | number,
  platform: string,
  platform_name: string,
  app_version: string,
  live_id: string | number,
  device_id: string,
  channel_id: string,
  play_length: string | number,
  current_timestamp: string | number,
  end_timestamp: string | number,
  sign_key: string,
  content: string,
}

interface sendEmoji {
  user_id: string,
  platform: string,
  platform_name: string,
  app_version: string,
  live_id: string,
  device_id: string,
  channel_id: string,
  play_length: string,
  current_timestamp: string,
  end_timestamp: string,
  sign_key: string,
  content_url: string,
  emoji_type: string,
  content: string
}

// 发送弹幕
export function sendBullet(data: sendBulletType ) {
  return request({
    url: '/bullet_screen/add_bullet_screen_by_web',
    method: 'post',
    headers: {
      user_id: data.user_id,
      platform: data.platform,
      platform_name: data.platform_name,
      app_version: data.app_version,
      live_id: data.live_id,
      channel_id: data.channel_id,
      play_length: data.play_length,
      sign_key: data.sign_key,
      current_timestamp: data.current_timestamp,
      end_timestamp: data.end_timestamp,
      device_id: data.device_id,
      api_version: '5.1.9'
    },
    params: {
      is_wap: 1
    },
    data
  })
}

// 获取表情
export function getEmoji() {
  return request({
    url: '/bullet_screen/get_emoji_list',
    method: 'get',
    headers: {},
    params: {
      is_wap: 1
    }
  })
}

// 发送弹幕
export function sendEmoji(data: sendEmoji ) {
  return request({
    url: '/bullet_screen/add_bullet_screen_for_emoji',
    method: 'post',
    headers: {
      user_id: data.user_id,
      platform: data.platform,
      platform_name: data.platform_name,
      app_version: data.app_version,
      live_id: data.live_id,
      channel_id: data.channel_id,
      play_length: data.play_length,
      sign_key: data.sign_key,
      current_timestamp: data.current_timestamp,
      end_timestamp: data.end_timestamp,
      device_id: data.device_id,
      api_version: "5.1.9"
    },
    params: {
      is_wap: 1
    },
    data: {
      ...data,
      type: 'LIVE_BROADCAST_QUICK_BULLET_CHAT'
    }
  })
}