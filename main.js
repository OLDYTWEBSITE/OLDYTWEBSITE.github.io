// Floor
const floorGeometry = new THREE.PlaneGeometry(20, 20);
const floorMaterial = new THREE.MeshBasicMaterial({color: 0x999999});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -0.5 * Math.PI;
floor.receiveShadow = true;
scene.add(floor);

// Roof
const roofGeometry = new THREE.PlaneGeometry(20, 20);
const roofMaterial = new THREE.MeshBasicMaterial({color: 0xcccccc});
roof.rotation.x = 0.5 * Math.PI;
const roof = new THREE.Mesh(roofGeometry, roofMaterial);
scene.add(roof);

// Left wall
const leftWallGeometry = new THREE.BoxGeometry(1, 5, 20);
const leftWall = new THREE.Mesh(leftWallGeometry, floorMaterial);
leftWall.position.z = -10;
scene.add(leftWall);

// Right wall
const rightWall = leftWall.clone();
rightWall.position.z = 10;
scene.add(rightWall);

// Make walls close in randomly
function moveWalls() {
leftWall.position.z += Math.random() * 0.1 - 0.05;
rightWall.position.z += Math.random() * 0.1 - 0.05;
}

animate() {
//...

moveWalls();

renderer.render(scene, camera);

requestAnimationFrame(animate);
}
