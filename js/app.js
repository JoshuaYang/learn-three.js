var ww = window.innerWidth;
var wh = window.innerHeight;

var container = document.getElementById('container');

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75, ww / wh, 1, 1000);
camera.position.x = 0.1;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(ww, wh);
container.appendChild(renderer.domElement);



var geometry = new THREE.SphereGeometry(500, 60, 40);
geometry.scale(-1, 1, 1);

var video = document.getElementById('video');
var texture = new THREE.VideoTexture(video);
texture.minFilter = THREE.LinearFilter;
texture.magFilter = THREE.LinearFilter;
texture.format = THREE.RGBFormat;

// var texture = new THREE.TextureLoader().load('texture/b.png');

var material = new THREE.MeshBasicMaterial({
    map: texture,
});

var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);



var controls = new THREE.OrbitControls(camera);
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;




function update() {
    controls.update();

    requestAnimationFrame(update);

    renderer.render(scene, camera);
}

update();
