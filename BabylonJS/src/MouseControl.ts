import * as BABYLON from "@babylonjs/core";
import { scene, hl, gizmoManager, engine, camera } from './Enviroment'
import { addToListLine, addToListPoint, getIsMoveZ } from './TempVariable'
import { CreatePoint, getIndexPoint, setIndexPoint, Point, getNewIndexPoint } from './Point'
import { CreateLine } from './Line'
import { getMultiSelect, resetSelectedMeshes, addToSelectedMeshes, getSysMode, getIsStartCreateLine, setStartPoint, getStartPoint, setIsStartCreateLine } from './TempVariable'


export function MouseControl() {
    scene.onPointerPick = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit) {
            if ((getSysMode() == 'line' || getSysMode() == 'multiLine')) {
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
                            console.log("create with line");
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
                            console.log("create with point")
                            setIsStartCreateLine(true);
                            hl.removeMesh(getStartPoint().mesh);
                        }
                    }
                }
            } else if (getSysMode() == 'point') {
                const pt = CreatePoint(pickResult.pickedPoint);
                addToListPoint(pt);
            } else if (getSysMode() == 'select' || getSysMode() == 'edit') {
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

        }
    };

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
                console.log('get mesh ', currentMesh)

                if (startingPoint && getIsMoveZ()) { // we need to disconnect camera from canvas
                    setTimeout(function () {
                        camera.detachControl(canvas);
                    }, 0);
                }
            }
        }
        if (gizmoManager.positionGizmoEnabled && isPosControlGizmo ==false) {
            console.log('here')
            isPosControlGizmo = true;
            if (gizmoManager.gizmos.positionGizmo)
                tempPos = gizmoManager.gizmos.positionGizmo.attachedMesh.position;
                console.log('down ', tempPos)
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
            console.log('move')
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
    canvas.addEventListener("pointermove", onPointerMove, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointermove", onPointerMove);
    }
}