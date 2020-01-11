import * as BABYLON from '@babylonjs/core'
import { scene, resetHL } from './Enviroment'
import { Line } from './Line'
import { Point } from './Point'
import { CreateMeshMaterial } from './MeshMaterial'
import { addToListPlane } from './TempVariable'

var indexPlane = 0;

const defaultWidth = 10;
const defaultHeight = 10;
export class Plane {
    width: number;
    height: number;
    position: BABYLON.Vector3;
    mesh: BABYLON.Mesh;
    vector: BABYLON.Vector3;
    point: BABYLON.Vector3;
    name: string;
    constructor(type: '3point' | 'point-vector' | 'line-line'|'point-line' | 'plane-point',var1, var2, var3,width?:number, height?:number) {
        switch(type){
            case '3point':
                this.width = width?width:defaultWidth;
                this.height = height?height:defaultHeight;
                var result = CreatePlaneFrom3Point(var1, var2, var3, this.width, this.height);
                this.mesh = result.plane;
                this.vector = result.vector;
                this.point = result.point;
                this.position = this.mesh.position;
                this.name = this.mesh.name;
                addToListPlane(this);
                break;
            case 'point-vector':
                this.width = width?width:defaultWidth;
                this.height = height?height:defaultHeight;
                this.mesh = CreatePlaneFromPointAndNormalVector(var1, var2, this.width, this.height);
                this.position = this.mesh.position;
                this.name = this.mesh.name;
                addToListPlane(this);
                break;
            case 'line-line':
                this.width = width?width:defaultWidth;
                this.height = height?height:defaultHeight;
                var result = CreatePlaneFromTwoLine(var1, var2, this.width, this.height); 
                this.mesh = result.plane;
                this.vector = result.vector;
                this.point = result.point;
                if(this.mesh){
                    this.position = this.mesh.position;
                    this.name = this.mesh.name;
                    addToListPlane(this);
                }
                break;
            case 'point-line':
                this.width = width?width:defaultWidth;
                this.height = height?height:defaultHeight;
                var result  = CreatePlaneFromPointAndLine(var1, var2, this.width, this.height);
                this.mesh = result.plane;
                this.vector =result.vector;
                this.point = result.point;
                if(this.mesh){
                    this.position = this.mesh.position;
                    this.name = this.mesh.name;
                    addToListPlane(this);
                }
                break;
            case 'plane-point':
                this.mesh = CreatePlaneFromPlaneAndPoint(var1, var2);
                if(this.mesh){
                    this.position = this.mesh.position;
                    this.name = this.mesh.name;
                    addToListPlane(this);
                }
                break;
        }
    }

}

