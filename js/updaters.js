/*
 * In this file you can specify all sort of updaters
 *  We provide an example of simple updater that updates pixel positions based on initial velocity and gravity
 */

////////////////////////////////////////////////////////////////////////////////
// Collisions
////////////////////////////////////////////////////////////////////////////////

var Collisions = Collisions || {};

Collisions.BounceBox = function (particleAttributes, alive, delta_t, min, max, damping) {
    var positions    = particleAttributes.position;
    var velocities   = particleAttributes.velocity;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos = getElement( i, positions );
        var vel = getElement( i, velocities );

        // If the particle just hit the plane, bounce
        if (pos.x > min.x && pos.x < max.x && pos.y > min.y && pos.y < max.y
            && pos.z > min.z && pos.z < max.z) {

            var prevPos = pos.clone().sub(vel.clone().multiplyScalar(delta_t));
            var plane;
            if (prevPos.x > max.x) {
                plane = new THREE.Vector3(1, 0, 0);
            } else if (prevPos.x < min.x) {
                plane = new THREE.Vector3(-1, 0, 0);
            } else if (prevPos.y > max.y) {
                plane = new THREE.Vector3(0, 1, 0);
            } else if (prevPos.y < min.y) {
                plane = new THREE.Vector3(0, -1, 0);
            } else if (prevPos.y > max.z) {
                plane = new THREE.Vector3(0, 0, 1);
            } else if (prevPos.y < min.z) {
                plane = new THREE.Vector3(0, 0, -1);
            } else {
                plane = new THREE.Vector3(0, 1, 0);
            }
            // Find angle the particle comes in at
            var normal = new THREE.Vector3(plane.x, plane.y, plane.z);
            var vw = vel.clone().dot(normal);
            vel = vel.clone().sub(normal.multiplyScalar(2*vw)).multiplyScalar(damping);
        }

        setElement( i, positions, pos );
        setElement( i, velocities, vel );
        // ----------- STUDENT CODE END ------------
    }
}

Collisions.SinkBox = function (particleAttributes, alive, delta_t, min, max) {
    var positions   = particleAttributes.position;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos = getElement( i, positions );

        // Kill particle once it hits the plane
        if (pos.x > min.x && pos.x < max.x && pos.y > min.y && pos.y < max.y
            && pos.z > min.z && pos.z < max.z) {
            killPartilce( i, particleAttributes, alive );
        }
        
        // ----------- STUDENT CODE END ------------
    }
}

Collisions.BouncePlane = function ( particleAttributes, alive, delta_t, plane, damping ) {
    var positions    = particleAttributes.position;
    var velocities   = particleAttributes.velocity;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos = getElement( i, positions );
        var vel = getElement( i, velocities );

        // If the particle just hit the plane, bounce
        var sum = pos.x*plane.x + pos.y*plane.y + pos.z*plane.z + plane.w;
        if (sum <= 0) {
            // Find angle the particle comes in at
            var normal = new THREE.Vector3(plane.x, plane.y, plane.z);
            pos.sub(vel.clone().multiplyScalar(delta_t));
            var vw = vel.clone().dot(normal);
            vel = vel.clone().sub(normal.multiplyScalar(2*vw));
            vel = vel.multiplyScalar(damping);
        }

        setElement( i, positions, pos );
        setElement( i, velocities, vel );
        // ----------- STUDENT CODE END ------------
    }
};

Collisions.SinkPlane = function ( particleAttributes, alive, delta_t, plane ) {
    var positions   = particleAttributes.position;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos = getElement( i, positions );

        // Kill particle once it hits the plane
        var sum = pos.x*plane.x + pos.y*plane.y + pos.z*plane.z + plane.w;
        if (sum <= 0) {
            killPartilce( i, particleAttributes, alive );
        }
        
        // ----------- STUDENT CODE END ------------
    }
};

Collisions.BounceSphere = function ( particleAttributes, alive, delta_t, sphere, damping ) {
    var positions    = particleAttributes.position;
    var velocities   = particleAttributes.velocity;

    var center = new THREE.Vector3(sphere.x, sphere.y, sphere.z);
    var radius = sphere.w;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var pos = getElement( i, positions );
        var vel = getElement( i, velocities );

        // Check if point collides with sphere
        var distance = pos.distanceTo(center);
        if (distance <= radius) {
            vel.multiplyScalar(damping);
            pos = (pos.clone().sub(center)).normalize().multiplyScalar(radius).add(center);
        }

        setElement( i, positions, pos );
        setElement( i, velocities, vel );
        // ----------- STUDENT CODE END ------------
    }
}

////////////////////////////////////////////////////////////////////////////////
// Null updater - does nothing
////////////////////////////////////////////////////////////////////////////////

function VoidUpdater ( opts ) {
    this._opts = opts;
    return this;
};

VoidUpdater.prototype.update = function ( particleAttributes, initialized, delta_t ) {
    //do nothing
};

////////////////////////////////////////////////////////////////////////////////
// Euler updater
////////////////////////////////////////////////////////////////////////////////

function EulerUpdater ( opts ) {
    this._opts = opts;
    return this;
};


EulerUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;

    for ( var i  = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        var p = getElement( i, positions );
        var v = getElement( i, velocities );
        p.add( v.clone().multiplyScalar( delta_t ) );
        setElement( i, positions, p );
    }
};


EulerUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t ) {
    var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var gravity = this._opts.externalForces.gravity;
    var attractors = this._opts.externalForces.attractors;

    for ( var i = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var p = getElement( i, positions );
        var v = getElement( i, velocities );
        // now update velocity based on forces...
        // Gravity
        v = gravity.clone().multiplyScalar(delta_t).clone().add(v);

        // Attractors
        for (var j = 0; j < attractors.length; j++) {
           var d2 = attractors[j].center.distanceToSquared(p);
           var f_a = attractors[j].radius * 200 / d2;
           var forceVec = attractors[j].center.clone().sub(p).multiplyScalar(f_a);
           v = v.add(forceVec.clone().multiplyScalar(delta_t));
        }

        setElement( i, velocities, v );
        // ----------- STUDENT CODE END ------------
    }

};

EulerUpdater.prototype.updateColors = function ( particleAttributes, alive, delta_t ) {
    var colors    = particleAttributes.color;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var c = getElement( i, colors );

        setElement( i, colors, c );
        // ----------- STUDENT CODE END ------------
    }
};

EulerUpdater.prototype.updateSizes= function ( particleAttributes, alive, delta_t ) {
    var sizes    = particleAttributes.size;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
        var s = getElement( i, sizes );

        setElement( i, sizes, s );
        // ----------- STUDENT CODE END ------------
    }

};

EulerUpdater.prototype.updateLifetimes = function ( particleAttributes, alive, delta_t) {
    var positions     = particleAttributes.position;
    var lifetimes     = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;

        var lifetime = getElement( i, lifetimes );

        if ( lifetime < 0 ) {
            killPartilce( i, particleAttributes, alive );
        } else {
            setElement( i, lifetimes, lifetime - delta_t );
        }
    }

};

EulerUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
    if ( !this._opts.collidables ) {
        return;
    }
    if ( this._opts.collidables.bouncePlanes ) {
        for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
            var plane = this._opts.collidables.bouncePlanes[i].plane;
            var damping = this._opts.collidables.bouncePlanes[i].damping;
            Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
        }
    }

    if ( this._opts.collidables.sinkPlanes ) {
        for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
            var plane = this._opts.collidables.sinkPlanes[i].plane;
            Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
        }
    }

    if ( this._opts.collidables.spheres ) {
        for (var i = 0 ; i < this._opts.collidables.spheres.length ; ++i ) {
            Collisions.Sphere( particleAttributes, alive, delta_t, this._opts.collidables.spheres[i] );
        }
    }

    if ( this._opts.collidables.sinkBox ) {
        for (var i = 0 ; i < this._opts.collidables.sinkBox.length ; ++i ) {
            var min = this._opts.collidables.sinkBox[i].min;
            var max = this._opts.collidables.sinkBox[i].max;
            Collisions.SinkBox( particleAttributes, alive, delta_t, min, max );
        }
    }
    if ( this._opts.collidables.bounceBox ) {
        for (var i = 0 ; i < this._opts.collidables.bounceBox.length ; ++i ) {
            var min = this._opts.collidables.bounceBox[i].min;
            var max = this._opts.collidables.bounceBox[i].max;
            var damping = this._opts.collidables.bounceBox[i].damping;
            Collisions.BounceBox( particleAttributes, alive, delta_t, min, max, damping);
        }
    }
};

EulerUpdater.prototype.update = function ( particleAttributes, alive, delta_t ) {

    this.updateLifetimes( particleAttributes, alive, delta_t );
    this.updateVelocities( particleAttributes, alive, delta_t );
    this.updatePositions( particleAttributes, alive, delta_t );

    this.collisions( particleAttributes, alive, delta_t );

    this.updateColors( particleAttributes, alive, delta_t );
    this.updateSizes( particleAttributes, alive, delta_t );

    // tell webGL these were updated
    particleAttributes.position.needsUpdate = true;
    particleAttributes.color.needsUpdate = true;
    particleAttributes.velocity.needsUpdate = true;
    particleAttributes.lifetime.needsUpdate = true;
    particleAttributes.size.needsUpdate = true;

}


function ClothUpdater ( opts ) {
    this._opts = opts;
    this._s = 10.0;
    this._k_s = 0.55*100;
    return this;
}

ClothUpdater.prototype.calcHooke = function ( p, q ) {
    // ----------- STUDENT CODE BEGIN ------------
    var k_s = this._k_s;
    var rest_len = this._s;
    var dist = q.distanceTo(p);
    var D = (q.clone().sub(p)).normalize();
    var force = D.multiplyScalar(k_s * (dist - rest_len));

    return force;
    // ----------- STUDENT CODE END ------------
}

ClothUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;

    for ( var i  = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
        var p = getElement( i, positions );
        var v = getElement( i, velocities );
        p.add( v.clone().multiplyScalar( delta_t ) );
        setElement( i, positions, p );
    }
};

ClothUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t, width, height ) {
    var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
    var gravity = this._opts.externalForces.gravity;
    var attractors = this._opts.externalForces.attractors;

    for ( var j = 0 ; j < height; ++j ) {
        for ( var i = 0 ; i < width ; ++i ) {
            var idx = j * width + i;

            // ----------- STUDENT CODE BEGIN ------------
            var p = getElement( idx, positions );
            var v = getElement( idx, velocities );

            // calculate forces on this node from neighboring springs 
            // (using this.calcHooke()... )
            var neighbors = [];
            if (i > 0) {
                neighbors.push(j*width + i - 1);
            }
            if (i < width - 1) {
                neighbors.push(j*width + i + 1);
            }
            if (j > 0) {
               neighbors.push((j-1)*width + i);
            }
            if (j < height - 1) {
               neighbors.push((j+1)*width + i);
            }
            for (var n = 0; n < neighbors.length; n++) {
                var force = this.calcHooke(p, getElement(neighbors[n], positions));
                v.add(force.clone().multiplyScalar(delta_t));
            }
            v.add(gravity.clone().multiplyScalar(delta_t));
            
            setElement( idx, velocities, v );
            // ----------- STUDENT CODE END ------------
        }
    }

};


ClothUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
    if ( !this._opts.collidables ) {
        return;
    }
    if ( this._opts.collidables.bouncePlanes ) {
        for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
            var plane = this._opts.collidables.bouncePlanes[i].plane;
            var damping = this._opts.collidables.bouncePlanes[i].damping;
            Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
        }
    }

    if ( this._opts.collidables.sinkPlanes ) {
        for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
            var plane = this._opts.collidables.sinkPlanes[i].plane;
            Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
        }
    }

    if ( this._opts.collidables.bounceSpheres ) {
        for (var i = 0 ; i < this._opts.collidables.bounceSpheres.length ; ++i ) {
            var sphere = this._opts.collidables.bounceSpheres[i].sphere;
            var damping = this._opts.collidables.bounceSpheres[i].damping;
            Collisions.BounceSphere( particleAttributes, alive, delta_t, sphere, damping );
        }
    }
};


ClothUpdater.prototype.update = function ( particleAttributes, alive, delta_t, width, height ) {

    this.updateVelocities( particleAttributes, alive, delta_t, width, height );
    this.updatePositions( particleAttributes, alive, delta_t, width, height );

    this.collisions( particleAttributes, alive, delta_t );

    // tell webGL these were updated
    particleAttributes.position.needsUpdate = true;
    particleAttributes.color.needsUpdate = true;
    particleAttributes.velocity.needsUpdate = true;
    particleAttributes.lifetime.needsUpdate = true;
    particleAttributes.size.needsUpdate = true;
}

///////////////////////////////////////////////////////////////////////////////
// Fire updater
////////////////////////////////////////////////////////////////////////////////

function FireUpdater ( opts ) {
    this._opts = opts;
    return this;
};

var flag = 0;
var flag2 = 0;
var flag3 = 0;
var flag4 = 0;
FireUpdater.prototype.updatePositions = function ( particleAttributes, alive, delta_t ) {
    var positions  = particleAttributes.position;
    var velocities = particleAttributes.velocity;
	var fireworkStyles = particleAttributes.fireworkStyle;
    var lifetimes = particleAttributes.lifetime;
	var colors = particleAttributes.color;

	var spoutNum = 0;
    for ( var i  = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
		var style = getElement(i, fireworkStyles);
		
		var doDefault = false;
		if (style == STATE.FIRE_START.value) {
			// Just make the particles move according to the velocity 
			var p = getElement( i, positions );
			if (p.y < -60) {
				killPartilce( i, particleAttributes, alive );
			}
			doDefault = true;
		} else if (style == STATE.SATURN_START.value) {
			var p = getElement( i, positions );
			var v = getElement( i, velocities );
			var radius = 20;
			var dist = p.distanceTo(STATE.SATURN_START.randPos[0]);
			if (dist < radius) {
				p.add( v.clone().multiplyScalar( delta_t ) );
				setElement( i, positions, p );
			} else {
				if (Math.random() < 0.05) {
					killPartilce( i, particleAttributes, alive );
				}
			}
		} else if (style == STATE.SATURN_RING.value) {
			var p = getElement( i, positions );
			var v = getElement( i, velocities );
			var radius = 50;
			var dist = p.distanceTo(STATE.SATURN_START.randPos[0]);
			if (dist < radius) {
				p.add( v.clone().multiplyScalar( delta_t ) );
				setElement( i, positions, p );
			} else {
				if (Math.random() < 0.1) {
					killPartilce( i, particleAttributes, alive );
				}
			}
		} else if (style == STATE.SPHERE_NORMAL.value) {
            doDefault = true;
            var l = getElement(i, lifetimes);
            if (l < 0.2) {
                if (Math.random() < 0.1) {
                    killPartilce( i, particleAttributes, alive );
					continue;
                }
            }
		} else if (style == STATE.HEART_START.value) {
            doDefault = true;
            var l = getElement(i, lifetimes);
            if (l < 0.2) {
                if (Math.random() < 0.1) {
                    killPartilce( i, particleAttributes, alive );
					continue;
                }
            }
        } else if (style == STATE.SUDO_SPHERE.value) {
            doDefault = true;
            var l = getElement(i, lifetimes);
            if (l < 0.2) {
                if (Math.random() < 0.1) {
                    killPartilce( i, particleAttributes, alive );
					continue;
                }
            }
        } else if (style == STATE.TORUS_START.value) {
            doDefault = true;
            var l = getElement(i, lifetimes);
            if (l < 0.5) {
                if (Math.random() < 0.1) {
                    killPartilce( i, particleAttributes, alive );
					continue;
                }
            }
        } else if (style == STATE.MULTI_BLAST.value) {
            doDefault = true;
            var l = getElement(i, lifetimes);
            if (l < 0.2) {
                if (Math.random() < 0.1) {
                    killPartilce( i, particleAttributes, alive );
					continue;
                }
            }
        } else if (style == STATE.SPIRAL.value) {
            var p = getElement( i, positions );
            var v = getElement( i, velocities );
            var l = getElement(i, lifetimes);
            p.add( v.clone().multiplyScalar( delta_t ) );
            setElement( i, positions, p );
            if (l < 0.4) {
                if (Math.random() < 0.05) {
                    killPartilce( i, particleAttributes, alive );
                }
            }
        } else if (style == STATE.MOVE_AROUND.value) {
            var l = getElement(i, lifetimes);
            doDefault = true;
            if (l < 1.1) {
                if (Math.random() < 0.04) {
                    killPartilce( i, particleAttributes, alive );
					continue;
                }
            }
        } else if (style == STATE.MICKEY_MOUSE.value) {
            var l = getElement(i, lifetimes);
            doDefault = true;
            if (l < 1.35) {
                if (Math.random() < 0.04) {
                    killPartilce( i, particleAttributes, alive );
                    continue;
                }
            }
        } else if (style == STATE.TRAIL1.value) {
			doDefault = true;
			if (l < 1.1) {
                if (Math.random() < 0.04) {
                    killPartilce( i, particleAttributes, alive );
					continue;
                }
            }
		} else if (style == STATE.PICTURE.value) {
			if (Math.random() < 0.001) {
				killPartilce(i, particleAttributes, alive);
				continue;
			}
			doDefault = true;
		} else if (style == STATE.GROUND_SHOOTS.value) {
			var idx = Math.floor(Math.random()*STATE.GROUND_SHOOTS.randPos.length);
			var pos = STATE.GROUND_SHOOTS.randPos[idx].clone();
			var t = 2.0 - getElement(i, lifetimes);
			pos.add(new THREE.Vector3(3*Math.cos(30*t), 40*t, 3*Math.sin(30*t)));
			setElement( i, positions, pos );
		} else if (style == STATE.SPHERE_DRUNK.value) {
            doDefault = true;
            var l = getElement(i, lifetimes);
            if (l < 0.2) {
                if (Math.random() < 0.1) {
                    killPartilce( i, particleAttributes, alive );
                }
            }
		} else if (style == STATE.GIRANDOLA.value) {
			doDefault = true;
		} else if (style == STATE.TREE.value) {
			doDefault = true;
		} else if (style == STATE.TREE_BALL.value) {
			doDefault = true;
		} else if (style == STATE.SPINNER.value) {
			//var l = getElement(i, lifetimes);
			var t = STATE.SPINNER.param;
			var decay = 0.5;
			var radiusScale = 10;
			var spinFreq = 10;
			var p;
			if (STATE.SPINNER.counter % 6 == 0) {
				var r = radiusScale * Math.exp(decay*t) * t;
				p = new THREE.Vector3(r*Math.cos(spinFreq*t), r*Math.sin(spinFreq*t), 0.0);
				setElement(i, positions, p.add(STATE.SPINNER.randPos[0]));
				if (STATE.SPINNER.counter < 6) {
					var vx = -spinFreq*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t) + radiusScale*Math.exp(decay*t)*Math.cos(spinFreq*t)
									+ decay*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t);
					var vy = spinFreq*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t) + radiusScale*Math.exp(decay*t)*Math.sin(spinFreq*t)
									+ decay*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t);
					var vz = 0.0;
					var v = new THREE.Vector3(vx, vy, vz);
					setElement(i, velocities, v);
					setElement(i, colors, STATE.SPINNER.colors[1]);
					setElement(i, fireworkStyles, STATE.SPINNER2.value);
				}
			} else if (STATE.SPINNER.counter % 6 == 1) {
				var r = -radiusScale * Math.exp(decay*t) * t;
				p = new THREE.Vector3(r*Math.cos(spinFreq*t), r*Math.sin(spinFreq*t), 0.0);
				setElement(i, positions, p.add(STATE.SPINNER.randPos[0]));
				
				if (STATE.SPINNER.counter < 6) {
					var vx = spinFreq*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t) - radiusScale*Math.exp(decay*t)*Math.cos(spinFreq*t)
									- decay*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t);
					var vy = -spinFreq*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t) - radiusScale*Math.exp(decay*t)*Math.sin(spinFreq*t)
									- decay*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t);
					var vz = 0.0;
					var v = new THREE.Vector3(vx, vy, vz);
					setElement(i, velocities, v);
					setElement(i, colors, STATE.SPINNER.colors[2]);
					setElement(i, fireworkStyles, STATE.SPINNER2.value);
				}
			} else if (STATE.SPINNER.counter % 6 == 2) {
				var r = radiusScale * Math.exp(decay*t) * t;
				p = new THREE.Vector3(0.0, r*Math.cos(spinFreq*t), r*Math.sin(spinFreq*t));
				var axis = new THREE.Vector3(1.0, 1.0, 1.0).normalize();
				p.applyAxisAngle(axis, 1.047);
				setElement(i, positions, p.add(STATE.SPINNER.randPos[0]));
				if (STATE.SPINNER.counter < 6) {
					var vx = -spinFreq*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t) + radiusScale*Math.exp(decay*t)*Math.cos(spinFreq*t)
									+ decay*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t);
					var vy = spinFreq*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t) + radiusScale*Math.exp(decay*t)*Math.sin(spinFreq*t)
									+ decay*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t);
					var vz = 0.0;
					var v = new THREE.Vector3(vz, vx, vy);
					v.applyAxisAngle(axis, 1.047);
					setElement(i, velocities, v);
					setElement(i, colors, STATE.SPINNER.colors[3]);
					setElement(i, fireworkStyles, STATE.SPINNER2.value);
				}
			} else if (STATE.SPINNER.counter % 6 == 3){
				var r = -radiusScale * Math.exp(decay*t) * t;
				p = new THREE.Vector3(0.0, r*Math.cos(spinFreq*t), r*Math.sin(spinFreq*t));
				var axis = new THREE.Vector3(1.0, 1.0, 1.0).normalize();
				p.applyAxisAngle(axis, 1.047);
				setElement(i, positions, p.add(STATE.SPINNER.randPos[0]));
				if (STATE.SPINNER.counter < 6) {
					var vx = spinFreq*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t) - radiusScale*Math.exp(decay*t)*Math.cos(spinFreq*t)
									- decay*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t);
					var vy = -spinFreq*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t) - radiusScale*Math.exp(decay*t)*Math.sin(spinFreq*t)
									- decay*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t);
					var vz = 0.0;
					var v = new THREE.Vector3(vz, vx, vy);
					v.applyAxisAngle(axis, 1.047);
					setElement(i, velocities, v);
					setElement(i, colors, STATE.SPINNER.colors[4]);
					setElement(i, fireworkStyles, STATE.SPINNER2.value);
				}
			} else if (STATE.SPINNER.counter % 6 == 4) {
				var r = radiusScale * Math.exp(decay*t) * t;
				p = new THREE.Vector3(0.0, r*Math.cos(spinFreq*t), r*Math.sin(spinFreq*t));
				var axis = new THREE.Vector3(1.0, 1.0, 1.0).normalize();
				p.applyAxisAngle(axis, -1.047);
				setElement(i, positions, p.add(STATE.SPINNER.randPos[0]));
				
				if (STATE.SPINNER.counter < 6) {
					var vx = -spinFreq*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t) + radiusScale*Math.exp(decay*t)*Math.cos(spinFreq*t)
									+ decay*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t);
					var vy = spinFreq*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t) + radiusScale*Math.exp(decay*t)*Math.sin(spinFreq*t)
									+ decay*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t);
					var vz = 0.0;
					var v = new THREE.Vector3(vz, vx, vy);
					v.applyAxisAngle(axis, -1.047);
					setElement(i, velocities, v);
					setElement(i, colors, STATE.SPINNER.colors[5]);
					setElement(i, fireworkStyles, STATE.SPINNER2.value);
				}
			} else {
				var r = -radiusScale * Math.exp(decay*t) * t;
				p = new THREE.Vector3(0.0, r*Math.cos(spinFreq*t), r*Math.sin(spinFreq*t));
				var axis = new THREE.Vector3(1.0, 1.0, 1.0).normalize();
				p.applyAxisAngle(axis, -1.047);
				setElement(i, positions, p.add(STATE.SPINNER.randPos[0]));
				
				if (STATE.SPINNER.counter < 6) {
					var vx = spinFreq*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t) - radiusScale*Math.exp(decay*t)*Math.cos(spinFreq*t)
									- decay*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t);
					var vy = -spinFreq*radiusScale*t*Math.exp(decay*t)*Math.cos(spinFreq*t) - radiusScale*Math.exp(decay*t)*Math.sin(spinFreq*t)
									- decay*radiusScale*t*Math.exp(decay*t)*Math.sin(spinFreq*t);
					var vz = 0.0;
					var v = new THREE.Vector3(vz, vx, vy);
					v.applyAxisAngle(axis, -1.047);
					setElement(i, velocities, v);
					setElement(i, colors, STATE.SPINNER.colors[6]);
					setElement(i, fireworkStyles, STATE.SPINNER2.value);
				}
			}
			
			STATE.SPINNER.counter++;
		} else if (style == STATE.SPINNER2.value) {
			doDefault = true;
		} else if (style == STATE.SPIDER.value) {
			if (Math.random() < 0.001) {
				killPartilce(i, particleAttributes, alive);
				continue;
			}
			doDefault = true;
		} else if (style == STATE.SNOW.value) {
			var p = getElement(i, positions);
			if (p.y < -60) {
				killPartilce(i, particleAttributes, alive);
			}
			doDefault = true;
		}
		
		// The default state is to just update position based on velocity 
		if (style == STATE.DEFAULT.value || doDefault) {
			var p = getElement( i, positions );
			var v = getElement( i, velocities );
			p.add( v.clone().multiplyScalar( delta_t ) );
			setElement( i, positions, p );
		}
    }
	STATE.SPINNER.counter = 0;
	STATE.SPINNER.param += 0.02;
};

