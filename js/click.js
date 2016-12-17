// GLOBAL VARIABLES

// Enum like thing
var STATE = {
	DEFAULT : {value: 0, time: 0},
	FIRE_START: {value: 1, time: 500, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
				new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ),
				new THREE.Vector4 ( 1.0, 0.2, 1.0, 1.0 )]},
	SATURN_START: {value: 2, time: 100, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	SATURN_RING: {value: 3, ringCount: 1, axisValue: 0},
	SPHERE_NORMAL: {value: 4, time: 100, type: 0, extraParticles: 0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	HEART_START: {value: 5, time: 100, type: 0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	SUDO_SPHERE: {value: 6, time: 100, type: 0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	TRAIL1: {value: 10, time: 100, type: 0, randPos: [],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	MULTI_BLAST: {value: 7, time: 100, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	MOVE_AROUND: {value: 8, time: 100, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	TORUS_START: {value: 9, time: 100, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	SPIRAL: {value: 11, time: 100, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	PICTURE: {value: 12, time: 10, index: 0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
				new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ),
				new THREE.Vector4 ( 1.0, 0.2, 1.0, 1.0 )]},
	GROUND_SHOOTS: {value: 13, time: 200, index: 0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ),
				new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ),
				new THREE.Vector4 ( 1.0, 0.2, 1.0, 1.0 )]},
	SPHERE_DRUNK: {value: 14, time: 100, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	GIRANDOLA: {value: 15, time: 100, counter: 100, explodeTime: 4.0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	TREE: {value: 16, time: 100, counter: 0, explodeTime: 1.1, binaryLayer: 0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
		TREE_BALL: {value: 17, time: 100, counter: 0, explodeTime: 1.1, binaryLayer: 0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	SPINNER: {value: 18, time: 1, counter: 0, explodeTime: 1.1, param: 0.0, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	SPINNER2: {value: 19},
	
	SPIDER: {value: 20, time: 1, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
					
	SNOW: {value: 100, initialized: 0}, 

	MICKEY_MOUSE: {value: 21, time: 100, randPos: [new THREE.Vector3(0, 0, 0),
		new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0)],
		colors: [new THREE.Vector4 ( 1.0, 1.0, 1.0, 1.0 ), // white
					new THREE.Vector4 ( 0.0, 0.67, 0.067, 1.0 ), // green
					new THREE.Vector4 ( 0.1, 1.0, 0.1, 1.0 ), // light green
					new THREE.Vector4 ( 0.35, 0.35, 1.0, 1.0 ), // blue
					new THREE.Vector4 ( 0.36, 0.9, 1.0, 1.0 ), // light blue
					new THREE.Vector4 ( 0.56, 0.753, 1.0, 1.0 ), // periwinkle blue
					new THREE.Vector4 ( 0.027, 0.788, 0.776, 1.0 ), // blue-green
					new THREE.Vector4 ( 1.0, 0.28, 0.18, 1.0 ), // red
					new THREE.Vector4 ( 1.0, 0.28, 0.51, 1.0 ), // pink
					new THREE.Vector4 ( 1.0, 0.659, 0.722, 1.0 ), // light pink
					new THREE.Vector4 ( 1.0, 0.59, 0.0, 1.0 ), // orange
					new THREE.Vector4 ( 1.0, 0.85, 0.19, 1.0 ), // yellow
					new THREE.Vector4 ( 0.66, 0.52, 1.0, 1.0 ), // light purple
					new THREE.Vector4 ( 0.839, 0.196, 0.831, 1.0 )]}, // magenta
	
};
var currentState = STATE.DEFAULT;

var MUSIC = {
	LET_IT_GO : {time: 0},
	TANGLED : {time: 0},
	LES_MIS: {time: 0},
	KATY_PERRY: {time: 0},
	BEETHOVEN: {time: 0},
};
var currentMusic = MUSIC.LET_IT_GO;

var currentScore = 0;

var currentMaterial = "fire";
var newMaterial = "fire";

var fireworkSound = new Audio();
fireworkSound.volume = 0.7;
var fireworkSource = document.createElement("source");
fireworkSource.type = "audio/mpeg";
fireworkSource.src = "../music/FireworkSound.mp3";
fireworkSound.appendChild(fireworkSource);

var fireworkSound2 = new Audio();
fireworkSound2.volume = 0.8;
var fireworkSource2 = document.createElement("source");
fireworkSource2.type = "audio/mpeg";
fireworkSource2.src = "../music/FireworkSound.mp3";
fireworkSound2.appendChild(fireworkSource2);

var fireworkSound3 = new Audio();
fireworkSound3.volume = 0.7;
var fireworkSource3 = document.createElement("source");
fireworkSource3.type = "audio/mpeg";
fireworkSource3.src = "../music/FireworkSound.mp3";
fireworkSound3.appendChild(fireworkSource3);

var lastUsedFireworkSound = 0;

var firespoutSound = new Audio();
var firespoutSource = document.createElement("source");
firespoutSource.type = "audio/mpeg";
firespoutSource.src = "../music/FireSpoutSound.mp3";
firespoutSound.appendChild(firespoutSource);

var firespoutSound2 = new Audio();
var firespoutSource2 = document.createElement("source");
firespoutSource2.type = "audio/mpeg";
firespoutSource2.src = "../music/FireSpoutSound.mp3";
firespoutSound2.appendChild(firespoutSource2);

var firespoutSound3 = new Audio();
var firespoutSource3 = document.createElement("source");
firespoutSource3.type = "audio/mpeg";
firespoutSource3.src = "../music/FireSpoutSound.mp3";
firespoutSound3.appendChild(firespoutSource3);

var lastUsedFirespoutSound = 0;

var bangcrackleSound = new Audio();
bangcrackleSound.volume = 0.7;
var bangcrackleSource = document.createElement("source");
bangcrackleSource.type = "audio/mpeg";
bangcrackleSource.src = "../music/BangCrackleSound.mp3";
bangcrackleSound.appendChild(bangcrackleSource);

var bangcrackleSound2 = new Audio();
bangcrackleSound2.volume = 0.8;
var bangcrackleSource2 = document.createElement("source");
bangcrackleSource2.type = "audio/mpeg";
bangcrackleSource2.src = "../music/BangCrackleSound.mp3";
bangcrackleSound2.appendChild(bangcrackleSource2);

var bangcrackleSound3 = new Audio();
bangcrackleSound3.volume = 0.7;
var bangcrackleSource3 = document.createElement("source");
bangcrackleSource3.type = "audio/mpeg";
bangcrackleSource3.src = "../music/BangCrackleSound.mp3";
bangcrackleSound3.appendChild(bangcrackleSource3);

var lastUsedBangcrackleSound = 0;

//----------------------------------------------
/**
 * From Stack Overflow.
 * Shuffles array in place.
 * @param {Array} a items The array containing the items.
 */
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i -= 1) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

$(document).keyup(function(e) {
	// Detect pressing space
    if (e.keyCode == 0 || e.keyCode == 32) {
        //alert('You pressed space!');
        console.log("You pressed space");
        console.log("Current music:");
        console.log(currentMusic);

        //currentState = STATE.FIRE_START;
    }
});

// Initialize the properties of the fire-style fireworkj
initializeFireState = function() {
	STATE.FIRE_START.time = 100;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		shuffle(STATE.FIRE_START.colors);
		STATE.FIRE_START.randPos[i]  = new THREE.Vector3(100*randX, 0, 10*randZ);
	}
	currentState = STATE.FIRE_START;
}

// Initialize the properties of the saturn style firework 
initializeSaturnState = function() {
	STATE.SATURN_START.time = 30;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.SATURN_START.randPos[i]  = new THREE.Vector3(100*randX, 30 + randY*50, 0);
	}
	shuffle(STATE.SATURN_START.colors);
	if (Math.random() < 0.3) {
		STATE.SATURN_RING.ringCount = 3;
	} else {
		STATE.SATURN_RING.ringCount = 1;
		STATE.SATURN_RING.axisValue = Math.floor(Math.random()*3);
	}
	
	currentState = STATE.SATURN_START;
}

initializeSphereState = function() {
	STATE.SPHERE_NORMAL.time = 10;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.SPHERE_NORMAL.randPos[i]  = new THREE.Vector3(100*randX, 80 + randY*10, 0);
	}
	shuffle(STATE.SPHERE_NORMAL.colors);
	var rand = Math.random();
	if (rand > 0.1) {
		STATE.SPHERE_NORMAL.extraParticles = 1;
		STATE.SPHERE_NORMAL.type = 4;
	} else {
		if (rand < 0.2) {
			STATE.SPHERE_NORMAL.type = 0;
		} else if (rand < 0.4) {
			STATE.SPHERE_NORMAL.type = 1;
		} else if (rand < 0.6) {
			STATE.SPHERE_NORMAL.type = 2;
		} else {
			STATE.SPHERE_NORMAL.type = 3;
		}
		STATE.SPHERE_NORMAL.extraParticles = 0;
	}
	console.log(STATE.SPHERE_NORMAL.type);
	currentState = STATE.SPHERE_NORMAL;
}

initializeHeartState = function() {
	STATE.HEART_START.time = 20;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.HEART_START.randPos[i]  = new THREE.Vector3(100*randX, 35 + randY*10, 0);
	}
	shuffle(STATE.HEART_START.colors);
	STATE.HEART_START.type = Math.floor(Math.random()*2);
	currentState = STATE.HEART_START;
}

initializeSpiralState = function() {
	STATE.SPIRAL.time = 30;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		shuffle(STATE.SPIRAL.colors);
		STATE.SPIRAL.randPos[i]  = new THREE.Vector3(100*randX, 35 + randY*10, 0);
	}
	currentState = STATE.SPIRAL;
}

initializeSudoSphereState = function() {
	STATE.SUDO_SPHERE.time = 15;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.SUDO_SPHERE.randPos[i]  = new THREE.Vector3(100*randX, 35 + randY*10, 0);
	}
	shuffle(STATE.SUDO_SPHERE.colors);
	STATE.SUDO_SPHERE.type = Math.floor(Math.random()*2);
	currentState = STATE.SUDO_SPHERE;
}

initializeTorusState = function() {
	STATE.TORUS_START.time = 20;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		shuffle(STATE.TORUS_START.colors);
		STATE.TORUS_START.randPos[i]  = new THREE.Vector3(100*randX, 35 + randY*10, 0);
	}
	currentState = STATE.TORUS_START;
}

