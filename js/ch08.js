var stats = initStats();
        // create a scene, that will hold all our elements such as objects, cameras and lights.
        var scene = new THREE.Scene();
        // create a camera, which defines where we're looking at.
        var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
        // create a render and set the size
        var webGLRenderer = new THREE.WebGLRenderer();
        webGLRenderer.setClearColor(new THREE.Color(0xEEEEEE, 1.0));
        webGLRenderer.setSize(window.innerWidth, window.innerHeight);
        webGLRenderer.shadowMapEnabled = true;
        // add the sphere to the scene
        // position and point the camera to the center of the scene
        camera.position.x = 30;
        camera.position.y = 30;
        camera.position.z = 30;
        camera.lookAt(new THREE.Vector3(0, 0, 0));
        var ground = new THREE.PlaneGeometry(100, 100, 50, 50);
        var groundMesh = THREE.SceneUtils.createMultiMaterialObject(ground,
                [new THREE.MeshBasicMaterial({wireframe: true, overdraw: true, color: 000000}),
                    new THREE.MeshBasicMaterial({color: 0x00ff00, transparent: true, opacity: 0.5}
                    )
                ]);
        groundMesh.rotation.x = -0.5 * Math.PI;
        scene.add(groundMesh);
        // add the output of the renderer to the html element
        document.getElementById("WebGL-output").appendChild(webGLRenderer.domElement);
        // call the render function
        var step = 0.03;
        var sphere;
        var cube;
        var group;
        var bboxMesh;
        // setup the control gui
        var controls = new function () {
            // we need the first child, since it's a multimaterial
            this.cubePosX = 0;
            this.cubePosY = 3;
            this.cubePosZ = 10;
            this.spherePosX = 10;
            this.spherePosY = 5;
            this.spherePosZ = 0;
            this.groupPosX = 10;
            this.groupPosY = 5;
            this.groupPosZ = 0;
            this.grouping = false;
            this.rotate = false;
            this.groupScale = 1;
            this.cubeScale = 1;
            this.sphereScale = 1;
            this.redraw = function () {
                // remove the old plane
                //scene.remove(sphere);
                //scene.remove(cube);
                scene.remove(group);
                // create a new one
                sphere = createMesh(new THREE.SphereGeometry(5, 10, 10));
                cube = createMesh(new THREE.BoxGeometry(6, 6, 6));
                sphere.position.set(controls.spherePosX, controls.spherePosY, controls.spherePosZ);
                cube.position.set(controls.cubePosX, controls.cubePosY, controls.cubePosZ);
                // add it to the scene.
                // also create a group, only used for rotating
                group = new THREE.Group();
                group.add(sphere);
                group.add(cube);
                scene.add(group);
                controls.positionBoundingBox();
                var arrow = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), group.position, 10, 0x0000ff);
                scene.add(arrow);
            };
            this.positionBoundingBox = function () {
                scene.remove(bboxMesh);
                var box = setFromObject(group);
                var width = box.max.x - box.min.x;
                var height = box.max.y - box.min.y;
                var depth = box.max.z - box.min.z;
                var bbox = new THREE.BoxGeometry(width, height, depth);
                bboxMesh = new THREE.Mesh(bbox, new THREE.MeshBasicMaterial({
                    color: 0x000000,
                    vertexColors: THREE.VertexColors,
                    wireframeLinewidth: 2,
                    wireframe: true
                }));
//            scene.add(bboxMesh);
                bboxMesh.position.x = ((box.min.x + box.max.x) / 2);
                bboxMesh.position.y = ((box.min.y + box.max.y) / 2);
                bboxMesh.position.z = ((box.min.z + box.max.z) / 2);
            }
        };
        var gui = new dat.GUI();
        var sphereFolder = gui.addFolder("sphere");
        sphereFolder.add(controls, "spherePosX", -20, 20).onChange(function (e) {
            sphere.position.x = e;
            controls.positionBoundingBox()
        });
        sphereFolder.add(controls, "spherePosZ", -20, 20).onChange(function (e) {
            sphere.position.z = e;
            controls.positionBoundingBox()
        });
        sphereFolder.add(controls, "spherePosY", -20, 20).onChange(function (e) {
            sphere.position.y = e;
            controls.positionBoundingBox()
        });
        sphereFolder.add(controls, "sphereScale", 0, 3).onChange(function (e) {
            sphere.scale.set(e, e, e);
            controls.positionBoundingBox()
        });
        var cubeFolder = gui.addFolder("cube");
        cubeFolder.add(controls, "cubePosX", -20, 20).onChange(function (e) {
            cube.position.x = e;
            controls.positionBoundingBox()
        });
        cubeFolder.add(controls, "cubePosZ", -20, 20).onChange(function (e) {
            cube.position.z = e;
            controls.positionBoundingBox()
        });
        cubeFolder.add(controls, "cubePosY", -20, 20).onChange(function (e) {
            cube.position.y = e;
            controls.positionBoundingBox()
        });
        cubeFolder.add(controls, "cubeScale", 0, 3).onChange(function (e) {
            cube.scale.set(e, e, e);
            controls.positionBoundingBox()
        });
        var cubeFolder = gui.addFolder("group");
        cubeFolder.add(controls, "groupPosX", -20, 20).onChange(function (e) {
            group.position.x = e;
            controls.positionBoundingBox()
        });
        cubeFolder.add(controls, "groupPosZ", -20, 20).onChange(function (e) {
            group.position.z = e;
            controls.positionBoundingBox()
        });
        cubeFolder.add(controls, "groupPosY", -20, 20).onChange(function (e) {
            group.position.y = e;
            controls.positionBoundingBox()
        });
        cubeFolder.add(controls, "groupScale", 0, 3).onChange(function (e) {
            group.scale.set(e, e, e);
            controls.positionBoundingBox()
        });
        gui.add(controls, "grouping");
        gui.add(controls, "rotate");
        controls.redraw();
        render();
        function createMesh(geom) {
            // assign two materials
            var meshMaterial = new THREE.MeshNormalMaterial();
            meshMaterial.side = THREE.DoubleSide;
            var wireFrameMat = new THREE.MeshBasicMaterial();
            wireFrameMat.wireframe = true;
            // create a multimaterial
            var plane = THREE.SceneUtils.createMultiMaterialObject(geom, [meshMaterial, wireFrameMat]);
            return plane;
        }
        function render() {
            stats.update();
            if (controls.grouping && controls.rotate) {
                group.rotation.y += step;
            }
            if (controls.rotate && !controls.grouping) {
                sphere.rotation.y += step;
                cube.rotation.y += step;
            }
//        controls.positionBoundingBox();
            // render using requestAnimationFrame
            requestAnimationFrame(render);
            webGLRenderer.render(scene, camera);
        }
        function initStats() {
            var stats = new Stats();
            stats.setMode(0); // 0: fps, 1: ms
            // Align top-left
            stats.domElement.style.position = 'absolute';
            stats.domElement.style.left = '0px';
            stats.domElement.style.top = '0px';
            document.getElementById("Stats-output").appendChild(stats.domElement);
            return stats;
        }
        // http://jsfiddle.net/MREL4/
        function setFromObject(object) {
            var box = new THREE.Box3();
            var v1 = new THREE.Vector3();
            object.updateMatrixWorld(true);
            box.makeEmpty();
            object.traverse(function (node) {
                if (node.geometry !== undefined && node.geometry.vertices !== undefined) {
                    var vertices = node.geometry.vertices;
                    for (var i = 0, il = vertices.length; i < il; i++) {
                        v1.copy(vertices[i]);
                        v1.applyMatrix4(node.matrixWorld);
                        box.expandByPoint(v1);
                    }
                }
            });
            return box;
        }
