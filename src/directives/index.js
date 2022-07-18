import elDrag from '@/directives/elDrag/';
import waves from '@/directives/waves/';
import formatMoney from '@/directives/formatMoney/';
// 注册全局自定义指令
const directive = [elDrag, waves, formatMoney];

export default (app) => {
  directive.forEach((directive) => {
    app.directive(directive.name, directive);
  });
};
