var renderer;
var height = window.innerHeight;
var width = window.innerWidth;
var threeId = $("#three");
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

var scene = new THREE.Scene();;
function initScene(){
  scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xffffff,0.015,100);
  scene.overrideMaterial = new THREE.MeshLambertMaterial({color:0xEEEEEE})
}
var controller;
function initController(){
  controller = new THREE.OrbitControls(camera,renderer.domElement);
}
var stats;
function initStats(){
  stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position='absolute';
  stats.domElement.style.left='0px';
  stats.domElement.style.top='0px';
  $("#stats").append(stats.domElement);
}
function start(){
  initRenderer();
  initCamera();
  initScene();
  initLight()
  initStats();
  initController();
  initObjects();
  initDat();
  animation();
}
function animation(){
  renderer.clear();
  requestAnimationFrame(animation);
  controller.update();
  stats.update();
  scene.traverse(function(e){
    if(e instanceof  THREE.Mesh && e!= plane){
      e.rotation.x+=alert1.rotationSpeed;
      e.rotation.yx+=alert1.rotationSpeed;
      e.rotation.y+=alert1.rotationSpeed;
    }
  })
  renderer.render(scene,camera);
}

function initObjects(){
  planeGeometry = new THREE.PlaneGeometry(60,20,1,1);
  var planeMaterial = new THREE.MeshBasicMaterial({
    color:0xff0000,
  });
  plane = new THREE.Mesh(planeGeometry,planeMaterial);
  scene.add(plane);
}
var gui;
function initDat(){
  gui = new dat.GUI();
  gui.add(alert1,'addCube');
  gui.add(alert1,"removeCube")
   gui.add(alert1,'numberOfObjects')
  gui.add(alert1,"rotationSpeed",0,0.5)
}
var alert1=new function(){
  var that = this;
  this.rotationSpeed = 0.02;
  this.addCube = function(){
    var  cubeSize = Math.ceil((Math.random()*3));
    var cubeGeometry = new THREE.CubeGeometry(cubeSize,cubeSize,cubeSize);
    var cubeMaterial = new THREE.MeshBasicMaterial({
    color:Math.random()*0xffffff
    })
    var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
    cube.castShadow = true;
    cube.name="cube"+scene.children.length;
    cube.position.x=-30+Math.round((Math.random()*50));
    cube.position.y=Math.round((Math.random()*5));
    cube.position.z=-20+Math.round((Math.random()*50));
    scene.add(cube);
    that.numberOfObjects = scene.children.length;
    console.log(this.numberOfObjects);
  }
  this.numberOfObjects =scene.children.length;
  this.removeCube=function(){
    var allChildren = scene.children;
    var lastObject = allChildren[allChildren.length-1];
    if(lastObject instanceof  THREE.Mesh){
      scene.remove(lastObject);
      that.numberOfObjects = scene.children.length;
    }
  }
}
function initLight(){
  var ambientLight = new THREE.AmbientLight(0xEEEEEE);
  scene.add(ambientLight);
  var spotLight = new THREE.SpotLight(0xff0000);
  scene.add(spotLight);
}
start();
