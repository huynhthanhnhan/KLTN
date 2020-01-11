import * as BABYLON from '@babylonjs/core'
import { removeFromGizmoManagerList, removeHLOfMesh } from './Enviroment'
import { Point, getIndexPoint, setIndexPoint } from './Point';
import { Line } from './Line';
import { Plane } from './Plane';
import { scene } from './Enviroment'
import * as GUI from '@babylonjs/gui'


// Check is multi select mode (by holading Ctrl)
var isMultiSelect = false;
export function getMultiSelect() { return isMultiSelect; }
export function setMultiSelect(b: boolean) { isMultiSelect = b; }

// Check is the first point of Line
var isStartCreateLine = true;
export function getIsStartCreateLine() { return isStartCreateLine; }
export function setIsStartCreateLine(b: boolean) { isStartCreateLine = b; }

// System modes
var sysMode: string = 'select' || 'line' || 'multiLine' || 'point' || 'edit' || 'intersect' || 'plane3Point' || 'plane2Line' || 'planePointLine' || 'distance2Point' || 'distance2Line' || 'distancePointLine' || 'totalArea' || 'spherePointPoint' || 'planeMidPointPoint' || 'planePlanePoint' || 'pointMidPointPoint';
export function getSysMode() { return sysMode.valueOf(); }
export function setSysMode(mode: 'select' | 'line' | 'multiLine' | 'point' | 'edit' | 'intersect' |
    'plane3Point' | 'plane2Line' | 'planePointLine' | 'distance2Point' | 'distance2Line' | 'distancePointLine' | 'totalArea' | 'box-inputs' | 'cube-inputs' | 'sphere-inputs' | 'cone-inputs' | 'pyramid-inputs' | 'prism-inputs' |
    'spherePointPoint' | 'planeMidPointPoint' | 'planePlanePoint' | 'pointMidPointPoint') {
    sysMode = mode
};



// Save the first point of Line
var startPoint: Point;
export function getStartPoint() { return startPoint; }
export function setStartPoint(point: Point) {
    point.name = 'Point_' + getIndexPoint();
    point.mesh.name = 'Point_' + getIndexPoint();
    setIndexPoint(getIndexPoint() + 1);
    startPoint = point;
}
export function triggerStartPoint() {
    if (startPoint != null) {
        removeHLOfMesh(startPoint.mesh);
        startPoint = null;
    }
}

var listPoint: Point[] = [];
window['listPoint'] = listPoint;
export function getListPoint() { return listPoint; }
export function addToListPoint(point: Point) { listPoint.push(point); }
export function removeFromListPoint(name: string) {
    var tempList = [];
    for (let i = 0; i < listPoint.length; i++) {
        if (listPoint[i].name != name)
            tempList.push(listPoint[i]);
    }
    listPoint = tempList;
}
export function getPointByName(name: string) {
    for (let i = 0; i < listPoint.length; i++) {
        if (listPoint[i].name == name)
            return listPoint[i];
    }
    return false;
}

var listLine: Line[] = [];
export function getListLine() { return listLine; }
export function addToListLine(line: Line) { listLine.push(line); }
export function removeFromListLine(name: string) {
    var tempList = [];
    for (let i = 0; i < listLine.length; i++) {
        if (listLine[i].name != name)
            tempList.push(listLine[i]);
    }
    listLine = tempList;
}
export function getLineByName(name: string) {
    for (let i = 0; i < listLine.length; i++) {
        if (listLine[i].name == name)
            return listLine[i];
    }
    return false;
}

var listPlane: Plane[] = [];
window['listPlane'] = listPlane;
export function getListPlane() { return listPlane; }
export function addToListPlane(Plane: Plane) { listPlane.push(Plane); }
export function removeFromListPlane(name: string) {
    var tempList = [];
    for (let i = 0; i < listPlane.length; i++) {
        if (listPlane[i].name != name)
            tempList.push(listPlane[i]);
    }
    listPlane = tempList;
}
export function getPlaneByName(name: string) {
    for (let i = 0; i < listPlane.length; i++) {
        if (listPlane[i].name == name)
            return listPlane[i];
    }
    return false;
}


