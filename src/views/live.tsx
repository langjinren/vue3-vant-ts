import { defineComponent, reactive, onMounted, ref } from 'vue';
import { sendDanmu } from "@/api/live";
import utils from '@/utils/utils'
import './live.less';

export default defineComponent({
  name: 'Live',
  setup() {
    const user_id = ref<string | number>('');
    const platform = ref<string>('');
    const platform_name = ref<string>('');
    const app_version = ref<string>('');
    const live_id = ref<string>('');
    const device_id = ref<string>('');
    const channel_id = ref<string>('');
    const channel_name = ref<string>('');
    const play_length = ref<string>('');
    const current_timestamp = ref<string>('');
    const end_timestamp = ref<string>('');
    const sign_key = ref<string>('');
    const message = ref<string>('');

    let state = reactive({
      user_id: '',
      platform: '',
      platform_name: '',
      app_version: ''
    });

    // onBeforeMount(() => {
    //   let { user_id } = this.$route.params
    //   console.log(user_id)
    // })

    onMounted(() => {
      console.log('mounted!');
      console.log(utils.getUrlKey('id'))
      console.log(user_id.value)
      // console.log(router)
    });

    function handeleContentChange(event: any) {
      // content.value = event.target.value;
    }

    const handleSubmit = () => {
      console.log(111)
      toSendDanmu()
      // 打成json拷贝，是为了防止传地址过去被一直引用问题，现在vue3 rc新版本修复了
      // JSON.parse(JSON.stringify({ username:username.value, content:content.value }))
      // props.submitComment(  {username:username.value, content:content.value }  )
      // content.value = ''
    }

    const handleFocus = () => {
      console.log('handleFocus')
    }

    const handleBlur = () => {
      console.log('handleBlur')
    }

    const toSendDanmu = () => {
      sendDanmu({
        'user_id': '1'
      }).then(res => {

      });
    }

    return () => (
      <div class="content">
        <p class="title" id="title">加载中...</p>
        {/* <div className="to_send_content_wrap">
          <textarea
            className="to_send_content"
            id="to_send_content"
            name="textarea"
            // rows="10"
            // cols="50"
            // maxlength="20"
            placeholder="弹幕走一波..."
            // autofocus="autofocus"
            // value={message}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handeleContentChange}
          ></textarea>
        </div> */}
        <van-field
          class="to_send_content"
          model={message}
          rows="5"
          autosize
          label=""
          type="textarea"
          maxlength="100"
          placeholder="弹幕走一波..."
        ></van-field>

        <van-button
          class="to_send_btn"
          type="danger"
          size="large">
          发送
        </van-button>

        {/* <div class="to_sumbit_wrap">
          <input
            class="to_sumbit"
            id="to_sumbit"
            type="button"
            value="发送"
            onClick={handleSubmit} />
        </div> */}
        <p class="tip">注意：电视切换频道后，记得重新扫码发送弹幕哦~</p>
      </div>
    );
  }
});