FireUpdater.prototype.updateVelocities = function ( particleAttributes, alive, delta_t ) {
    var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
	var styles = particleAttributes.fireworkStyle;
    var gravity = this._opts.externalForces.gravity;
    var attractors = this._opts.externalForces.attractors;
    var lifetimes = particleAttributes.lifetime;
	var colors = particleAttributes.color;
	
	var flag = 0;
    var flag2 = 0;
	var flag3 = 0;
	var flagTree = 0;
	var flagTreeBall = 0;

    for ( var i = 0 ; i < alive.length ; ++i ) {
        if ( !alive[i] ) continue;
		var style = getElement(i, styles);
		
		var doDefault = false;
		var drag = 0;
		if (style == STATE.FIRE_START.value) {
			// Just make the velocity update base on forces 
			doDefault = true;
		} else if (style == STATE.SATURN_START.value) {
		} else if (style == STATE.SPHERE_NORMAL.value) {
            doDefault = true;
        } else if (style == STATE.HEART_START.value) {
            doDefault = true;
        } else if (style == STATE.SUDO_SPHERE.value) {
            doDefault = true;
        } else if (style == STATE.TORUS_START.value) {
            doDefault = true;
        } else if (style == STATE.SPIRAL.value) {
            var p = getElement( i, positions );
            var v = getElement( i, velocities );
            var origin = STATE.SPIRAL.randPos[0].clone();
            var zaxis = new THREE.Vector3(0, 0, 1);
            var vProj = new THREE.Vector3(p.x-origin.x, p.y-origin.y, 0.0);
            var length = vProj.length();
            vProj.normalize();
            var vChange = vProj.clone().cross(zaxis);
            // vChange.multiplyScalar(length*delta_t*30);
            // var originalVL = v.length();
            // var vel = v.clone().add(vChange);
            // vel.normalize();
            // vel.multiplyScalar(1.04 * originalVL);
            vChange.multiplyScalar(length*delta_t*20);
            var vel = v.clone().add(vChange);
            var length2 = vel.length();
            vel.normalize();
            vel.multiplyScalar(length2 * 0.96);
            setElement(i, velocities, vel);
        } else if (style == STATE.TRAIL1.value) {
			doDefault = true;
			drag = 0.01;
		} else if (style == STATE.MULTI_BLAST.value) {
            var l = getElement(i, lifetimes);
            if (l < 1 && STATE.MULTI_BLAST.randPos[1].y == 0) {
                var r = 5;
                var z = r * (1.0 - 2.0 * Math.random());
                var phi = 2.0 * Math.PI * Math.random();
                var d = Math.sqrt(r * r - z * z);
                var px = d * Math.cos(phi);
                var py = d * Math.sin(phi);
                var pz = z;
                var explode = new THREE.Vector3(px, py, pz);
                var vel = explode.clone().multiplyScalar(5);
                setElement( i, velocities, vel );
                STATE.MULTI_BLAST.randPos[1].z = 1;
            } 
            if (l >= 1) {
                flag = 1;
            }
        } else if (style == STATE.MICKEY_MOUSE.value) {
            var l = getElement(i, lifetimes);
            var pos = getElement(i, positions);
            var v = getElement(i, velocities);

            if (l < 1.65 && STATE.MICKEY_MOUSE.randPos[1].y == 0) {
                var r1 = 7;
                var r2 = 7;
                var r3 = 30;
                var coffset = new THREE.Vector3(-25, 10, 0);
                var c1 = STATE.MICKEY_MOUSE.randPos[0].clone().add(coffset);
                var coffset = new THREE.Vector3(25, 10, 0);
                var c2 = STATE.MICKEY_MOUSE.randPos[0].clone().add(coffset);
                var coffset = new THREE.Vector3(0, -40, 0);
                var c3 = STATE.MICKEY_MOUSE.randPos[0].clone().add(coffset);
                var choice = Math.random();
                var total = r1  + r2 + r3;
                if (choice < (r1/ total)) {
                    //Put on r1
                    var z = r1 * (1.0 - 2.0 * Math.random());
                    var phi = 2.0 * Math.PI * Math.random();
                    var d = Math.sqrt(r1 * r1 - z * z);
                    var px = d * Math.cos(phi);
                    var py = d * Math.sin(phi);
                    var pz = z;
                    var point = new THREE.Vector3(px+c1.x, py+c1.y, pz+c1.z);
                    var vel = point.clone().sub(pos);
                    vel.multiplyScalar(1);
                    setElement( i, velocities, vel );
                    var c = STATE.MICKEY_MOUSE.colors[1];
                    setElement(i, colors, c);
                } else if (choice < ((r1 + r2) / total)) {
                    //Put on r2
                    var z = r2 * (1.0 - 2.0 * Math.random());
                    var phi = 2.0 * Math.PI * Math.random();
                    var d = Math.sqrt(r2 * r2 - z * z);
                    var px = d * Math.cos(phi);
                    var py = d * Math.sin(phi);
                    var pz = z;
                    var point = new THREE.Vector3(px+c2.x, py+c2.y, pz+c2.z);
                    var vel = point.clone().sub(pos);
                    vel.multiplyScalar(1);
                    setElement( i, velocities, vel );
                    var c = STATE.MICKEY_MOUSE.colors[1];
                    setElement(i, colors, c);
                } else {
                    //Put on r3 
                    var z = r3 * (1.0 - 2.0 * Math.random());
                    var phi = 2.0 * Math.PI * Math.random();
                    var d = Math.sqrt(r3 * r3 - z * z);
                    var px = d * Math.cos(phi);
                    var py = d * Math.sin(phi);
                    var pz = z;
                    var point = new THREE.Vector3(px+c3.x, py+c3.y, pz+c3.z);
                    var vel = point.clone().sub(pos);
                    vel.multiplyScalar(1);
                    setElement( i, velocities, vel );
                    var c = STATE.MICKEY_MOUSE.colors[2];
                    setElement(i, colors, c);
                }
                STATE.MICKEY_MOUSE.randPos[1].z = 1;
            } else if (l < 0.5) {
                var vel = v.clone().multiplyScalar(0.5);
                setElement(i, velocities, vel);
            } else {
                var vel = v.clone().multiplyScalar(0.98);
                setElement(i, velocities, vel);
            }
            if (l >= 1.65) {
                flag = 1;
            }
        } else if (style == STATE.MOVE_AROUND.value) {
            var l = getElement(i, lifetimes);
            if (l < 1.6 && STATE.MOVE_AROUND.randPos[1].y == 0) {
                var r = 5;
                var z = r * (1.0 - 2.0 * Math.random());
                var phi = 2.0 * Math.PI * Math.random();
                var d = Math.sqrt(r * r - z * z);
                var px = d * Math.cos(phi);
                var py = d * Math.sin(phi);
                var pz = z;
                var explode = new THREE.Vector3(px, py, pz);
                var vel = explode.clone().multiplyScalar(4);
                setElement( i, velocities, vel );
                STATE.MOVE_AROUND.randPos[1].z = 1;
            } 
            if (l >= 1.6) {
                flag = 1;
            }
            if (l < 1.1 && STATE.MOVE_AROUND.randPos[2].y == 0) {
                var r = 5;
                var z = r * (1.0 - 2.0 * Math.random());
                var phi = 2.0 * Math.PI * Math.random();
                var d = Math.sqrt(r * r - z * z);
                var px = d * Math.cos(phi);
                var py = d * Math.sin(phi);
                var pz = z;
                var explode = new THREE.Vector3(px, py, pz);
                var vel = explode.clone().multiplyScalar(4);
                setElement( i, velocities, vel );
                STATE.MOVE_AROUND.randPos[2].z = 1;
            } 
            if (l >= 1.1) {
                flag2 = 1;
            }
        } else if (style == STATE.PICTURE.value) {
			doDefault = true;
			drag = 0.01;
		} else if (style == STATE.SPHERE_DRUNK.value) {
            var p = getElement( i, positions );
			var v = getElement( i, velocities );
			var vPerp;
			if (Math.random() < 0.1) {
				vPerp = new THREE.Vector3(Math.random()-0.5, Math.random()-0.5, 0);
				//var vPerp = new THREE.Vector3(1, 0, 0);
				if (Math.abs(v.z) > 0.0001) {
					vPerp.z = -(v.x*vPerp.x + v.y*vPerp.y)/v.z;
				} else {
					vPerp.z = -(v.x*vPerp.x + v.y*vPerp.y)/(v.z + 0.0001);
				}
			vPerp.normalize();
			} else {
				vPerp = new THREE.Vector3(0.0, 0.0, 0.0);
			}
			v.add(v.clone().multiplyScalar(-0.5*delta_t));
			// Gravity
			v = gravity.clone().multiplyScalar(delta_t).clone().add(v);
			
			var newForce = vPerp.multiplyScalar(500*delta_t);
			v.add(newForce);
			
			setElement( i, velocities, v );
        } else if (style == STATE.GIRANDOLA.value) {
			if (Math.random() < 0.02) {
				killPartilce(i, particleAttributes, alive);
				continue;
			}
			doDefault = true;
			var l = getElement(i, lifetimes);
			var c = getElement(i, colors);
			if (l < STATE.GIRANDOLA.explodeTime && c.w < 0.99) {
				var vel = STATE.GIRANDOLA.randPos[STATE.GIRANDOLA.counter];
				if (vel !== undefined) {
					setElement(i, velocities, vel.clone());
				}
				c.w = 1.0;
				setElement(i, colors, c);
				//setElement(i, colors, new THREE.Vector4(1.0, 0.0, 0.0, 1.0));
				flag3 = 1;
			}
		} else if (style == STATE.TREE.value) {
			if (Math.random() < 0.02) {
				killPartilce(i, particleAttributes, alive);
				continue;
			}
			var v = getElement( i, velocities );
			doDefault = true;
			var l = getElement(i, lifetimes);
			if (l < STATE.TREE.explodeTime && STATE.TREE.explodeTime > 0.4) {
				flagTree = 1;
				if (STATE.TREE.counter % 4 == 0) {
					var axisX = new THREE.Vector3(1.0, 0.0, 0.0);
					v.applyAxisAngle(axisX, 0.523);
				} else if (STATE.TREE.counter % 4 == 1) {
					var axisX = new THREE.Vector3(1.0, 0.0, 0.0);
					v.applyAxisAngle(axisX, -0.523);
				} else if (STATE.TREE.counter % 4 == 2) {
					var axisX = new THREE.Vector3(0.0, 0.0, 1.0);
					v.applyAxisAngle(axisX, 0.523);
				} else if (STATE.TREE.counter % 4 == 3) {
					var axisX = new THREE.Vector3(0.0, 0.0, 1.0);
					v.applyAxisAngle(axisX, -0.523);
				}
					
				STATE.TREE.counter++;
				setElement(i, velocities, v);
				setElement(i, colors, STATE.TREE.colors[STATE.TREE.binaryLayer].clone());
			}
		} else if (style == STATE.TREE_BALL.value) {
			if (Math.random() < 0.02) {
				killPartilce(i, particleAttributes, alive);
				continue;
			}
			var v = getElement( i, velocities );
			doDefault = true;
			var l = getElement(i, lifetimes);
			if (l < STATE.TREE_BALL.explodeTime && STATE.TREE_BALL.explodeTime > 0.4) {
				flagTreeBall = 1;
				if (STATE.TREE_BALL.counter % 4 == 0) {
					var axisX = new THREE.Vector3(1.0, 0.0, 0.0);
					v.applyAxisAngle(axisX, 0.523);
				} else if (STATE.TREE_BALL.counter % 4 == 1) {
					var axisX = new THREE.Vector3(1.0, 0.0, 0.0);
					v.applyAxisAngle(axisX, -0.523);
				} else if (STATE.TREE_BALL.counter % 4 == 2) {
					var axisX = new THREE.Vector3(0.0, 0.0, 1.0);
					v.applyAxisAngle(axisX, 0.523);
				} else if (STATE.TREE_BALL.counter % 4 == 3) {
					var axisX = new THREE.Vector3(0.0, 0.0, 1.0);
					v.applyAxisAngle(axisX, -0.523);
				}
					
				STATE.TREE_BALL.counter++;
				setElement(i, velocities, v);
				setElement(i, colors, STATE.TREE_BALL.colors[STATE.TREE_BALL.binaryLayer].clone());
			}
		} else if (style == STATE.SPIDER.value) {
			doDefault = true;
			drag = 0.01;
		} else if (style == STATE.SNOW.value) {
			doDefault = true;
			drag = 0.01;
			var v = getElement(i, velocities);
			v.x = 4.5 + Math.random();
			setElement(i, velocities, v);
		}

		// The default state is to just update velocity based on forces 
		if (style == STATE.DEFAULT.value || doDefault) {
			var p = getElement( i, positions );
			var v = getElement( i, velocities );
			// now update velocity based on forces...
			// Gravity
			v = gravity.clone().multiplyScalar(delta_t).clone().add(v);
	        v.add(v.clone().multiplyScalar(-0.5*delta_t));

			// Attractors
			for (var j = 0; j < attractors.length; j++) {
				var d2 = attractors[j].center.distanceToSquared(p);
				var f_a = attractors[j].radius * 1000 / d2;
				var forceVec = attractors[j].center.clone().sub(p).multiplyScalar(f_a);
				v = v.add(forceVec.clone().multiplyScalar(delta_t));
			}
			
			v.add(v.clone().multiplyScalar(-drag));
			
			setElement( i, velocities, v );
		}
    }
    if (STATE.MULTI_BLAST.randPos[1].z == 1 && flag == 0) {
        STATE.MULTI_BLAST.randPos[1].y = 1;
    }
    if (STATE.MOVE_AROUND.randPos[1].z == 1 && flag == 0) {
        STATE.MOVE_AROUND.randPos[1].y += 1;
    }
    if (STATE.MOVE_AROUND.randPos[2].z == 1 && flag2 == 0) {
        STATE.MOVE_AROUND.randPos[2].y += 1;
    }
    if (STATE.MICKEY_MOUSE.randPos[1].z == 1 && flag == 0) {
        STATE.MICKEY_MOUSE.randPos[1].y = 1;
    }
	
	if (flag3 == 1 && Math.random() < 0.3) {
		STATE.GIRANDOLA.explodeTime *= 0.99;
		STATE.GIRANDOLA.counter--;
		if (STATE.GIRANDOLA < 1) {
			STATE.GIRANDOLA = 1;
		}
	}
	
	if (flagTree == 1) {
		STATE.TREE.explodeTime *= 0.8;
		STATE.TREE.binaryLayer = (STATE.TREE.binaryLayer + 1) % STATE.TREE.colors.length;
	}
	 
	if (flagTreeBall == 1) {
		STATE.TREE_BALL.explodeTime *= 0.8;
		STATE.TREE_BALL.binaryLayer = (STATE.TREE_BALL.binaryLayer + 1) % STATE.TREE_BALL.colors.length;
	} 

};

