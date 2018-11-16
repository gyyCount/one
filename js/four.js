var renderer;
var height = window.innerHeight;
var width = window.innerWidth;
var threeId = $("#four");
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
var stats;
function initStats(){
  stats = new Stats();
  stats.setMode(0);
  $("#stats").css("position","absolute").css("left",'0px').css('top','0px').append(stats.domElement);
}
var controls = new function(){

}
var gui;
function initGui(){
  gui = new dat.GUI();
}
function initLight(){
  var ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
}
function initObject(){
  var vertices=[
    new THREE.Vector3(20,0,0),
    new THREE.Vector3(0,0,20),
    new THREE.Vector3(0,0,-20),
    new THREE.Vector3(0,20,0)
        ]
  var faces=[
    new THREE.Face3(0,1,3),
    new THREE.Face3(0,2,3),
    new THREE.Face3(1,2,3),
    new THREE.Face3(0,1,2),
  ]
  var geom = new THREE.Geometry();
  geom.vertices = vertices;
  geom.faces = faces;
  geom.computeFlatVertexNormals();
  geom.computeFaceNormals();
  geom.mergeVertices();
  var material = new THREE.MeshBasicMaterial({color:0x000000});
  var obj = new THREE.Mesh(geom,material);
  scene.add(obj);
}
function start(){
  initRenderer();
  initCamera();
  initScene();
  initController();
  initStats();
  initGui();
  initLight();
  initObject();
  animation();
}
function animation(){
  renderer.clear();
  requestAnimationFrame(animation);
  controller.update();
  stats.update();
  renderer.render(scene,camera);
}
start();
