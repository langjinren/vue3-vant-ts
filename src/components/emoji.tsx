import { defineComponent } from 'vue'

interface ItemProp {
  emojiData: any,
  onBtnClick: ({emoji_img, emoji_type, emoji_desc}: { emoji_img: string, emoji_type: string, emoji_desc: string}) => void
  // onBtnClick: (emoji: object) => void
}

const initProps = {
  emojiData: Array,
  onBtnClick: Function as any
}

const Emoji = defineComponent<ItemProp>(props => {
  return () => (
    <div class="img_wrap">
      <van-grid
        border={false}
        column-num={6}
        clickable={true}
        square>
          {props.emojiData.map((emoji: any, index: number) => (
            <van-grid-item
              key={index}
              onClick={() => props.onBtnClick(emoji)}
              >
                {/* onClick={props.onBtnClick.bind(this, emoji)} */}
              <img src={emoji.emoji_img} alt="表情"/>
              <span class="img_text">{emoji.emoji_desc}</span>
            </van-grid-item>
          ))}
      </van-grid>
    </div>
  )
})

Emoji.props = initProps

export default Emoji
