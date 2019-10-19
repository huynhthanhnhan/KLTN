import * as BABYLON from '@babylonjs/core'
import { scene } from './Enviroment'

const defaultWidth = 10;
const defaultHeight = 10;
export class Plane {
    width: number;
    height: number;
    position: BABYLON.Vector3;
    mesh: BABYLON.Mesh
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
}

export function CreatePlaneFrom3Point(p1: BABYLON.Vector3, p2: BABYLON.Vector3, p3: BABYLON.Vector3, width?: number, height?: number) {
    var _plane = new Plane(width?width:defaultWidth, height?height:defaultHeight);
    var sourcePlane = BABYLON.Plane.FromPoints(p1, p2, p3);
    var center = new BABYLON.Vector3((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3, (p1.z + p2.z + p3.z) / 3);
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: height ? height : defaultHeight, width: width ? width : defaultWidth, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    plane.setDirection(sourcePlane.normal)

    plane.position = center;
    _plane.mesh = plane;
    _plane.position = center;
    return _plane;

}

export function CreatePlaneFromPointAndVector(point: BABYLON.Vector3, vector: BABYLON.Vector3, width?: number, height?: number) {
    var _plane = new Plane(width?width:defaultWidth, height?height:defaultHeight);
    var sourcePlane = BABYLON.Plane.FromPositionAndNormal(point, vector);
    var center = point;
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: height ? height : defaultHeight, width: width ? width : defaultWidth, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    plane.setDirection(sourcePlane.normal)

    plane.position = center;
    _plane.mesh = plane;
    _plane.position = center;
    return _plane;

}


// var newSize = maxDistance([p1.position, p2.position, p3.position]);
// plane.scaling = new BABYLON.Vector3(newSize / (plane.getBoundingInfo().boundingBox.extendSize.x), newSize / (plane.getBoundingInfo().boundingBox.extendSize.y), 0);
function maxDistance(list: Array<BABYLON.Vector3>) {
    var maxD = 0;
    for (var i = 0; i < list.length - 1; i++) {
        var d = BABYLON.Vector3.Distance(list[i], list[i + 1]);
        if (d > maxD) maxD = d;
        console.log(d)
    }
    var d = BABYLON.Vector3.Distance(list[0], list[list.length - 1])
    if (d > maxD) maxD = d;
    return maxD;
}