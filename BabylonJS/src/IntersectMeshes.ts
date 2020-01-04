import * as BABYLON from '@babylonjs/core'
import { CreateMeshMaterial } from './MeshMaterial';
import { scene, addHLToMesh } from './Enviroment';
import { RightClickActionManager } from './ActionManager';

export function GetIntersectMesh(mesh1: BABYLON.Mesh, mesh2: BABYLON.Mesh, name?: string) {
    if (mesh1.name.split("_")[0] == "Plane")
        mesh1.setVerticesData(BABYLON.VertexBuffer.UVKind, []);
    if (mesh2.name.split("_")[0] == "Plane")
        mesh2.setVerticesData(BABYLON.VertexBuffer.UVKind, []);
    var mesh1CSG = BABYLON.CSG.FromMesh(mesh1);
    var mesh2CSG = BABYLON.CSG.FromMesh(mesh2);
    var intersectMaterial = CreateMeshMaterial(new BABYLON.Color3(0, 1, 1));
    var intersectMesh = mesh1CSG.intersect(mesh2CSG).toMesh("In_" + mesh1.name + "_" + mesh2.name, intersectMaterial, scene, true);
    BABYLON.Tags.AddTagsTo(intersectMesh, "intersectMesh");
    addHLToMesh(intersectMesh, BABYLON.Color3.White())
    RightClickActionManager(intersectMesh);
    var position = intersectMesh.position;
    console.log('pos ', position)
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

