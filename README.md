# ypp

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Components
- class  默认支持

## bg 设置背景图片

ps: 小程序的background不能使用本地图片

### props: 

- 使用这个组件需要注意  需要设置bg组件的宽高
| 属性名      | 类型           | 必须           | 默认  | 注释                                                    |
| ----------- | -------------- | -------------- | ----- | ------------------------------------------------------- |
| src       | string         |  |       | 图片的地址  |
| slot |  | | | 支持slot  在组件中使用标签,后面的将不做解释<br />```<bgi><div>内容</div></bgi>``` |

- 支持slot

## card  卡片视图

### props:

| 属性名      | 类型           | 必须           | 默认  | 注释                                                    |
| ----------- | -------------- | -------------- | ----- | ------------------------------------------------------- |
| title       | string         |  |       | 标题文字  |
| slot |  | | |  |
| border        | Boolean         |                | false  | 是否显示标题下的横线 

## form   表单视图

### props:

| 属性名      | 类型           | 必须           | 默认  | 注释                                                    |
| ----------- | -------------- | -------------- | ----- | ------------------------------------------------------- |
| title       | string         | &#x2714;       |       | 表单前面的标题(key)                                     |
| type        | string         |                | text  | 表单的类型 check: 验证码类型  <br />其他类型和input类似 |
| v-model     | String\|Number |                |       | 绑定value数据                                           |
| placeholder | string         |                |       | 空数据展示内容                                          |
| max         | number\|String |                |       | 最大字符长度                                            |
| min         |                | number\|String |       | 最小字符长度                                            |
| disabled    | Boolean        |                | false | 禁用状态                                                |



### methods: 

| 方法名  | 参数 | 说明                   |
| ------- | ---- | ---------------------- |
| oncheck |      | 获取验证码按钮点击事件 |

## hintBox 提示框

### props

| 属性名     | 类型    | 必须 | 默认    | 注释                                                   |
| ---------- | ------- | ---- | ------- | ------------------------------------------------------ |
| show       | Boolean |      | false   | model 的展示状态                                       |
| type       | Number  |      | 0       | modal的类型; <br />0:不带取消按钮  <br />1: 带取消按钮 |
| icon       | String  |      |         | 图标地址                                               |
| content    | string  |      |         | 显示文字,或者使用标签(slot)                            |
| confirm    | String  |      | 确认    | 确认按钮文字                                           |
| cancel     | String  |      | 取消    | 取消按钮文字                                           |
| width      | String  |      | 200px   | 模态框宽度                                             |
| height     | String  |      | 214px   | 模态框高度                                             |
| iconWidth  | String  |      | 100px   | 图标宽度                                               |
| iconHeight | String  |      | 89px    | 图标高度                                               |
| button     | String  |      | success | 按钮状态<br />success: 成功状态<br />fail: 失败状态    |
| slot       |         |      |         |                                                        |

### methods

| 方法名 | 参数                                                    | 说明                        |
| ------ | ------------------------------------------------------- | --------------------------- |
| on-tap | val: 所点击的按钮   <br />1: 确认按钮<br />0 : 取消按钮 | 当确定/取消按钮被点击时触发 |

## item 游戏列表项(只适合本项目)

<img src=".\makedown\image-20201114113045309.png" alt="image-20201114113045309" style="float:left;" />

### props

### 

| 属性名    | 类型   | 必须 | 默认   | 注释     |
| --------- | ------ | ---- | ------ | -------- |
| data      | Object |      | {}     | 单项数据 |
| btnState  | Number |      | 0      | 按钮状态 |
| btnText | String |      | 马上赚 | 按钮文字 |
| btnType | String,Number |      | 0 | 按钮的样式, 0 默认背景图片样式 1 背景颜色模式 |

### methods:

### 

| 方法名 | 参数           | 说明         |
| ------ | -------------- | ------------ |
| ontap  | data: data数据 | 当本项被点击 |

### data数据格式

| key       | type    | must     | description                                                |
| --------- | ------- | -------- | ---------------------------------------------------------- |
| icon      | String  | &#x2714; | 游戏图标                                                   |
| newGame   | Boolean |          | 是否是新游戏                                               |
| name      | String  | &#x2714; | 游戏名                                                     |
| server    | String  | &#x2714; | 区服                                                       |
| recommend | Boolean |          | 是否推荐                                                   |
| newTask   | Boolean |          | 是否是有新任务                                             |
| desc      | String  |          | 游戏描述                                                   |
| progress  | Number  | &#x2714; | 任务进度                                                   |
| btnState  | Number  | &#x2714; | 按钮状态<br />0:淡蓝色背景<br />1:蓝色背景<br />2:灰色背景 |
| money     | String  | &#x2714; | 任务金额                                                   |

## radio 单选

### props

### 

| 属性名        | 类型   | 必须     | 默认          | 注释                                                         |
| ------------- | ------ | -------- | ------------- | ------------------------------------------------------------ |
| data          | Array  | &#x2714; | []            | 单项数据 , 如:["默认","时间","数量"]                         |
| bgColor       | String |          | #F2F2F2       | 单项背景颜色                                                 |
| fontColor     | String |          | #101D37       | 单项文字颜色                                                 |
| selectedColor | String |          | #4BB2FF       | 单项选中后颜色                                               |
| padding       | String |          |               | 单项内边距                                                   |
| align         | String |          | space-between | 对其方式: left==flex-start  right=flex-end  center   <br />或者其他flex  justifyContent   属性 |
| margin        | String |          |               | 单项的margin数据  对应css的margin  如"0 10px 0 0"            |

# storage

## userInfo

## loginInfo

## phoneNumber