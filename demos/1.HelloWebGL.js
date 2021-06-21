function main() {
  // 获取canvas元素
  var canvas = document.getElementById("webgl");

  // 获取WebGL渲染的上下文，这边使用的是兼容的辅助方法
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("获取WebGL上下文失败！");
    return;
  }

  /*
  设置canvas颜色
  参数依次R，G，B（红绿蓝三色 0.0-1.0，数值/255 取一位小数）
  A（透明度 0.0-1.0），必须为浮点型，不能为整型
  */
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空并渲染canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
}

// test
// function main() {
//   var canvas = document.getElementById("webgl");
//   // 不使用辅助方法，同上面的实现
//   // var gl = canvas.getContext('webgl');
//   // gl.clearColor(0.0, 0.0, 0.0, 1.0);
//   // gl.clear(gl.COLOR_BUFFER_BIT);

//   测试直接画
//   var ctx = canvas.getContext("2d");
//   ctx.fillStyle = "rgba(0,0,255,1.0";
//   ctx.fillRect(120, 10, 150, 150);
// }