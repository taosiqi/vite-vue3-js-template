// 需要套一层div 不然会报错
// <div v-el-drag>
//   <el-dialog title="提示" v-model="dialogVisible" width="30%">
//   <span>这是一段信息</span>
//   <template #footer>
// <span class="dialog-footer">
//   <el-button @click="dialogVisible = false">取 消</el-button>
// <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
// </span>
// </template>
// </el-dialog>
// </div>

export default {
  name: 'el-drag',
  mounted (el, binding, vnode) {
    el.style.height = '100vh'
    el.style.width = '100vw'
    const dragDom = el.querySelector('.el-dialog')
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    dragDom.style.cssText += ';top:0px;'
    dialogHeaderEl.style.cssText += ';cursor:move;'

    dialogHeaderEl.onmousedown = (e) => {
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const dragDomWidth = dragDom.offsetWidth
      const dragDomHeight = dragDom.offsetHeight

      const screenWidth = document.body.clientWidth
      const screenHeight = document.body.clientHeight

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

      const styleLeftStr = getComputedStyle(dragDom).left
      const styleTopStr = getComputedStyle(dragDom).top
      if (!styleLeftStr || !styleTopStr) return
      let styleLeft
      let styleTop

      // Format may be "##%" or "##px"
      if (styleLeftStr.includes('%')) {
        styleLeft = +document.body.clientWidth * (+styleLeftStr.replace(/%/g, '') / 100)
        styleTop = +document.body.clientHeight * (+styleTopStr.replace(/%/g, '') / 100)
      } else {
        styleLeft = +styleLeftStr.replace(/px/g, '')
        styleTop = +styleTopStr.replace(/px/g, '')
      }

      document.onmousemove = (e) => {
        let left = e.clientX - disX
        let top = e.clientY - disY

        // Handle edge cases
        if (-left > minDragDomLeft) {
          left = -minDragDomLeft
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }
        if (-top > minDragDomTop) {
          top = -minDragDomTop
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // Move current element
        dragDom.style.cssText += `;left:${left + styleLeft}px;top:${top + styleTop}px;`
      }

      document.onmouseup = () => {
        document.onmousemove = null
        document.onmouseup = null
      }
    }
  }
}