initializeMBState = function() {
	STATE.MULTI_BLAST.time = 10;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		shuffle(STATE.MULTI_BLAST.colors);
		STATE.MULTI_BLAST.randPos[i]  = new THREE.Vector3(100*randX, 35 + randY*10, 0);
	}
	STATE.MULTI_BLAST.randPos[1].x = 0;
	STATE.MULTI_BLAST.randPos[1].y = 0;
	STATE.MULTI_BLAST.randPos[1].z = 0;
	currentState = STATE.MULTI_BLAST;
}

initializeMovingState = function() {
	STATE.MOVE_AROUND.time = 1;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		shuffle(STATE.MOVE_AROUND.colors);
		STATE.MOVE_AROUND.randPos[i]  = new THREE.Vector3(100*randX, 35 + randY*10, 0);
	}
	STATE.MOVE_AROUND.randPos[1].x = 0;
	STATE.MOVE_AROUND.randPos[1].y = 0;
	STATE.MOVE_AROUND.randPos[1].z = 0;
	STATE.MOVE_AROUND.randPos[2].x = 0;
	STATE.MOVE_AROUND.randPos[2].y = 0;
	STATE.MOVE_AROUND.randPos[2].z = 0;
	currentState = STATE.MOVE_AROUND;
}

initializeMickeyState = function() {
	STATE.MICKEY_MOUSE.time = 1;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.MICKEY_MOUSE.randPos[i]  = new THREE.Vector3(100*randX, 35 + randY*10, 0);
	}
	shuffle(STATE.MICKEY_MOUSE.colors);
	STATE.MICKEY_MOUSE.randPos[1].x = 0;
	STATE.MICKEY_MOUSE.randPos[1].y = 0;
	STATE.MICKEY_MOUSE.randPos[1].z = 0;
	STATE.MICKEY_MOUSE.randPos[2].x = 0;
	STATE.MICKEY_MOUSE.randPos[2].y = 0;
	STATE.MICKEY_MOUSE.randPos[2].z = 0;
	currentState = STATE.MICKEY_MOUSE;
}

