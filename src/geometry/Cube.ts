import Drawable from "../rendering/gl/Drawable";
import {gl} from '../globals';
import {vec3, vec4} from 'gl-matrix';


class Cube extends Drawable {
    indices: Uint32Array;
    positions: Float32Array;
    normals: Float32Array;
    center: vec4;

    constructor(center: vec3) {
        super(); 
        this.center = vec4.fromValues(center[0], center[1], center[2], 1);
    }

    create() {
        //    v6----- v5  
        //   /|      /|   
        //  v1------v0|   
        //  | |     | |   
        //  | v7----|-v4  
        //  |/      |/    
        //  v2------v3 
        // Some of cube faces are black, it's OK
        this.indices = new Uint32Array([
            0, 1, 2,   2, 3, 0,    // v0-v1-v2, v2-v3-v0 (front)
            4, 5, 6,   6, 7, 4,    // v0-v3-v4, v4-v5-v0 (right)
            8, 9,10,  10,11, 8,    // v0-v5-v6, v6-v1-v0 (top)
           12,13,14,  14,15,12,    // v1-v6-v7, v7-v2-v1 (left)
           16,17,18,  18,19,16,    // v7-v4-v3, v3-v2-v7 (bottom)
           20,21,22,  22,23,20     // v4-v7-v6, v6-v5-v4 (back)
        ]);
        this.normals = new Float32Array([
            0, 0, 1, 0,   0, 0, 1, 0,  0, 0, 1,0,   0, 0, 1, 0, // v0,v1,v2,v3 (front)
            1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0,  1, 0, 0, 0, // v0,v3,v4,v5 (right)
            0, 1, 0, 0,  0, 1, 0, 0,  0, 1, 0, 0,  0, 1, 0, 0, // v0,v5,v6,v1 (top)
            -1, 0, 0,0, -1, 0, 0, 0, -1, 0, 0, 0, -1, 0, 0,0,  // v1,v6,v7,v2 (left)
            0,-1, 0, 0,  0,-1, 0, 0,  0,-1, 0, 0,  0,-1, 0, 0, // v7,v4,v3,v2 (bottom)
            0, 0,-1,  0, 0, 0,-1, 0,  0, 0,-1,  0, 0, 0,-1,  0, // v4,v7,v6,v5 (back)
         
        ]);
        this.positions = new Float32Array([
            .5, .5, .5, 1,  -.5, .5, .5, 1, -.5,-.5, .5,1,  .5,-.5, .5, 1,// v0,v1,v2,v3 (ront)
            .5, .5, .5, 1,  .5,-.5, .5, 1,  .5,-.5,-.5, 1, .5, .5,-.5,1, // v0,v3,v4,v5 (right)
            .5, .5, .5, 1,  .5, .5,-.5,1,  -.5, .5,-.5, 1,-.5, .5, .5, 1,// v0,v5,v6,v1 (top)
            -.5, .5, .5,1,  -.5, .5,-.5,1,  -.5,-.5,-.5,1, -.5,-.5, .5,1, // v1,v6,v7,v2 (let)
            -.5,-.5,-.5,  1, .5,-.5,-.5,  1, .5,-.5, .5, 1,-.5,-.5, .5,1, // v7,v4,v3,v2 (bottom)
            .5,-.5,-.5, 1, -.5,-.5,-.5, 1, -.5, .5,-.5, 1, .5, .5,-.5, 1,// v4,v7,v6,v5 (back)
        ]);

        this.generateIdx();
        this.generatePos();
        this.generateNor();

        this.count = this.indices.length;
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.bufIdx);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, this.indices, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufNor);
        gl.bufferData(gl.ARRAY_BUFFER, this.normals, gl.STATIC_DRAW);

        gl.bindBuffer(gl.ARRAY_BUFFER, this.bufPos);
        gl.bufferData(gl.ARRAY_BUFFER, this.positions, gl.STATIC_DRAW);


        console.log('Created Cube');
    }
};

export default Cube;