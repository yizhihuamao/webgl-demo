// 顶点着色器
var VSHADER_SOURCE =
  "attribute vec4 a_Position;\n" +
  "void main() {\n" +
  "  gl_Position = a_Position;\n" + // 位置变量
  "  gl_PointSize = 10.0;\n" +
  "}\n";

// 片元着色器
var FSHADER_SOURCE =
  "void main() {\n" + "  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n" + "}\n";

function main() {
  // 获取canvas元素
  var canvas = document.getElementById("webgl");

  // 获取canvas元素
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

  // 获取到位置变量的存储位置
  var a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("获取位置变量的存储位置失败！");
    return;
  }

  // 注册鼠标点击触发方法
  canvas.onmousedown = function (ev) {
    click(ev, gl, canvas, a_Position);
  };

  // 设置canvas颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空并渲染canvas
  gl.clear(gl.COLOR_BUFFER_BIT);
}

var g_points = []; // 用于鼠标按下位置的数组
function click(ev, gl, canvas, a_Position) {
  var x = ev.clientX; // x
  var y = ev.clientY; // y
  var rect = ev.target.getBoundingClientRect();

  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  g_points.push(x);
  g_points.push(y);

  // 清空并渲染canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  var len = g_points.length;
  for (var i = 0; i < len; i += 2) {
    // 将point的位置传递给变量a_Position
    gl.vertexAttrib3f(a_Position, g_points[i], g_points[i + 1], 0.0);

    // 画一个点（gl.POINTS），从第一个开始（0），画一个（1）
    gl.drawArrays(gl.POINTS, 0, 1);
  }
}
