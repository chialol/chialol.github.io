
var Batch = Batch || { };


// called when the gui params change and we need to update mesh
Batch.particleSystemChangeCallback = function ( InputSettings ) {

    // Get rid of an old system
    ParticleEngine.stop();
    for ( var i = 0 ; i < ParticleEngine._emitters.length ; ++i ) {
        Scene.removeObject( ParticleEngine.getDrawableParticles( i ) );
    }
    ParticleEngine.removeEmitters();
    ParticleEngine.removeAnimations();

    // Get rid of old models
    Scene.removeObjects();

    // If we specified animated model, then lets load it first
    if ( InputSettings.animatedModelName ) {
        var loader = new THREE.JSONLoader( true );
        loader.load( InputSettings.animatedModelName, InputSettings.animationLoadFunction );
    }

    // Create new system
    var initializer = new InputSettings.initializerFunction ( InputSettings.initializerSettings );

    var updater     = new InputSettings.updaterFunction ( InputSettings.updaterSettings );

    var emitter     = new Emitter( {
        maxParticles:  InputSettings.maxParticles,   // how many particles can be generated by this emitter?
        particlesFreq: InputSettings.particlesFreq,  // how many particle per second will we emit?
        initialize:    initializer,                  // initializer object
        update:        updater,                      // updater object
        material:      InputSettings.particleMaterial,
        cloth:         InputSettings.cloth,
        width:         InputSettings.width,
        height:        InputSettings.height,
    } );

    // If we are not dealing with cloth, lets sort particles
    if ( !InputSettings.cloth ) {
        emitter.enableSorting( Batch.cmds.sorting );
    }

    ParticleEngine.addEmitter ( emitter );

    // Add new particle system
    ParticleEngine.start();

    // Add the particle system
    for ( var i = 0 ; i < ParticleEngine._emitters.length ; ++i ) {
        Scene.addObject( ParticleEngine.getDrawableParticles( i ) );
    }

    // Create the scene
    InputSettings.createScene();
};

Batch.parseUrl = function() {
    var url  = document.URL;
    var cmds = Parser.getCommands(url);

    Batch.selectedSystem = cmds[0].system;
    Batch.cmds = cmds[0];
}


// when HTML is finished loading, do this
window.onload = function() {
    Student.updateHTML();

    // Setup renderer, scene and gui
    Scene.create();

    Batch.parseUrl();

    // Add particle system
    Batch.particleSystemChangeCallback( SystemSettings[Batch.selectedSystem] );

    if( Batch.selectedSystem != 'cloth' ) {
        var emitters = ParticleEngine.getEmitters();
        for ( var i = 0 ; i < emitters.length ; i++ ) {
            emitters[i]._material.uniforms.texture.value = new THREE.ImageUtils.loadTexture( 'images/' + Batch.cmds.texture + '.png' );
            emitters[i]._material.depthTest = (Batch.cmds.depthTest === 'true');
            emitters[i]._material.transparent = (Batch.cmds.transparent === 'true');
            emitters[i]._sorting = (Batch.cmds.sorting === 'true');
            /*console.log("Emitters");
            console.log(emitters[i]._initializer._opts);*/
            /*emitters[i]._initializer._opts.material.uniforms.texture.value = new THREE.ImageUtils.loadTexture( 'images/' + Batch.cmds.texture + '.png' );
            emitters[i]._initializer._opts.material.depthTest = (Batch.cmds.depthTest === 'true');
            emitters[i]._initializer._opts.material.transparent = (Batch.cmds.transparent === 'true');
            emitters[i]._sorting = (Batch.cmds.sorting === 'true');*/

            var blendType;
            if ( Batch.cmds.blending == "Normal" ) {
                var blendType = THREE.NormalBlending;
            } else if ( Batch.cmds.blending == "Additive" ) {
                var blendType = THREE.AdditiveBlending;
            } else {
                console.log( "Blend type unknown!" );
                return;
            }
            emitters[i]._material.blending = blendType;
            emitters[i]._material.needsUpdate  = true;
        }
    }

    Gui.values.windowSize = Batch.cmds.size;

    Renderer.create( Scene, document.getElementById("canvas") );
    Renderer.onWindowResize();
    Renderer.update();
};