FireUpdater.prototype.updateColors = function ( particleAttributes, alive, delta_t ) {
    var colors    = particleAttributes.color;
    var positions = particleAttributes.position;
	var styles = particleAttributes.fireworkStyle;
    var lifetimes = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
		var style = getElement(i, styles);
		
		if (style == STATE.DEFAULT.value) {
			// If style is default, make it transparent 
			var c = new THREE.Vector4(1.0, 1.0, 1.0, 0.0);
			setElement( i, colors, c );
		} else if (style == STATE.FIRE_START.value) {
			// If the state is FIRE_START, we set 
			var c = getElement( i, colors );
			var p = getElement( i, positions );
			if (p.x < STATE.FIRE_START.randPos[1].x - 5) {
				c = STATE.FIRE_START.colors[0];
			} else if (p.x > STATE.FIRE_START.randPos[1].x - 5 && p.x < STATE.FIRE_START.randPos[2].x) {
				c = STATE.FIRE_START.colors[1];
			} else {
				c = STATE.FIRE_START.colors[2];
			}
			if (p.y > -40) {
				var rand = Math.random();
				if (rand < 0.3) {
					c = new THREE.Vector4 ( 0.2, 0.2, 0.2, 1.0 );
				} else if (rand < 0.6) {
					c = new THREE.Vector4 ( 1.0, 0.4, 0.4, 1.0 );
				} else {
					if (p.x < STATE.FIRE_START.randPos[1].x - 5) {
                        c = STATE.FIRE_START.colors[0];
                    } else if (p.x > STATE.FIRE_START.randPos[1].x - 5 && p.x < STATE.FIRE_START.randPos[2].x) {
                        c = STATE.FIRE_START.colors[1];
                    } else {
                        c = STATE.FIRE_START.colors[2];
                    }
				}
			}
			setElement( i, colors, c );
		} else if (style == STATE.SATURN_START.value) {
		} else if (style == STATE.TRAIL1.value) {
		} else if (style == STATE.SPHERE_NORMAL.value) {
			if (STATE.SPHERE_NORMAL.extraParticles == 1) {
				var thisLife = getElement(i, lifetimes);
				if (thisLife > 0.2) {
					continue;
				}
				var c = getElement(i, colors);
				if (c.w < 0.1) {
					c.w = 1;
					setElement(i, lifetimes, 0.5);
				}
				setElement(i, colors, c);
			} else {
				if (STATE.SPHERE_NORMAL.type == 0) {
					var c = getElement( i, colors );
					c.multiplyScalar(0.99);
					setElement(i, colors, c);
				} else if (STATE.SPHERE_NORMAL.type == 1) {				
					var alpha = Math.exp(-2*(2 - getElement(i, lifetimes)));
					alpha = Math.min(Math.max(alpha, 0.0), 1.0);
					var c0 = STATE.SPHERE_NORMAL.colors[0].clone();
					var c1 = STATE.SPHERE_NORMAL.colors[1].clone();
					c0.multiplyScalar(alpha).add(c1.multiplyScalar(1 - alpha));
					setElement(i, colors, c0);
				} else if (STATE.SPHERE_NORMAL.type == 2) {
					var p = getElement(i, positions);
					var distToCenter = p.distanceTo(STATE.SPHERE_NORMAL.randPos[0]);
					if (distToCenter > 20 + Math.random()*15.0) {
						setElement(i, colors, STATE.SPHERE_NORMAL.colors[1].clone());
					}
				} else {
				}
			}
            
        } else if (style == STATE.HEART_START.value) {            
            var l = getElement(i, lifetimes);
            if (Math.random() < 0.5) {
                c = getElement(i, colors);
                if (c.w == 1.0) {
                    c.w = 0.0;
                } else {
                    c.w = 1.0
                }
                setElement( i, colors, c );
            }   
        } else if (style == STATE.SUDO_SPHERE.value) {
        } else if (style == STATE.MULTI_BLAST.value) {
            if (STATE.MULTI_BLAST.randPos[1].y == 1) {
                c = STATE.MULTI_BLAST.colors[0];
                setElement( i, colors, c );
            } else {
                c = STATE.MULTI_BLAST.colors[1];
                setElement( i, colors, c );
            }
        } else if (style == STATE.MOVE_AROUND.value) {
        } else if (style == STATE.TORUS_START.value) {
        } else if (style == STATE.SPIRAL.value) {
        } else if (style == STATE.PICTURE.value) {
           // c = new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 );
            //setElement( i, colors, c );
        } else if (style == STATE.SPINNER2.value) {
			
		} else if (style == STATE.MICKEY_MOUSE.value) {
        }
        
        // ----------- STUDENT CODE END ------------
    }
};

