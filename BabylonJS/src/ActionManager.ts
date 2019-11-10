import * as BABYLON from "@babylonjs/core"
import {checkInSelectedMeshes} from './TempVariable'
import {scene, hl} from './Enviroment'
import {getSysMode} from './TempVariable'

export function PointActionManager(mesh: BABYLON.Mesh){
    mesh.actionManager = new BABYLON.ActionManager(scene);
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            function() {
                if (getSysMode()=='select' && !checkInSelectedMeshes(mesh)) {
                    if (hl.hasMesh(mesh)) hl.removeMesh(mesh);
                    hl.addMesh(mesh, BABYLON.Color3.Yellow());
                }
            }
        )
    );
    mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            function() {
                if (getSysMode()=='select' && hl.hasMesh(mesh)) {
                    if (!checkInSelectedMeshes(mesh))
                        hl.removeMesh(mesh);
                    // else
                    //     setTimeout(function() {
                    //         hl.removeMesh(p);
                    //         removeFromSelectedMeshes(p);
                    //     }, 20000);

                }
            }
        )
    );
}

export function LineActionManager(mesh: BABYLON.Mesh){
    mesh.actionManager = new BABYLON.ActionManager(scene);
        mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOverTrigger,
                function () {
                    if (getSysMode()=='point')
                        hl.addMesh(mesh, BABYLON.Color3.Yellow());
                }
            )
        );
        mesh.actionManager.registerAction(
            new BABYLON.ExecuteCodeAction(
                BABYLON.ActionManager.OnPointerOutTrigger,
                function () {
                    if (getSysMode()=='point')
                        hl.removeMesh(mesh);
                }
            )
        );

}