var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('cv'),
});
renderer.setClearColor(0x0000ff);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(45, 4 / 3, 1, 1000);
camera.position.set(0, 0, 5);

scene.add(camera);



var cube = new THREE.Mesh(
    new THREE.CubeGeometry(1, 2, 3),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
    })
);

scene.add(cube);


renderer.render(scene, camera);
