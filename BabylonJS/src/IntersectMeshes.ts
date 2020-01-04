import * as BABYLON from '@babylonjs/core'
import { CreateMeshMaterial } from './MeshMaterial';
import { scene, addHLToMesh } from './Enviroment';
import { RightClickActionManager } from './ActionManager';
import { getVertices } from './TempVariable';

export function GetIntersectMesh(mesh1: BABYLON.Mesh, mesh2: BABYLON.Mesh, name?: string) {
    if (mesh1.name.split("_")[0] == "Plane") {
        var vertices = getVertices(mesh1);
        var shape = [vertices[0], vertices[1], vertices[2], vertices[3], vertices[0]];
        var tempMesh1 = BABYLON.MeshBuilder.ExtrudePolygon('tempMesh1', { shape: shape, depth: 0.02, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
        tempMesh1.parent = mesh2;
        tempMesh1.rotation.x = Math.PI/2;
    }
    if (mesh2.name.split("_")[0] == "Plane") {
        var vertices = getVertices(mesh2);
        var shape = [vertices[0], vertices[1], vertices[2], vertices[3], vertices[0]];
        var tempMesh2 = BABYLON.MeshBuilder.ExtrudePolygon('tempMesh1', { shape: shape, depth: 0.02, sideOrientation: BABYLON.Mesh.DOUBLESIDE }, scene);
        tempMesh2.parent = mesh2;
        tempMesh2.rotation.x = Math.PI/2;
    }
    if (tempMesh1){
        var mesh1CSG = BABYLON.CSG.FromMesh(tempMesh1);
        tempMesh1.dispose();
    }
    else
        var mesh1CSG = BABYLON.CSG.FromMesh(mesh1);
    if (tempMesh2){
        var mesh2CSG = BABYLON.CSG.FromMesh(tempMesh2);
        tempMesh2.dispose();
    }
    else
        var mesh2CSG = BABYLON.CSG.FromMesh(mesh2);
    var intersectMaterial = CreateMeshMaterial(new BABYLON.Color3(0, 1, 1));
    var intersectMesh = mesh1CSG.intersect(mesh2CSG).toMesh("In_" + mesh1.name + "_" + mesh2.name, intersectMaterial, scene, true);
    BABYLON.Tags.AddTagsTo(intersectMesh, "intersectMesh");
    addHLToMesh(intersectMesh, BABYLON.Color3.White())
    RightClickActionManager(intersectMesh);
    var position = intersectMesh.position;
    var update = function () {
        if (intersectMesh) {
            var name = intersectMesh.name;
            scene.removeMesh(intersectMesh);
            GetIntersectMesh(mesh1, mesh2, name);
        }
        // console.log('update')
    }
    // mesh1.onAfterWorldMatrixUpdateObservable.add(update);
    // mesh2.onAfterWorldMatrixUpdateObservable.add(update);

    return intersectMesh;
}

