// 顶点着色器
var VSHADER_SOURCE = 
  'void main() {\n' +
  '  gl_Position = vec4(0.0, 0.0, 0.0, 1.0);\n' + // xy都是中点
  // '  gl_Position = vec4(-1.0, 1.0, 0.0, 1.0);\n' + // 左上角
  '  gl_PointSize = 10.0;\n' +                    // 点的大小
  '}\n';

// 片元着色器
var FSHADER_SOURCE =
  'void main() {\n' +
  '  gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);\n' + // 点的颜色
  '}\n';

function main() {
  // 获取canvas元素
  var canvas = document.getElementById('webgl');

  // 获取WebGL渲染的上下文，这边使用的是兼容的辅助方法
  var gl = getWebGLContext(canvas);
  if (!gl) {
    console.log('获取WebGL上下文失败！');
    return;
  }

  // 初始化着色器，这边使用辅助方法，判断是否初始化成功
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log('初始化着色器失败！');
    return;
  }

  // 设置canvas颜色
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // 清空并渲染canvas
  gl.clear(gl.COLOR_BUFFER_BIT);

  // 画一个点（gl.POINTS），从第一个开始（0），画一个（1）
  gl.drawArrays(gl.POINTS, 0, 1);
}