// Initialize the properties of the trail style firework 
initializeTrailState = function() {
	STATE.TRAIL1.time = 100;
	for (var i = 0; i < 1; i++) {
		// for the position
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		
		STATE.TRAIL1.randPos[i]  = new THREE.Vector3(100*randX, 30 + randY*30, 0);
	}
	for (var i = 1; i < 60; i++) {
		// for the velocity
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.TRAIL1.randPos[i]  = new THREE.Vector3(80*randX, 80*randY, 80*randZ);
	}
	shuffle(STATE.TRAIL1.colors);
	var typeRand = Math.random();
	if (typeRand< 0.3333) {
		STATE.TRAIL1.type = 0;
	} else if (typeRand < 0.6666) {
		STATE.TRAIL1.type = 1;
	} else {
		STATE.TRAIL1.type = 2;
	}
	currentState = STATE.TRAIL1;
}

// Initialize the properties of the fire-style fireworkj
initializePictureState = function() {
	STATE.PICTURE.time = 5;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		shuffle(STATE.PICTURE.colors);
		STATE.PICTURE.randPos[i]  = new THREE.Vector3(100*randX, 80*randY + 40, 10*randZ);
	}
	STATE.PICTURE.index = 0;
	currentState = STATE.PICTURE;
}

// Initialize the properties of the ground shoot style firework 
initializeGroundShoots = function() {
	STATE.GROUND_SHOOTS.time = 20;
	for (var i = 0; i < 100; i++) {
		// for the position
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		shuffle(STATE.GROUND_SHOOTS.colors);
		STATE.GROUND_SHOOTS.randPos[i]  = new THREE.Vector3(150*randX, -60.0, 0);
	}
	/*var numAngles = 10.0;
	for (var i = 1; i < numAngles; i++) {
		// for the velocity
		var angle = i / numAngles * Math.PI;
		STATE.GROUND_SHOOTS.randPos[i]  = new THREE.Vector3(Math.cos(angle), Math.sin(angle), 0);
	}*/
	currentState = STATE.GROUND_SHOOTS;
}


initializeSphereDrunk = function() {
	STATE.SPHERE_DRUNK.time = 2;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.SPHERE_DRUNK.randPos[i]  = new THREE.Vector3(100*randX, 50 + randY*10, 0);
	}
	shuffle(STATE.SPHERE_DRUNK.colors);
	currentState = STATE.SPHERE_DRUNK;
}

