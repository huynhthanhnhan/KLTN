import * as BABYLON from "@babylonjs/core";
import { getNewIndexPoint, Point, getIndexPoint, setIndexPoint } from "./Point";
import { getIsStartCreateLine, setStartPoint, getStartPoint, setIsStartCreateLine, addToListLine, getSysMode, getMultiSelect, resetSelectedMeshes, addToSelectedMeshes, getMeshesForCheckIntersect, getInterMesh, getDefaultMaterialAlpha, setInterMesh, resetMeshesForCheckIntersect, getLineByName, getPointByName, setContent, getPlaneByName, midPointList, showMessage } from "./TempVariable";
import { gizmoManager, scene, addHLToMesh, removeHLOfMesh } from "./Enviroment";
import { Line } from "./Line";
import { GetIntersectMesh } from "./IntersectMeshes";
import { Plane } from "./Plane";
import { distance2Point, totalArea, distancePointLine } from "./Caculation";
import { CreateSphereFromPointAndPoint } from "./Objects/SphereObject";

export function ProcessLineOrMultiline(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] != "Point") {
        if (pickResult.pickedMesh.name == 'helper')
            var pt = new Point(pickResult.pickedMesh.position, 'Point_' + getNewIndexPoint());
        else
            var pt = new Point(pickResult.pickedPoint, 'Point_' + getNewIndexPoint());
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
    var target = (pickResult.pickedMesh) as BABYLON.Mesh;
    if (target.material)
        target.material.alpha = 1;


    if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
        if (getSysMode() == 'edit') {
            resetSelectedMeshes();
            addHLToMesh(target, BABYLON.Color3.Blue());
            addToSelectedMeshes(target);
            gizmoManager.attachableMeshes.push(target);
        }
        else {
            document.getElementById('colorpicker').style.display = "block";
            document.getElementById('alpha').style.display = "block";
            document.getElementById('pointName').style.display = "block"
            if (getMultiSelect() == false)
                resetSelectedMeshes();
            addHLToMesh(target, BABYLON.Color3.Green());
            addToSelectedMeshes(target);
            gizmoManager.attachableMeshes.push(target);
        }
    }
}