function CreatePlaneFrom3Point(p1: BABYLON.Vector3, p2: BABYLON.Vector3, p3: BABYLON.Vector3, width?: number, height?: number) {
    width = height = maxDistance([p1,p2,p3]);
    // var _plane = new Plane(width ? width : defaultWidth, height ? height : defaultHeight);
    var sourcePlane = BABYLON.Plane.FromPoints(p1, p2, p3);
    var center = new BABYLON.Vector3((p1.x + p2.x + p3.x) / 3, (p1.y + p2.y + p3.y) / 3, (p1.z + p2.z + p3.z) / 3);
    var plane = BABYLON.MeshBuilder.CreatePlane("Plane_" + indexPlane, { height: height ? height : defaultHeight, width: width ? width : defaultWidth, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    plane.material = CreateMeshMaterial(BABYLON.Color3.Blue())
    plane.setDirection(sourcePlane.normal)
    var vector = sourcePlane.normal;
    var point = p1;

    plane.position = center;
    // _plane.mesh = plane;
    // _plane.position = center;
    indexPlane++;
    return {plane, vector, point};

}

function CreatePlaneFromPointAndNormalVector(point: BABYLON.Vector3, vector: BABYLON.Vector3, width?: number, height?: number) {
    // var _plane = new Plane(width ? width : defaultWidth, height ? height : defaultHeight);
    var sourcePlane = BABYLON.Plane.FromPositionAndNormal(point, vector);
    var center = point;
    // var plane = BABYLON.MeshBuilder.CreatePlane("Plane_"+indexPlane, { height: height ? height : defaultHeight, width: width ? width : defaultWidth, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    var shape = [
        new BABYLON.Vector3(width ? -width / 2 : -defaultWidth / 2, 0, height ? -height / 2 : -defaultHeight / 2),
        new BABYLON.Vector3(width ? width / 2 : defaultWidth / 2, 0, height ? -height / 2 : -defaultHeight / 2),
        new BABYLON.Vector3(width ? width / 2 : defaultWidth / 2, 0, height ? height / 2 : defaultHeight / 2),
        new BABYLON.Vector3(width ? -width / 2 : -defaultWidth / 2, 0, height ? height / 2 : defaultHeight / 2)
    ];
    // var plane = BABYLON.MeshBuilder.ExtrudePolygon("Plane_" + indexPlane, { shape: shape, depth: 0.02, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    var plane = BABYLON.MeshBuilder.CreatePlane("Plane_" + indexPlane, { height: height ? height : defaultHeight, width: width ? width : defaultWidth, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
    plane.material = CreateMeshMaterial(BABYLON.Color3.Blue())
    plane.setDirection(sourcePlane.normal)

    plane.position = center;
    // _plane.mesh = plane;
    // _plane.position = center;
    indexPlane++;
    return plane;

}

function CreatePlaneFromTwoLine(line1: Line, line2: Line, width?: number, height?: number) {
    if (line1.mesh.intersectsMesh(line2.mesh) && line1.name != line2.name) {
       return CreatePlaneFrom3Point(line1.pointA.position, line1.pointB.position, line2.pointA.position, width, height)
    }
    else{
        alert("2 đoạn thẳng không cắt nhau");
        return;
    }
}

function CreatePlaneFromPointAndLine(point: Point, line: Line, width?: number, height?: number) {
    if (point.mesh.intersectsMesh(line.mesh)) {
        alert("Điểm này thuộc đường thẳng");
        return;
    }
    else
        return CreatePlaneFrom3Point(point.mesh.position, line.pointA.position, line.pointB.position, width, height);
}

function CreatePlaneFromPlaneAndPoint(plane: BABYLON.Mesh, point: Point){
    var _plane = plane.clone('Plane_'+indexPlane);
    indexPlane++;
    _plane.position = point.position;
    return _plane;
}

// export function CreatePlaneFromListPoint(listPoint: Array<BABYLON.Vector3>, width?: number, height?: number){
//     var _plane = new Plane(width?width:defaultWidth, height?height:defaultHeight);
//     var sourcePlane = BABYLON.Plane.FromArray(listPoint)
//     var center = point;
//     var plane = BABYLON.MeshBuilder.CreatePlane("plane", { height: height ? height : defaultHeight, width: width ? width : defaultWidth, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
//     plane.setDirection(sourcePlane.normal)

//     plane.position = center;
//     _plane.mesh = plane;
//     _plane.position = center;
//     return _plane;
// }

// var newSize = maxDistance([p1.position, p2.position, p3.position]);
// plane.scaling = new BABYLON.Vector3(newSize / (plane.getBoundingInfo().boundingBox.extendSize.x), newSize / (plane.getBoundingInfo().boundingBox.extendSize.y), 0);
function maxDistance(list: Array<BABYLON.Vector3>) {
    var maxD = 0;
    for (var i = 0; i < list.length - 1; i++) {
        var d = BABYLON.Vector3.Distance(list[i], list[i + 1]);
        if (d > maxD) maxD = d;
    }
    var d = BABYLON.Vector3.Distance(list[0], list[list.length - 1])
    if (d > maxD) maxD = d;
    return maxD + 1;
}