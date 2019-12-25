import * as BABYLON from "@babylonjs/core";
import { getNewIndexPoint, Point, getIndexPoint, setIndexPoint } from "./Point";
import { addToListPoint, getIsStartCreateLine, setStartPoint, getStartPoint, setIsStartCreateLine, addToListLine, getSysMode, getMultiSelect, resetSelectedMeshes, addToSelectedMeshes, getMeshesForCheckIntersect, getInterMesh, getDefaultMaterialAlpha, setInterMesh, resetMeshesForCheckIntersect, getLineByName, getPointByName, setContent } from "./TempVariable";
import { gizmoManager, scene, addHLToMesh, removeHLOfMesh } from "./Enviroment";
import { Line } from "./Line";
import { GetIntersectMesh } from "./IntersectMeshes";
import { Plane } from "./Plane";
import { distance2Point, totalArea } from "./Caculation";

export function ProcessLineOrMultiline(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] != "Point") {
        const pt = new Point(pickResult.pickedPoint, 'Point_' + getNewIndexPoint());
        if (getIsStartCreateLine()) {
            setStartPoint(pt);
            addHLToMesh(getStartPoint().mesh, BABYLON.Color3.Green())
            setIsStartCreateLine(false);
            setContent('Create another point')
        } else {
            if (getStartPoint()) {
                var s = new Line(getStartPoint(), pt, '2point');
                // console.log("create with line");
                removeHLOfMesh(getStartPoint().mesh);
                if (getSysMode() == 'line') {
                    setIsStartCreateLine(true);
                    setContent('Double-click to create point');
                }
                else {
                    setStartPoint(pt);
                    addHLToMesh(getStartPoint().mesh, BABYLON.Color3.Green())
                }
            }
        }
    } else {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        var pointResult = new Point(result.position, 'Point_' + getIndexPoint());
        setIndexPoint(getIndexPoint() + 1);
        if (getIsStartCreateLine()) {
            setStartPoint(pointResult);
            addHLToMesh(getStartPoint().mesh, BABYLON.Color3.Green());
            if (getSysMode() == "line")
                setIsStartCreateLine(false);
        } else {
            if (getStartPoint()) {
                var s = new Line(getStartPoint(), pointResult, '2point');
                addToListLine(s);
                // console.log("create with point")
                removeHLOfMesh(getStartPoint().mesh);
                if (getSysMode() == 'line') {
                    setIsStartCreateLine(true);
                    setContent('Double-click to create point');
                }
                else {
                    setStartPoint(pointResult);
                    addHLToMesh(getStartPoint().mesh, BABYLON.Color3.Green())
                }
            }
        }
    }
}

export function ProcessSelectOrEdit(pickResult: BABYLON.PickingInfo) {
    // setIsPickableBasicScene(false);
    console.log(getSysMode())
    var target = (pickResult.pickedMesh) as BABYLON.Mesh;
    if (target.material)
        target.material.alpha = 1;
    addHLToMesh(target, BABYLON.Color3.Blue());
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

export function ProcessIntersect(pickResult: BABYLON.PickingInfo) {
    // setIsPickableBasicScene(false);
    // console.log(getMeshesForCheckIntersect())
    var target = (pickResult.pickedMesh) as BABYLON.Mesh;
    if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
        var meshesForCheckIntersect = getMeshesForCheckIntersect();
        if (meshesForCheckIntersect.length == 0) {
            target.material.alpha = 1;
            addHLToMesh(target, BABYLON.Color3.Green())
            if (getInterMesh()) getInterMesh().dispose();
            meshesForCheckIntersect.push(target);
        }
        else {
            target.material.alpha = getDefaultMaterialAlpha();
            meshesForCheckIntersect[0].material.alpha = getDefaultMaterialAlpha();
            removeHLOfMesh(target);
            removeHLOfMesh(meshesForCheckIntersect[0]);
            var intersectMesh = GetIntersectMesh(meshesForCheckIntersect[0], target);
            addHLToMesh(intersectMesh, BABYLON.Color3.Yellow());
            setInterMesh(intersectMesh);
            resetMeshesForCheckIntersect();
        }
    }
}

export function ProcessPoint(pickResult: BABYLON.PickingInfo) {
    // setIsPickableBasicScene(true);
    new Point(pickResult.pickedPoint, "Point_" + getNewIndexPoint());
}

var listPlanePoint: Point[] = [];
export function ProcessPlane3Point(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] != "Point") {
        const pt = new Point(pickResult.pickedPoint, 'Point_' + getNewIndexPoint());
        listPlanePoint.push(pt);
        if (listPlanePoint.length < 3) {
            setContent('Select or create another Point');
            addHLToMesh(pt.mesh, BABYLON.Color3.Green());
        }
        else {
            new Plane('3point', listPlanePoint[0].mesh.position, listPlanePoint[1].mesh.position, listPlanePoint[2].mesh.position);
            listPlanePoint.forEach(point => {
                removeHLOfMesh(point.mesh);
            })
            listPlanePoint = [];
            setContent('Select or create 3 point to create Plane');
        }
    } else {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        var pointResult = new Point(result.position, 'Point_' + getIndexPoint());
        listPlanePoint.push(pointResult);
        if (listPlanePoint.length < 3) {
            setContent('Select or create another Point');
            addHLToMesh(pointResult.mesh, BABYLON.Color3.Green());
        }
        else {
            new Plane('3point', listPlanePoint[0].mesh.position, listPlanePoint[1].mesh.position, listPlanePoint[2].mesh.position);
            listPlanePoint.forEach(point => {
                removeHLOfMesh(point.mesh);
            })
            listPlanePoint = [];
            setContent('Select or create 3 point to create Plane');
        }
    }
}