export function ProcessIntersect(pickResult: BABYLON.PickingInfo) {
    // setIsPickableBasicScene(false);
    // console.log(getMeshesForCheckIntersect())
    var target = (pickResult.pickedMesh) as BABYLON.Mesh;
    if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
        var meshesForCheckIntersect = getMeshesForCheckIntersect();
        if (meshesForCheckIntersect.length < 2) {
            target.material.alpha = 1;
            addHLToMesh(target, BABYLON.Color3.Green())
            if (getInterMesh()) getInterMesh().dispose();
            meshesForCheckIntersect.push(target);
            setContent('Choose another mesh to see the intersect')
            if (meshesForCheckIntersect.length == 2) {
                target.material.alpha = getDefaultMaterialAlpha();
                meshesForCheckIntersect[0].material.alpha = getDefaultMaterialAlpha();
                removeHLOfMesh(target);
                removeHLOfMesh(meshesForCheckIntersect[0]);
                var result = GetIntersectMesh(meshesForCheckIntersect[0], target);
                addHLToMesh(result, BABYLON.Color3.Yellow());
                setInterMesh(result);
                var mesh1 = meshesForCheckIntersect[0];
                var mesh2 = meshesForCheckIntersect[1];
                if (mesh1.name.split("_")[0] == "Line" && mesh2.name.split("_")[0] == "Plane") {
                    var line = getLineByName(mesh1.name);
                    var plane = getPlaneByName(mesh2.name);
                    if (line && plane) {
                        var lineV = line.pointA.position.subtract(line.pointB.position);
                        var lineP = line.pointA.position;
                        var planeV = plane.vector;
                        var planeP = plane.point;
                        var t = ((planeV.x * planeP.x + planeV.y * planeP.y + planeV.z * planeP.z) - ((planeV.x * lineP.x + planeV.y * lineP.y + planeV.z * lineP.z))) / (planeV.x * lineV.x + planeV.y * lineV.y + planeV.z * lineV.z);
                        var newPosition = new BABYLON.Vector3(lineP.x + lineV.x * t, lineP.y + lineV.y * t, lineP.z + lineV.z * t);
                        new Point(newPosition, 'Point_' + getIndexPoint())
                    }
                    if (getInterMesh()) getInterMesh().dispose();
                }
                if (mesh1.name.split("_")[0] == "Plane" && mesh2.name.split("_")[0] == "Line") {
                    var line = getLineByName(mesh2.name);
                    var plane = getPlaneByName(mesh1.name);
                    if (line && plane) {
                        var lineV = line.pointA.position.subtract(line.pointB.position);
                        var lineP = line.pointA.position;
                        var planeV = plane.vector;
                        var planeP = plane.point;
                        var t = ((planeV.x * planeP.x + planeV.y * planeP.y + planeV.z * planeP.z) - ((planeV.x * lineP.x + planeV.y * lineP.y + planeV.z * lineP.z))) / (planeV.x * lineV.x + planeV.y * lineV.y + planeV.z * lineV.z);
                        var newPosition = new BABYLON.Vector3(lineP.x + lineV.x * t, lineP.y + lineV.y * t, lineP.z + lineV.z * t);
                        new Point(newPosition, 'Point_' + getIndexPoint())
                    }
                    if (getInterMesh()) getInterMesh().dispose();
                }
                if (mesh1.name.split("_")[0] == "Line" && mesh2.name.split("_")[0] == "Line") {
                    if (getInterMesh()) getInterMesh().dispose();
                    var line0 = getLineByName(mesh1.name);
                    var line1 = getLineByName(mesh2.name);
                    if (line0 && line1) {
                        var line0V = line0.pointA.position.subtract(line0.pointB.position);
                        var line0P = line0.pointA.position;
                        var line1V = line1.pointA.position.subtract(line1.pointB.position);
                        var line1P = line1.pointA.position;

                        var t0 = (line0P.y - line1P.y - (line1V.y / line1V.x) * (line0P.x - line1P.x)) / (line0V.x / line1V.x * line1V.y - line0V.y);
                        var t1 = (line0P.x - line1P.x) / line1V.x + line0V.x / line1V.x * t0;
                        if (Math.abs(line0P.z + line0V.z * t0 - line1P.z + line1V.z * t1) < 0.00001) {
                            var newPos = new BABYLON.Vector3(line0P.x + line0V.x * t0, line0P.y + line0V.y * t0, line0P.z + line0V.z * t0);
                            new Point(newPos, 'Point_' + getIndexPoint());
                        }
                        else {
                            var t0 = (line0P.z - line1P.z - (line1V.z / line1V.x) * (line0P.x - line1P.x)) / (line0V.x / line1V.x * line1V.z - line0V.z);
                            var t1 = (line0P.x - line1P.x) / line1V.x + line0V.x / line1V.x * t0;
                            if (Math.abs(line0P.y + line0V.y * t0 - line1P.y + line1V.y * t1) < 0.00001) {
                                var newPos = new BABYLON.Vector3(line0P.x + line0V.x * t0, line0P.y + line0V.y * t0, line0P.z + line0V.z * t0);
                                new Point(newPos, 'Point_' + getIndexPoint());
                            }
                            else {
                                var t0 = (line0P.z - line1P.z - (line1V.z / line1V.y) * (line0P.y - line1P.y)) / (line0V.y / line1V.y * line1V.z - line0V.z);
                                var t1 = (line0P.y - line1P.y) / line1V.y + line0V.y / line1V.y * t0;
                                if (Math.abs(line0P.x + line0V.x * t0 - line1P.x + line1V.x * t1) < 0.00001) {
                                    var newPos = new BABYLON.Vector3(line0P.x + line0V.x * t0, line0P.y + line0V.y * t0, line0P.z + line0V.z * t0);
                                    new Point(newPos, 'Point_' + getIndexPoint());
                                }
                                else
                                    showMessage('Hai đường thẳng không cắt nhau', 'err');
                            }
                        }
                    }
                    if (getInterMesh()) {
                        new Point(result.position, 'Point_' + getIndexPoint());
                        // getInterMesh().dispose();
                    }

                }
                resetMeshesForCheckIntersect();
                setContent('Select 2 mesh to see the intersect');
            }
        }
        // else {

        // }
    }
}

export function ProcessPoint(pickResult: BABYLON.PickingInfo) {
    // setIsPickableBasicScene(true);
    if (pickResult.pickedMesh.name == "helper"){
        new Point(pickResult.pickedMesh.position, "Point_" + getNewIndexPoint());
        pickResult.pickedMesh.dispose();
    }
    else
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
    if (pickResult.pickedMesh.name.split("_")[0] == "Point") {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        listPointDistance.push(result);
        if (listPointDistance.length < 2) {
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
            showMessage('Khoảng cách 2 điểm: ' + distance, 'nor');
        }
    }
}

export function ProcessCaculateTotalArea(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh) {
        var mesh = pickResult.pickedMesh as BABYLON.Mesh;
        if (mesh.name.split("_")[0] != "Point" && mesh.name.split("_")[0] != "Line" && mesh.name.split("_")[0] != "Plane") {
            var total_area = totalArea(mesh);
            showMessage('Diện tích toàn phần: ' + total_area, 'nor');
        }

    }
}

