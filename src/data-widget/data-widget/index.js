import { InputMethod } from '../utils/inputMethod/inputMethod'

DataWidget({
  state: {
    text: 'Hello Zepp OS',
  },
  
  onInit() {
    console.log('onInit')
  },
  build() {
    console.log('build')
    console.log(this.state.text)
        const inputMethod = new InputMethod({
          keyboard_type: [0],
          inputbox_type: [0],
          text: "",
          title: "输入法"
        })
        inputMethod.start()
    
  },
})