FireUpdater.prototype.updateSizes= function ( particleAttributes, alive, delta_t ) {
    var sizes    = particleAttributes.size;
	var styles = particleAttributes.fireworkStyle;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
        // ----------- STUDENT CODE BEGIN ------------
		var style = getElement(i, styles);
		
		if (style == STATE.FIRE_START.value) {
			var s = getElement( i, sizes ) / 1.01;
			setElement( i, sizes, s );
		} else if (style == STATE.SATURN_START.value) {
			var s = getElement( i, sizes ) / 1.01;
			setElement( i, sizes, s );
		} else if (style == STATE.SATURN_RING.value) {
			var s = getElement( i, sizes ) / 1.01;
			setElement( i, sizes, s );
		} else if (style == STATE.SPHERE_NORMAL.value) {
            var s = getElement( i, sizes ) / 1.01;
            setElement( i, sizes, s );
        } else if (style == STATE.HEART_START.value) {
            var s = getElement( i, sizes ) / 1.01;
            setElement( i, sizes, s );
        } else if (style == STATE.SUDO_SPHERE.value) {
            //var s = getElement( i, sizes ) / 1.01;
            //setElement( i, sizes, s );
        } else if (style == STATE.MULTI_BLAST.value) {
            var s = getElement( i, sizes ) / 1.01;
            setElement( i, sizes, s );
        } else if (style == STATE.MOVE_AROUND.value) {
            var s = getElement( i, sizes ) / 1.01;
            setElement( i, sizes, s );
        } else if (style == STATE.TORUS_START.value) {
            var s = getElement( i, sizes ) / 1.01;
            setElement( i, sizes, s );
        } else if (style == STATE.SPIRAL.value) {
            var s = getElement( i, sizes ) / 1.01;
            setElement( i, sizes, s );
        } else if (style == STATE.PICTURE.value) {
            var s = getElement( i, sizes ) / 1.01;
            setElement( i, sizes, s );
        } else if (style == STATE.GROUND_SHOOTS.value) {
            var s = getElement( i, sizes ) / 1.01;
            setElement( i, sizes, s );
        } else if (style == STATE.TRAIL1.value) {
            var s = getElement( i, sizes ) / (1 + Math.random()*0.02);
            setElement( i, sizes, s );
        } else if (style == STATE.TREE.value) {
            var s = getElement( i, sizes ) / (1 + Math.random()*0.02);
            setElement( i, sizes, s );
        } else if (style == STATE.SPINNER.value) {
			var s = getElement( i, sizes ) / (1 + Math.random()*0.01);
            setElement( i, sizes, s );
		} else if (style == STATE.SPINNER2.value) {
			var s = getElement( i, sizes ) / (1 + Math.random()*0.03);
            setElement( i, sizes, s );
		} else if (style == STATE.SPIDER.value) {
            var s = getElement( i, sizes ) / (1 + Math.random()*0.02);;
            setElement( i, sizes, s );
        } else if (style == STATE.MICKEY_MOUSE.value) {
            var s = getElement( i, sizes ) / 1.001;
            setElement( i, sizes, s );
        }

        
        // ----------- STUDENT CODE END ------------
    }

};

