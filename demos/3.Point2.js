// 顶点着色器
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" + // 位置变量
  "attribute float a_PointSize;\n" + // 大小变量
  "void main() {\n" +
  "  gl_Position = a_Position;\n" +
  "  gl_PointSize = a_PointSize;\n" +
  "}\n";

// 片元着色器
var FSHADER_SOURCE =
  "void main() {\n" +
  "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + // 点的颜色
  "}\n";

function main() {
  // 获取canvas元素
  var canvas = document.getElementById("webgl");

  // 获取WebGL渲染的上下文，这边使用的是兼容的辅助方法
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log("获取WebGL上下文失败！");
    return;
  }

  // 初始化着色器，这边使用辅助方法，判断是否初始化成功
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("初始化着色器失败！");
    return;
  }

  // 获取到位置变量和大小变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  var a_PointSize = gl.getAttribLocation(gl.program, "a_PointSize");

  // 失败
  // var position = new Float32Array([1.0, 2.0, 3.0, 1.0], [1.0, 1.0, 3.0, 1.0]);
  // var a_Position = gl.vertexAttrib4fv(a_Position, position);

  if (a_Position < 0 || a_PointSize < 0) {
    console.log("获取位置变量或大小变量的存储位置失败！");
    return;
  }

  // 传参
  gl.vertexAttrib3f(a_Position, 0.5, 0.5, 0.0);
  gl.vertexAttrib1f(a_PointSize, 20.0);

  // 设置canvas颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空并渲染canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 画一个点（gl.POINTS），从第一个开始（0），画一个（1）
  gl.drawArrays(gl.POINTS, 0, 1);
}
