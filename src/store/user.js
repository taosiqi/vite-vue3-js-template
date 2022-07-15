/**
 * 使用demo
 * // import { useUserStore } from '@/store/user'
 * // const userStore = useUserStore()
 * // userStore.updateName('李四')
 */

import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      name: '张三',
    };
  },
  actions: {
    updateName(name) {
      this.name = name;
    },
    // action 可以像写一个简单的函数一样支持 async/await 的语法，让你愉快的应付异步处理的场景。
    async login(account, pwd) {
      // eslint-disable-next-line no-undef
      const { data } = await api.login(account, pwd);
      return data;
    },
  },
  getters: {
    fullName: (state) => {
      return '我是' + state.name;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true, // 只有修改了的才会做持久化缓存
  },
});