initializeGirandola = function() {
	STATE.GIRANDOLA.time = 50;
	STATE.GIRANDOLA.randPos[0] = new THREE.Vector3(-50.0, -60.0, 0.0);
	STATE.GIRANDOLA.randPos[1] = new THREE.Vector3(-25.0, -60.0, 0.0);
	STATE.GIRANDOLA.randPos[2] = new THREE.Vector3(0.0, -60.0, 0.0);
	STATE.GIRANDOLA.randPos[3] = new THREE.Vector3(25.0, -60.0, 0.0);
	STATE.GIRANDOLA.randPos[4] = new THREE.Vector3(50.0, -60.0, 0.0);
	for (var i = 5; i < 200; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.GIRANDOLA.randPos[i]  = new THREE.Vector3(30*randX, 50 + randY*20, randZ*30);
	}
	shuffle(STATE.GIRANDOLA.colors);
	STATE.GIRANDOLA.counter = 100;
	STATE.GIRANDOLA.explodeTime = 3.8;
	currentState = STATE.GIRANDOLA;
}


initializeTree = function() {
	STATE.TREE.time = 2;
	STATE.TREE.randPos[0] = new THREE.Vector3(0.0, -60.0, 0.0);
	for (var i = 1; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.TREE.randPos[i]  = new THREE.Vector3(30*randX, 50 + randY*20, randZ*30);
	}
	shuffle(STATE.TREE.colors);
	STATE.TREE.counter = 0;
	STATE.TREE.explodeTime = 1.3;
	STATE.TREE.binaryLayer = 0;
	currentState = STATE.TREE;
}

initializeTreeBall = function() {
	STATE.TREE_BALL.time = 1;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.TREE_BALL.randPos[i]  = new THREE.Vector3(30*randX, 20 + randY*40, randZ*30);
	}
	shuffle(STATE.TREE_BALL.colors);
	STATE.TREE_BALL.counter = 0;
	STATE.TREE_BALL.explodeTime = 1.3;
	STATE.TREE_BALL.binaryLayer = 0;
	currentState = STATE.TREE_BALL;
}


initializeSpinner = function() {
	STATE.SPINNER.time = 1;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.SPINNER.randPos[i]  = new THREE.Vector3(30*randX, 20 + randY*40, randZ*30);
	}
	shuffle(STATE.SPINNER.colors);
	STATE.SPINNER.counter = 0;
	STATE.SPINNER.explodeTime = 1.3;
	STATE.SPINNER.param = 0.0;
	currentState = STATE.SPINNER;
}

initializeSpider = function() {
	STATE.SPIDER.time = 5;
	for (var i = 0; i < 2; i++) {
		var randX = Math.random()-0.5;
		var randY = Math.random()-0.5;
		var randZ = Math.random()-0.5;
		STATE.SPIDER.randPos[i]  = new THREE.Vector3(100*randX, 80*randY + 40, 10*randZ);
	}
	shuffle(STATE.SPIDER.colors);
	STATE.SPIDER.index = 0;
	currentState = STATE.SPIDER;
}

