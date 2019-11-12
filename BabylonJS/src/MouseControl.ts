import * as BABYLON from "@babylonjs/core";
import { scene, hl, gizmoManager, engine, camera, canvas } from './Enviroment'
import { addToListLine, addToListPoint, getIsMoveZ, setIsDoubleClick, getIsDoubleClick, getMeshesForCheckIntersect, setInterMesh, getInterMesh, getDefaultMaterialAlpha, resetMeshesForCheckIntersect } from './TempVariable'
import { CreatePoint, getIndexPoint, setIndexPoint, Point, getNewIndexPoint } from './Point'
import { CreateLine } from './Line'
import { getMultiSelect, resetSelectedMeshes, addToSelectedMeshes, getSysMode, getIsStartCreateLine, setStartPoint, getStartPoint, setIsStartCreateLine } from './TempVariable'
import { GetIntersectMesh } from "./IntersectMeshes";
import { setIsPickableBasicScene } from "./BasicScreen";


export function MouseControl() {
    scene.onPointerPick = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit && getIsDoubleClick() == true) {

            // Line mode
            if ((getSysMode() == 'line' || getSysMode() == 'multiLine')) {
                // setIsPickableBasicScene(true);
                if (pickResult.pickedMesh.name != "point") {
                    const pt = CreatePoint(pickResult.pickedPoint, 'Point_' + getNewIndexPoint());
                    addToListPoint(pt);
                    if (getIsStartCreateLine()) {
                        setStartPoint(pt);
                        if (hl.hasMesh(getStartPoint().mesh)) hl.removeMesh(getStartPoint().mesh);
                        hl.addMesh(getStartPoint().mesh, BABYLON.Color3.Green());
                        setIsStartCreateLine(false);
                    } else {
                        if (getStartPoint()) {
                            var s = CreateLine(getStartPoint(), pt);
                            addToListLine(s);
                            // console.log("create with line");
                            hl.removeMesh(getStartPoint().mesh);
                            if (getSysMode() == 'line')
                                setIsStartCreateLine(true);
                            else {
                                setStartPoint(pt);
                                if (hl.hasMesh(getStartPoint().mesh)) hl.removeMesh(getStartPoint().mesh);
                                hl.addMesh(getStartPoint().mesh, BABYLON.Color3.Green());
                            }
                        }
                    }
                } else {
                    var result = pickResult.pickedMesh as BABYLON.Mesh;
                    var pointResult = new Point('Point_' + getIndexPoint(), result);
                    setIndexPoint(getIndexPoint() + 1);
                    if (getIsStartCreateLine()) {
                        setStartPoint(pointResult);
                        if (hl.hasMesh(getStartPoint().mesh)) hl.removeMesh(getStartPoint().mesh);
                        hl.addMesh(getStartPoint().mesh, BABYLON.Color3.Green());
                        setIsStartCreateLine(false);
                    } else {
                        if (getStartPoint()) {
                            var s = CreateLine(getStartPoint(), pointResult);
                            addToListLine(s);
                            // console.log("create with point")
                            setIsStartCreateLine(true);
                            hl.removeMesh(getStartPoint().mesh);
                        }
                    }
                }
            }
            // Point mode 
            else if (getSysMode() == 'point') {
                // setIsPickableBasicScene(true);
                const pt = CreatePoint(pickResult.pickedPoint);
                addToListPoint(pt);
            }
            //select || edit mode 
            else if (getSysMode() == 'select' || getSysMode() == 'edit') {
                // setIsPickableBasicScene(false);
                var target = (pickResult.pickedMesh) as BABYLON.Mesh;
                if (hl.hasMesh(target)) hl.removeMesh(target);
                hl.addMesh(target, BABYLON.Color3.Blue());
                if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
                    if (getMultiSelect() == false || getSysMode() == 'edit') {
                        resetSelectedMeshes();
                    }
                    addToSelectedMeshes(target);
                    gizmoManager.attachableMeshes.push(target);

                    // camera.detachControl(canvas);
                } else {
                    resetSelectedMeshes();
                }
            }
            //intersect mode
            else if (getSysMode() == 'intersect') {
                // setIsPickableBasicScene(false);
                // console.log(getMeshesForCheckIntersect())
                var target = (pickResult.pickedMesh) as BABYLON.Mesh;
                if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
                    var meshesForCheckIntersect = getMeshesForCheckIntersect();
                    if (meshesForCheckIntersect.length == 0) {
                        target.material.alpha = 1;
                        if (hl.hasMesh(target)) hl.removeMesh(target);
                        hl.addMesh(target, BABYLON.Color3.Green());
                        if (getInterMesh()) getInterMesh().dispose();
                        meshesForCheckIntersect.push(target);
                    }
                    else {
                        target.material.alpha = getDefaultMaterialAlpha();
                        meshesForCheckIntersect[0].material.alpha = getDefaultMaterialAlpha();
                        if (hl.hasMesh(target)) hl.removeMesh(target);
                        hl.removeMesh(meshesForCheckIntersect[0]);
                        setInterMesh(GetIntersectMesh(meshesForCheckIntersect[0], target));
                        resetMeshesForCheckIntersect();
                    }
                }
            }

        }
        setIsDoubleClick(!getIsDoubleClick());
    };

    scene.onPointerMove = function (evt, pickInfo) {
        setIsDoubleClick(false);
    }

    var canvas = engine.getRenderingCanvas();
    var startingPoint;
    var currentMesh;
    var isPosControlGizmo = false;
    var tempPos: BABYLON.Vector3;

    var getGroundPosition = function () {
        return new BABYLON.Vector2(scene.pointerX, scene.pointerY);
    }

    var onPointerDown = function (evt) {
        if (getIsMoveZ()) {

            if (evt.button !== 0) {
                return;
            }
            // check if we are under a mesh
            var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh !== scene.getMeshByName('groundx'); });
            if (pickInfo.hit) {
                var target = pickInfo.pickedMesh;
                if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ")
                    currentMesh = target;
                startingPoint = getGroundPosition();
                // console.log('get mesh ', currentMesh)

                if (startingPoint && getIsMoveZ()) { // we need to disconnect camera from canvas
                    setTimeout(function () {
                        camera.detachControl(canvas);
                    }, 0);
                }
            }
        }
        if (gizmoManager.positionGizmoEnabled && isPosControlGizmo == false) {
            // console.log('here')
            isPosControlGizmo = true;
            if (gizmoManager.gizmos.positionGizmo)
                tempPos = gizmoManager.gizmos.positionGizmo.attachedMesh.position;
            // console.log('down ', tempPos)
        }

    }

    var onPointerUp = function () {
        if (getIsMoveZ()) {
            if (startingPoint) {
                camera.attachControl(canvas, true);
                startingPoint = null;
                currentMesh = null;
                // return;
            }
        }
        if (gizmoManager.positionGizmoEnabled) {
            isPosControlGizmo = false;
            // tempPos = BABYLON.Vector3.Zero();
        }
    }


    var onPointerMove = function (evt) {
        if (getIsMoveZ()) {
            // console.log('move')
            if (!startingPoint) {
                return;
            }

            var current = getGroundPosition();

            if (!current) {
                return;
            }
            var diff = current.subtract(startingPoint);
            var deltaY = diff.y / 100;
            currentMesh.position.y -= deltaY;
            // if (!triggerMovePoint(currentMesh.name))
            //     triggerMoveLine(currentMesh.name, deltaY);
            // console.log(triggerMovePoint(currentMesh.name), triggerMoveLine(currentMesh.name, deltaY))


            // var diff = current.subtract(startingPoint);
            // currentMesh.position.addInPlace(diff);

            startingPoint = current;
        }
        // if (gizmoManager.positionGizmoEnabled && isPosControlGizmo == true) {
        //     console.log('tp ',tempPos)
        //     if (gizmoManager.gizmos.positionGizmo) {
        //         var attachedMesh = gizmoManager.gizmos.positionGizmo.attachedMesh;
        //         // console.log(attachedMesh.name)
        //         if (attachedMesh) {
        //             if (tempPos == BABYLON.Vector3.Zero())
        //                 return;
        //                 console.log('attachedMesh.position ',attachedMesh.position)
        //             var delta = attachedMesh.position.subtract(tempPos);
        //             console.log('temp ', tempPos)
        //             console.log(delta);
        //             if (!triggerMovePoint(attachedMesh.name))
        //                 triggerMoveLine(attachedMesh.name, delta);
        //                 console.log(triggerMovePoint(attachedMesh.name), triggerMoveLine(attachedMesh.name, delta))
        //             // tempPos = attachedMesh.position;

        //         }
        //     }
        // }
    }

    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.removeEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointermove", onPointerMove);
    }
}

var pointer = CreatePoint(new BABYLON.Vector3(0, 0, 0));

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