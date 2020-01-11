
import * as BABYLON from '@babylonjs/core'
import { scene, gizmoManager, removeFromGizmoManagerList, changeCamera } from './Enviroment'
import { setMultiSelect, getSelectedMesh, setIsMoveZ, getSysMode, setSysMode, resetSphereVerticleList, resetMidPointList } from './TempVariable'
import { pointMaster } from './Point'

export function deleteFromSelectedMeshes() {
    resetSphereVerticleList();
    if (getSelectedMesh()) {
        getSelectedMesh().forEach(mesh => {
            if (mesh.name.split('_')[0] != "Point" && mesh.name.split('_')[0] != "Line" && mesh.name.split('_')[0] != "Plane")
                resetMidPointList();
            if (mesh.parent)
                mesh.parent.dispose();
            removeFromGizmoManagerList(mesh);
            gizmoManager.attachToMesh(pointMaster);
            mesh.dispose();
        })
    }
}

export function KeyControl() {
    /**************************** Key Control ******************************************************/
    scene.onKeyboardObservable.add((keyInfo) => {
        switch (keyInfo.type) {
            case BABYLON.KeyboardEventTypes.KEYDOWN:
                if(keyInfo.event.key == "c" || keyInfo.event.key == "C"){
                    changeCamera();
                }
                if (getSysMode() != 'edit') {
                    switch (keyInfo.event.key) {
                        case "x" || "X":
                            deleteFromSelectedMeshes();
                            break;
                        case "Control":
                            setMultiSelect(true);
                            break;
                        case "s" || "S":
                            document.getElementById("cbSelectMode").click();
                            break;
                        case "p" || "P":
                            document.getElementById("cbPointMode").click();
                            break
                        case "l" || "L":
                            document.getElementById("cbSingleLineMode").click();
                            break;
                        case "m" || "M":
                            document.getElementById("cbMultiLineMode").click();
                            break;
                        case "e" || "E":
                            document.getElementById("cbEditMode").click();
                            break;
                        case "z" || "Z":
                            setIsMoveZ(true);
                            break;
                        case "i" || "I":
                            setSysMode('intersect');
                            break;
                    }
                } else {
                    switch (keyInfo.event.key) {
                        case "g" || "G":
                            gizmoManager.positionGizmoEnabled = !gizmoManager.positionGizmoEnabled;
                            if (gizmoManager.positionGizmoEnabled) {
                                gizmoManager.rotationGizmoEnabled = false;
                                gizmoManager.scaleGizmoEnabled = false;
                            }
                            break;
                        case "r" || "R":
                            gizmoManager.rotationGizmoEnabled = !gizmoManager.rotationGizmoEnabled;
                            if (gizmoManager.rotationGizmoEnabled) {
                                gizmoManager.positionGizmoEnabled = false;
                                gizmoManager.scaleGizmoEnabled = false;
                            }
                            break;
                        case "s" || "S":
                            gizmoManager.scaleGizmoEnabled = !gizmoManager.scaleGizmoEnabled;
                            if (gizmoManager.scaleGizmoEnabled) {
                                gizmoManager.positionGizmoEnabled = false;
                                gizmoManager.rotationGizmoEnabled = false;
                            }
                            break;
                        case "b" || "B":
                            gizmoManager.boundingBoxGizmoEnabled = !gizmoManager.boundingBoxGizmoEnabled;
                            break;
                        case "e" || "E":
                            document.getElementById("cbEditMode").click();
                            break;
                    }
                }
                break;
            case BABYLON.KeyboardEventTypes.KEYUP:
                switch (keyInfo.event.key) {
                    case "Control":
                        setMultiSelect(false);
                        break;
                    case "z" || "Z":
                        setIsMoveZ(false);
                        break;
                }
                break;

        }
    })
}

////////////////////// Tinh Vector chi phuong cua mat phang ////////////////////
// var getHorizontalPlaneVector = function(y, pos, rot) {
//     // if (!rot.y) {
//     //     return null;
//     // }

//     return new BABYLON.Vector3(
//         //cong thuc tinh vector chi phuong y - y0 = k * ( x - x0 )
//         pos.x - (pos.y - y) * rot.x / rot.y,
//         1,
//         pos.z - (pos.y - y) * rot.z / rot.y
//     );
// };

// ///////////////////// Drag mesh with mouse ////////////////////
// function dragMesh() {
//     var target = BABYLON.Vector3.Unproject(
//         new BABYLON.Vector3(scene.pointerX, scene.pointerY, 0),
//         canvas.width,
//         canvas.height,
//         BABYLON.Matrix.Identity(),
//         camera.getViewMatrix(),
//         camera.getProjectionMatrix()
//     );


//     target.x = camera.position.x - target.x;
//     target.y = camera.position.y - target.y;
//     target.z = camera.position.z - target.z;

//     var p = getHorizontalPlaneVector(0, camera.position, target);
//     if (selectedMeshes && selectedMeshes.length == 1)
//         selectedMeshes[0].position = p;
// }