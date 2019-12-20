import * as BABYLON from "@babylonjs/core";
import { getNewIndexPoint, Point, getIndexPoint, setIndexPoint } from "./Point";
import { addToListPoint, getIsStartCreateLine, setStartPoint, getStartPoint, setIsStartCreateLine, addToListLine, getSysMode, getMultiSelect, resetSelectedMeshes, addToSelectedMeshes, getMeshesForCheckIntersect, getInterMesh, getDefaultMaterialAlpha, setInterMesh, resetMeshesForCheckIntersect } from "./TempVariable";
import { gizmoManager, scene, addHLToMesh, removeHLOfMesh } from "./Enviroment";
import { Line } from "./Line";
import { GetIntersectMesh } from "./IntersectMeshes";

export function ProcessLineOrMultiline(pickResult: BABYLON.PickingInfo) {
    if (pickResult.pickedMesh.name.split("_")[0] != "Point") {
        const pt = new Point(pickResult.pickedPoint, 'Point_' + getNewIndexPoint());
        if (getIsStartCreateLine()) {
            setStartPoint(pt);
            addHLToMesh(getStartPoint().mesh, BABYLON.Color3.Green())
            setIsStartCreateLine(false);
        } else {
            if (getStartPoint()) {
                var s = new Line(getStartPoint(), pt);
                // console.log("create with line");
                removeHLOfMesh(getStartPoint().mesh);
                if (getSysMode() == 'line')
                    setIsStartCreateLine(true);
                else {
                    setStartPoint(pt);
                    addHLToMesh(getStartPoint().mesh, BABYLON.Color3.Green())
                }
            }
        }
    } else {
        var result = pickResult.pickedMesh as BABYLON.Mesh;
        var pointResult = new Point(result.position, 'Point_' + getIndexPoint());
        setIndexPoint(getIndexPoint() + 1);
        if (getIsStartCreateLine()) {
            setStartPoint(pointResult);
            addHLToMesh(getStartPoint().mesh, BABYLON.Color3.Green());
            if (getSysMode() == "line")
                setIsStartCreateLine(false);
        } else {
            if (getStartPoint()) {
                var s = new Line(getStartPoint(), pointResult);
                addToListLine(s);
                // console.log("create with point")
                setIsStartCreateLine(true);
                removeHLOfMesh(getStartPoint().mesh);
            }
        }
    }
}

export function ProcessSelectOrEdit(pickResult: BABYLON.PickingInfo) {
    // setIsPickableBasicScene(false);
    var target = (pickResult.pickedMesh) as BABYLON.Mesh;
    addHLToMesh(target, BABYLON.Color3.Blue());
    if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
        if (getMultiSelect() == false || getSysMode() == 'edit') {
            resetSelectedMeshes();
        }
        addToSelectedMeshes(target);
        gizmoManager.attachableMeshes.push(target);

        // camera.detachControl(canvas);
    } else {
        resetSelectedMeshes();
    }

}

export function ProcessIntersect(pickResult: BABYLON.PickingInfo) {
    // setIsPickableBasicScene(false);
    // console.log(getMeshesForCheckIntersect())
    var target = (pickResult.pickedMesh) as BABYLON.Mesh;
    if (target.name != "groundx" && target.name != "groundy" && target.name != "groundz" && target.name != "axisX" && target.name != "axisY" && target.name != "axisZ") {
        var meshesForCheckIntersect = getMeshesForCheckIntersect();
        if (meshesForCheckIntersect.length == 0) {
            target.material.alpha = 1;
            addHLToMesh(target, BABYLON.Color3.Green())
            if (getInterMesh()) getInterMesh().dispose();
            meshesForCheckIntersect.push(target);
        }
        else {
            target.material.alpha = getDefaultMaterialAlpha();
            meshesForCheckIntersect[0].material.alpha = getDefaultMaterialAlpha();
            removeHLOfMesh(target);
            removeHLOfMesh(meshesForCheckIntersect[0]);
            var intersectMesh = GetIntersectMesh(meshesForCheckIntersect[0], target);
            addHLToMesh(intersectMesh, BABYLON.Color3.Yellow());
            setInterMesh(intersectMesh);
            resetMeshesForCheckIntersect();
        }
    }
}

export function ProcessPoint(pickResult: BABYLON.PickingInfo) {
    // setIsPickableBasicScene(true);
    const pt = new Point(pickResult.pickedPoint);
}

export function onMouseOver(meshEvent: BABYLON.Mesh) {
    var but = document.createElement("span");
    but.setAttribute("id", "mybut");
    var sty = but.style;
    sty.position = "absolute";
    sty.lineHeight = "1.2em";
    sty.paddingLeft = "10px";
    sty.paddingRight = "10px";
    sty.color = "green";
    sty.border = "5pt ridge blue";
    sty.borderRadius = "12px";
    sty.backgroundColor = "none";
    sty.fontSize = "24pt";
    sty.top = scene.pointerY - 100 + "px";
    sty.left = scene.pointerX + "px";
    sty.cursor = "pointer";
    document.body.appendChild(but);
    console.log(but)

    but.textContent = meshEvent.position.toString();
    console.log('mouse over', meshEvent.name)
};

export function onMouseOut(meshEvent) {
    while (document.getElementById("mybut")) {
        document.getElementById("mybut").parentNode.removeChild(document.getElementById("mybut"));
    }
};