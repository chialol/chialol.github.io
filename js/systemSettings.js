var SystemSettings = SystemSettings || {};

SystemSettings.standardMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/blank.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 0.0, 0.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.baseMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/base.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 1.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );


SystemSettings.smokeMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/smoke.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 1.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );


SystemSettings.sparkMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/spark.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 0.0, 0.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.whiteSparkMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/whiteSpark.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 1.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.blueSparkMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/blueSpark.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 1.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.fireMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/fire.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 0.0, 0.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.blueFireMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/blueFire.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 0.0, 0.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.whiteFireMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/whiteFire.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 1.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

SystemSettings.lanternMaterial = new THREE.ShaderMaterial( {

    uniforms: {
        texture:  { type: 't',  value: new THREE.ImageUtils.loadTexture( 'images/lantern.png' ) },
    },

    attributes: {
        velocity: { type: 'v3', value: new THREE.Vector3() },
        color:    { type: 'v4', value: new THREE.Vector3( 1.0, 1.0, 1.0, 1.0 ) },
        lifetime: { type: 'f', value: 1.0 },
        size:     { type: 'f', value: 1.0 },
    },

    vertexShader:   document.getElementById( 'vertexShader' ).textContent,
    fragmentShader: document.getElementById( 'fragmentShader' ).textContent,

    blending:    Gui.values.blendTypes,
    transparent: Gui.values.transparent,
    depthTest:   Gui.values.depthTest,

} );

////////////////////////////////////////////////////////////////////////////////
// Basic system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.basic = {

    // Particle material
    particleMaterial : SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : SphereInitializer,
    initializerSettings : {
        sphere: new THREE.Vector4 ( 0.0, 0.0, 0.0, 10.0),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        lifetime: 7,
        size:     6.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0, 0),
            attractors : [],
        },
        collidables: {},
    },

    // Scene
    maxParticles :  10000,
    particlesFreq : 1000,
    createScene : function () {},
};


////////////////////////////////////////////////////////////////////////////////
// Fountain system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.fountainBounce = {

    // Particle material
    particleMaterial :  SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : FountainInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 30.0, 0.0, 1.0 ),
        color:    new THREE.Vector4 ( 0.0, 0.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 30.0, 0.0),
        lifetime: 7,
        size:     5.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -20, 0),
            attractors : [],
        },
        collidables: {
            bouncePlanes: [ {plane : new THREE.Vector4( 0, 1, 0, 0 ), damping : 0.8 } ],
        },
    },

    // Scene
    maxParticles :  5000,
    particlesFreq : 500,
    createScene : function () {
        var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );

        var box_geo   = new THREE.BoxGeometry(10,30,10)

        var plane     = new THREE.Mesh( plane_geo, phong );
        var box       = new THREE.Mesh( box_geo, phong );
        box.position.set( 0.0, 15.0, 0.0 );

        plane.rotation.x = -1.57;
        plane.position.y = 0;

        Scene.addObject( plane );
        Scene.addObject( box );
    },
};

SystemSettings.fountainSink = {

    // Particle material
    particleMaterial :  SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : FountainInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 30.0, 0.0, 1.0 ),
        color:    new THREE.Vector4 ( 0.0, 0.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 30.0, 0.0),
        lifetime: 7,
        size:     5.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -20, 0),
            attractors : [],
        },
        collidables: {
            sinkPlanes : [ { plane : new THREE.Vector4( 0, 1, 0, 0 ) } ],
        },
    },

    // Scene
    maxParticles :  5000,
    particlesFreq : 500,
    createScene : function () {
        var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );

        var box_geo   = new THREE.BoxGeometry(10,30,10)

        var plane     = new THREE.Mesh( plane_geo, phong );
        var box       = new THREE.Mesh( box_geo, phong );
        box.position.set( 0.0, 15.0, 0.0 );

        plane.rotation.x = -1.57;
        plane.position.y = 0;

        Scene.addObject( plane );
        Scene.addObject( box );
    },
};


////////////////////////////////////////////////////////////////////////////////
// Attractor system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.attractor = {

    // Particle material
    particleMaterial : SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : SphereInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 0.0, 0.0, 5.0),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        lifetime: 7,
        size:     6.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0, 0),
            attractors : [ new THREE.Sphere( new THREE.Vector3(30.0, 30.0, 30.0), 15.0 ) ],
        },
        collidables: {},
    },

    // Scene
    maxParticles :  10000,
    particlesFreq : 1000,
    createScene : function () {
        var sphere_geo = new THREE.SphereGeometry( 1.0, 32, 32 );
        var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );
        var sphere = new THREE.Mesh( sphere_geo, phong )

        sphere.position.set (30.0, 30.0, 30.0);
        Scene.addObject( sphere );
    },
};

