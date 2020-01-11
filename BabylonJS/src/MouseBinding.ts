import * as BABYLON from "@babylonjs/core";
import { scene, gizmoManager, engine, camera, canvas } from './Enviroment'
import { getIsMoveZ, setIsDoubleClick, getIsDoubleClick, getVertices, createFacePoints, resetSphereVerticleList } from './TempVariable'
import { Point } from './Point'
import { getSysMode } from './TempVariable'
import { ProcessLineOrMultiline, ProcessPoint, ProcessSelectOrEdit, ProcessIntersect, ProcessPlane3Point, ProcessPlane2Line, ProcessPlanePointLine, ProcessDistance2Point, ProcessCaculateTotalArea, ProcessDistancePointLine, ProcessSphereCenterPoint, ProcessPlaneMidPointPoint, ProcessPlanePlanePoint, ProcessPointMidPointPoint } from "./MouseControl";


export function MouseControl() {
    scene.onPointerPick = function (evt, pickResult) {
        // if the click hits the ground object, we change the impact position
        if (pickResult.hit && getIsDoubleClick() == true) {
            switch (getSysMode().valueOf()) {
                case 'line':
                case 'multiLine':
                    ProcessLineOrMultiline(pickResult);
                    break;
                case 'point':
                    ProcessPoint(pickResult);
                    break;
                case 'select':
                case 'edit':
                    ProcessSelectOrEdit(pickResult);
                    break;
                case 'intersect':
                    ProcessIntersect(pickResult);
                    break;
                case 'plane3Point':
                    ProcessPlane3Point(pickResult);
                    break;
                case 'plane2Line':
                    ProcessPlane2Line(pickResult);
                    break;
                case 'planePointLine':
                    ProcessPlanePointLine(pickResult);
                    break;
                case 'distance2Point':
                    ProcessDistance2Point(pickResult);
                    break;
                case 'distance2Line':
                    break;
                case 'distancePointLine':
                    ProcessDistancePointLine(pickResult);
                    break;
                case 'totalArea':
                    ProcessCaculateTotalArea(pickResult);
                    break;
                case 'spherePointPoint':
                    ProcessSphereCenterPoint(pickResult);
                    break;
                case 'planeMidPointPoint':
                    ProcessPlaneMidPointPoint(pickResult);
                    break;
                case 'planePlanePoint':
                    ProcessPlanePlanePoint(pickResult);
                    break;
                case 'pointMidPointPoint':
                    ProcessPointMidPointPoint(pickResult);
                    break;
                default:
                    break;
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

                if (startingPoint) { // we need to disconnect camera from canvas
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

    var vertInfo;
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


        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh !== scene.getMeshByName('groundx'); });
        if (pickInfo.hit) {
            var target = pickInfo.pickedMesh;
            if ((getSysMode().valueOf() == 'pointMidPointPoint' || getSysMode().valueOf() == 'line') && target.name.split("_")[0] != "Point") {
                // resetSphereVerticleList();
                var result = scene.pick(scene.pointerX, scene.pointerY, null, null, camera);
                if (result.hit && result.pickedMesh.name != 'helper' && !BABYLON.Tags.HasTags(result.pickedMesh)) {
                    resetSphereVerticleList();
                    BABYLON.Tags.AddTagsTo(result.pickedMesh, "mark");
                    vertInfo = getVertices(result.pickedMesh as BABYLON.Mesh);
                    for (var i = 0; i < vertInfo.length; i++) {
                        createFacePoints(i, vertInfo[i]);
                    }
                }
            }

        }
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

var pointer = new Point(new BABYLON.Vector3(0, 0, 0));

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