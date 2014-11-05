 var windowWidth = window.innerWidth, windowHeight = window.innerHeight;
 var camera,renderer,scene;
 var LEIA_foregroundPlane;
 var foregroudPlaneHeight = 0; 
 var flag = 1;
 Init();
 animate();

function setForegroundPlane(filename) {
	
	var LEIA_foregroundPlaneTexture = new THREE.ImageUtils.loadTexture( filename );
	LEIA_foregroundPlaneTexture.wrapS = LEIA_foregroundPlaneTexture.wrapT = THREE.RepeatWrapping; 
	LEIA_foregroundPlaneTexture.repeat.set( 1, 1 );
	var LEIA_foregroundPlaneMaterial = new THREE.MeshLambertMaterial( { map: LEIA_foregroundPlaneTexture, transparent:true, side: THREE.DoubleSide } );
	var LEIA_foregroundPlaneGeometry;
	//LEIA_foregroundPlaneGeometry = new THREE.PlaneGeometry(40, 40, 50, 50);
	//var l = 57.64;
	var l = 38.56;
	LEIA_foregroundPlaneGeometry = new THREE.PlaneGeometry(l, l, 50, 50);
	LEIA_foregroundPlane = new THREE.Mesh(LEIA_foregroundPlaneGeometry, LEIA_foregroundPlaneMaterial);
	scene.add(LEIA_foregroundPlane);
}

function Init(){
        scene = new THREE.Scene();
  
       //setup camera
 		camera = new LeiaCamera();
        camera.position.copy(_camPosition);
        camera.lookAt(_tarPosition);
        scene.add(camera);
  
       //setup rendering parameter
 		renderer = new LeiaWebGLRenderer({
         antialias:true, 
 		renderMode: _renderMode, 
		shaderMode: _nShaderMode,
		devicePixelRatio: 1 
        } );
 		renderer.Leia_setSize( windowWidth, windowHeight );
 		document.body.appendChild( renderer.domElement );
  
       //add object to Scene
        setForegroundPlane( 'resource/text_myriadPro_18pt_9lines_B.jpg');
  
        //add Light
 		var xl = new THREE.DirectionalLight( 0x555555 );
 		xl.position.set( 1, 0, 2 );
 		scene.add( xl );
 		var pl = new THREE.PointLight(0x111111);
 		pl.position.set(-20, 10, 20);
 		scene.add(pl);
 		var ambientLight = new THREE.AmbientLight(0x111111);	
 		scene.add(ambientLight);
 }

 function animate() 
 {
 	requestAnimationFrame( animate );
  
    
    if(foregroudPlaneHeight > 3)
      flag = - 1;
    if(foregroudPlaneHeight < -3)
       flag = 1;
      foregroudPlaneHeight = foregroudPlaneHeight + 0.1*flag;
    LEIA_foregroundPlane.position.set(0, 0, foregroudPlaneHeight);
    renderer.setClearColor(new THREE.Color().setRGB(1.0, 1.0, 1.0)); 
	renderer.Leia_render(scene, camera,undefined,undefined,_holoScreenScale,_camFov,_messageFlag);
 }

 