// List of meshes selected
var selectedMeshes: BABYLON.Mesh[] = [];
export function getSelectedMesh() { return selectedMeshes; }
export function setSelectedMesh(meshes: BABYLON.Mesh[]) { selectedMeshes = meshes; }
export function removeFromSelectedMeshes(object) {
    if (selectedMeshes) {
        for (var i = 0; i < selectedMeshes.length; i++) {
            if (selectedMeshes[i] == object) {
                selectedMeshes.splice(i, 1);
                return;
            }
        }
    }

}
export function resetSelectedMeshes() {
    selectedMeshes.forEach(mesh => {
        removeHLOfMesh(mesh);
        removeFromGizmoManagerList(mesh);
    })
    selectedMeshes = [];
}
export function addToSelectedMeshes(mesh: BABYLON.Mesh) {
    selectedMeshes.push(mesh);
}
export function checkInSelectedMeshes(object: BABYLON.Mesh) {
    if (selectedMeshes) {
        for (var i = 0; i < selectedMeshes.length; i++) {
            if (selectedMeshes[i] == object) {
                return true;
            }
        }
        return false;
    }
}

// Check is moving Z mode
var isMoveZ = false;
export function getIsMoveZ() { return isMoveZ; }
export function setIsMoveZ(b: boolean) { isMoveZ = b; }

var defaultMaterialAlpha = 0.5;
export function getDefaultMaterialAlpha() { return defaultMaterialAlpha; }

var isDoubleClick = false;
export function getIsDoubleClick() { return isDoubleClick; }
export function setIsDoubleClick(b: boolean) { isDoubleClick = b; }

var intersectMesh: BABYLON.Mesh;
export function getInterMesh() { return intersectMesh; }
export function setInterMesh(mesh: BABYLON.Mesh) { intersectMesh = mesh; }

var meshesForCheckIntersect: BABYLON.Mesh[] = [];

export function getMeshesForCheckIntersect() { return meshesForCheckIntersect; }
export function resetMeshesForCheckIntersect() { meshesForCheckIntersect = []; }

var inputObject: '' | 'point' | 'line-point-vector' | 'line-point-point' | 'plane-3-point' | 'plane-point-vector' | 'box-inputs' | 'cone-inputs' | 'sphere-inputs' | 'cube-inputs' | 'pyramid-inputs' | 'prism-inputs';
export function setInputObject(input: '' | 'point' | 'line-point-vector' | 'line-point-point' | 'plane-3-point' | 'plane-point-vector' | 'box-inputs' | 'cone-inputs' | 'sphere-inputs' | 'cube-inputs' | 'pyramid-inputs' | 'prism-inputs') {
    inputObject = input;
}
export function getInputObject() {
    return inputObject;
}

var content = document.getElementById('notice');
export function setContent(text: string) {
    content.textContent = text;
}

var spheres: BABYLON.Mesh[] = [];
var cylinder;
var offset = .5;

export function resetSphereVerticleList() {
    if (spheres.length > 0)
        spheres.forEach(sphere => {
            sphere.dispose();
        })
}

var makeClickResponse = function (mesh: BABYLON.Mesh) {
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOverTrigger, function (m) {
            // console.log('In');
            m.meshUnderPointer.material.alpha = 1;
        })
    );

    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnPointerOutTrigger, function (m) {
            // console.log('Out');
            m.meshUnderPointer.material.alpha = 0;
        })
    );
}


var mat = new BABYLON.StandardMaterial("material", scene);
mat.emissiveColor = new BABYLON.Color3(0, 0, 1);
mat.alpha = 0;

var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 0.1 }, scene);
var pointMat = new BABYLON.StandardMaterial("pointMat", scene);
pointMat.diffuseColor = BABYLON.Color3.Blue();
pointMat.alpha = 0;
sphere.material = pointMat;

export var midPointList: BABYLON.Mesh[] =[];

export function resetMidPointList(){
    midPointList.forEach(point=>{
        point.dispose();
    })
}


export var createFacePoints = function (id, pos) {
    spheres[id] = sphere.clone("helper");
    spheres[id].material = pointMat.clone("check");
    spheres[id].position = pos;
    makeClickResponse(spheres[id]);
};


export function getVertices(mesh: BABYLON.Mesh) {
    if (!mesh) { return; }
    var piv = mesh.getPivotPoint();
    var positions = mesh.getVerticesData(BABYLON.VertexBuffer.PositionKind);
    if (!positions) { return; }
    var numberOfPoints = positions.length / 3;

    var level = false;
    var map = [];
    var poGlob = [];
    for (var i = 0; i < numberOfPoints; i++) {
        var p = new BABYLON.Vector3(positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2]);
        var found = false;
        for (var index = 0; index < map.length && !found; index++) {
            var array = map[index];
            var p0 = array[0];
            if (p0.equals(p) || (p0.subtract(p)).lengthSquared() < 0.01) {
                found = true;
            }
        }
        if (!found) {
            array = [];
            poGlob.push(BABYLON.Vector3.TransformCoordinates(p, mesh.getWorldMatrix()));
            array.push(p);
            map.push(array);
        }
    }
    return poGlob;
}
export var pointName: GUI.AdvancedDynamicTexture[] = [];
