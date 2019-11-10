import * as BABYLON from "@babylonjs/core"
import "@babylonjs/core/Meshes/meshBuilder";

import {CreatePoint, pointMaster} from './Point'
import {CreateLine} from './Line'
import {camera, canvas, engine,light, scene, gizmoManager, removeFromGizmoManagerList} from './Enviroment'
import {InitGround, showAxis} from './BasicScreen'
import {formBinding} from './FormBinding'
import {KeyControl} from './KeyControl'
import {MouseControl} from './MouseControl'
import {CreateBoxMesh, CreateCubeMesh} from './BoxObject'
import {CreatePlaneFrom3Point, CreatePlaneFromPointAndNormalVector} from './Plane'
import {getSysMode} from  './TempVariable'

//////////////////// Global Variable ////////////////////


// var isSelectMode = true;
// var isCreateLineMode = false;
// var isCreateMultiLineMode = false;
// var isCreatePointMode = false;
// var isEditMode = false;

// var isStartCreateLine = true;
// var startPoint;


// export function changeSelectMode(b:boolean) {isSelectMode = b}
// export function changeCreateLineMode(b: boolean){console.log('change create line mode'); isCreateLineMode = b}
// export function changeCreateMutiLineMode(b: boolean){isCreateMultiLineMode = b}
// export function changeCreatePointMode(b:boolean){console.log('change point mode'); isCreatePointMode = b}
// export function changeEditMode(b:boolean){isEditMode = b} 
// export function changeStartCreateLine(b: boolean){isStartCreateLine = b}


var createScene = function() {

   ///////////////////// Init functions /////////////////////////
    InitGround();
    showAxis(10);
    formBinding();
    KeyControl();
    MouseControl();

    

    // CreateCubeWithCenterSize({ x: 5, y: 5, z: 5 }, 4);
    ////////// TEST OBJECT ///////////////

    CreateCubeMesh({ x: 0, y: 2, z: 0 }, 1);
    CreateBoxMesh({ x: 5, y: 2, z: 0 }, 2, 3, 4);
    CreatePlaneFrom3Point(new BABYLON.Vector3(5,0,0), new BABYLON.Vector3(5,5,0), new BABYLON.Vector3(5,5,5));
    CreatePlaneFromPointAndNormalVector(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,1,0));

    // var l1 = CreateLine(new BABYLON.Vector3(0,0,5), new BABYLON.Vector3(5,10,0), getSysMode()=='point');
    // var l2 = CreateLine(new BABYLON.Vector3(0,0,-5), new BABYLON.Vector3(5,0,0), getSysMode()=='point');


    // CreatePlaneFromPointAndVector(l1.pointA, l2.rotation)
    var p = CreatePlaneFromPointAndNormalVector(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,0,0))
    console.log(p.mesh)

    var pointer = CreatePoint(new BABYLON.Vector3(0,0,0));

    /**************************** Mouse Control ******************************************************/

    scene.onPointerObservable.add((pointerInfo) => {
        if (pointerInfo.event.button == 2) {
            camera.attachControl(canvas);
        }
        switch (pointerInfo.type) {
            // case BABYLON.PointerEventTypes.POINTERDOWN:
            //     if(pointerInfo.pickInfo.hit) {
            //         mode = "DRAG";
            //         castRay();
            //     }
            // 	break;
            case BABYLON.PointerEventTypes.POINTERMOVE:
                pointer.position = pointerInfo.pickInfo.pickedPoint;
                // console.log(pointerInfo.ray.origin);
                // if(pickedMesh && mode === "DRAG"){
                // dragMesh();
                // }                
                break;
            case BABYLON.PointerEventTypes.POINTERUP:
                // if (pickedMesh) 
                {
                    // mode = "CAMERA";
                    // pickedMesh = null;
                    // camera.attachControl(canvas);
                }
                break;
            case BABYLON.PointerEventTypes.POINTERTAP:
                // if (pointerInfo.pickInfo.hit) {
                //     // mode = "GIZMO";
                //     // castRay();
                //     if (selectedMeshes && selectedMeshes.length == 1) {
                //         gizmoManager.attachToMesh(selectedMeshes[0]);
                //     }
                // }
                break;

        }
    });

    scene.registerBeforeRender(function() {
        // if (selectedMeshes.length >= 1) {
        //     selectedMeshes.forEach(mesh => {
        //         if (mesh)
        //             gizmoManager.attachToMesh(mesh);
        //     })
        // }
        // console.log(isMultiSelect);
    })
    window['scene'] = scene;
    return scene;

};

var mainScene = createScene();

engine.runRenderLoop(function() {
    if (mainScene) {
        mainScene.render();
        var fpsLabel = document.getElementById("fpsLabel");
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
    }
});

// Resize
window.addEventListener("resize", function() {
    engine.resize();
});