var distancePointLine_point: Point[] = [];
var distancePointLine_line: Line[] = [];
export function ProcessDistancePointLine(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] == "Line" && distancePointLine_line.length == 0) {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        var line = getLineByName(result.name);
        if (line)
            distancePointLine_line.push(line);
    }
    if (pickResult.pickedMesh.name.split("_")[0] == "Point" && distancePointLine_point.length == 0) {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        var point = getPointByName(result.name);
        if (point)
            distancePointLine_point.push(point);
    }
    if (distancePointLine_point.length == 0)
        setContent('Select a Point');
    if (distancePointLine_line.length == 0)
        setContent('Select a Line');
    if (distancePointLine_line.length == 1 && distancePointLine_point.length == 1) {
        var distance = distancePointLine(distancePointLine_point[0], distancePointLine_line[0]);
        showMessage('Khoảng cách điểm và đ.thẳng: ' + distance, 'nor');
        distancePointLine_point = [];
        distancePointLine_line = [];
        setContent('Select a Point and a Line');
    }
}

var listSpherePoint: BABYLON.Mesh[] = [];
export function ProcessSphereCenterPoint(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] == "Point") {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        listSpherePoint.push(result);
        if (listSpherePoint.length < 2) {
            addHLToMesh(result, BABYLON.Color3.Green());
            setContent('Select another Point')
        }
        else {
            CreateSphereFromPointAndPoint(listSpherePoint[0].position, listSpherePoint[1].position);
            listSpherePoint.forEach(point => {
                removeHLOfMesh(point);
            })
            listSpherePoint = [];
            setContent('Select a point for center of sphere');
        }
    }
}

var listPlaneMidPointPoint: BABYLON.Mesh[] = [];
export function ProcessPlaneMidPointPoint(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] == "Point") {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        listPlaneMidPointPoint.push(result);
        if (listPlaneMidPointPoint.length < 2) {
            addHLToMesh(result, BABYLON.Color3.Green());
            setContent('Select another Point')
        }
        else {
            var point = BABYLON.Vector3.Center(listPlaneMidPointPoint[0].position, listPlaneMidPointPoint[1].position);
            var vector = listPlaneMidPointPoint[1].position.subtract(listPlaneMidPointPoint[0].position);
            new Plane('point-vector', point, vector, 0);
            listPlaneMidPointPoint.forEach(point => {
                removeHLOfMesh(point);
            })
            listPlaneMidPointPoint = [];
            setContent('Select 2 Point');
        }
    }
}

var listPlanePlanePoint_point: Point[] = [];
var listPlanePlanePoint_plane: BABYLON.Mesh[] = [];
export function ProcessPlanePlanePoint(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] == "Point" && listPlanePlanePoint_point.length == 0) {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        var point = getPointByName(result.name);
        if (point) {
            listPlanePlanePoint_point.push(point);
            addHLToMesh(listPlanePlanePoint_point[0].mesh, BABYLON.Color3.Green());
        }
    }
    if (pickResult.pickedMesh.name.split("_")[0] == "Plane" && listPlanePlanePoint_plane.length == 0) {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        if (result) {
            listPlanePlanePoint_plane.push(result);
            addHLToMesh(listPlanePlanePoint_plane[0], BABYLON.Color3.Green());
        }
    }
    if (listPlanePlanePoint_plane.length == 0)
        setContent('Select a plane');
    if (listPlanePlanePoint_point.length == 0)
        setContent('Select a point');
    if (listPlanePlanePoint_point.length == 1 && listPlanePlanePoint_plane.length == 1) {
        new Plane('plane-point', listPlanePlanePoint_plane[0], listPlanePlanePoint_point[0], 0);
        removeHLOfMesh(listPlanePlanePoint_point[0].mesh);
        removeHLOfMesh(listPlanePlanePoint_plane[0]);
        listPlanePlanePoint_plane = [];
        listPlanePlanePoint_point = [];
    }
}

var listPointMid: BABYLON.Mesh[] = [];
export function ProcessPointMidPointPoint(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] == "Point" || pickResult.pickedMesh.name == "helper") {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        listPointMid.push(result);
        if (listPointMid.length < 2) {
            addHLToMesh(result, BABYLON.Color3.Green());
            setContent('Select another Point')
        }
        else {
            var point = BABYLON.Vector3.Center(listPointMid[0].position, listPointMid[1].position);
            var pt = new Point(point, "Point_" + getNewIndexPoint());
            midPointList.push(pt.mesh);
            listPointMid.forEach(point => {
                removeHLOfMesh(point);
            })
            listPointMid = [];
            setContent('Select 2 Point');
        }
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

    but.textContent = meshEvent.position.toString();
};

export function onMouseOut(meshEvent) {
    while (document.getElementById("mybut")) {
        document.getElementById("mybut").parentNode.removeChild(document.getElementById("mybut"));
    }
};

