
import { hl, gizmoManager } from './Enviroment'

import { CreateBoxDefault } from './Objects/BoxObject'
import { CreateBoxCustom } from './Objects/BoxObject'
import { CreateCubeDefault } from './Objects/CubeObject'
import { CreateCubeCustom } from './Objects/CubeObject'
import { CreateSphereDefault } from './Objects/SphereObject'
import { CreateSphereCustom } from './Objects/SphereObject'
import { CreatePyramidDefault } from './Objects/PyramidObject'
import { CreatePyramidCustom } from './Objects/PyramidObject'
import { CreateConeDefault } from './Objects/ConeObject'
import { CreateConeCustom } from './Objects/ConeObject'
import { CreatePrismDefault } from './Objects/PrismObject'
import { CreatePrismCustom } from './Objects/PrismObject'
import $ from 'jquery'
import {triggerStartPoint, setSysMode, setStartPoint, setIsStartCreateLine} from './TempVariable'
import {scene} from './Enviroment'


export function formBinding() {
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
    // submit event detected
    var valCube=(<HTMLInputElement>document.getElementById('edge')).value;
    if(valCube !=null && valCube !='')
    {
        var cubeBox=CreateCubeCustom(parseInt(valCube));
        scene.registerBeforeRender(function(){
            cubeBox.rotation.y += 0.05;
        });
    }
    var valDiameter=(<HTMLInputElement>document.getElementById('diameter')).value;
    if(valDiameter !=null && valDiameter !='')
    {
        CreateSphereCustom(valDiameter);
    }
    var valBoxWidth=(<HTMLInputElement>document.getElementById('width')).value;
    var valBoxHeight=(<HTMLInputElement>document.getElementById('height')).value;
    if((valBoxWidth !=null && valBoxWidth !='')&&(valBoxHeight !=null && valBoxHeight !=''))
    {
        CreateBoxCustom(parseInt(valBoxHeight),parseInt(valBoxWidth));
    }
    var valPointsOfPyramid=(<HTMLInputElement>document.getElementById('pointsofpyramid')).value;
    var valPyramidHeight=(<HTMLInputElement>document.getElementById('heightofpyramid')).value;
    if(valPointsOfPyramid !=null && valPyramidHeight !='')
    {
        CreatePyramidCustom(parseInt(valPyramidHeight),parseInt(valPointsOfPyramid));
    }
    var valPointsOfPrism=(<HTMLInputElement>document.getElementById('pointsofprism')).value;
    var valPrismHeigth=(<HTMLInputElement>document.getElementById('heightofprism')).value;
    if(valPointsOfPrism !=null && valPrismHeigth !='')
    {
        if(valPointsOfPrism == '3'){
            CreatePrismCustom(parseInt(valPointsOfPrism)+2,parseInt(valPrismHeigth));
        }
        else{
            CreatePrismCustom(parseInt(valPointsOfPrism)+1,parseInt(valPrismHeigth));
        }
    }
    var valConeDiameter=(<HTMLInputElement>document.getElementById('diameterofcone')).value;
    var valConeHeight=(<HTMLInputElement>document.getElementById('heightofcone')).value;
    if(valConeDiameter !=null && valConeHeight !='')
    {
            CreateConeCustom(parseInt(valConeDiameter),parseInt(valConeHeight));
    }
    event.preventDefault()
   
    })
    var checkStatus= function(checkValue){
        var state= {height:false, width:false, edge:false, diameter:false, pointsofpyramid:false,heightofpyramid:false, pointsofprism:false, heightofprism:false,diameterofcone:false, heightofcone:false };
        Object.keys(state).forEach(function(k){
            Object.keys(checkValue).forEach(function(i){
            if(state[k]==true){
                return;
            }
            state[k]=(k==i)?true:false;
            });
        });
        Object.keys(state).forEach(function(k){
            if(state[k]==true)
            {
                (<HTMLInputElement>document.getElementById(k)).type='text';
            }
            else
            {
                (<HTMLInputElement>document.getElementById(k)).type='hidden';
            }
        });
    }

    $('#shape').on('change', function () {
        if (this.value == "hinh lap phuong") {
            CreateCubeDefault();
            var value = "Hình lập phương";
            document.getElementById("infoHeader").innerHTML=value;
            var boxinfo= {edge:false };
            checkStatus(boxinfo);
        }
            else if(this.value=="hinh cau"){
                CreateSphereDefault();
                var value="Hình cầu";
                document.getElementById("infoHeader").innerHTML=value;
                var sphereinfo={diameter:false};
                checkStatus(sphereinfo);
            }
            else if(this.value == "hinh hop chu nhat"){
                CreateBoxDefault();
                var value="Hình hộp chữ nhật";
                document.getElementById("infoHeader").innerHTML=value;
                var cubeinfo={height:false, width:false};
                checkStatus(cubeinfo);
            }
            else if(this.value == "hinh chop"){
                CreatePyramidDefault();
                var value="Hình chóp";
                document.getElementById("infoHeader").innerHTML=value;
                var pyramidinfo={pointsofpyramid:false,heightofpyramid:false};
                checkStatus(pyramidinfo);
            }
            else if(this.value == "hinh tru"){
                CreatePrismDefault();
                var value="Hình trụ";
                document.getElementById("infoHeader").innerHTML=value;
                var prisminfo={pointsofprism:false, heightofprism:false};
                checkStatus(prisminfo);
            }
            else if(this.value == "hinh non"){
                CreateConeDefault();
                var value="Hình nón";
                document.getElementById("infoHeader").innerHTML=value;
                var coneinfo={diameterofcone:false, heightofcone:false};
                checkStatus(coneinfo);
            }
    });


    function changeSystemMode(mode: string = 'line'||'multiLine'||'select'||'point'||'edit'){
        setIsStartCreateLine(true)
        setSysMode(mode);
    }
    $('#menus').on('change', function () {
        if (this.value == "point") {
            changeSystemMode('point');
        }
        else if (this.value == "single") {
            console.log('line')
            changeSystemMode('line')
        }
        else if (this.value == "multi") {
            triggerStartPoint();
            changeSystemMode('multiLine');
        }
        else if (this.value == "edit") {
            changeSystemMode('edit');
        }  
        else if (this.value == "select") {
            changeSystemMode('select');
        }
        
    });
}


