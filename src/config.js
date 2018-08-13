var global = {
	//pour cacher l'affichage de la position du camera. true: afficher la postion du camera; false: cacher la position du camera
	camera: true,
	//le position de départ du camera  pour avoir le meilleur postion de model. 
	departPositionCamera:new THREE.Vector3(9, 5, 4),
	//le target de départ du camera  pour center le model 3D sur le scene. 
	departTargetCamera:new THREE.Vector3(0, 2, 0),

	// pour modifier la taille du icône. Le valeur est plus grand, l'icône est plus petit.
	zoomIcon: 15,
	// path pour le model 3D
	objectPath:'assets/example3/',
	// nom de model 3D
	objectName:'forklift'
};
//definir les icônes. 
var configIcons = [
	{
		// chaque icône dois avoir une id
		id: "1",
		// c'est le message de poupuo
		messagePopup: "Roue directrice",
		// on touche pas
		size: 0.3,
		//la position icône dans le scene
		position: { x: 1.3, y: 0.32, z: -0.95 },
		 //la position du camera quand on clique sur l'icône.
		cameraPosition: new THREE.Vector3(3, 1, -1)
	},
	{
		id: "2",
		messagePopup: "Roue motrice",
		size: 0.3,
		position: { x: 1.3, y: 0.32, z: 1.95 },
		cameraPosition: new THREE.Vector3(2.7, 0.77, 2.6)
	},
	{
		id: "3",
		messagePopup: "Bras de fourche",
		size: 0.3,
		position: { x: 0.9, y: 0.11, z: 4.4 },
		cameraPosition: new THREE.Vector3(1.84, 0.6, 5.35)
	},
	{
		id: "4",
		messagePopup: "Tablier",
		size: 0.3,
		position: { x: 0, y: 0.9, z: 3 },
		cameraPosition: new THREE.Vector3(0, 1.86, 4.38)
	},
	{
		id: "5",
		messagePopup: "Dosseret",
		size: 0.3,
		position: { x: 0, y: 2, z: 3 },
		cameraPosition: new THREE.Vector3(0, 2.66, 4.17)
	},
	{
		id: "6",
		messagePopup: "Mât",
		size: 0.3,
		position: { x: 0.65, y: 3, z: 3 },
		cameraPosition: new THREE.Vector3(1.4, 4, 4.17)
	},
	{
		id: "7",
		messagePopup: "Phares de travail",
		size: 0.3,
		position: { x: 1.25, y: 3.8, z: 1.5 },
		cameraPosition: new THREE.Vector3(1.95, 4.6, 2.3)
	},
	{
		id: "8",
		messagePopup: "Poste de conduite",
		size: 0.3,
		position: { x: 0, y: 2.8, z: 1 },
		cameraPosition: new THREE.Vector3(2.68, 3.6, 0.06)
	},
	{
		id: "9",
		messagePopup: "Protège conducteur",
		size: 0.3,
		position: { x: 0, y: 4.3, z: 0 },
		cameraPosition: new THREE.Vector3(2.28, 6.76, 3.1)
	},
	{
		id: "10",
		messagePopup: "Châssis",
		size: 0.3,
		position: { x: 1.3, y: 0.32, z: 0.5 },
		cameraPosition: new THREE.Vector3(2.63, 1.43, 1.44)
	},
	{
		id: "11",
		messagePopup: "Contrepoids",
		size: 0.3,
		position: { x: 1.3, y: 1.5, z: -0.95 },
		cameraPosition: new THREE.Vector3(4.28, 2.47, -0.4)
	}
];