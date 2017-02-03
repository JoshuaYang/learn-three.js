var ww = window.innerWidth;
var wh = window.innerHeight;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, ww, wh, 0.1, 1000);
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(ww, wh);
document.body.appendChild(renderer.domElement);


var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
});
var cube = new THREE.Mesh(geometry, material);
scene.add(cube);

renderer.render(scene, camera);