var letItGoBeats = [ 22.27902, 25.76201, 29.29147, 30.80077, 32.51904, 33.47106, 34.28376, 43.24668, 44.03614, 44.75596, 45.63829, 46.52065, 47.54235, 48.35507, 49.07487, 49.58569, 50.02702, 50.93247, 53.55630, 58.08421, 60.61519, 62.35668, 64.21430, 65.09666, 67.65083, 69.32269, 71.27315, 72.10907 , 73.01464, 74.82578, 78.23916, 81.83823, 107.2640, 107.9606, 108.8430, 109.7022, 118.5954, 122.0087, 123.7966, 125.5614, 126.3508, 127.2332, 129.0444, 130.7626, 132.6900, 133.4329, 134.2920, 136.0800, 139.7255, 140.9794, 143.2317, 146.7612, 147.3881, 148.3402, 149.0367, 149.7101, 150.2442, 150.6853, 151.0569, 151.4748, 151.8929, 152.3804, 152.8216, 153.2860, 153.7736, 155.3293, 156.0724, 156.9547, 157.8603, 158.7427, 159.7179, 160.1126, 160.5538, 162.2953, 163.1080, 163.9440, 164.8031, 165.7087, 166.5910, 167.1251, 167.6591, 169.2613, 170.9100, 171.8155, 172.7211, 174.6251, 176.2273, 177.1097, 183.5184, 185.1438, 186.8620, 187.6980, 188.6267, 190.4148, 192.1562, 194.1067, 197.5897, 201.0262, 206.3436, 207.6207, 214.5868, 215.2136];
var letItGoBeats2 = [3.006463  , 4.655125  , 6.443039  , 8.091655  , 9.87966    , 11.644308, 13.409025, 15.196961, 16.079297, 16.938458, 18.656735, 20.003492, 22.162948, 22.882744, 23.718685, 25.599569, 27.178458, 29.314694, 30.057732, 30.870431, 31.706349, 32.611927, 33.540726, 34.472404, 37.79288  , 40.393515, 41.415193, 42.274331, 43.226349, 44.06229  , 44.735646, 45.641224, 46.570136, 47.522063, 48.311519, 49.031338, 49.565397, 50.029796, 50.888912, 51.678413, 52.583968, 53.512812, 54.604127, 55.393651, 57.204762, 57.692381, 58.156757, 58.969478, 59.898277, 60.710975, 62.336372, 64.193991, 65.122766, 65.889025, 67.584082, 69.325624, 71.090363, 71.926281, 72.971111, 74.805488, 75.409206, 76.082562, 78.172381, 78.86898  , 79.542358, 81.725034, 82.444853, 83.280748, 85.370567, 93.93873  , 95.773107, 96.516168, 97.328821, 99.30254  , 99.999138, 100.88149, 102.83206, 103.52857, 104.41093, 106.43108, 107.8939  , 108.77639, 109.63544, 113.21129, 114.18659, 115.83519, 116.55496, 118.45900, 119.48068, 120.31659, 120.94353, 121.33827, 121.98841, 123.72993, 125.49467, 126.37700, 127.25936, 127.90950, 128.97764, 130.64947, 132.64639, 133.41265, 134.34142, 136.12938, 136.75630, 137.38326, 139.65882, 140.37863, 141.00557, 143.18834, 143.81519, 144.46535, 146.92664, 147.43750, 147.99478, 148.41276, 148.87712, 149.36476, 149.75947, 150.29356, 150.73473, 151.15269, 151.57065, 152.01181, 152.42979, 152.89419, 153.35861, 153.79977, 155.28587, 156.09854, 157.02732, 157.84011, 158.72240, 160.18526, 160.64966, 161.55523, 162.32149, 163.08775, 163.99333, 164.87569, 165.73483, 166.19922, 166.64040, 167.77816, 169.28748, 170.10015, 170.98256, 171.88811, 172.77047, 173.69927, 174.14047, 174.60485, 176.25344, 177.04308, 178.34333, 178.99342, 179.82941, 180.85104, 181.38510, 181.87269, 182.29068, 182.70868, 183.14979, 183.54453, 185.12349, 186.84188, 187.74737, 188.60648, 189.16376, 190.37120, 192.01981, 194.03997, 194.71335, 195.80464, 197.59260, 198.17310, 198.82326, 200.95952, 201.60966, 202.42235, 206.39297, 206.92700, 207.57718, 210.71188, 211.15303, 211.6639  , 212.49986, 213.21963, 214.14850, 215.70417];


var lesMisBeats = [27.36424, 28.873515, 30.406032, 31.984989, 33.633605, 35.18932, 36.791519, 38.347256, 39.972653, 40.599569, 41.342676, 42.039229, 43.037687, 46.242041, 47.890658, 49.260635, 50.816372, 52.302426, 53.834966, 55.367483, 56.94644, 58.43254, 59.895397, 61.381451, 62.937166, 64.516145, 66.095079, 67.650816, 70.808776, 72.45737, 73.897007, 75.475964, 76.915714, 78.448118, 79.910975, 81.466757, 82.976032, 83.765488, 84.531746, 85.298027, 86.087483, 86.760884, 87.48068, 89.082948, 90.568934, 92.031791, 93.494649, 95.027188, 96.397166, 97.95288, 98.765624, 99.485397, 100.971542, 102.434376, 103.966848, 105.406576, 106.98551, 108.425079, 110.050499, 111.513333];
var lesMisBeats2 = [1.427528, 3.122585, 4.701542, 6.350159, 7.929093, 9.55449, 11.226349, 12.619546, 14.268163, 15.823946, 17.309977, 19.121134, 20.81619, 22.464785, 23.950884, 25.692381, 27.41068, 28.82712, 30.754354, 31.984989, 33.563946, 35.166122, 36.698639, 38.277596, 39.926213, 41.342608, 43.107347, 43.896871, 46.195601, 46.961859, 47.751315, 49.237415, 49.957211, 50.746735, 52.255986, 52.999025, 53.811746, 55.367506, 56.017642, 56.76068, 58.386077, 59.129116, 59.848934, 61.427891, 62.17093, 62.937302, 64.446485, 66.095102, 66.722041, 67.534739, 70.924853, 72.43415, 73.943447, 74.686576, 75.452744, 77.054989, 78.494558, 79.934286, 81.443469, 82.883152, 83.765488, 84.578186, 85.251565, 86.017868, 89.082857, 90.592154, 92.101451, 93.541088, 95.050385, 96.490091, 97.99932, 99.415714, 100.901814, 102.457551, 103.966871, 105.476145, 107.008662, 108.494739, 110.027234, 110.747052, 111.490159];

