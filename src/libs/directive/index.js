export default {
  drag(el, data, vnode) {
    let that = vnode.context
    let odiv = el; //获取当前元素
    let moveDataelse = {
      appOffsetLeft: null,
      appOffsetTop: null,
      x: null,
      y: null
    }
    odiv.onmousedown = (event) => {
      let app = document.getElementById("wechat");
      moveDataelse.x = event.pageX;
      moveDataelse.y = event.pageY;
      moveDataelse.appOffsetLeft = app.offsetLeft;
      moveDataelse.appOffsetTop = app.offsetTop;
      document.onmousemove = (event) => {
        let moveLeft = event.pageX - moveDataelse.x;
        let moveTop = event.pageY - moveDataelse.y;
        let resultLeft = moveDataelse.appOffsetLeft + moveLeft;
        let resultTop = moveDataelse.appOffsetTop + moveTop;
        if (resultLeft >= 5 && resultLeft <= that.$store.state.system.windowWidth - app.offsetWidth - 5) {
          app.style.left = resultLeft + "px";
        }
        if (resultTop >= 5 && resultTop <= that.$store.state.system.windowHeight - app.offsetHeight - 5) {
          app.style.top = resultTop + "px";
        }
      };
      document.onmouseup = (event) => {
        document.onmousemove = null;
        document.onmouseup = null;
        moveDataelse.x = null;
        moveDataelse.y = null;
        moveDataelse.appOffsetLeft = null;
        moveDataelse.appOffsetTop = null;
      };
    }
  },
  tooltip(el, data, vnode) {
    let that = vnode.context
    let odiv = el; //获取当前元素
    odiv.onmouseenter = (event) => {
      let tooltip = document.getElementById("v-tooltip");
      let x = event.pageX;
      let y = event.pageY;
      tooltip.style.left = x + "px";
      tooltip.style.top = y + 20 + "px";
      tooltip.style.opacity = 1.0;
      tooltip.innerText = data.value;
    }
    odiv.onmouseleave = (event) => {
      let tooltip = document.getElementById("v-tooltip");
      tooltip.style.left ="0px";
      tooltip.style.top = "0px";
      tooltip.style.opacity = 0;
    }
  }
}