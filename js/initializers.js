/*
 * In this file you can specify all sort of initializers
 *  We provide an example of simple initializer that generates points withing a cube.
 */


function VoidInitializer ( opts ) {
    this._opts = opts;
    return this;
};

VoidInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

};
////////////////////////////////////////////////////////////////////////////////
// Basic Initializer
////////////////////////////////////////////////////////////////////////////////

function SphereInitializer ( opts ) {
    this._opts = opts;
    return this;
};

SphereInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        // ----------- STUDENT CODE BEGIN ------------
        var idx = toSpawn[i];
        var z = Math.random() * 2*r - r;
        var phi = Math.random() * 2*Math.PI;
        var d = Math.sqrt(r*r - z*z);
        var px = base_pos.x + d*Math.cos(phi);
        var py = base_pos.y + d*Math.sin(phi);
        var pz = base_pos.z + z;
        var pos = new THREE.Vector3(px, py, pz);
        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

SphereInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        // just to get started, make the velocity the same as the initial position
        var pos = getElement( idx, positions );
        var vel = pos.clone().multiplyScalar(5.0);

        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

SphereInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var col = base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

SphereInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size;

        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

SphereInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var lifetime = this._opts.lifetime;

        // ----------- STUDENT CODE END ------------
        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this function nicer to work with. This one is kinda ok, as for initialization
// everything is independent
SphereInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};



////////////////////////////////////////////////////////////////////////////////
// Basic Initializer
////////////////////////////////////////////////////////////////////////////////

function FountainInitializer ( opts ) {
    this._opts = opts;
    return this;
};

FountainInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var pos = new THREE.Vector3(0, 30, 0);
        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

FountainInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var vel = base_vel;
        var vy = 10 + Math.random() * 10;
        var radius = 10;
        vx = Math.random()*2*radius - radius;
        y = Math.sqrt(radius*radius - vx*vx);
        vz = Math.random()*2*y - y;
        vel = vel.clone().add(new THREE.Vector3(vx, vy, vz));
        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

FountainInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var col = base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

FountainInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size;

        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

FountainInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var lifetime = this._opts.lifetime;

        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
FountainInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};

////////////////////////////////////////////////////////////////////////////////
// Animation Initializer
////////////////////////////////////////////////////////////////////////////////

function AnimationInitializer ( opts ) {
    this._opts = opts;
    return this;
};

// this function gets the morphed position of an animated mesh.
// we recommend that you do not look too closely in here ;-)
AnimationInitializer.prototype.getMorphedMesh = function () {

     if ( ParticleEngine._meshes[0] !== undefined  && ParticleEngine._animations[0] !== undefined){

        var mesh       = ParticleEngine._meshes[0];

        var vertices   = [];
        var n_vertices = mesh.geometry.vertices.length;

        var faces      = ParticleEngine._meshes[0].geometry.faces;

        var morphInfluences = ParticleEngine._meshes[0].morphTargetInfluences;
        var morphs          = ParticleEngine._meshes[0].geometry.morphTargets;

        if ( morphs === undefined ) {
            return undefined;
        }
        for ( var i = 0 ; i < morphs.length ; ++i ) {

            if ( morphInfluences[i] !== 0.0 ) {
                for ( var j = 0 ; j < n_vertices ; ++j ) {
                    vertices[j] = new THREE.Vector3( 0.0, 0.0, 0.0 );
                    vertices[j].add ( morphs[i].vertices[j] );
                }
            }
        }
        return { vertices : vertices, faces : faces, scale: mesh.scale, position: mesh.position };

    } else {

        return undefined;

    }
}



