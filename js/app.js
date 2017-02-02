// var stat = new Stats();
// stat.domElement.style.position = 'absolute';
// stat.domElement.style.left = 'auto';
// stat.domElement.style.right = '0px';
// stat.domElement.style.top = '0px';
// document.body.appendChild(stat.domElement);




var renderer = new THREE.WebGLRenderer({
    canvas: document.getElementById('cv'),
});
renderer.setClearColor(0x000000);
renderer.shadowMapEnabled = true;

var scene = new THREE.Scene();



camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
camera.position.set(5, 15, 25);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);


// var light = new THREE.AmbientLight(0xcccccc);
// var light = new THREE.PointLight(0xffffff, 2, 100);
// var light = new THREE.DirectionalLight();
var light = new THREE.SpotLight(0x1cd4aa, 2, 100);
light.position.set(2, 5, 3);
light.castShadow = true;
light.shadowCameraVisible = true;
scene.add(light);


var greenCube = new THREE.Mesh(
    new THREE.CubeGeometry(2, 2, 2),
    new THREE.MeshLambertMaterial({
        color: 0x00ff00
    })
);
greenCube.position.x = 3;
scene.add(greenCube);

var whiteCube = new THREE.Mesh(
    new THREE.CubeGeometry(2, 2, 2),
    new THREE.MeshLambertMaterial({
        color: 0xffffff
    })
);
whiteCube.position.x = -3;
whiteCube.receiveShadow = true;
scene.add(whiteCube);



var cube = new THREE.Mesh(
    new THREE.CubeGeometry(1, 2, 3),
    // new THREE.PlaneGeometry(2, 4),
    // new THREE.SphereGeometry(3, 8, 6, 0, Math.PI * 2, Math.PI / 6, Math.PI / 3),
    // new THREE.CircleGeometry(2, 10),
    // new THREE.CylinderGeometry(2, 3, 5, 10, 10, true),
    // new THREE.TetrahedronGeometry(3, 1),
    // new THREE.TorusGeometry(3, 1, 12, 18, Math.PI / 3 * 2),
    // new THREE.TorusKnotGeometry(2, 0.5, 32, 8),
    new THREE.MeshBasicMaterial({
        color: 0xffffff,
        // wireframe: true,
    })
);

scene.add(cube);

light.target = whiteCube;

renderer.render(scene, camera);




// function draw() {
//     requestAnimationFrame(draw);
//
//     stat.begin();
//
//     cube.scale.x = cube.scale.x + 0.01;
//
//
//     stat.end();
// }

// draw();




// var loader = new THREE.FontLoader();
// loader.load('../lib/helvetiker_regular.typeface.json', function(font){
//     var mesh = new THREE.Mesh(
//         new THREE.TextGeometry('Hello', {
//             font: font,
//             size: 2,
//             height: 1,
//         }),
//         new THREE.MeshBasicMaterial({
//             color: 0xff0000,
//             wireframe: true,
//         })
//     );
//
//     scene.add(mesh);
//
//     renderer.render(scene, camera);
// });
