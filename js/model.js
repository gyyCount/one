var renderer;
var height = window.innerHeight;
var width = window.innerWidth;
var threeId = $("");
threeId.css("height",height).css("width",width);
function initRenderer(){
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xEEEEEE);
  renderer.setSize(width,height);
  threeId.append(renderer.domElement);
}
var camera;
function initCamera(){
  camera = new THREE.PerspectiveCamera(75,width/height,1,10000);
  camera.position.z=100;
}

var scene;
function initScene(){
  scene = new THREE.Scene();
}
var controller;
function initController(){
  controller = new THREE.OrbitControls(camera,renderer.domElement);
}
function start(){
  initRenderer();
  initCamera();
  initScene();
  initController();

}
function animation(){
  renderer.clear();
  requestAnimationFrame(animation);
  controller.update();
  renderer.render(scene,camera);
}
start();
