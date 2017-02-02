var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('cv'),
});
// renderer.setClearColor(0x0000ff);

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(60, 400 / 300, 1, 10);
camera.position.set(4, 3, 5);
camera.lookAt(new THREE.Vector3(0, 0, 0));

scene.add(camera);



var cube = new THREE.Mesh(
    // new THREE.CubeGeometry(1, 2, 3, 2, 2, 2),
    // new THREE.PlaneGeometry(2, 4),
    // new THREE.SphereGeometry(3, 8, 6, 0, Math.PI * 2, Math.PI / 6, Math.PI / 3),
    new THREE.CircleGeometry(2, 10),
    new THREE.MeshBasicMaterial({
        color: 0xff0000,
        wireframe: true,
    })
);

scene.add(cube);


renderer.render(scene, camera);
