import * as BABYLON from "@babylonjs/core"
import "@babylonjs/core/Meshes/meshBuilder";

import {CreatePoint, pointMaster} from './Point'
import {CreateLine} from './Line'
import {camera, canvas, engine,light, scene, hl, gizmoManager, removeFromGizmoManagerList} from './Enviroment'
import {InitGround, showAxis} from './BasicScreen'
import {formBinding} from './FormBinding'
import {KeyControl} from './Control'
import {CreateBoxMesh, CreateCubeMesh} from './BoxObject'
import {CreatePlaneFrom3Point, CreatePlaneFromPointAndVector} from './Plane'

//////////////////// Global Variable ////////////////////

var listPoint = [];
var listLine = [];

var isMultiSelect = false;


var selectedMeshes = [];


var isSelectMode = true;
var isCreateLineMode = false;
var isCreateMultiLineMode = false;
var isCreatePointMode = false;
var isStartCreateLine = true;

var isEditMode = false;
var startPoint;

export function changeSelectMode(b:boolean) {isSelectMode = b}
export function changeCreateLineMode(b: boolean){isCreateLineMode = b}
export function changeCreateMutiLineMode(b: boolean){isCreateMultiLineMode = b}
export function changeCreatePointMode(b:boolean){isCreatePointMode = b}
export function changeStartCreateLine(b: boolean){isStartCreateLine = b}
export function changeEditMode(b:boolean){isEditMode = b}
export function triggerStartPoint(){
    if (startPoint) {
        hl.removeMesh(startPoint);
        startPoint = "";
    }
}

var createScene = function() {

   ///////////////////// Init functions /////////////////////////
    InitGround();
    showAxis(10);
    formBinding();
    KeyControl();

    

    // CreateCubeWithCenterSize({ x: 5, y: 5, z: 5 }, 4);
    ////////// TEST OBJECT ///////////////

    CreateCubeMesh({ x: 0, y: 2, z: 0 }, 1);
    CreateBoxMesh({ x: 5, y: 2, z: 0 }, 2, 3, 4);
    CreatePlaneFrom3Point(new BABYLON.Vector3(5,0,0), new BABYLON.Vector3(5,5,0), new BABYLON.Vector3(5,5,5));
    CreatePlaneFromPointAndVector(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,1,0));

    function checkInSelectedMeshes(object) {
        if (selectedMeshes) {
            for (var i = 0; i < selectedMeshes.length; i++) {
                if (selectedMeshes[i] == object) {
                    return true;
                }
            }
            return false;
        }

    }

    function removeFromSelectedMeshes(object) {
        if (selectedMeshes) {
            for (var i = 0; i < selectedMeshes.length; i++) {
                if (selectedMeshes[i] == object) {
                    selectedMeshes.splice(i, 1);
                    return;
                }
            }
        }

    }

    function resetSelectedMeshes() {
        selectedMeshes.forEach(mesh => {
            if (hl.hasMesh(mesh))
                hl.removeMesh(mesh);
            removeFromGizmoManagerList(mesh);
        })
        selectedMeshes = [];
    }


    scene.onPointerPick = function(evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {
            if ((isCreateLineMode || isCreateMultiLineMode)) {
                if (pickResult.pickedMesh.name != "point") {
                    const pt = CreatePoint(pickResult.pickedPoint, isSelectMode, checkInSelectedMeshes);
                    listPoint.push(pt);
                    if (isStartCreateLine) {
                        startPoint = pt.mesh;
                        if (hl.hasMesh(startPoint)) hl.removeMesh(startPoint);
                        hl.addMesh(startPoint, BABYLON.Color3.Green());
                        isStartCreateLine = false;
                    } else {
                        if (startPoint) {
                            var s = CreateLine(startPoint.position, pt.mesh.position, isCreatePointMode);
                            listLine.push(s);
                            console.log("create with line");
                            hl.removeMesh(startPoint);
                            if (isCreateLineMode)
                                isStartCreateLine = true;
                            else {
                                startPoint = pt.mesh;
                                if (hl.hasMesh(startPoint)) hl.removeMesh(startPoint);
                                hl.addMesh(startPoint, BABYLON.Color3.Green());
                            }
                        }
                    }
                } else {
                    if (isStartCreateLine) {
                        startPoint = pickResult.pickedMesh;
                        if (hl.hasMesh(startPoint)) hl.removeMesh(startPoint);
                        hl.addMesh(startPoint, BABYLON.Color3.Green());
                        isStartCreateLine = false;
                    } else {
                        if (startPoint) {
                            var s = CreateLine(startPoint.position, pickResult.pickedMesh.position, isCreatePointMode);
                            listLine.push(s);
                            console.log("create with point")
                            isStartCreateLine = true;
                            hl.removeMesh(startPoint);
                        }
                    }
                }
            } else if (isCreatePointMode) {
                const pt = CreatePoint(pickResult.pickedPoint, isSelectMode, checkInSelectedMeshes);
                listPoint.push(pt);
            } else if (isSelectMode || isEditMode) {
                var target = (pickResult.pickedMesh) as BABYLON.Mesh;
                if (hl.hasMesh(target)) hl.removeMesh(target);
                hl.addMesh(target, BABYLON.Color3.Blue());
                if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
                    if (!isMultiSelect || isEditMode) {
                        selectedMeshes.forEach(mesh => {
                            if (hl.hasMesh(mesh))
                                hl.removeMesh(mesh);
                        })
                        resetSelectedMeshes();
                    }
                    selectedMeshes.push(target);
                    gizmoManager.attachableMeshes.push(target);

                    // camera.detachControl(canvas);
                } else {
                    resetSelectedMeshes();
                }
            }

        }
    };

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

export function eventDelete(){
    if (selectedMeshes) {
        selectedMeshes.forEach(mesh => {
            if (mesh.parent)
                mesh.parent.dispose();
            removeFromGizmoManagerList(mesh);
            gizmoManager.attachToMesh(pointMaster);
            mesh.dispose();
        })
    }
}

export function setMultiSelect(b:boolean){isMultiSelect = b}
export function getEditMode(){return isEditMode} 

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