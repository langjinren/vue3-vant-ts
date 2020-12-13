import { defineComponent, reactive, onMounted, ref } from 'vue';
import utils from '@/utils/utils'
import { sendDanmu } from "@/api/live";
import { Toast, Dialog } from "vant";

export default defineComponent({
  name: 'Live',
  setup() {
    let message = ref<string>('');
    let state = reactive({
      user_id: '',
      platform: '',
      platform_name: '',
      app_version: '',
      live_id: '',
      device_id: '',
      channel_id: '',
      channel_name: '',
      play_length: '',
      current_timestamp: '',
      end_timestamp: '',
      sign_key: ''
    });

    onMounted(() => {
      state.user_id = utils.getUrlKey('user_id')
      state.platform = utils.getUrlKey('platform')
      state.platform_name = utils.getUrlKey('platform_name')
      state.app_version = utils.getUrlKey('app_version')
      state.live_id = utils.getUrlKey('live_id')
      state.device_id = utils.getUrlKey('device_id')
      state.channel_id = utils.getUrlKey('channel_id')
      state.play_length = utils.getUrlKey('play_length')
      state.current_timestamp = utils.getUrlKey('current_timestamp')
      state.end_timestamp = utils.getUrlKey('end_timestamp')
      state.channel_name = decodeURIComponent(utils.getUrlKey('channel_name'))
    });

    function handeleContentChange(event: any) {
      message.value = event.target.value.trim()
      if (message.value.length >= 20) {
        event.target.blur()
        Toast('弹幕最多20个字~')
      }
    }

    const handleFocus = () => {
      console.log('handleFocus')
    }

    const handleBlur = () => {
      console.log('handleBlur')
    }

    const closePage = () => {
      let ua = navigator.userAgent.toLowerCase();
      // @ts-ignore
      let tag = ua.match(/MicroMessenger/i) == "micromessenger";
      if (tag) {
        window.WeixinJSBridge.call('closeWindow');
      } else if (ua.indexOf("alipay") != -1) {
        window.AlipayJSBridge.call('closeWebview');
      } else if (ua.indexOf("baidu") != -1) {
        window.BLightApp.closeWindow();
      } else {
        window.close();
      }
    }

    const handleSubmit = () => {
      if (message.value.trim().length == 0) {
        Toast('弹幕内容不能为空哦~')
        return
      }
      sendDanmu({
        user_id: state.user_id,
        platform: state.platform,
        platform_name: state.platform_name,
        app_version: state.app_version,
        live_id: state.live_id,
        device_id: state.device_id,
        channel_id: state.channel_id,
        channel_name: state.channel_name,
        play_length: state.play_length,
        current_timestamp: state.current_timestamp,
        end_timestamp: state.end_timestamp,
        sign_key: state.sign_key,
        message: message.value
      }).then((res: any) => {
        if (res.error_code == 0) {
          if (res.content.status == true) {
            Toast('弹幕发送成功～')
            message.value = ""
          }
        } else if (res.error_code == 250710000000) {
          message.value = ""
          Dialog.alert({
            title: '提示',
            message: '页面已过期，请重新扫描二维码~',
            className: 'live-layer-class',
            width: 300
          }).then(() => {
            closePage();
          });
        } else {
          Toast(res.error_info)
        }
      });
    }

    return () => (
      <div class="content">
        <p class="title" id="title">{state.channel_name}</p>
        <div class="to_send_content_wrap">
          <textarea
            value={message.value}
            maxlength={20}
            v-focus
            class="to_send_content"
            id="to_send_content"
            name="textarea"
            placeholder="弹幕走一波..."
            onFocus={handleFocus}
            onBlur={handleBlur}
            onInput={handeleContentChange}
          ></textarea>
        </div>
        <div class="to_sumbit_wrap">
          <input
            class="to_sumbit"
            id="to_sumbit"
            type="button"
            value="发送"
            onClick={handleSubmit} />
        </div>
        <p class="tip">注意：电视切换频道后，记得重新扫码发送弹幕哦~</p>
      </div>
    );
  }
});