var ww = window.innerWidth;
var wh = window.innerHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.1, 1000);
camera.position.set(-30, 40, 30);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xeeeeee);
renderer.setSize(ww, wh);
document.getElementById('box').appendChild(renderer.domElement);

var axes = new THREE.AxisHelper(20);
scene.add(axes);

var planeGeometry = new THREE.PlaneGeometry(60, 20, 1, 1);
var planeMaterial = new THREE.MeshLambertMaterial({
    color: 0xcccccc,
});

var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(15, 0, 0);
scene.add(plane);

var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    // wireframe: true,
});

var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-4, 3, 0);
scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
    // wireframe: true,
});

var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(20, 4, 2);
scene.add(sphere);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
scene.add(spotLight);


renderer.render(scene, camera);
