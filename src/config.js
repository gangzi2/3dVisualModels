
var global = {
	camera: true,
	departPositionCamera:new THREE.Vector3(15, 2.0, 2.36),
	departTargetCamera:new THREE.Vector3(0, 1, 0),
	zoomIcon: 25,
	objectPath:'assets/example/',
	objectName:'forklift'
};

var configIcons = [
	{
		id: "1",
		messagePopup: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to m",
		size: 0.2,
		position: { x: -1, y: 0.5, z: -1 },
		cameraPosition: new THREE.Vector3(-4, 3, -7)
	},
	{
		id: "2",
		messagePopup: "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through",
		size: 0.2,
		position: { x: 2, y: 0.5, z: 1 },
		cameraPosition: new THREE.Vector3(3, 3, 2)
	},
	{
		id: "3",
		messagePopup: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
		size: 0.2,
		position: { x: 1, y: 5, z: 1 },
		cameraPosition: new THREE.Vector3(2.5, 6.8, -1.2)
	},
	{
		id: "4",
		messagePopup: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. ",
		size: 0.2,
		position: { x: 0, y: 2, z: -4 },
		cameraPosition: new THREE.Vector3(-3.5, 4.1, -9.4)
	}
];