AnimationInitializer.prototype.initializePositions = function ( positions, toSpawn, mesh ) {

    var base_pos = this._opts.position;

    // Get random face in mesh.
    var numFaces = mesh.faces.length;

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        // ----------- STUDENT CODE BEGIN ------------
        var randFace = Math.floor(Math.random()*numFaces);
        var v1 = mesh.vertices[mesh.faces[randFace].a];
        var v2 = mesh.vertices[mesh.faces[randFace].b];
        var v3 = mesh.vertices[mesh.faces[randFace].c];
        var a = Math.random();
        var b = Math.random();
        var c = Math.random();
        var factor = 1 / (a + b + c);
        var rand = v1.clone().multiplyScalar(a*factor)
            .add(v2.clone().multiplyScalar(b*factor))
            .add(v3.clone().multiplyScalar(c*factor));
        var p = rand.multiply(mesh.scale);
        setElement( i, positions, p );
        // ----------- STUDENT CODE END ------------

    }
    positions.needUpdate = true;
}

AnimationInitializer.prototype.initializeVelocities = function ( velocities, toSpawn) {

    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var vel = base_vel;
        var vx = Math.random()*2 - 1;
        var vy = Math.random()*2 - 1;
        var vz = Math.random()*2 - 1;
        vel = vel.clone().add(new THREE.Vector3(vx, vy, vz));
        setElement( idx, velocities, vel );
        // ----------- STUDENT CODE END ------------
    }
    velocities.needUpdate = true;
}

AnimationInitializer.prototype.initializeColors = function ( colors, toSpawn) {

    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------

        setElement( idx, colors, base_col );
        // ----------- STUDENT CODE END ------------
    }
    colors.needUpdate = true;
}

AnimationInitializer.prototype.initializeSizes = function ( sizes, toSpawn) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------

        setElement( idx, sizes, this._opts.size );
        // ----------- STUDENT CODE END ------------
    }
    sizes.needUpdate = true;
}

AnimationInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, lifetimes, this._opts.lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
AnimationInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    var mesh = this.getMorphedMesh();

    if ( mesh == undefined ){
        return;
    }

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn, mesh );

    this.initializeVelocities( particleAttributes.velocity, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );

};

////////////////////////////////////////////////////////////////////////////////
// Cloth
////////////////////////////////////////////////////////////////////////////////

function ClothInitializer ( opts ) {
    this._opts = opts;
    return this;
};

ClothInitializer.prototype.initializePositions = function ( positions, toSpawn, width, height ) {
    var base_pos = this._opts.position;

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var w = idx % width;
        var h = idx / height;
        var grid_pos = new THREE.Vector3( 100.0 - w * 10, 0.0, 100.0 - h * 10 );
        var pos = grid_pos.add( base_pos );
        setElement( idx, positions, pos );
    }
    positions.needUpdate = true;
}

ClothInitializer.prototype.initializeVelocities = function ( velocities, toSpawn) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, velocities, base_vel  );
    }
    velocities.needUpdate = true;
}

ClothInitializer.prototype.initializeColors = function ( colors, toSpawn) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        var col = base_col;
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

ClothInitializer.prototype.initializeSizes = function ( sizes, toSpawn) {
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, sizes, 1 );
    }
    sizes.needUpdate = true;
}

ClothInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn) {
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        setElement( idx, lifetimes, Math.INFINITY );
    }
    lifetimes.needUpdate = true;
}


ClothInitializer.prototype.initialize = function ( particleAttributes, toSpawn, width, height ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn, width, height );

    this.initializeVelocities( particleAttributes.velocity, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );

    // mark normals to be updated
    particleAttributes["normal"].needsUpdate = true;

};

////////////////////////////////////////////////////////////////////////////////
// Staircase
////////////////////////////////////////////////////////////////////////////////


function StaircaseInitializer ( opts ) {
    this._opts = opts;
    return this;
};

StaircaseInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var pos = new THREE.Vector3(50, 120, 0);
        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

StaircaseInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var vel = base_vel;
        var vy = 10 + Math.random() * 10;
        var radius = 10;
        vx = Math.random()*2*radius - radius;
        y = Math.sqrt(radius*radius - vx*vx);
        vz = Math.random()*2*y - y;
        vel = vel.clone().add(new THREE.Vector3(vx, vy, vz));
        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

StaircaseInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var col = base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

StaircaseInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size;

        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

StaircaseInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var lifetime = this._opts.lifetime;

        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
StaircaseInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
};

////////////////////////////////////////////////////////////////////////////////
// Fire
////////////////////////////////////////////////////////////////////////////////

var spoutNum = 0;

function FireInitializer ( opts ) {
    this._opts = opts;
    return this;
};

FireInitializer.prototype.initializePositions = function ( positions, toSpawn) {
    var base = this._opts.sphere;
    var base_pos = new THREE.Vector3( base.x, base.y, base.z );
    var r   = base.w;
    for ( var i = 0 ; i < toSpawn.length; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var pos;
        if (spoutNum % 3 == 0) {
            var rand = (Math.random() - 0.5)*100;
            pos = new THREE.Vector3(-50 + rand, -60, 0);
            spoutNum++;
        } else if (spoutNum % 3 == 1) {
            var rand = (Math.random() - 0.5)*20;
            pos = new THREE.Vector3(rand, -60, 0);
            spoutNum++;
        } else {
            var rand = (Math.random() - 0.5)*20;
            pos = new THREE.Vector3(50 + rand, -60, 0);
            spoutNum++;
        }
        // ----------- STUDENT CODE END ------------
        setElement( idx, positions, pos );

    }
    positions.needUpdate = true;
}

FireInitializer.prototype.initializeVelocities = function ( velocities, positions, toSpawn ) {
    var base_vel = this._opts.velocity;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var vel = base_vel;
        var vy = 10 + Math.random() * 10;
        var radius = 10;
        vx = Math.random()*2*radius - radius;
        y = Math.sqrt(radius*radius - vx*vx);
        vz = Math.random()*2*y - y;
        vel = vel.clone().add(new THREE.Vector3(vx, vy, vz));
        // ----------- STUDENT CODE END ------------
        setElement( idx, velocities, vel );
    }
    velocities.needUpdate = true;
}

FireInitializer.prototype.initializeColors = function ( colors, toSpawn ) {
    var base_col = this._opts.color;
    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var col = base_col;

        // ----------- STUDENT CODE END ------------
        setElement( idx, colors, col );
    }
    colors.needUpdate = true;
}

FireInitializer.prototype.initializeSizes = function ( sizes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];
        // ----------- STUDENT CODE BEGIN ------------
        var size = this._opts.size;

        // ----------- STUDENT CODE END ------------
        setElement( idx, sizes, size );
    }
    sizes.needUpdate = true;
}

FireInitializer.prototype.initializeLifetimes = function ( lifetimes, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var lifetime = this._opts.lifetime;

        setElement( idx, lifetimes, lifetime );
    }
    lifetimes.needUpdate = true;
}

FireInitializer.prototype.initializeFireworkStyle = function ( styles, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var style = this._opts.fireworkStyle;
        setElement( idx, styles, style );
		
    }
    styles.needUpdate = true;
}

FireInitializer.prototype.initializeMaterial = function ( materials, toSpawn ) {

    for ( var i = 0 ; i < toSpawn.length ; ++i ) {
        var idx = toSpawn[i];

        var material = this._opts.material;
        setElement( idx, materials, material );
        
    }
    materials.needUpdate = true;
}

// how to make this funciton nicer to work with. This one is kinda ok, as for initialization
// everything is independent
FireInitializer.prototype.initialize = function ( particleAttributes, toSpawn ) {

    // update required values
    this.initializePositions( particleAttributes.position, toSpawn );

    this.initializeVelocities( particleAttributes.velocity, particleAttributes.position, toSpawn );

    this.initializeColors( particleAttributes.color, toSpawn );

    this.initializeLifetimes( particleAttributes.lifetime, toSpawn );

    this.initializeSizes( particleAttributes.size, toSpawn );
	
	this.initializeFireworkStyle(particleAttributes.fireworkStyle, toSpawn);

    this.initializeMaterial(particleAttributes.material, toSpawn);
};

