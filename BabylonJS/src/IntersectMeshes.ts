import * as BABYLON from '@babylonjs/core'
import { CreateMeshMaterial } from './MeshMaterial';
import { scene } from './Enviroment';

export function GetIntersectMesh(mesh1: BABYLON.Mesh, mesh2: BABYLON.Mesh, name?: string){
    var mesh1CSG = BABYLON.CSG.FromMesh(mesh1);
    var mesh2CSG = BABYLON.CSG.FromMesh(mesh2);
    var intersectMaterial = CreateMeshMaterial(new BABYLON.Color3(1,0,0));
    var intersectMesh = mesh1CSG.intersect(mesh2CSG).toMesh("In_"+mesh1.name+"_"+mesh2.name, intersectMaterial,scene, true);
    BABYLON.Tags.AddTagsTo(intersectMesh,"intersectMesh");
    var update = function(){
        if(intersectMesh){
            var name = intersectMesh.name;
            scene.removeMesh(intersectMesh);
            GetIntersectMesh(mesh1,mesh2, name);
        }
        // console.log('update')
    }
    // mesh1.onAfterWorldMatrixUpdateObservable.add(update);
    // mesh2.onAfterWorldMatrixUpdateObservable.add(update);
    return intersectMesh;
}