var katyPerryBeats = [37.998, 39.926, 41.876, 43.827, 45.777, 47.704, 49.585, 50.514, 51.420, 53.672, 55.367, 57.457, 59.268, 61.311, 62.101, 62.867, 65.212, 65.955, 66.745, 69.044, 70.808, 72.921, 74.686, 76.776, 77.612, 78.401, 80.677, 81.536, 82.302, 84.624, 115.55, 116.45, 117.34, 119.24, 121.24, 123.12, 125.02, 126.93, 128.76, 130.99, 132.68, 134.87, 136.54, 138.70, 139.51, 140.28, 142.60, 143.41, 144.16, 146.50, 148.24, 150.38, 152.12, 154.21, 154.98, 155.74, 158.11, 158.90, 159.60, 161.92, 162.59, 163.29, 165.82, 166.52, 167.19, 169.67, 170.42, 171.16, 173.55, 174.27, 175.02, 177.43, 179.19, 181.28, 183.14, 185.19, 185.93, 186.69, 189.02, 189.76, 190.53, 192.89, 194.68, 196.75, 198.58, 200.67, 201.46, 202.25, 204.50, 205.32, 206.04, 209.29, 209.87, 212.26, 212.93, 213.70, 216.09, 216.74, 217.55, 220.02, 220.76, 221.48];
var katyPerryBeats2 = [7.5343, 7.9755, 8.6024, 9.6706, 10.088, 10.529, 11.528, 11.946, 12.433, 13.409, 13.919, 14.407, 15.498, 15.893, 16.357, 17.356, 17.774, 18.238, 19.306, 19.724, 20.189, 21.210, 21.628, 22.232, 22.627, 23.672, 24.113, 25.065, 25.529, 26.017, 27.039, 27.503, 28.455, 29.384, 30.940, 31.381, 31.845, 32.705, 33.157, 33.854, 35.270, 38.010, 38.521, 39.032, 39.566, 40.054, 40.588, 41.098, 41.609, 42.097, 43.885, 44.697, 45.858, 46.369, 46.857, 47.716, 49.666, 51.454, 53.173, 53.660, 55.402, 56.609, 57.027, 57.468, 59.280, 61.323, 62.043, 62.809, 65.201, 65.920, 66.733, 69.102, 69.612, 70.100, 70.959, 72.956, 74.744, 76.880, 77.600, 78.274, 80.735, 81.431, 82.244, 93.320, 93.808, 94.806, 96.687, 99.102, 101.02, 102.95, 104.86, 106.81, 108.76, 110.82, 112.63, 114.65, 115.47, 116.51, 117.37, 118.39, 119.44, 120.37, 121.34, 123.18, 125.06, 126.98, 127.96, 128.84, 131.05, 131.56, 132.65, 134.86, 136.64, 138.69, 139.48, 140.29, 142.61, 143.35, 144.14, 146.51, 148.21, 150.32, 152.09, 154.18, 154.99, 155.75, 158.08, 158.82, 159.56, 162.79, 163.44, 165.88, 166.53, 167.22, 169.78, 170.50, 171.22, 173.61, 174.26, 174.98, 177.49, 179.23, 181.34, 183.08, 185.17, 185.96, 186.73, 189.05, 189.75, 190.51, 192.95, 194.65, 196.83, 198.59, 200.59, 201.45, 202.17, 204.54, 205.31, 206.03, 209.44, 209.90, 212.27, 212.97, 213.66, 216.13, 216.82, 217.54, 219.98, 220.72, 221.44];

var beethovenBeats = [0.939887, 3.958503, 6.884218, 7.487937, 8.161315, 9.670635, 10.297551, 11.087029, 12.596327, 14.059184, 15.429161, 16.311519, 17.263537, 20.584036, 30.800862, 32.356531, 32.821066, 33.471088, 34.144422, 34.841043, 35.468027, 36.187778, 37.464898, 38.811655, 40.181633, 41.57483, 42.85195, 44.361247, 58.873719, 60.174036, 61.613651, 63.006871, 64.469728, 65.862902, 67.279342, 68.649274, 70.135397, 71.435669, 72.828889, 74.152426, 75.452744, 76.706621, 84.322789, 87.202063, 88.595238, 90.104558];
var beethovenBeats2 = [0.847029, 3.935283, 6.88424, 7.487937, 8.091655, 9.531293, 10.181474, 10.878118, 12.503447, 13.966417, 15.475692, 16.241859, 17.286757, 20.607211, 23.532925, 24.183084, 26.412177, 30.893651, 32.170748, 33.494331, 34.144444, 34.817823, 35.444762, 36.187778, 38.741995, 40.204853, 41.528367, 42.875147, 43.525306, 44.314853, 46.079524, 47.356599, 48.053197, 48.680204, 50.282313, 51.55941, 53.138367, 54.531587, 55.947982, 57.317959, 58.827256, 60.197234, 61.636871, 63.006825, 64.423265, 65.86288, 67.27932, 68.602857, 70.065714, 71.435692, 72.248367, 73.386168, 74.129184, 74.779365, 75.452744, 76.683401, 77.2639, 78.006916, 79.284036, 80.073515, 81.025533, 81.884671, 84.438866, 85.762404, 86.435782, 87.155692, 88.595238, 90.081315];

