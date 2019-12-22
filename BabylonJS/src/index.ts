import * as BABYLON from "@babylonjs/core"
import "@babylonjs/core/Meshes/meshBuilder";

import {Point} from './Point'
import {camera, canvas, engine, scene} from './Enviroment'
import {InitGround, showAxis, getIsPickableBasicScene} from './BasicScreen'
import {formBinding} from './FormBinding'
import {KeyControl} from './KeyControl'
import {MouseControl} from './MouseBinding'
import {CreateBoxMesh, CreateCubeMesh, CreateBoxCustom} from './Objects/BoxObject'
import {CreatePlaneFrom3Point, CreatePlaneFromPointAndNormalVector} from './Plane'
import { GetIntersectMesh } from "./IntersectMeshes";
import { CreateCubeCustom } from "./Objects/CubeObject";
import { getListLine, getListPoint, setIsDoubleClick, getIsDoubleClick, getSysMode } from "./TempVariable";
import { } from "./Line";
import { CreateSphereCustom } from "./Objects/SphereObject";

var createScene = function() {

   ///////////////////// Init functions /////////////////////////
    InitGround();
    showAxis(10);
    formBinding();
    KeyControl();
    MouseControl();

    // CreateCubeWithCenterSize({ x: 5, y: 5, z: 5 }, 4);
    ////////// TEST OBJECT ///////////////

    // var listBox: BABYLON.Mesh[] = [];
    // // var cusBox1 = CreateBoxCustom(10,5);
    // var cusBox2 = CreateBoxCustom(5,10);
    // CreateSphereCustom(10);

    // var line = CreateLine(CreatePoint(new BABYLON.Vector3(2,0,10)),CreatePoint( new BABYLON.Vector3(-5,0,-10)));
    // GetIntersectMesh(cusBox2,line.mesh);
    // var plane = CreatePlaneFromPointAndNormalVector(new BABYLON.Vector3(1,1,1), new BABYLON.Vector3(0,1,0), 10,10);

    // // var cus3 = CreateBoxCustom(10,10);
    // // var cus4 = CreateBoxCustom(10,10);
    // // listBox.push(cusBox1);
    // // listBox.push(cusBox2);
    // // listBox.push(cus3);
    // // listBox.push(cus4);

    // var intersectList: BABYLON.Mesh[] = [];
    // function setIntersect(){
    //     listBox.map(box => {
    //         listBox.map(box1 =>{
    //             if(box1!== box){
    //                 intersectList.push(GetIntersectMesh(box,box1));
    //             }
    //         })
    //     })

    // }
    // function setIntersectList(list){
    //     list.map(box => {
    //         // list.map(box1 =>{
    //         //     if(box1!== box){
    //         //         intersectList.push(GetIntersectMesh(box.mesh,box1.mesh));
    //         //     }
    //         // })
    //         intersectList.push(box.mesh,cusBox2)
    //     })
    // }
    // setIntersectList(getListLine());
    // setIntersect();
    // var intersectMesh1;
    // intersectMesh1 = GetIntersectMesh(cus3,cus4);
    // var intersectMesh;
    // intersectMesh = GetIntersectMesh(cusBox1, cusBox2);
    // var intersectMesh2;
    // var intersectMesh3;
    // intersectMesh2 = GetIntersectMesh(cusBox1,cus3);
    // intersectMesh3 = GetIntersectMesh(cusBox1,cus4);

    // var cusBox3 = CreateCubeCustom(21)
    // GetIntersectMesh(cusBox1, cusBox3);
    // scene.removeMesh(intersectMesh)
    // intersectMesh.dispose();
    // console.log(intersectMesh)

    // scene.onKeyboardObservable.add((keyInfo) => {
    //     switch (keyInfo.type) {
    //         case BABYLON.KeyboardEventTypes.KEYDOWN:
    //                 switch (keyInfo.event.key) {
    //                     case "i" || "I":
    //                         // intersectList.map(inter=>{
    //                         //     inter.dispose();
                    
    //                         // })
    //                         setIntersectList(getListLine());
    //                         console.log(getListLine());
    //                         console.log(getListPoint());
    //                         break;
    //                 }
    //         }
    //     })
        // scene(()=>{
        //     setIsDoubleClick(false);
        // })
    // scene.registerBeforeRender(()=>{
    //     // intersectMesh.name = "no";
    //     intersectList.map(inter=>{
    //         inter.dispose();

    //     })
    //     setIntersect();
    //     // intersectMesh.dispose();
    //     // intersectMesh1.dispose();
    //     // intersectMesh = GetIntersectMesh(cusBox1, cusBox2);
    //     // intersectMesh1 = GetIntersectMesh(cus3,cus4);
    //     // console.log(intersectMesh.name);
    // })
    /////////////////////////////////////

    // CreateCubeMesh({ x: 0, y: 2, z: 0 }, 1);
    // CreateBoxMesh({ x: 5, y: 2, z: 0 }, 2, 3, 4);
    // CreatePlaneFrom3Point(new BABYLON.Vector3(5,0,0), new BABYLON.Vector3(5,5,0), new BABYLON.Vector3(5,5,5));
    // CreatePlaneFromPointAndNormalVector(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,1,0));

    // var l1 = CreateLine(new BABYLON.Vector3(0,0,5), new BABYLON.Vector3(5,10,0), getSysMode()=='point');
    // var l2 = CreateLine(new BABYLON.Vector3(0,0,-5), new BABYLON.Vector3(5,0,0), getSysMode()=='point');


    // CreatePlaneFromPointAndVector(l1.pointA, l2.rotation)
    // var p = CreatePlaneFromPointAndNormalVector(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,0,0))
    // console.log(p.mesh)
    // var p = CreatePlaneFromPointAndVector(new BABYLON.Vector3(0,0,0), new BABYLON.Vector3(1,0,0))
    // console.log(p.mesh)

    scene.registerBeforeRender(function() {
        // if (selectedMeshes.length >= 1) {
        //     selectedMeshes.forEach(mesh => {
        //         if (mesh)
        //             gizmoManager.attachToMesh(mesh);
        //     })
        // }
        // console.log(isMultiSelect);
        // console.log(getSysMode())
        // console.log(getIsPickableBasicScene());
    })

    window['scene'] = scene;
    return scene;

};

var mainScene = createScene();

engine.runRenderLoop(function() {
    if (mainScene) {
        mainScene.render();
        var fpsLabel = document.getElementById("fpsLabel");
        fpsLabel.innerHTML = engine.getFps().toFixed() + " fps";
        var modeLabel = document.getElementById("modeLabel");
        modeLabel.innerHTML = getSysMode() + " mode";
    }
});

// Resize
window.addEventListener("resize", function() {
    engine.resize();
});