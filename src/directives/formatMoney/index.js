/**
 * 格式化金额 v-format-money
 */
import { formatMoney } from '@/utils/utils';

export default {
  name: 'format-money',
  mounted(el) {
    el.innerText = formatMoney(el.innerText);
  },
};