var tangledBeats = [35.050023, 37.464898, 38.602653, 39.902993, 42.201769, 44.593537, 45.638345, 46.84576, 49.260635, 51.373673, 53.974286, 54.972721, 56.273061, 58.641519, 59.709615, 60.754535, 63.448027, 64.492925, 66.304104, 79.051882, 106.149524, 107.403424, 108.889524, 109.795079, 111.513356, 112.18678, 113.324512, 114.322971, 115.669728, 116.830703, 117.922063, 119.083039, 120.290454, 122.937551, 126.397324, 130.228617, 134.710045, 135.754966, 139.911451, 140.724036, 141.815374, 144.04449, 145.182245, 146.320045, 148.525941, 149.501179, 150.662177, 152.751973, 153.750431, 154.841746, 161.807755, 162.666893, 163.688549, 168.657642, 174.48585, 176.505986, 178.015329, 182.264512, 188.023061, 189.88068, 192.620635];
var tangledBeats2 = [1.4739, 1.9848, 3.1922, 4.2603, 5.8393, 6.4894, 6.9307, 8.0452, 9.2294, 10.761, 11.690, 12.967, 13.478, 14.105, 14.802, 15.405, 16.566, 17.890, 20.328, 21.001, 21.744, 23.068, 24.299, 25.599, 26.18  , 26.714, 28.223, 29.059, 30.452, 31.427, 32.658, 33.796, 35.166, 36.350, 37.464, 39.949, 41.063, 42.294, 44.593, 45.707, 46.892, 47.472, 49.214, 50.328, 51.466, 53.858, 55.088, 56.249, 58.641, 59.732, 60.963, 63.331, 64.562, 66.048, 66.907, 70.553, 72.271, 73.525, 74.802, 76.474, 77.565, 78.982, 103.71, 104.22, 105.05, 105.54, 106.21, 107.40, 108.77, 109.81, 111.44, 111.88, 112.30, 113.32, 114.39, 115.83, 116.25, 116.92, 118.10, 118.54, 119.15, 119.77, 120.42, 122.96, 125.09, 126.39, 127.58, 128.67, 130.39, 131.29, 132.41, 133.29, 135.80, 137.10, 138.19, 139.63, 140.72, 141.81, 144.02, 145.15, 146.32, 149.50, 152.75, 153.82, 154.95, 157.30, 158.30, 159.36, 161.59, 162.66, 163.75, 166.19, 168.61, 169.74, 174.55, 175.43, 176.52, 177.94, 179.52, 180.68, 182.21, 188.65, 189.76, 192.57, 199.95];

var testingBeats = [];
var testingBeats2 = [];

var totalPossible = 1;
var numTimesPressed = 0;
function updateScore(time) {
	numTimesPressed++;
	console.log("Current score:");
	console.log(currentScore);
	var beatArr;
	var beatArr2;
	if (currentMusic == "LesMis") {
		beatArr = lesMisBeats;
		beatArr2 = lesMisBeats2;
	} else if (currentMusic == "Tangled") {
		beatArr = tangledBeats;
		beatArr2 = tangledBeats2;
	} else if (currentMusic == "KatyPerry") {
		beatArr = katyPerryBeats;
		beatArr2 = katyPerryBeats2;
	} else if (currentMusic == "Beethoven") {
		beatArr = beethovenBeats;
		beatArr2 = beethovenBeats2;
	} else {
		console.log("Let it go beats");
		beatArr = letItGoBeats;
		beatArr2 = letItGoBeats2;
	}
	totalPossible = beatArr.length + beatArr2.length*0.5;
	console.log(totalPossible);
	if (numTimesPressed > beatArr2.length) {
		currentScore -= 0.5;
	} else if (numTimesPressed > beatArr2.length * 1.5) {
		currentScore -= 1.0;
	} else {
	}
	for (var b = 0; b < beatArr.length; b++) {
		var diff = Math.abs(time - beatArr[b]);
		if (diff < 0.3) {
			currentScore++;
		} else if (diff < 0.5) {
			currentScore += 0.4;
		} else {
		}
	}
	for (var b = 0; b < beatArr2.length; b++) {
		var diff = Math.abs(time - beatArr2[b]);
		if (diff < 0.3) {
			currentScore += 0.5;
		} else if (diff < 0.5) {
			currentScore += 0.2;
		} else {
		}
	}
}

function playFireworkSound() {
	if (lastUsedFireworkSound == 0) {
		fireworkSound2.play();
		lastUsedFireworkSound = 1;
	} else if (lastUsedFireworkSound == 1) {
		fireworkSound3.play();
		lastUsedFireworkSound = 2;
	} else {
		fireworkSound.play();
		lastUsedFireworkSound = 0;
	}
}

function playFirespoutSound() {
	if (lastUsedFirespoutSound == 0) {
		firespoutSound2.play();
		lastUsedFirespoutSound = 1;
	} else if (lastUsedFirespoutSound == 1) {
		firespoutSound3.play();
		lastUsedFirespoutSound = 2;
	} else {
		firespoutSound.play();
		lastUsedFirespoutSound = 0;
	}
}

