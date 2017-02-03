var ww = window.innerWidth;
var wh = window.innerHeight;

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, ww / wh, 0.1, 1000);
camera.position.set(0, 0, 100);
camera.lookAt(new THREE.Vector3(0, 0, 0));

var renderer = new THREE.WebGLRenderer();
renderer.setSize(ww, wh);
document.body.appendChild(renderer.domElement);


var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(-10, 0 ,0));
geometry.vertices.push(new THREE.Vector3(0, 10 ,0));
geometry.vertices.push(new THREE.Vector3(10, 0 ,0));

var material = new THREE.LineBasicMaterial({
    color: 0x0000ff,
});

var line = new THREE.Line(geometry, material);
scene.add(line);

function render(){
    requestAnimationFrame(render);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // cube.rotation.z += 0.01;

    renderer.render(scene, camera);
}

render();