////////////////////////////////////////////////////////////////////////////////
// Horse animation
////////////////////////////////////////////////////////////////////////////////

SystemSettings.animated = {

    // Particle Material
    particleMaterial :  SystemSettings.standardMaterial,

    // Initializer
    initializerFunction : AnimationInitializer,
    initializerSettings : {
        position: new THREE.Vector3 ( 0.0, 60.0, 0.0),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, -40.0),
        lifetime: 1.25,
        size:     2.0,
    },

    // Updater
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, 0, 0),
            attractors : [],
        },
        collidables: {
            bouncePlanes: [ {plane : new THREE.Vector4( 0, 1, 0, 0 ), damping : 0.8 } ],
        },
    },

    // Scene
    maxParticles:  20000,
    particlesFreq: 10000,
    createScene : function () {
        var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x444444, side: THREE.DoubleSide } );
        var plane = new THREE.Mesh( plane_geo, phong );
        plane.rotation.x = -1.57;
        plane.position.y = 0;

        Scene.addObject( plane );
    },

    // Animation
    animatedModelName: "animated_models/horse.js",
    animationLoadFunction : function( geometry ) {

        mesh = new THREE.Mesh( geometry, new THREE.MeshLambertMaterial( { color: 0x606060, morphTargets: true, transparent:true, opacity:0.5 } ) );
        mesh.scale.set( 0.25, 0.25, 0.25 );
        // mesh.position.set( 0.0, 30.0, 0.0 );
        Scene.addObject( mesh );
        ParticleEngine.addMesh( mesh );

        ParticleEngine.addAnimation( new THREE.MorphAnimation( mesh ) );
    },

};


////////////////////////////////////////////////////////////////////////////////
// Cloth
////////////////////////////////////////////////////////////////////////////////

SystemSettings.cloth = {

    // Particle Material
    particleMaterial :  new THREE.MeshLambertMaterial( { color:0xff0000, side: THREE.DoubleSide  } ),

    // Initializer
    initializerFunction : ClothInitializer,
    initializerSettings : {
        position: new THREE.Vector3 ( 0.0, 60.0, 0.0),
        color:    new THREE.Vector4 ( 1.0, 0.0, 0.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
    },

    // Updater
    updaterFunction : ClothUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -10.0, 0),
            attractors : [],
        },
        collidables: {
            bounceSpheres: [ {sphere : new THREE.Vector4( 0, 0, 0, 52.0 ), damping : 0.0 } ],
        },
    },

    // Scene
    maxParticles:  400,
    particlesFreq: 1000,
    createScene : function () {
        var sphere_geo = new THREE.SphereGeometry( 50.0, 32, 32 );
        var phong      = new THREE.MeshPhongMaterial( {color: 0x444444, emissive:0x442222, side: THREE.DoubleSide } );

        Scene.addObject( new THREE.Mesh( sphere_geo, phong ) );

    },

    // Cloth specific settings
    cloth : true,
    width : 20,
    height : 20,
};

////////////////////////////////////////////////////////////////////////////////
// My staircase system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.staircase = {

    // Particle material
    particleMaterial :  SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : StaircaseInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 0.0, 0.0, 1.0 ),
        color:    new THREE.Vector4 ( 1.0, 0.0, 0.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        lifetime: 9,
        size:     20.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -20, 0),
            attractors : [],
        },
        collidables: {
            bounceBox: [ {min : new THREE.Vector3( -10, 0, -25), max : new THREE.Vector3( 10, 20, 25), damping : 0.8 },
                {min : new THREE.Vector3( 10, 0, -25), max : new THREE.Vector3( 30, 40, 25), damping : 0.8 },
                {min : new THREE.Vector3( 30, 0, -25), max : new THREE.Vector3( 50, 60, 25), damping : 0.8 },
                {min : new THREE.Vector3( 50, 0, -25), max : new THREE.Vector3( 70, 80, 25), damping : 0.8 }],
        },
    },

    // Scene
    maxParticles :  20,
    particlesFreq : 600,
    createScene : function () {
        var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );

        var box_geo   = new THREE.BoxGeometry(20,20,50);
        var box_geo1  = new THREE.BoxGeometry(20,40,50);
        var box_geo2  = new THREE.BoxGeometry(20,60,50);
        var box_geo3  = new THREE.BoxGeometry(20,80,50);

        var plane     = new THREE.Mesh( plane_geo, phong );
        var box       = new THREE.Mesh( box_geo, phong );
        var box1      = new THREE.Mesh( box_geo1, phong );
        var box2      = new THREE.Mesh( box_geo2, phong );
        var box3      = new THREE.Mesh( box_geo3, phong );
        box.position.set( 0.0, 10.0, 0.0 );
        box1.position.set( 20.0, 20.0, 0.0 );
        box2.position.set( 40.0, 30.0, 0.0 );
        box3.position.set( 60.0, 40.0, 0.0 );

        plane.rotation.x = -1.57;
        plane.position.y = 0;

        Scene.addObject( plane );
        Scene.addObject( box );
        Scene.addObject( box1 );
        Scene.addObject( box2 );
        Scene.addObject( box3 );
    },

};