function playBangcrackleSound() {
	if (lastUsedBangcrackleSound == 0) {
		bangcrackleSound2.play();
		lastUsedBangcrackleSound = 1;
	} else if (lastUsedBangcrackleSound == 1) {
		bangcrackleSound3.play();
		lastUsedBangcrackleSound = 2;
	} else {
		bangcrackleSound.play();
		lastUsedBangcrackleSound = 0;
	}
}


$(document).keypress(function(e) {
    if (e.which == 97) {
		var music = document.getElementById("audio");
		updateScore(music.currentTime);
		console.log("Music time: " + music.currentTime);

		console.log("You pressed a");
		newMaterial = "spark";
		var r = Math.random();
		var r2 = Math.random();

		testingBeats.push(music.currentTime);
		

		// // Use white spark or white fire and change the color.
		// if (r2 < 0.2) {
		// 	newMaterial = "spark";
		// } else if (r2 < 0.4) {
		// 	newMaterial = "blueSpark";
		// } else if (r2 < 0.6) {
		// 	newMaterial = "fire";
		// } else if (r2 < 0.8) {
		// 	newMaterial = "blueFire";
		// } else if (r2 < 0.9) {
		// 	newMaterial = "whiteFire";
		// } else {
		// 	newMaterial = "whiteSpark";
		// }
		//r = 0.73;
		newMaterial = "whiteSpark";
		if (r < 0.05) {
			playFirespoutSound();
			initializeFireState();
		} else if (r < 0.1) {
			newMaterial = "whiteSpark";
			playBangcrackleSound();
			initializeSaturnState();
		} else if (r < 0.15) {
			initializeMBState();
			playBangcrackleSound();
		} else if (r < 0.2) {
			newMaterial = "whiteSpark";
			playFireworkSound();
			initializeSphereState();
		} else if (r < 0.25) {
			newMaterial = "whiteSpark";
			playBangcrackleSound();
			initializeHeartState();
		} else if (r < 0.3) {
			playBangcrackleSound();
			initializeSudoSphereState();
		} else if (r < 0.35) {
			playFireworkSound();
			initializeMovingState();
		} else if (r < 0.4) {
			playFireworkSound();
			initializeSpiralState();
		} else if (r < 0.45) {
			newMaterial = "whiteSpark";
			playBangcrackleSound();
			initializePictureState();
		} else if (r < 0.5) {
			newMaterial = "whiteSpark";
			playBangcrackleSound();
			initializeSphereDrunk();
		} else if (r < 0.6) {
			playFireworkSound();
			initializeTreeBall();
		} else if (r < 0.65) {
			playFireworkSound();
			initializeTree();
		} else if (r < 0.7) {
			playFireworkSound();
			initializeSpinner();
		} else if (r < 0.75) {
			playFireworkSound();
			initializeSpider();
		} else if (r < 0.8) {
			initializeTorusState();
			playFireworkSound();
		} else if (r < 0.85) {
			initializeMickeyState();
			playFireworkSound();
		} else {
			playFireworkSound();
			initializeTrailState();
		}
    } else if (e.which == 115) {
    	var music = document.getElementById("audio");
    	testingBeats2.push(music.currentTime);
    } else if (e.which == 49) {
    	if (Math.random() < 0.4) {
    		playFirespoutSound();
			initializeFireState();
    	} else {
    		playBangcrackleSound();
			initializeSaturnState();
    	}
    } else if (e.which == 50) {
    	if (Math.random() < 0.5) {
    		initializeMBState();
			playBangcrackleSound();
    	} else {
    		playFireworkSound();
			initializeSphereState();
    	}
    } else if (e.which == 51) {
    	if (Math.random() < 0.5) {
    		playBangcrackleSound();
			initializeHeartState();
    	} else {
    		playBangcrackleSound();
			initializeSudoSphereState();
    	}
    } else if (e.which == 52) {
    	if (Math.random() < 0.5) {
    		playFireworkSound();
			initializeMovingState();
    	} else {
    		playFireworkSound();
			initializeSpiralState();
    	}
    } else if (e.which == 53) {
    	if (Math.random() < 0.5) {
    		playBangcrackleSound();
			initializePictureState();
    	} else {
    		playBangcrackleSound();
			initializeSphereDrunk();
    	}
    } else if (e.which == 54) {
    	if (Math.random() < 0.5) {
    		playFireworkSound();
			initializeTreeBall();
    	} else {
    		playFireworkSound();
			initializeTree();
    	}
    } else if (e.which == 55) {
    	if (Math.random() < 0.5) {
    		playFireworkSound();
			initializeSpinner();
    	} else {
    		playFireworkSound();
			initializeSpider();
    	}
    } else if (e.which == 56) {
    	if (Math.random() < 0.5) {
    		initializeTorusState();
			playFireworkSound();
    	} else {
    		initializeMickeyState();
			playFireworkSound();
    	}
    } else if (e.which == 57) {
    	playFireworkSound();
		initializeTrailState();
    }
});