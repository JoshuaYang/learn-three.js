var controls = {
    rotationSpeed: 0.02,
    bouncingSpeed: 0.03,
}

var gui = new dat.GUI();
gui.add(controls, 'rotationSpeed', 0, 0.5);
gui.add(controls, 'bouncingSpeed', 0, 0.5);


var stats = initStats();

var ww = window.innerWidth;
var wh = window.innerHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.1, 1000);
camera.position.set(-30, 40, 30);
camera.lookAt(scene.position);

var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xeeeeee);
renderer.setSize(ww, wh);
renderer.shadowMapEnabled = true;
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
plane.receiveShadow = true;
scene.add(plane);

var cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
var cubeMaterial = new THREE.MeshLambertMaterial({
    color: 0xff0000,
});

var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.position.set(-4, 3, 0);
cube.castShadow = true;
scene.add(cube);

var sphereGeometry = new THREE.SphereGeometry(4, 20, 20);
var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0x7777ff,
});

var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(20, 4, 2);
sphere.castShadow = true;
scene.add(sphere);

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-40, 60, -10);
spotLight.castShadow = true;
scene.add(spotLight);



function initStats(){
    var stats = new Stats();

    stats.setMode(0);
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = 0;
    stats.domElement.style.top = 0;
    document.body.appendChild(stats.domElement);

    return stats;
}


var step = 0;
function renderScene(){
    stats.update();

    cube.rotation.x += controls.rotationSpeed;
    cube.rotation.y += controls.rotationSpeed;
    cube.rotation.z += controls.rotationSpeed;

    step += controls.bouncingSpeed;
    sphere.position.x = 20 + (10 * Math.cos(step));
    sphere.position.y = 2 + (10 * Math.abs(Math.sin(step)));

    requestAnimationFrame(renderScene);

    renderer.render(scene, camera);
}

function onResize(){
    var ww = window.innerWidth;
    var wh = window.innerHeight;

    camera.aspect = ww / wh;
    camera.updateProjectionMatrix();

    renderer.setSize(ww, wh);
}

window.addEventListener('resize', onResize, false);

renderScene();
