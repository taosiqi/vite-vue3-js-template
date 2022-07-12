import elDrag from '@/directives/el-drag/'
import waves from '@/directives/waves/'
// 注册全局自定义指令
const directive = [elDrag, waves]

export default (app) => {
  directive.forEach((directive) => {
    app.directive(directive.name, directive)
  })
}
