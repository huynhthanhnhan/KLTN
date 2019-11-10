import * as BABYLON from '@babylonjs/core'
import { hl, removeFromGizmoManagerList } from './Enviroment'
import { Point, getIndexPoint, setIndexPoint } from './Point';
import { Line } from './Line';

// Check is multi select mode (by holading Ctrl)
var isMultiSelect = false;
export function getMultiSelect() { return isMultiSelect; }
export function setMultiSelect(b: boolean) { isMultiSelect = b; }

// Check is the first point of Line
var isStartCreateLine = true;
export function getIsStartCreateLine() { return isStartCreateLine; }
export function setIsStartCreateLine(b: boolean) { isStartCreateLine = b; }

// System modes
var sysMode: string = 'select' || 'line' || 'multiLine' || 'point' || 'edit';
export function getSysMode() { return sysMode.valueOf(); }
export function setSysMode(mode: string) { sysMode = mode };

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
        hl.removeMesh(startPoint.mesh);
        startPoint = null;
    }
}

var listPoint: Point[] = [];
export function getListPoint() { return listPoint; }
export function addToListPoint(point: Point) { listPoint.push(point); }
export function getPointByName(name: string) {
    for(let i =0;i<listPoint.length;i++){
        if (listPoint[i].name == name)
            return listPoint[i];
    }
    return false;
}

var listLine: Line[] = [];
export function getListLine() { return listLine; }
export function addToListLine(line: Line) { listLine.push(line); }
export function getLineByName(name: string) {
    for(let i =0;i<listLine.length;i++){
        if (listLine[i].name == name)
            return listLine[i];
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
        if (hl.hasMesh(mesh))
            hl.removeMesh(mesh);
        removeFromGizmoManagerList(mesh);
    })
    selectedMeshes = [];
}
export function addToSelectedMeshes(mesh: BABYLON.Mesh) {
    selectedMeshes.push(mesh);
}
export function checkInSelectedMeshes(object) {
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



