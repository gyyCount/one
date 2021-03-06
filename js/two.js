var renderer;
var height = window.innerHeight;
var width = window.innerWidth;
var threeId = $("#two");
threeId.css("height",height).css("width",width);
function initRenderer(){
  renderer = new THREE.WebGLRenderer();
  renderer.setClearColor(0xEEEEEE);
  renderer.setSize(width,height);
  renderer.shadowMapEnabled=true;
  threeId.append(renderer.domElement);
}
var camera;
var controls = new function(){
  this.rotationSpeed =0.02;
  this.bouncingSpeed=0.03;
}
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
  stats = initStats();
  initLight();
  animation();
}
step =0;
function animation(){
  renderer.clear();
  stats.update();
  cube.rotation.x +=controls.rotationSpeed;
  cube.rotation.y +=controls.rotationSpeed;
  cube.rotation.z +=controls.rotationSpeed;
	step+=controls.bouncingSpeed;
	sphere.position.x=20+(10*(Math.cos(step)));
	sphere.position.y=2+(10*Math.abs(Math.sin(step)));
  requestAnimationFrame(animation);
  controller.update();
  renderer.render(scene,camera);
}
start();

function initObject(){
  var axes = new THREE.AxisHelper(20);
  scene.add(axes);

  var planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
  var planeMaterial = new THREE.MeshLambertMaterial({color:0xcccccc});
  var plane = new THREE.Mesh(planeGeometry,planeMaterial);
  plane.rotation.x=-0.5*Math.PI;
  plane.position.x=15;
  plane.position.y=0;
  plane.position.z=0;
  plane.receiveShadow = true;
  scene.add(plane);

  var cubeGeometry = new THREE.CubeGeometry(4,4,4);
  var cubeMaterial = new THREE.MeshLambertMaterial({
    color:0xff0000,
  })
 	cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
  cube.position.x=-4;
  cube.position.y=3;
  cube.position.z=0;
  cube.castShadow=true;

  scene.add(cube);

  var  sphereGeometry = new THREE.SphereGeometry(4,20,20);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color:0x7777ff,
  })
	sphere = new THREE.Mesh(sphereGeometry,sphereMaterial);
  sphere.position.x=20;
  sphere.position.y=4;
  sphere.position.z=3;
  sphere.castShadow=true;

  scene.add(sphere);
}
var spotLight ;
function initLight(){
	spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40,60,-10);
spotLight.castShadow = true;
scene.add(spotLight);
}
function initStats(){
  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position='absolute';
  stats.domElement.style.left='0px';
  stats.domElement.style.top='0px';
  $("#status-output").append(stats.domElement);
  return stats;
}
var controls = new function(){
  this.rotationSpeed =0.02;
  this.bouncingSpeed=0.03;
}
var gui = new dat.GUI();
gui.add(controls,'rotationSpeed',0,0.5);
gui.add(controls,'bouncingSpeed',0,0.5)
