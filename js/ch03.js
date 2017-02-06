var ww = window.innerWidth;
var wh = window.innerHeight;

var renderer = new THREE.WebGLDeferredRenderer({
    width: ww,
    height: wh,
    scale: 1,
    antialias: true,
    tonemapping: THREE.FilmicOperator,
    brightness: 2.5,
});

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.1, 1000);
camera.position.set(30, 40, 30);
camera.lookAt(scene.position);
scene.add(camera);

var areaLight1 = new THREE.RectAreaLight(0xff0000, 3);
areaLight1.position.set(-10, 10, -35);
areaLight1.rotation.set(-Math.PI / 2, 0, 0);
areaLight1.width = 4;
areaLight1.height = 9.0;
scene.add(areaLight1);

var planeGeometry = new THREE.BoxGeometry(4, 10, 0);
var planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xff0000,
});
var plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position = areaLight1.position;
scene.add(plane);

document.getElementById('WebGL-output').appendChild(renderer.domElement);

renderer.render(scene, camera);
