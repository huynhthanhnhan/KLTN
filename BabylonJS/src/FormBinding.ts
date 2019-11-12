
import { hl, gizmoManager } from './Enviroment'

import { CreateBoxDefault } from './Objects/BoxObject'
import { CreateBoxCustom } from './Objects/BoxObject'
import { CreateCubeDefault } from './Objects/CubeObject'
import { CreateCubeCustom } from './Objects/CubeObject'
import { CreateSphereDefault } from './Objects/SphereObject'
import { CreateSphereCustom } from './Objects/SphereObject'
import { CreatePyramidDefault } from './Objects/PyramidObject'
import { CreateConeDefault } from './Objects/ConeObject'
import { CreatePrismDefault } from './Objects/PrismObject'
import $ from 'jquery'
import {triggerStartPoint, setSysMode, setStartPoint, setIsStartCreateLine} from './TempVariable'
import { setIsPickableBasicScene } from './BasicScreen'

export function formBinding() {
    const form = document.querySelector('form')
    form.addEventListener('submit', event => {
    // submit event detected
    var valCube=(<HTMLInputElement>document.getElementById('edge')).value;
    if(valCube !=null && valCube !='')
    {
        CreateCubeCustom(valCube);
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
        CreateBoxCustom(valBoxHeight,valBoxWidth);
    }
    var valPoints=(<HTMLInputElement>document.getElementById('points')).value;
    if(valPoints !=null && valPoints !='')
    {
        // Cre(valPoints);
    }
    event.preventDefault()
   
    })
    var checkStatus= function(checkValue){
        var state= {height:false, width:false, edge:false, diameter:false, points:false };
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
            }
            else if(this.value == "hinh tru"){
                CreatePrismDefault();
                var value="Hình trụ";
                document.getElementById("infoHeader").innerHTML=value;
            }
            else if(this.value == "hinh non"){
                CreateConeDefault();
                var value="Hình nón";
                document.getElementById("infoHeader").innerHTML=value;
            }
    });


    function changeSystemMode(mode: string = 'line'||'multiLine'||'select'||'point'||'edit'){
        setIsStartCreateLine(true)
        setSysMode(mode);
    }
    $('#menus').on('change', function () {
        if (this.value == "point") {
            changeSystemMode('point');
            setIsPickableBasicScene(true);
        }
        else if (this.value == "line") {
            // console.log('line')
            changeSystemMode('line')
            setIsPickableBasicScene(true);
        }
        else if (this.value == "multi") {
            triggerStartPoint();
            changeSystemMode('multiLine');
            setIsPickableBasicScene(true);
        }
        else if (this.value == "edit") {
            changeSystemMode('edit');
            setIsPickableBasicScene(false);
        }  
        else if (this.value == "select") {
            changeSystemMode('select');
            setIsPickableBasicScene(false);
        }
        else if(this.value == "intersect"){
            changeSystemMode('intersect');
            setIsPickableBasicScene(false);
        }
    });
}


