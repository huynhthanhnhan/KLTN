function Point(){
    var name;
    var position;
    var mesh;
}
export function CreatePoint(position,point,gizmoManager,hl,scene,isSelectMode,checkInSelectedMeshes) {
    const _point=new Point();
    _point.name="point";
    _point.position=position;
    _point.mesh=point.clone("point");
    gizmoManager.attachableMeshes.push(_point.mesh);
    // p.isVisible = true;
    _point.mesh.position = _point.position;
    _point.mesh.actionManager = new BABYLON.ActionManager(scene);
    _point.mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOverTrigger,
            function() {
                if (isSelectMode && !checkInSelectedMeshes(_point.mesh)) {
                    if (hl.hasMesh(_point.mesh)) hl.removeMesh(_point.mesh);
                    hl.addMesh(_point.mesh, BABYLON.Color3.Yellow());
                }
            }
        )
    );
    _point.mesh.actionManager.registerAction(
        new BABYLON.ExecuteCodeAction(
            BABYLON.ActionManager.OnPointerOutTrigger,
            function() {
                if (isSelectMode && hl.hasMesh(_point.mesh)) {
                    if (!checkInSelectedMeshes(_point.mesh))
                        hl.removeMesh(_point.mesh);
                    // else
                    //     setTimeout(function() {
                    //         hl.removeMesh(p);
                    //         removeFromSelectedMeshes(p);
                    //     }, 20000);

                }
            }
        )
    );
    return _point;
}