/**
 * 防抖组件,对组件事件进行防抖
 * @example
 * ```
 * <pxDebounce>
 *    <div @click="fn">111</div>
 * </pxDebounce >
 * ```
 */
import { debounce } from '@/utils/utils';

export default {
  name: 'pxDebounce',
  props: {
    defer: {
      type: Boolean,
      required: false,
      default: true,
    },
    time: {
      type: Number,
      required: false,
      default: 1000,
    },
  },
  render(context) {
    let node = context.$slots?.default()?.[0];
    if (node) {
      let throttledMap = {};
      let listeners = node.props;
      if (listeners) {
        Object.getOwnPropertyNames(listeners).forEach((key) => {
          if (!throttledMap[key]) {
            throttledMap[key] = debounce(listeners[key], this.time, this.defer);
          }
        });
        Object.getOwnPropertyNames(throttledMap).forEach((key) => {
          listeners[key] = throttledMap[key];
        });
      }
    }
    return node;
  },
};
