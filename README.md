# 必看

## 使用unplugin-auto-import后，有两点问题需要解决
- 1、eslit报错，生成.eslintrc-auto-import.json解决
- 2、因为未在script显性引入导致的类型推断失败和异常提示（未解析的函数或方法 reactive()）， 使用auto-import.d.ts文件解决，viteconfig的AutoImport解开注释，执行run dev会自动生成。