////////////////////////////////////////////////////////////////////////////////
// My staircase system 2 (Balls sink instead of bounce)
////////////////////////////////////////////////////////////////////////////////

SystemSettings.staircase2 = {

    // Particle material
    particleMaterial :  SystemSettings.standardMaterial,

    // Initialization
    initializerFunction : StaircaseInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 0.0, 0.0, 1.0 ),
        color:    new THREE.Vector4 ( 0.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 0.0, 0.0),
        lifetime: 9,
        size:     20.0,
    },

    // Update
    updaterFunction : EulerUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -20, 0),
            attractors : [],
        },
        collidables: {
            sinkBox: [ {min : new THREE.Vector3( -10, 0, -25), max : new THREE.Vector3( 10, 20, 25), damping : 0.8 },
                {min : new THREE.Vector3( 10, 0, -25), max : new THREE.Vector3( 30, 40, 25), damping : 0.8 },
                {min : new THREE.Vector3( 30, 0, -25), max : new THREE.Vector3( 50, 60, 25), damping : 0.8 },
                {min : new THREE.Vector3( 50, 0, -25), max : new THREE.Vector3( 70, 80, 25), damping : 0.8 }],
        },
    },

    // Scene
    maxParticles :  20,
    particlesFreq : 600,
    createScene : function () {
        var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );

        var box_geo   = new THREE.BoxGeometry(20,20,50);
        var box_geo1  = new THREE.BoxGeometry(20,40,50);
        var box_geo2  = new THREE.BoxGeometry(20,60,50);
        var box_geo3  = new THREE.BoxGeometry(20,80,50);

        var plane     = new THREE.Mesh( plane_geo, phong );
        var box       = new THREE.Mesh( box_geo, phong );
        var box1      = new THREE.Mesh( box_geo1, phong );
        var box2      = new THREE.Mesh( box_geo2, phong );
        var box3      = new THREE.Mesh( box_geo3, phong );
        box.position.set( 0.0, 10.0, 0.0 );
        box1.position.set( 20.0, 20.0, 0.0 );
        box2.position.set( 40.0, 30.0, 0.0 );
        box3.position.set( 60.0, 40.0, 0.0 );

        plane.rotation.x = -1.57;
        plane.position.y = 0;

        Scene.addObject( plane );
        Scene.addObject( box );
        Scene.addObject( box1 );
        Scene.addObject( box2 );
        Scene.addObject( box3 );
    },

};

////////////////////////////////////////////////////////////////////////////////
// My fire system
////////////////////////////////////////////////////////////////////////////////

SystemSettings.fire = {

    // Particle material
    particleMaterial :  SystemSettings.fireMaterial,

    // Initialization
    initializerFunction : FireInitializer,
    initializerSettings : {
        sphere:   new THREE.Vector4 ( 0.0, 0.0, 0.0, 1.0 ),
        color:    new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
        velocity: new THREE.Vector3 ( 0.0, 25.0, 0.0),
        lifetime: 20,
        size:     7.0,
		fireworkStyle: 0,
        material: 0, //SystemSettings.fireMaterial,
    },

    // Update
    updaterFunction : FireUpdater,
    updaterSettings : {
        externalForces : {
            gravity :     new THREE.Vector3( 0, -20, 0),
            attractors : [],
        },
        //collidables: {sinkPlanes : [ { plane : new THREE.Vector4( 0, 1, 0, 60 ) } ]},
    },

    // Scene
    maxParticles :  10000,
    particlesFreq : 10000,
    createScene : function () {
        /*var plane_geo = new THREE.PlaneBufferGeometry( 1000, 1000, 1, 1 );
        var phong     = new THREE.MeshPhongMaterial( {color: 0x444444, emissive: 0x222222, side: THREE.DoubleSide } );


        var plane     = new THREE.Mesh( plane_geo, phong );

        plane.rotation.x = -1.57;
        plane.position.y = -60;

        Scene.addObject( plane );*/

    },

};
