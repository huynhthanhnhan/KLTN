import * as BABYLON from "@babylonjs/core"

export function CreateMeshMaterial(scene) {
var transMat = new BABYLON.StandardMaterial("transMat", scene);
	transMat.diffuseColor = new BABYLON.Color3(1, 1, 1);
    transMat.alpha = 0.5;
return transMat;
}