FireUpdater.prototype.updateLifetimes = function ( particleAttributes, alive, delta_t) {
    var positions     = particleAttributes.position;
    var lifetimes     = particleAttributes.lifetime;

    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;

        var lifetime = getElement( i, lifetimes );

        if ( lifetime < 0 ) {
            killPartilce( i, particleAttributes, alive );
        } else {
            setElement( i, lifetimes, lifetime - delta_t );
        }
    }

};

FireUpdater.prototype.updateFireworkStyles= function ( particleAttributes, alive, delta_t ) {
	var positions = particleAttributes.position;
    var velocities = particleAttributes.velocity;
	var colors = particleAttributes.color;
	var fireworkStyles = particleAttributes.fireworkStyle;
    var lifetimes = particleAttributes.lifetime;
	var sizes = particleAttributes.size;
	var randomV = currentState.randPos;
	var numParticles = 30;

	if  (currentState == STATE.FIRE_START) {
		numParticles = 30;
	} else if (currentState == STATE.SATURN_START) {
		numParticles = 100;
	} else if (currentState == STATE.SPHERE_NORMAL) {
        numParticles = 60;
		if (STATE.SPHERE_NORMAL.extraParticles == 1) {
			numParticles = 120;
		}
    } else if (currentState == STATE.HEART_START) {
        numParticles = 30;
    } else if (currentState == STATE.SUDO_SPHERE) {
        numParticles = 80;
	}  else if (currentState == STATE.TRAIL1) {
		numParticles = 60;
	} else if (currentState == STATE.MULTI_BLAST) {
        numParticles = 200;
    } else if (currentState == STATE.MOVE_AROUND) {
        numParticles = 100;
    } else if (currentState == STATE.TORUS_START) {
        numParticles = 40;
    } else if (currentState == STATE.SPIRAL) {
        numParticles = 20;
    }  else if (currentState == STATE.PICTURE) {
		numParticles = 400;
	} else if (currentState == STATE.GROUND_SHOOTS) {
		numParticles = 5;
	} else if (currentState == STATE.SPHERE_DRUNK) {
        numParticles = 5;
    } else if (currentState == STATE.GIRANDOLA) {
		numParticles = 100;
	} else if (currentState == STATE.TREE) {
		numParticles = 1000;
	} else if (currentState == STATE.TREE_BALL) {
		numParticles = 2000;
	} else if (currentState == STATE.SPINNER) {
		numParticles = 200;
	} else if (currentState == STATE.SPIDER) {
		numParticles = 200;
	} else if (currentState == STATE.MICKEY_MOUSE) {
        numParticles = 2000;
    } 
	
	var snowFlag = 0;
    for ( var i = 0 ; i < alive.length ; ++i ) {

        if ( !alive[i] ) continue;
		
		var style = getElement( i, fireworkStyles );
		if (style != STATE.DEFAULT.value) {
			continue; // we don't want to overwrite existing fireworks 
		}
		
		var snowTop = 100;
		if (STATE.SNOW.initialized == 0) {
			newMaterial = "whiteSpark";
			setElement( i, fireworkStyles, STATE.SNOW.value);
			setElement(i, sizes, 10);
			var pos = new THREE.Vector3((Math.random() - 0.5)*500, (Math.random())*(snowTop + 60) - 60, 0);
			setElement(i, positions, pos);
			setElement(i, velocities, new THREE.Vector3(5.0, 0.0, 0.0));
			setElement(i, colors, new THREE.Vector4(1.0, 1.0, 1.0, 1.0));
			if (i > 50) 
				STATE.SNOW.initialized = 1;
		}
		if (snowFlag < 1) {
			if (Math.random() < 0.9) {
				snowFlag++;
				continue;
			}
			setElement( i, fireworkStyles, STATE.SNOW.value);
			setElement(i, sizes, 10);
			var pos = new THREE.Vector3((Math.random() - 0.5)*500, snowTop, 0);
			setElement(i, positions, pos);
			setElement(i, velocities, new THREE.Vector3(5.0, 0.0, 0.0));
			setElement(i, colors, new THREE.Vector4(1.0, 1.0, 1.0, 1.0));
			snowFlag++;
			continue;
		}
		if (numParticles > 0) {
			numParticles--;
			
			if (currentState == STATE.FIRE_START) {
				setElement( i, fireworkStyles, currentState.value);
				// Initialize the positions and velocities of the "FIRE" firework 
				var pos;
				if (spoutNum % 3 == 0) {
					pos = STATE.FIRE_START.randPos[0].clone().add(new THREE.Vector3(-50, -60, 0));
					spoutNum++;
				} else if (spoutNum % 3 == 1) {
					pos = STATE.FIRE_START.randPos[1].clone().add(new THREE.Vector3(0, -60, 0));
					spoutNum++;
				} else {
					pos = STATE.FIRE_START.randPos[2].clone().add(new THREE.Vector3(50, -60, 0));
					spoutNum++;
				}
				setElement( i, positions, pos );
				
				var vel = new THREE.Vector3 ( 0.0, 25.0, 0.0);
				var vy = 10 + Math.random() * 10;
				var radius = 10;
				vx = Math.random()*2*radius - radius;
				y = Math.sqrt(radius*radius - vx*vx);
				vz = Math.random()*2*y - y;
				vel = vel.clone().add(new THREE.Vector3(vx, vy, vz));
				setElement( i, velocities, vel );
			} else if (currentState == STATE.SATURN_START) {
				// Initialize the positions and velocities of the "SATURN" firework 
				var pos = STATE.SATURN_START.randPos[0].clone();
				setElement( i, positions, pos );
				spoutNum++;
				if (spoutNum % 10 < 7) {
					setElement( i, fireworkStyles, currentState.value);
					var base_pos = new THREE.Vector3(0.0, 0.0, 0.0);
					var r = 60;
					var z = Math.random() * 2*r - r;
					var phi = Math.random() * 2*Math.PI;
					var d = Math.sqrt(r*r - z*z);
					var px = base_pos.x + d*Math.cos(phi);
					var py = base_pos.y + d*Math.sin(phi);
					var pz = base_pos.z + z;
					var vel = new THREE.Vector3(px, py, pz);
					setElement( i, velocities, vel );
					setElement( i, colors, STATE.SATURN_START.colors[0] );
				} else {
					setElement( i, fireworkStyles, STATE.SATURN_RING.value);
					var r = 90;
					var randomAxis = Math.random();
					var axis1;
					var axis2;
					// Pick a random orientation for the Saturn rings
					// The two axis vectors specify the plane that the ring lies on 
					if (STATE.SATURN_RING.ringCount == 1) {
						if (STATE.SATURN_RING.axisValue == 0) {
							axis1 = new THREE.Vector3(1.0, 0.0, 0.0);
							axis2 = new THREE.Vector3(0.0, 0.1, 1.0).normalize();
						} else 	if (STATE.SATURN_RING.axisValue == 1) {
							axis1 = new THREE.Vector3(0.707, 0.707, 0.0);
							axis2 = new THREE.Vector3(0.0, 0.1, 1.0).normalize();
						} else if (STATE.SATURN_RING.axisValue == 2) {
							axis1 = new THREE.Vector3(0.707, -0.707, 0.0);
							axis2 = new THREE.Vector3(0.0, 0.1, 1.0).normalize();
						} else if (STATE.SATURN_RING.axisValue == 3) {
							axis1 = new THREE.Vector3(0.0, 1.0, 0.0);
							axis2 = new THREE.Vector3(0.0, 0.1, 1.0).normalize();
						}
					} else {
						if (randomAxis < 0.25) {
							axis1 = new THREE.Vector3(1.0, 0.0, 0.0);
							axis2 = new THREE.Vector3(0.0, 0.1, 1.0).normalize();
						} else if (randomAxis < 0.5) {
							axis1 = new THREE.Vector3(0.707, 0.707, 0.0);
							axis2 = new THREE.Vector3(0.0, 0.1, 1.0).normalize();
						} else if (randomAxis < 0.75) {
							axis1 = new THREE.Vector3(0.707, -0.707, 0.0);
							axis2 = new THREE.Vector3(0.0, 0.1, 1.0).normalize();
						} else {
							axis1 = new THREE.Vector3(0.0, 1.0, 0.0);
							axis2 = new THREE.Vector3(0.0, 0.1, 1.0).normalize();
						}
					}
					
					
					var vel = axis1.multiplyScalar(Math.random() - 0.5).add(axis2.multiplyScalar(Math.random() - 0.5));
					vel.normalize().multiplyScalar(r);
					setElement( i, velocities, vel );
					setElement( i, colors, STATE.SATURN_START.colors[1] );
				}
			} else if (currentState == STATE.SPHERE_NORMAL) {
                var pos = STATE.SPHERE_NORMAL.randPos[0].clone();
                setElement( i, positions, pos );
                spoutNum++;
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 2.0);
                var r = 5;
                var z = r * (1.0 - 2.0 * Math.random());
                var phi = 2.0 * Math.PI * Math.random();
                var d = Math.sqrt(r * r - z * z);
                var px = d * Math.cos(phi);
                var py = d * Math.sin(phi);
                var pz = z;
                var explode = new THREE.Vector3(px, py, pz);
                var vel = explode.clone().multiplyScalar(10);
                
				var c = STATE.SPHERE_NORMAL.colors[0].clone();
				if (STATE.SPHERE_NORMAL.extraParticles == 1 && Math.random() < 0.5) {
					c = STATE.SPHERE_NORMAL.colors[1].clone();
					c.w = 0.0;
					var angle = Math.random()*6.28;
					var radius = 60 + (Math.random() - 0.5)*20;
					vel = new THREE.Vector3(radius*Math.cos(angle), radius*Math.sin(angle), 0);
				}
				
				if (STATE.SPHERE_NORMAL.type == 3) {
					c = STATE.SPHERE_NORMAL.colors[Math.floor(Math.random()*3)];
				}
				setElement( i, colors, c);
                setElement( i, velocities, vel );
				setElement(i, sizes, 10.0);
            } else if (currentState == STATE.HEART_START) {
                var pos = STATE.HEART_START.randPos[0].clone();
                setElement( i, positions, pos );
                spoutNum++;
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 2.0);
                var u = Math.random() * Math.PI;
                var v = Math.random() * Math.PI * 2;
                var px = Math.cos(u) * Math.sin(v) - Math.pow(Math.abs(Math.sin(u) * Math.sin(v)), 0.8) * 1;
                var py = 0.8 * Math.cos(v); 
                var pz = Math.sin(v) * Math.sin(u);
                //Purposefully switched with z to match viewing direction
                var explode = new THREE.Vector3(pz, -px, py);
                var vel = explode.clone().multiplyScalar(20);
                setElement( i, velocities, vel );
				if (STATE.HEART_START.type == 0) {
					setElement( i, colors, STATE.HEART_START.colors[0] );
				} else {
					setElement( i, colors, STATE.HEART_START.colors[Math.floor(Math.random()*3)] );
				}
                
            } else if (currentState == STATE.SUDO_SPHERE) {
                var pos = STATE.SUDO_SPHERE.randPos[0].clone();
                setElement( i, positions, pos );
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 2.0);
                var u = Math.random() * Math.PI * 2;
                var v = Math.random() * Math.PI;
                var px = Math.cos(u) * Math.sin(v);
                var py = Math.sin(u) * Math.sin(v);
                var pz = Math.cos(v) + Math.log(Math.tan(0.5 * v))
                var explode = new THREE.Vector3(pz, py, px);
                var zaxis = new THREE.Vector3(0, 0, 1);
                var rotateDeg = STATE.SUDO_SPHERE.randPos[1].clone().x;
                explode.applyAxisAngle(zaxis, Math.PI / rotateDeg);
                var vel = explode.clone().multiplyScalar(20);
                setElement( i, velocities, vel );
				var c1 = STATE.SUDO_SPHERE.colors[0].clone();
				var c2;
				if (STATE.SUDO_SPHERE.type == 0) {
					c2 = STATE.SUDO_SPHERE.colors[1].clone();
				} else {
					c2 = STATE.SUDO_SPHERE.colors[0].clone();
				}
				var w1 = (u / 2.0) / (u/2.0 + v);
				var w2 = v / (u/2.0 + v);
				
                setElement( i, colors,  c1.multiplyScalar(w1).add(c2.multiplyScalar(w2)));
            } else if (currentState == STATE.MULTI_BLAST) {
                var pos = STATE.MULTI_BLAST.randPos[0].clone();
                setElement( i, positions, pos );
                spoutNum++;
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 2.0);

                if (STATE.MULTI_BLAST.randPos[1].x == 0) {
                    var r = 5;
                    var z = r * (1.0 - 2.0 * Math.random());
                    var phi = 2.0 * Math.PI * Math.random();
                    var d = Math.sqrt(r * r - z * z);
                    var px = d * Math.cos(phi);
                    var py = d * Math.sin(phi);
                    var pz = z;
                    var explode = new THREE.Vector3(px, py, pz);
                    var vel = explode.clone().multiplyScalar(10);
                    STATE.MULTI_BLAST.randPos[2] = vel.clone();
                    STATE.MULTI_BLAST.randPos[1].x = 1;
                } else {
                    STATE.MULTI_BLAST.randPos[1].x += 1;
                    var vel = STATE.MULTI_BLAST.randPos[2].clone();
                    if (STATE.MULTI_BLAST.randPos[1].x > 80) {
                        STATE.MULTI_BLAST.randPos[1].x = 0;
                    }
                }
                
                setElement( i, velocities, vel );
                c = STATE.MULTI_BLAST.colors[0];
                setElement( i, colors, c );
            } else if (currentState == STATE.SPIRAL) {
                var pos = STATE.SPIRAL.randPos[0].clone();
                setElement( i, positions, pos );
                spoutNum++;
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 1.4);
                var r = 5;
                var z = r * (1.0 - 2.0 * Math.random());
                var phi = 2.0 * Math.PI * Math.random();
                var d = Math.sqrt(r * r - z * z);
                var px = d * Math.cos(phi);
                var py = d * Math.sin(phi);
                var pz = z;
                var explode = new THREE.Vector3(px, py, pz);
                var vel = explode.clone().multiplyScalar(5);
                setElement( i, velocities, vel );
                c = STATE.SPIRAL.colors[0];
                setElement( i, colors, c );
            } else if (currentState == STATE.MOVE_AROUND) {
                var pos = STATE.MOVE_AROUND.randPos[0].clone();
                setElement( i, positions, pos );
                spoutNum++;
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 2.5);
                var r = 5;
                var z = r * (1.0 - 2.0 * Math.random());
                var phi = 2.0 * Math.PI * Math.random();
                var d = Math.sqrt(r * r - z * z);
                var px = d * Math.cos(phi);
                var py = d * Math.sin(phi);
                var pz = z;
                var explode = new THREE.Vector3(px, py, pz);
                var vel = explode.clone().multiplyScalar(10);
                setElement( i, velocities, vel );
                c = STATE.MOVE_AROUND.colors[0];
                setElement( i, colors, c );
            } else if (currentState == STATE.MICKEY_MOUSE) {
                var pos = STATE.MICKEY_MOUSE.randPos[0].clone();
                setElement( i, positions, pos );
                spoutNum++;
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 2.5);
                var r = 5;
                var z = r * (1.0 - 2.0 * Math.random());
                var phi = 2.0 * Math.PI * Math.random();
                var d = Math.sqrt(r * r - z * z);
                var px = d * Math.cos(phi);
                var py = d * Math.sin(phi);
                var pz = z;
                var explode = new THREE.Vector3(px, py, pz);
                var vel = explode.clone().multiplyScalar(10);
                setElement( i, velocities, vel );
                c = STATE.MICKEY_MOUSE.colors[0];
                setElement( i, colors, c );
            } else if (currentState == STATE.TORUS_START) {
                var pos = STATE.TORUS_START.randPos[0].clone();
                setElement( i, positions, pos );
                spoutNum++;
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 2.0);
                var u = Math.random() * Math.PI * 2;
                var v = Math.random() * Math.PI * 2;
                var px = (7 + 0.2 * Math.cos(v)) * Math.cos(u);
                var py = (7 + 0.2 * Math.cos(v)) * Math.sin(u);
                var pz = 0.2 * Math.sin(v);
                var explode = new THREE.Vector3(px, py, pz);
                var xaxis = new THREE.Vector3(1.0, 0.0, 0.0);
                var yaxis = new THREE.Vector3(0.0, 1.0, 0.0);
                explode.applyAxisAngle(xaxis, Math.PI / 4);
                explode.applyAxisAngle(yaxis, Math.PI / 4);
                var vel = explode.clone().multiplyScalar(5.0);
                setElement( i, velocities, vel );
                c = STATE.TORUS_START.colors[0];
                setElement( i, colors, c );
            } else if (currentState == STATE.TRAIL1) {
				setElement( i, sizes, 5 );
				setElement( i, fireworkStyles, STATE.TRAIL1.value);
				// Initialize the positions and velocities of the "TRAIL" firework 
				var pos = STATE.TRAIL1.randPos[0].clone();
				setElement( i, positions, pos );
				var idx = numParticles;
				var vel = randomV[idx % randomV.length];
				setElement( i, velocities, vel );
				setElement( i, lifetimes, 1.0 + Math.random() );
				var c;
				if (STATE.TRAIL1.type == 0) {
					c = STATE.TRAIL1.colors[Math.floor(Math.random()*5)];
				} else if (STATE.TRAIL1.type == 1) {
					if (STATE.TRAIL1.time > 80) {
						c = STATE.TRAIL1.colors[0];
					} else {
						c = STATE.TRAIL1.colors[1];
					}
				} else {
					if (STATE.TRAIL1.time > 95) {
						c = STATE.TRAIL1.colors[0];
						setElement(i, sizes, 10);
					} else {
						c = STATE.TRAIL1.colors[1];
					}
				}
				setElement( i, colors, c );	
				
			} else if (currentState == STATE.PICTURE) {
				setElement( i, sizes, 5 );
				setElement( i, fireworkStyles, STATE.PICTURE.value);
				var pos  = STATE.PICTURE.randPos[0].clone();
				setElement( i, positions, pos );
				var index = STATE.PICTURE.index % picOlaf.length;

				STATE.PICTURE.index++;
				var feature = picOlaf[index];
				// Original Velocity ranges from 0 to 1.
				// Scale the velocity
				var scale = 100.0; 
				var destination = new THREE.Vector3(feature[1] - 0.5, -feature[0] + 0.5, 0);
				var vel = destination.multiplyScalar(scale);
				
				c = new THREE.Vector4 ( feature[2], feature[3], feature[4], 1.0 );
                setElement( i, colors, c );
				setElement( i, velocities, vel );
				setElement( i, lifetimes, 2.0 + Math.random() * 0.5 );
			} else if (currentState == STATE.GROUND_SHOOTS) {
				setElement( i, sizes, 7 );
				setElement( i, fireworkStyles, STATE.GROUND_SHOOTS.value);
				
				var idx = Math.floor(Math.random() * STATE.GROUND_SHOOTS.randPos.length);
				console.log(idx);
				var pos = STATE.GROUND_SHOOTS.randPos[idx].clone();
				setElement( i, positions, pos );
				
				c = new THREE.Vector4 ( 1.0, 0.0, 0.0, 1.0 );
                setElement( i, colors, c );
				
				setElement( i, lifetimes, 2.0);
			}  else if (currentState == STATE.SPHERE_DRUNK) {
                var pos = STATE.SPHERE_DRUNK.randPos[0].clone();
                setElement( i, positions, pos );
                spoutNum++;
                setElement( i, fireworkStyles, currentState.value);
                setElement( i, lifetimes, 2.0);
                var r = 5;
                var z = r * (1.0 - 2.0 * Math.random());
                var phi = 2.0 * Math.PI * Math.random();
                var d = Math.sqrt(r * r - z * z);
                var px = d * Math.cos(phi);
                var py = d * Math.sin(phi);
                var pz = z;
                var explode = new THREE.Vector3(px, py, pz);
                var vel = explode.clone().multiplyScalar(10);
                setElement( i, velocities, vel );
                var c = STATE.SPHERE_DRUNK.colors[Math.floor(Math.random()*5)];
                setElement( i, colors, c );
            } else if (currentState == STATE.GIRANDOLA) {
				setElement( i, sizes, 7 );
				setElement( i, fireworkStyles, STATE.GIRANDOLA.value);
				
				//var pos = STATE.GIRANDOLA.randPos[Math.floor(Math.random()*5)].clone();
				var pos = STATE.GIRANDOLA.randPos[2].clone();
				var randVec = new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(5.0);
				pos.add(randVec);
				setElement( i, positions, pos );
				
				var c = STATE.GIRANDOLA.colors[Math.floor(Math.random()*5)].clone();
				c.w = 0.98
				var vel = new THREE.Vector3(0.0, 100.0, 0.0);
				setElement( i, velocities, vel );
                setElement( i, colors, c );
				
				setElement( i, lifetimes, 4.0);
			} else if (currentState == STATE.TREE) {
				setElement( i, sizes, 7 );
				setElement( i, fireworkStyles, STATE.TREE.value);
				var pos = STATE.TREE.randPos[0].clone();
				var randVec = new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.5);
				pos.add(randVec);
				setElement( i, positions, pos );
				
				var c = STATE.TREE.colors[0].clone();
				var vel = new THREE.Vector3(0.0, 100.0, 0.0);
				setElement( i, velocities, vel );
                setElement( i, colors, c );
				
				setElement( i, lifetimes, 1.5);
			} else if (currentState == STATE.TREE_BALL) {
				setElement( i, sizes, 7 );
				setElement( i, fireworkStyles, STATE.TREE_BALL.value);
				var pos = STATE.TREE_BALL.randPos[0].clone();
				var randVec = new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.5);
				pos.add(randVec);
				setElement( i, positions, pos );
				
				var c = STATE.TREE_BALL.colors[0].clone();
				
				var vel;
				var speed = 50.0;
				if (STATE.TREE_BALL.counter % 4 == 0) {
					vel = new THREE.Vector3(0.0, speed, 0.0);
				} else if (STATE.TREE_BALL.counter % 4 == 1) {
					vel = new THREE.Vector3(0.0, -speed, 0.0);
				} else if (STATE.TREE_BALL.counter % 4 == 2) {
					vel = new THREE.Vector3(speed, 0.0, 0.0);
				} else if (STATE.TREE_BALL.counter % 4 == 3) {
					vel = new THREE.Vector3(-speed, 0, 0.0);
				}
					
				STATE.TREE_BALL.counter++;
				
				setElement( i, velocities, vel );
                setElement( i, colors, c );
				setElement( i, lifetimes, 1.5);
			} else if (currentState == STATE.SPINNER) {
				setElement( i, sizes, 7 );
				setElement( i, fireworkStyles, STATE.SPINNER.value);
				var pos = STATE.SPINNER.randPos[0].clone();
				var randVec = new THREE.Vector3(Math.random(), Math.random(), Math.random()).multiplyScalar(0.5);
				pos.add(randVec);
				setElement( i, positions, pos );
				
				var c = STATE.SPINNER.colors[0].clone();
				
                setElement( i, colors, c );
				setElement( i, lifetimes, 1.8);
			} else if (currentState == STATE.SPIDER) {
				setElement( i, sizes, 5 );
				setElement( i, fireworkStyles, STATE.SPIDER.value);
				var pos  = STATE.SPIDER.randPos[0].clone();
				setElement( i, positions, pos );
				var index = STATE.SPIDER.index % picSpider.length;

				STATE.SPIDER.index++;
				var feature = picSpider[index];
				// Original Velocity ranges from 0 to 1.
				// Scale the velocity
				var scale = 100.0; 
				var destination = new THREE.Vector3(feature[1] - 0.5, -feature[0] + 0.5, 0);
				var vel = destination.multiplyScalar(scale);
				
				c = STATE.SPIDER.colors[Math.floor(Math.random()*2)];
                setElement( i, colors, c );
				setElement( i, velocities, vel );
				setElement( i, lifetimes, 2.0 + Math.random() * 0.5 );
			} 
		} else {
			return;
		}
    }

};