var listPlane2Line: Line[] = [];
export function ProcessPlane2Line(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] == "Line") {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        var line = getLineByName(result.name);
        if (line) {
            listPlane2Line.push(line);
            if (listPlane2Line.length < 2) {
                addHLToMesh(result, BABYLON.Color3.Green());
                setContent('Select another line intersecting line first');
            }
            else {
                new Plane('line-line', listPlane2Line[0], listPlane2Line[1], 0);
                listPlane2Line.forEach(line => {
                    removeHLOfMesh(line.mesh);
                })
                listPlane2Line = [];
                setContent('Select two line intersect other');
            }
        }
    }
}

var planePoint: Point[] = [];
var planeLine: Line[] = [];
export function ProcessPlanePointLine(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] == "Point") {
        if (planePoint.length == 0) {
            console.log('here')
            var result = pickResult.pickedMesh as BABYLON.Mesh;
            var point = getPointByName(result.name);
            if (point) {
                planePoint.push(point);
                addHLToMesh(result, BABYLON.Color3.Green());
            }
        }
    }
    else {
        if (pickResult.pickedMesh.name.split("_")[0] != "Line" && planePoint.length == 0) {
            const pt = new Point(pickResult.pickedPoint, 'Point_' + getNewIndexPoint());
            planePoint.push(pt);
            addHLToMesh(pt.mesh, BABYLON.Color3.Green());
        }
    }
    if (pickResult.pickedMesh.name.split("_")[0] == "Line" && planeLine.length == 0) {
        console.log('here')
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        var line = getLineByName(result.name);
        if (line) {
            planeLine.push(line);
            addHLToMesh(result, BABYLON.Color3.Green());
        }
    }
    if (planeLine.length == 0)
        setContent('Select a Line');
    if (planePoint.length == 0)
        setContent('Select or create a Point');
    if (planeLine.length == 1 && planePoint.length == 1) {
        new Plane('point-line', planePoint[0], planeLine[0], 0);
        removeHLOfMesh(planeLine[0].mesh);
        removeHLOfMesh(planePoint[0].mesh);
        planePoint = [];
        planeLine = [];
        setContent('Select a Point and a Line');
    }

}

var listPointDistance: BABYLON.Mesh[] = [];
export function ProcessDistance2Point(pickResult: BABYLON.PickingInfo) {
    console.log(pickResult.pickedMesh.name)
    if (pickResult.pickedMesh.name.split("_")[0] == "Point") {
        console.log('if')
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        listPointDistance.push(result);
        if (listPointDistance.length < 2){
            addHLToMesh(result, BABYLON.Color3.Green());
            setContent('Select another Point')
        }
        else {
            var distance = distance2Point(listPointDistance[0], listPointDistance[1]);
            listPointDistance.forEach(point => {
                removeHLOfMesh(point);
            })
            listPointDistance = [];
            setContent('Select 2 points exist')
            alert('Distance: ' + distance);
        }
    }
}

export function ProcessCaculateTotalArea(pickResult: BABYLON.PickingInfo) {
    var mesh = pickResult.pickedMesh as BABYLON.Mesh;
    if (pickResult.pickedMesh.name.split("_")[0] != "Point" && pickResult.pickedMesh.name.split("_")[0] != "Line" && pickResult.pickedMesh.name.split("_")[0] != "Plane") {
        var total_area = totalArea(mesh);
        alert('Total Area: ' + total_area);
    }
}


export function onMouseOver(meshEvent: BABYLON.Mesh) {
    var but = document.createElement("span");
    but.setAttribute("id", "mybut");
    var sty = but.style;
    sty.position = "absolute";
    sty.lineHeight = "1.2em";
    sty.paddingLeft = "10px";
    sty.paddingRight = "10px";
    sty.color = "green";
    sty.border = "5pt ridge blue";
    sty.borderRadius = "12px";
    sty.backgroundColor = "none";
    sty.fontSize = "24pt";
    sty.top = scene.pointerY - 100 + "px";
    sty.left = scene.pointerX + "px";
    sty.cursor = "pointer";
    document.body.appendChild(but);
    console.log(but)

    but.textContent = meshEvent.position.toString();
    console.log('mouse over', meshEvent.name)
};

export function onMouseOut(meshEvent) {
    while (document.getElementById("mybut")) {
        document.getElementById("mybut").parentNode.removeChild(document.getElementById("mybut"));
    }
};