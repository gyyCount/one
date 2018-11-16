var renderer;
var height = window.innerHeight;
var width = window.innerWidth;
var threeId = $("#one");
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
  initObject();
  animation();
}
function animation(){
  renderer.clear();
  requestAnimationFrame(animation);
  controller.update();
  renderer.render(scene,camera);
}
start();

function initObject(){
  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
  var planeMaterial = new THREE.MeshBasicMaterial({color:0xcccccc});
  var plane = new THREE.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x=-0.5*Math.PI;
  plane.position.x=15;
  plane.position.y=0;
  plane.position.z=0;
  scene.add(plane);

  var cubeGeometry = new THREE.CubeGeometry(4,4,4);
  var cubeMaterial = new THREE.MeshBasicMaterial({
    color:0xff0000,wireframe:true
  })
  var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
  cube.position.x=-4;
  cube.position.y=3;
  cube.position.z=0;

  scene.add(cube);

  var  sphereGeometry = new THREE.SphereGeometry(4,20,20);
  var sphereMaterial = new THREE.MeshBasicMaterial({
    color:0x7777ff,wireframe:true
  })
  var sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  sphere.position.x=20;
  sphere.position.y=4;
  sphere.position.z=3;

  scene.add(sphere);
}
