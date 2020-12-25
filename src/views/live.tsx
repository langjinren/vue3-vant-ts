import { defineComponent, reactive, onMounted, ref } from 'vue';
import { getEmoji, sendBullet, sendEmoji } from "@/api/live";
import { Toast, Dialog } from "vant";
import Emoji from '../components/emoji'
import utils from '@/utils/utils'

export default defineComponent({
  name: 'Live',
  setup() {
    let content = ref<string>('');
    let active = ref<number>(0);
    // let app_version = ref<string>('3.2.9.beta');
    let app_version = ref<string>('0');
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
      sign_key: '',
      emojiData: []
    });

    onMounted(() => {
      getEmojiData()
      // state.user_id = utils.getUrlKey('user_id')
    });

    const versionCompare = (v1: string | number, v2: string | number) => {
      if (typeof v1 === "number") {
        v1 = "0" + v1;
        v1 = v1.substr(1, v1.length - 1);
      }
      if (typeof v2 === "number") {
        v2 = "0" + v2;
        v2 = v2.substr(1, v2.length - 1);
      }
      if (v1 === v2) {
        return false;
      }
      var v1Arry = v1.split("."),
        v2Arry = v2.split(".");
      for (var i = 0; i < v1Arry.length; i++) {
        if (i > v2Arry.length) {
          return true;
        } else {
          if (parseInt(v1Arry[i]) > parseInt(v2Arry[i])) {
            return true;
          } else if (parseInt(v1Arry[i]) < parseInt(v2Arry[i])) {
            return false;
          }
        }
      }
      return false;
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

    const handleFocus = () => {
      // console.log('handleFocus')
    }

    const handleBlur = () => {
      // console.log('handleBlur')
    }

    const handeleContentChange = (event: any) => {
      content.value = event.target.value.trim()
      if (content.value.length >= 20) {
        event.target.blur()
        Toast('弹幕最多20个字~')
      }
    }

    const getEmojiData = () => {
      getEmoji().then((resE: any) => {
        if (resE.error_code == 0) {
          state.emojiData = resE.content
        }
      });
    }

    const handleClick = ({emoji_img, emoji_type, emoji_desc}: { emoji_img: string, emoji_type: string, emoji_desc: string}) => {
      sendEmoji({
        user_id: state.user_id,
        platform: state.platform,
        platform_name: state.platform_name,
        app_version: state.app_version,
        live_id: state.live_id,
        device_id: state.device_id,
        channel_id: state.channel_id,
        play_length: state.play_length,
        current_timestamp: state.current_timestamp,
        end_timestamp: state.end_timestamp,
        sign_key: state.sign_key,
        content_url: emoji_img,
        emoji_type: emoji_type,
        content: emoji_desc
      }).then((res: any) => {
        if (res.error_code == 0) {
          if (res.content.status == true) {
            Toast('弹幕发送成功～')
          }
        } else if (res.error_code == 250710000000) {
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

    const handleSubmit = () => {
      if (content.value.trim().length == 0) {
        Toast('弹幕内容不能为空哦~')
        return
      }
      sendBullet({
        user_id: state.user_id,
        platform: state.platform,
        platform_name: state.platform_name,
        app_version: state.app_version,
        live_id: state.live_id,
        device_id: state.device_id,
        channel_id: state.channel_id,
        play_length: state.play_length,
        current_timestamp: state.current_timestamp,
        end_timestamp: state.end_timestamp,
        sign_key: state.sign_key,
        content: content.value
      }).then((res: any) => {
        if (res.error_code == 0) {
          if (res.content.status == true) {
            Toast('弹幕发送成功～')
            content.value = ""
          }
        } else if (res.error_code == 250710000000) {
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

    const initInput = () => {
      return (
        <div>
          <div
            class="to_send_content_wrap">
            <textarea
              value={content.value}
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
          <div
            class="to_sumbit_wrap">
            <input
              class="to_sumbit"
              id="to_sumbit"
              type="button"
              value="发送"
              onClick={handleSubmit} />
          </div>
        </div>
      )
    }

    return () => (
      <div
        class="content">
        <p
          class="title"
          id="title">
          24小时剧场
        </p>
        {
          versionCompare(app_version.value, state.app_version) ?
          <div
            style="margin-top: 15px; ">
            {
              initInput()
            }
          </div>
          :
          <van-tabs
            active={active.value}
            swipeable
            >
            <van-tab
              title="发弹幕">
              {
                initInput()
              }
            </van-tab>
            <van-tab
              title="发表情">
              <Emoji
                emojiData={state.emojiData}
                onBtnClick={handleClick}
              />
            </van-tab>
          </van-tabs>
        }
        <p class="tip">注意：电视切换频道后，记得重新扫码发送弹幕哦~</p>
      </div>
    );
  }
});