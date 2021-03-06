 

	if (!Detector.webgl) {
		Detector.addGetWebGLMessage();
	}
	var container;

	var camera, controls, scene, renderer, INTERSECTED, id=1;
	var lighting, ambient, keyLight, fillLight, backLight, INTERSECTED;

	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();

	function updatePopupid(){
		var textWrap = document.getElementById("popupid"); //get div
		if (textWrap.firstChild) {
			textWrap.removeChild(textWrap.firstChild);
		}
		textWrap.appendChild(document.createTextNode(id));
	}

	var callback2 = function(previousIcon){
		var object = (previousIcon)?configIcons[id-1]:configIcons[id];

		var vector = new THREE.Vector3();

		var widthHalf = 0.5 * renderer.context.canvas.width;
		var heightHalf = 0.5 * renderer.context.canvas.height;

		var pos =  new THREE.Vector3(object.position.x, object.position.y, object.position.z);
		pos.project(camera);
		pos.x = ( pos.x * widthHalf ) + widthHalf;
		pos.y = - ( pos.y * heightHalf ) + heightHalf;
 
		var tooltipWrap = document.getElementById("tooltip"); //get div
		tooltipWrap.style.display = "block";

		if (tooltipWrap.firstChild) {
			tooltipWrap.removeChild(tooltipWrap.firstChild);
		}
		tooltipWrap.appendChild(document.createTextNode(object.messagePopup));
		tooltipWrap.style.left = pos.x+5 + 'px';
		tooltipWrap.style.top = pos.y +5+ 'px';
		var textWrap = document.getElementById("popupid"); //get div
		if (textWrap.firstChild) {
			textWrap.removeChild(textWrap.firstChild);
		}
		(previousIcon || id >= configIcons.length)?id:id++;
		updatePopupid();
	}

	function nextIcon(previousIcon){
		if(previousIcon) {
			if(id>1){
				id--;
				var object =  configIcons[id-1];
			}
 
		}else{
			var object =  configIcons[id];
		}
		if(object)  fitCameraToObject(camera, object, 2, controls, callback2,previousIcon);
	}
 
	function fitCameraToObject(camera, object, offset, controls,callback,previousIcon) {
		
		offset = offset || 1.25;
		var boundingBox = new THREE.Box3();
        if(!object) {
			new TWEEN.Tween( controls.target)
			.to( { x:global.departTargetCamera.x,  y:global.departTargetCamera.y, z: global.departTargetCamera.z}, 1000 )
			.onUpdate(function(){
			 //camera.position.set(this.x, this.y, this.z);
			 //camera.lookAt(controls.target);
			})
			.easing( TWEEN.Easing.Linear.None)
			.onComplete(function () {
			 //controls.target.copy(object.position);
			// camera.lookAt(controls.target);
			 
			  })
			.start();   

			new TWEEN.Tween( controls.object.position)
			.to( { x:global.departPositionCamera.x,  y:global.departPositionCamera.y, z: global.departPositionCamera.z }, 1000 )
			.onUpdate(function() {
			//camera.position.set(this.x, this.y, this.z);
				 //camera.lookAt(controls.target);
			})
			.easing( TWEEN.Easing.Linear.None)
			.onComplete(function () {
			//controls.target.copy(object.position);
			 //camera.lookAt(controls.target);
 
				})
			.start();  
		}
		else{
			camera.updateProjectionMatrix();
			new TWEEN.Tween( controls.target)
			.to( { x:object.position.x,  y:object.position.y, z: object.position.z }, 1000 )
			.onUpdate(function() {
			 //camera.position.set(this.x, this.y, this.z);
			 camera.lookAt(object.position);
			})
			.easing( TWEEN.Easing.Linear.None)
			.onComplete(function () {
			 //controls.target.copy(object.position);
			 camera.lookAt(object.position);
			 
			  })
			.start();   

            if(!object.userdata){
				object.userdata ={};
				object.userdata.cameraPosition = object.cameraPosition;
			}
			new TWEEN.Tween( controls.object.position)
			.to( { x:object.userdata.cameraPosition.x,  y: object.userdata.cameraPosition.y, z: object.userdata.cameraPosition.z }, 1000 )
			.onUpdate(function(){
			//camera.position.set(this.x, this.y, this.z);
				camera.lookAt(object.position);
			})
			.easing( TWEEN.Easing.Linear.None)
			.onComplete(function () {
			//controls.target.copy(object.position);
			camera.lookAt(object.position);
			if(previousIcon){
				setTimeout(function(){callback(previousIcon); },300);
			}
			else{
				setTimeout(function(){callback(); },300);
			}
				})
			.start();   
		}
	 
	}

	function makeTextSprite(parameters) {
		if (parameters === undefined) parameters = {};
		var size = parameters.hasOwnProperty("size") ?
			parameters["size"] : 1;
		var position = parameters.hasOwnProperty("position") ?
			parameters["position"] : { x: 20, y: 20, z: 1 };

		var id = parameters.hasOwnProperty("id") ?
			parameters["id"] : 'default';
		var canvas = document.createElement("canvas");
		canvas.width = 300;
		canvas.height = 300;
		var context = canvas.getContext('2d');

		// background color
		context.fillStyle = "rgba(0, 0, 0, 0.7)";
		// border color
		context.strokeStyle = "rgba(0, 0, 0, 0.7)";
		context.font = "90px Georgia";

		context.arc(100, 100, 75, 0, 2 * Math.PI, false);
		// 1.4 is extra height factor for text below baseline: g,j,p,q.
		context.lineWidth=5;
		context.fill();
		context.strokeStyle = "white";
		context.stroke();
		// text color
		context.beginPath();
		context.fillStyle = "rgba(255, 255, 255, 1.0)";
		context.textAlign = 'center';
		context.textBaseline = "middle";

		context.fillText(id, 100, 90);

		// canvas contents will be used for a texture
		var texture = new THREE.Texture(canvas)
		texture.needsUpdate = true;

		var spriteMaterial = new THREE.SpriteMaterial(
			{ map: texture, useScreenCoordinates: false });
		var sprite = new THREE.Sprite(spriteMaterial);

		sprite.scale.set(size, size, size.z);
		sprite.position.set(position.x, position.y, position.z);
		sprite.name = id;
		sprite.message = parameters.messagePopup;
		sprite.userdata = parameters;
		return sprite;
	}


	function createIcon(size, position) {
		var spriteMap = new THREE.TextureLoader().load("../assets/sprite.png");
		var spriteMaterial = new THREE.SpriteMaterial({ map: spriteMap, color: 0xffffff });
		var sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(size.x, size.y, size.z);
		sprite.position.set(position.x, position.y, position.z);
		return sprite;
	}
	function updateSprite(objects){
		var scaleVector = new THREE.Vector3();
		objects.forEach(function(sprite){
			var scale = scaleVector.subVectors(sprite.position, camera.position).length() / global.zoomIcon;
			sprite.scale.set(scale, scale, 1); 
		})
		
		if(global.camera){
			var tooltipWrap = document.getElementById("cameraValue"); //get div
			tooltipWrap.style.display = "block";
			if (tooltipWrap.firstChild) {
				tooltipWrap.removeChild(tooltipWrap.firstChild);
			}
			tooltipWrap.appendChild(document.createTextNode("X: "+ camera.position.x + " Y: "+ camera.position.y + " Z: "+ camera.position.z));
		}
 
		 
	}
 
	init();
	animate();
    
	function init() {

		container = document.createElement('div');
		document.body.appendChild(container);

		/* Camera */

		camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
		camera.position.z = 10;
        if(global.departPositionCamera){
			camera.position.copy(global.departPositionCamera);
		}
		/* Scene */
		objects = [];
		scene = new THREE.Scene();
		lighting = true;
		ambient = new THREE.AmbientLight(0x2266666); // soft white light

		scene.add(ambient);

		keyLight = new THREE.DirectionalLight(0xffffff, 0.8);
		keyLight.position.set(-100, 0, 100);

		fillLight = new THREE.DirectionalLight(0xffffff, 0.8);
		fillLight.position.set(100, 0, 100);

		backLight = new THREE.DirectionalLight(0xffffff, 0.8);
		backLight.position.set(100, 0, -100).normalize();
		topLight = new THREE.DirectionalLight(0xffffff, 0.8);
		topLight.position.set(0, 500, 0).normalize();

		backLight = new THREE.DirectionalLight(0xffffff, 0.8);
		backLight.position.set(0, -200, 0).normalize();

		var spotLight = new THREE.SpotLight( 0x666666 );
		spotLight.position.set( 100, 1000, 100 );
		
		spotLight.castShadow = true;
		
		spotLight.shadow.mapSize.width = 1024;
		spotLight.shadow.mapSize.height = 1024;
		
		spotLight.shadow.camera.near = 500;
		spotLight.shadow.camera.far = 4000;
		spotLight.shadow.camera.fov = 30;
		
		scene.add( spotLight );
		/* Model */
		scene.add(keyLight);
		scene.add(fillLight);
		scene.add(backLight);
		scene.add(topLight);
		scene.add(backLight);


		for (let i = 0; i < configIcons.length; i++) {
			var sprite = makeTextSprite(configIcons[i]);
			objects.push(sprite);
			scene.add(sprite);
		}


		var mtlLoader = new THREE.MTLLoader();
		mtlLoader.setBaseUrl(global.objectPath);
		mtlLoader.setPath(global.objectPath);
		mtlLoader.load(global.objectName +'.mtl', function (materials) {
			materials.preload();
			var objLoader = new THREE.OBJLoader();
			objLoader.setMaterials(materials);
			objLoader.setPath(global.objectPath);
			objLoader.load(global.objectName +'.obj', function (object) {
				scene.add(object);
			});

		});

		/* Renderer */

		renderer = new THREE.WebGLRenderer();
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		//renderer.setClearColor(new THREE.Color("hsl(0, 5%, 10%)"));
		renderer.setClearColor(0xffffff, 1);
		container.appendChild(renderer.domElement);

		/* Controls */

		controls = new THREE.OrbitControls(camera, renderer.domElement);
		controls.enableDamping = true;
		controls.dampingFactor = 0.25;
		controls.enableZoom = true;
        controls.target.copy(global.departTargetCamera);
		/* Events */

		window.addEventListener('resize', onWindowResize, false);
		window.addEventListener('keydown', onKeyboardEvent, false);

	}

	function onWindowResize() {

		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		renderer.setSize(window.innerWidth, window.innerHeight);

	}

	function onKeyboardEvent(e) {

		if (e.code === 'KeyL') {

			lighting = !lighting;

			if (lighting) {

				ambient.intensity = 0.2;
				scene.add(keyLight);
				scene.add(fillLight);
				scene.add(backLight);
				scene.add(topLight);

			} else {

				ambient.intensity = 1.0;
				scene.remove(keyLight);
				scene.remove(fillLight);
				scene.remove(backLight);

			}

		}

	}

	var Singleton = (function () {
		var scope = this;
		var onClick = false;
		var mouseMove = false;
		function setMouseDown(value) {
			mouseDown = value;
		}
		function setMouseMove(value) {
			mouseMove = value;
		}
		function setMouseUp(value) {
			mouseUp = value;
		}
		return {
			setMouseMove: setMouseMove,
			getMouseMove: function () {
				return mouseMove;
			}
		};
	})();


	var callbackMove = function () {
		Singleton.setMouseMove(true);
	}

	document.addEventListener('mousedown', function (e) {
		var tooltipWrap = document.getElementById("tooltip"); //get div
		tooltipWrap.style.display = "none";

		e.stopPropagation();
		Singleton.setMouseMove(false);
		document.addEventListener('mousemove', callbackMove);
	});

	document.addEventListener('mouseup', function (event) {

		if (Singleton.getMouseMove() === false) {

			var mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
				-(event.clientY / window.innerHeight) * 2 + 1,
				0.5);
			var raycaster = new THREE.Raycaster();
			raycaster.setFromCamera(mouse3D, camera);
			var intersects = raycaster.intersectObjects(objects);
			if (INTERSECTED){
				INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
				INTERSECTED = null;
			}
 
			if (intersects.length > 0) {
				//caculate the screen postion of sprit objects.
                var callback = function(){

					var proj = toScreenPosition(intersects[0].object, camera);

					var tooltipWrap = document.getElementById("tooltip"); //get div
					tooltipWrap.style.display = "block";
	
					if (tooltipWrap.firstChild) {
						tooltipWrap.removeChild(tooltipWrap.firstChild);
					}
					id = intersects[0].object.userdata.id; 
					updatePopupid();
					tooltipWrap.appendChild(document.createTextNode(intersects[0].object.userdata.messagePopup));
					tooltipWrap.style.left = proj.x+5 + 'px';
					tooltipWrap.style.top = proj.y +5+ 'px';

				}

				fitCameraToObject(camera, intersects[0].object, 2, controls,callback);
 
			}
		}

		Singleton.setMouseMove(false);

		document.removeEventListener('mousemove', callbackMove);
	});

	function toScreenPosition(obj, camera) {
		var vector = new THREE.Vector3();

		var widthHalf = 0.5 * renderer.context.canvas.width;
		var heightHalf = 0.5 * renderer.context.canvas.height;

		obj.updateMatrixWorld();
		vector.setFromMatrixPosition(obj.matrixWorld);
		vector.project(camera);

		vector.x = (vector.x * widthHalf) + widthHalf;
		vector.y = - (vector.y * heightHalf) + heightHalf;

		return {
			x: vector.x,
			y: vector.y
		};

	};

	function animate() {

		requestAnimationFrame(animate);
		TWEEN.update();
		controls.update();

		render();

	}


	function render() {
		updateSprite(objects);
		renderer.render(scene, camera);

	}

	function onMouseMove(event) {
		// calculate mouse position in normalized device coordinates
		// (-1 to +1) for both components
		mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
		mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

		var mouse3D = new THREE.Vector3((event.clientX / window.innerWidth) * 2 - 1,
			-(event.clientY / window.innerHeight) * 2 + 1,
			0.5);
		var raycaster = new THREE.Raycaster();
		raycaster.setFromCamera(mouse3D, camera);
		var intersects = raycaster.intersectObjects(objects);

		if (intersects.length > 0) {

			if (intersects[0].object != INTERSECTED) {
				//recover the old material 
				if(INTERSECTED) {
					INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
				}
				INTERSECTED = intersects[0].object;
				INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
				INTERSECTED.material.color.setHex(0xff0000);
				document.getElementsByTagName("body")[0].style.cursor = "pointer";
				
				var proj = toScreenPosition(INTERSECTED, camera);
  
				var tooltipWrap = document.getElementById("tooltip"); //get div
				tooltipWrap.style.display = "block";

				if (tooltipWrap.firstChild) {
					tooltipWrap.removeChild(tooltipWrap.firstChild);
				}
				tooltipWrap.appendChild(document.createTextNode(intersects[0].object.userdata.messagePopup));
				tooltipWrap.style.left = proj.x+5 + 'px';
				tooltipWrap.style.top = proj.y +5+ 'px';
			}

		}
		else {
			if (INTERSECTED)
				INTERSECTED.material.color.setHex(INTERSECTED.currentHex);
			document.getElementsByTagName("body")[0].style.cursor = "auto";
			INTERSECTED = null;
		}

	}
	window.addEventListener('mousemove', onMouseMove, false);

	window.requestAnimationFrame(render);
 