FireUpdater.prototype.updateMaterials= function ( particleAttributes, alive, delta_t ) {
    if (currentMaterial.valueOf() != newMaterial.valueOf()) {
        var emitters = ParticleEngine.getEmitters();
        currentMaterial = newMaterial;
        for ( var i = 0 ; i < emitters.length ; i++ ) {
            emitters[i]._material.uniforms.texture.value = new THREE.ImageUtils.loadTexture( 'images/' + newMaterial + '.png' );
        }
    }
};


FireUpdater.prototype.collisions = function ( particleAttributes, alive, delta_t ) {
    if ( !this._opts.collidables ) {
        return;
    }
    if ( this._opts.collidables.bouncePlanes ) {
        for (var i = 0 ; i < this._opts.collidables.bouncePlanes.length ; ++i ) {
            var plane = this._opts.collidables.bouncePlanes[i].plane;
            var damping = this._opts.collidables.bouncePlanes[i].damping;
            Collisions.BouncePlane( particleAttributes, alive, delta_t, plane, damping );
        }
    }

    if ( this._opts.collidables.sinkPlanes ) {
        for (var i = 0 ; i < this._opts.collidables.sinkPlanes.length ; ++i ) {
            var plane = this._opts.collidables.sinkPlanes[i].plane;
            Collisions.SinkPlane( particleAttributes, alive, delta_t, plane );
        }
    }

    if ( this._opts.collidables.spheres ) {
        for (var i = 0 ; i < this._opts.collidables.spheres.length ; ++i ) {
            Collisions.Sphere( particleAttributes, alive, delta_t, this._opts.collidables.spheres[i] );
        }
    }

    if ( this._opts.collidables.sinkBox ) {
        for (var i = 0 ; i < this._opts.collidables.sinkBox.length ; ++i ) {
            var min = this._opts.collidables.sinkBox[i].min;
            var max = this._opts.collidables.sinkBox[i].max;
            Collisions.SinkBox( particleAttributes, alive, delta_t, min, max );
        }
    }
    if ( this._opts.collidables.bounceBox ) {
        for (var i = 0 ; i < this._opts.collidables.bounceBox.length ; ++i ) {
            var min = this._opts.collidables.bounceBox[i].min;
            var max = this._opts.collidables.bounceBox[i].max;
            var damping = this._opts.collidables.bounceBox[i].damping;
            Collisions.BounceBox( particleAttributes, alive, delta_t, min, max, damping);
        }
    }
};

