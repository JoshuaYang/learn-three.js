var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('cv'),
});
// renderer.setClearColor(0x0000ff);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, 400 / 300, 1, 10);
camera.position.set(0, 0, 5);
// camera.lookAt(new THREE.Vector3(0, 0, 0));

scene.add(camera);



var cube = new THREE.Mesh(
    new THREE.CubeGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
    })
);

scene.add(cube);


renderer.render(scene, camera);