FireUpdater.prototype.update = function ( particleAttributes, alive, delta_t ) {
	this.updateFireworkStyles( particleAttributes, alive, delta_t );
    this.updateLifetimes( particleAttributes, alive, delta_t );
	this.updatePositions( particleAttributes, alive, delta_t );
    this.updateVelocities( particleAttributes, alive, delta_t );
    

    this.collisions( particleAttributes, alive, delta_t );

    this.updateColors( particleAttributes, alive, delta_t );
    this.updateSizes( particleAttributes, alive, delta_t );
    this.updateMaterials( particleAttributes, alive, delta_t );
	
	
	// Update States 
	if (currentState == STATE.FIRE_START) {
		if (currentState.time > 0) {
			currentState.time--;
		} else {
			currentState = STATE.DEFAULT;
		}
	} else if (currentState == STATE.SATURN_START) {
		if (currentState.time > 0) {
			currentState.time--;
		} else {
			currentState = STATE.DEFAULT;
    	} 
    } else if (currentState == STATE.SPHERE_NORMAL) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.HEART_START) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.SUDO_SPHERE) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
	} else if (currentState == STATE.MULTI_BLAST) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.MOVE_AROUND) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.TORUS_START) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.SPIRAL) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.TRAIL1) {
		if (currentState.time > 0) {
			currentState.time--;
		} else {
			currentState = STATE.DEFAULT;
		}
	} else if (currentState == STATE.PICTURE) {
		if (currentState.time > 0) {
			currentState.time--;
		} else {
			currentState = STATE.DEFAULT;
		}
	} else if (currentState == STATE.GROUND_SHOOTS) {
		if (currentState.time > 0) {
			currentState.time--;
		} else {
			currentState = STATE.DEFAULT;
		}
	} else if (currentState == STATE.SPHERE_DRUNK) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.GIRANDOLA) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            //currentState = STATE.DEFAULT;
			initializeTrailState();
			STATE.TRAIL1.randPos[0]  = new THREE.Vector3(0, 5, 0);
        }
    } else if (currentState == STATE.TREE) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.TREE_BALL) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.SPINNER) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.SPIDER) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    } else if (currentState == STATE.MICKEY_MOUSE) {
        if (currentState.time > 0) {
            currentState.time--;
        } else {
            currentState = STATE.DEFAULT;
        }
    }

    // tell webGL these were updated
    particleAttributes.position.needsUpdate = true;
    particleAttributes.color.needsUpdate = true;
    particleAttributes.velocity.needsUpdate = true;
    particleAttributes.lifetime.needsUpdate = true;
    particleAttributes.size.needsUpdate = true;
	particleAttributes.fireworkStyle.needsUpdate = true;
    particleAttributes.material.needsUpdate = true;

};
