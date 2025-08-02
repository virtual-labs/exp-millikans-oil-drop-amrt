/** Controls and all functionalities of experiments defined here*/

function startExperiment(scope){
	scope.start_txt = scope.startExp ? buttonTxt[1] : buttonTxt[0];
	stage.getChildByName("container").alpha = scope.startExp ? 1 : 0;
	scope.btn_disabled = scope.voltage_disabled = scope.startExp ? false : true;
	if(scope.startExp){
		for(i = 1; i < 100; i++){
            dropsContainer.getChildByName('drop_'+i).x = 0;
            dropsContainer.getChildByName('drop_'+i).y = 0;
            dropsContainer.getChildByName('drop_'+i).alpha = 1;
        }
        for(i=1; i < 100; i++){
			dropStartAnimation('drop_'+i);
		}
		startWatch(stage);
		zoomDropFactory('zoomDrop_1',2.5);
		zoomDropFactory('zoomDrop_2',2);
		zoomDropFactory('zoomDrop_3',1);
		zoomDropFactory('zoomDrop_4',1.5);
		zoomAnimation(dropDB['zoomDrop_1']);
		zoomAnimation(dropDB['zoomDrop_2']);
		zoomAnimation(dropDB['zoomDrop_3']);
		zoomAnimation(dropDB['zoomDrop_4']);
		apparutusAnimation(appar_dropDB['zoomDrop_1_apparatus']);
		apparutusAnimation(appar_dropDB['zoomDrop_2_apparatus']);
		apparutusAnimation(appar_dropDB['zoomDrop_3_apparatus']);
		apparutusAnimation(appar_dropDB['zoomDrop_4_apparatus']);
	}else{
		resetWatch();
		resetExperiment(scope);
	}

	
	scope.startExp = !scope.startExp;
	stage.update();
}

function changeOil(scope){
	scope.density_rslt = density = oilDensities[scope.oilType]; /** To set the density of selected oil */ 
	viscocity = oilViscocity[scope.oilType]; /** To set the viscocity of olive oil assign to density variable */ 
	
}

function voltageOnOffFun(scope){
	scope.voltageOnOff_txt = scope.voltageOnOff ? buttonTxt[3] : buttonTxt[2];
	scope.slider_disabled = scope.voltageOnOff ? false : true;
	if(scope.voltageOnOff){
		pauseWatch();
	}
    scope.voltageOnOff = !scope.voltageOnOff;
    adjustVoltage(scope);
	stage.update();
}
var remainingPx;
var remainingTime;
var currentTime;
function adjustVoltage(scope){
	var _voltage;
	if(scope.xRayOn){
		_voltage = 11000;
	}else{
          if(!scope.voltageOnOff){
              _voltage = scope.voltage;
          }else{
              _voltage = 0;
          }
		
	}
	if(_voltage * 1000 < dropDB["zoomDrop_1"].voltage - 500){
		remainingPx = 280 - bgContainer.getChildByName("zoomDrop_1").y;
		remainingTime = (dropDB["zoomDrop_1"].time / 280 ) * remainingPx;
		currentTime = remainingTime + (_voltage * 18000);
		zoom_drop_tween_1 = createjs.Tween.get(bgContainer.getChildByName(dropDB["zoomDrop_1"].name), {override:true}).to({y:280},currentTime).call(function(){
	       	bgContainer.getChildByName("zoomDrop_1").y = 12;
	        zoomAnimation(dropDB["zoomDrop_1"]);
	    });
	}else if(_voltage * 1000 > dropDB["zoomDrop_1"].voltage + 500){
		remainingPx = bgContainer.getChildByName("zoomDrop_1").y - 12;
		remainingTime = (dropDB["zoomDrop_1"].time / 280 ) * remainingPx;
		
		
		var _time = remainingTime - ((_voltage * 9000)-currentTime);
		zoom_drop_tween_1 = createjs.Tween.get(bgContainer.getChildByName(dropDB["zoomDrop_1"].name), {override:true}).to({y:12},_time <= 0 ? 1500 :_time );
	}else{
		
		toggleTween(zoom_drop_tween_1);
	}

	if(_voltage * 1000 < dropDB["zoomDrop_2"].voltage - 500){
		remainingPx = 280 - bgContainer.getChildByName("zoomDrop_2").y;
		remainingTime = (dropDB["zoomDrop_2"].time / 280 ) * remainingPx;
		currentTime = remainingTime + (_voltage * 18000);
		zoom_drop_tween_2 = createjs.Tween.get(bgContainer.getChildByName(dropDB["zoomDrop_2"].name), {override:true}).to({y:280},currentTime).call(function(){
	       	bgContainer.getChildByName("zoomDrop_2").y = 12;
	        zoomAnimation(dropDB["zoomDrop_2"]);
	    });
	}else if(_voltage * 1000 > dropDB["zoomDrop_2"].voltage + 500){
		remainingPx = bgContainer.getChildByName("zoomDrop_2").y - 12;
		remainingTime = (dropDB["zoomDrop_2"].time / 280 ) * remainingPx;
		
		
		var _time = remainingTime - ((_voltage * 18000)-currentTime);
		zoom_drop_tween_2 = createjs.Tween.get(bgContainer.getChildByName(dropDB["zoomDrop_2"].name), {override:true}).to({y:12},_time <= 0 ? 1000 :_time );
	}else{
		
		toggleTween(zoom_drop_tween_2);
	}
	
	if(_voltage * 1000 < dropDB["zoomDrop_3"].voltage - 100){
		remainingPx = 280 - bgContainer.getChildByName("zoomDrop_3").y;
		remainingTime = (dropDB["zoomDrop_3"].time / 280 ) * remainingPx;
		currentTime = remainingTime + (_voltage * 21000);
		
		zoom_drop_tween_3 = createjs.Tween.get(bgContainer.getChildByName(dropDB["zoomDrop_3"].name), {override:true}).to({y:280},currentTime).call(function(){
	       	bgContainer.getChildByName("zoomDrop_3").y = 12;
	        zoomAnimation(dropDB["zoomDrop_3"]);
	    });
	}else if(_voltage * 1000 > dropDB["zoomDrop_3"].voltage + 100){
		remainingPx = bgContainer.getChildByName("zoomDrop_3").y - 12;
		remainingTime = (dropDB["zoomDrop_3"].time / 280 ) * remainingPx;
		
		
		var _time = remainingTime - ((_voltage * 21000)-currentTime);
		zoom_drop_tween_3 = createjs.Tween.get(bgContainer.getChildByName(dropDB["zoomDrop_3"].name), {override:true}).to({y:12},_time <= 0 ? 500 :_time );
	}else{
		
		toggleTween(zoom_drop_tween_3);
	}
	if(_voltage * 1000 < dropDB["zoomDrop_4"].voltage - 100){
		remainingPx = 280 - bgContainer.getChildByName("zoomDrop_4").y;
		remainingTime = (dropDB["zoomDrop_4"].time / 280 ) * remainingPx;
		currentTime = remainingTime + (_voltage * 19000);
		
		zoom_drop_tween_4 = createjs.Tween.get(bgContainer.getChildByName(dropDB["zoomDrop_4"].name), {override:true}).to({y:280},currentTime).call(function(){
	       	bgContainer.getChildByName("zoomDrop_4").y = 12;
	        zoomAnimation(dropDB["zoomDrop_4"]);
	    });
	}else if(_voltage * 1000 > dropDB["zoomDrop_4"].voltage + 100){
		remainingPx = bgContainer.getChildByName("zoomDrop_4").y - 12;
		remainingTime = (dropDB["zoomDrop_4"].time / 280 ) * remainingPx;
		
		
		var _time = remainingTime - ((_voltage * 19000)-currentTime);
		zoom_drop_tween_4 = createjs.Tween.get(bgContainer.getChildByName(dropDB["zoomDrop_4"].name), {override:true}).to({y:12},_time <= 0 ? 700 :_time );
	}else{
		
		toggleTween(zoom_drop_tween_4);
	}
	/*---------------------*/
	if(_voltage * 1000 < appar_dropDB["zoomDrop_1_apparatus"].voltage - 100){
		remainingPx = 280 - container.getChildByName("zoomDrop_1_apparatus").y;
		remainingTime = (appar_dropDB["zoomDrop_1_apparatus"].time / 280 ) * remainingPx;
		currentTime = remainingTime + (_voltage * 18000);
		
		appar_drop_tween_1 = createjs.Tween.get(container.getChildByName(appar_dropDB["zoomDrop_1_apparatus"].name), {override:true}).to({y:175},currentTime).call(function(){
	       	container.getChildByName("zoomDrop_1_apparatus").y = 0;
	        apparutusAnimation(appar_dropDB["zoomDrop_1_apparatus"]);
	    });
	}else if(_voltage * 1000 > appar_dropDB["zoomDrop_1_apparatus"].voltage + 100){
		remainingPx = container.getChildByName("zoomDrop_1_apparatus").y - 12;
		remainingTime = (appar_dropDB["zoomDrop_1_apparatus"].time / 280 ) * remainingPx;
		
		
		var _time = remainingTime - ((_voltage * 9000)-currentTime);
		appar_drop_tween_1 = createjs.Tween.get(container.getChildByName(appar_dropDB["zoomDrop_1_apparatus"].name), {override:true}).to({y:12},_time <= 0 ? 1500 :_time );
	}else{
		
		toggleTween(appar_drop_tween_1);
	}
	/*---------------------*/
	if(_voltage * 1000 < appar_dropDB["zoomDrop_2_apparatus"].voltage - 500){
		remainingPx = 280 - container.getChildByName("zoomDrop_2_apparatus").y;
		remainingTime = (appar_dropDB["zoomDrop_2_apparatus"].time / 280 ) * remainingPx;
		currentTime = remainingTime + (_voltage * 18000);
		appar_drop_tween_2 = createjs.Tween.get(container.getChildByName(appar_dropDB["zoomDrop_2_apparatus"].name), {override:true}).to({y:175},currentTime).call(function(){
	       	container.getChildByName("zoomDrop_2_apparatus").y = 0;
	        apparutusAnimation(appar_dropDB["zoomDrop_2_apparatus"]);
	    });
	}else if(_voltage * 1000 > appar_dropDB["zoomDrop_2_apparatus"].voltage + 500){
		remainingPx = container.getChildByName("zoomDrop_2_apparatus").y - 12;
		remainingTime = (appar_dropDB["zoomDrop_2_apparatus"].time / 280 ) * remainingPx;
		
		
		var _time = remainingTime - ((_voltage * 18000)-currentTime);
		appar_drop_tween_2 = createjs.Tween.get(container.getChildByName(appar_dropDB["zoomDrop_2_apparatus"].name), {override:true}).to({y:12},_time <= 0 ? 1000 :_time );
	}else{
		
		toggleTween(appar_drop_tween_2);
	}
	/*---------------------*/
	if(_voltage * 1000 < appar_dropDB["zoomDrop_3_apparatus"].voltage - 100){
		remainingPx = 280 - container.getChildByName("zoomDrop_3_apparatus").y;
		remainingTime = (appar_dropDB["zoomDrop_3_apparatus"].time / 280 ) * remainingPx;
		currentTime = remainingTime + (_voltage * 21000);
		appar_drop_tween_3 = createjs.Tween.get(container.getChildByName(appar_dropDB["zoomDrop_3_apparatus"].name), {override:true}).to({y:175},currentTime).call(function(){
	       	container.getChildByName("zoomDrop_3_apparatus").y = 0;
	        apparutusAnimation(appar_dropDB["zoomDrop_3_apparatus"]);
	    });
	}else if(_voltage * 1000 > appar_dropDB["zoomDrop_3_apparatus"].voltage + 100){
		remainingPx = container.getChildByName("zoomDrop_3_apparatus").y - 12;
		remainingTime = (appar_dropDB["zoomDrop_3_apparatus"].time / 280 ) * remainingPx;
		
		
		var _time = remainingTime - ((_voltage * 21000)-currentTime);
		appar_drop_tween_3 = createjs.Tween.get(container.getChildByName(appar_dropDB["zoomDrop_3_apparatus"].name), {override:true}).to({y:12},_time <= 0 ? 500 :_time );
	}else{
		
		toggleTween(appar_drop_tween_3);
	}
	/*---------------------*/
	if(_voltage * 1000 < appar_dropDB["zoomDrop_4_apparatus"].voltage - 100){
		remainingPx = 280 - container.getChildByName("zoomDrop_4_apparatus").y;
		remainingTime = (appar_dropDB["zoomDrop_4_apparatus"].time / 280 ) * remainingPx;
		currentTime = remainingTime + (_voltage * 19000);
		appar_drop_tween_4 = createjs.Tween.get(container.getChildByName(appar_dropDB["zoomDrop_4_apparatus"].name), {override:true}).to({y:175},currentTime).call(function(){
	       	container.getChildByName("zoomDrop_4_apparatus").y = 0;
	        apparutusAnimation(appar_dropDB["zoomDrop_4_apparatus"]);
	    });
	}else if(_voltage * 1000 > appar_dropDB["zoomDrop_4_apparatus"].voltage + 100){
		remainingPx = container.getChildByName("zoomDrop_4_apparatus").y - 12;
		remainingTime = (appar_dropDB["zoomDrop_4_apparatus"].time / 280 ) * remainingPx;
		
		
		var _time = remainingTime - ((_voltage * 19000)-currentTime);
		appar_drop_tween_4 = createjs.Tween.get(container.getChildByName(appar_dropDB["zoomDrop_4_apparatus"].name), {override:true}).to({y:12},_time <= 0 ? 700 :_time );
	}else{
		
		toggleTween(appar_drop_tween_4);
	}

}
function toggleTween(tween) {
	if (tween.paused) {
    	tween.paused = false;
        tween.setPaused(false);
    } else {
    	tween.paused = true;
        tween.setPaused(true);
    }
}
/** Function to on/off x-ray */
function onOffxRay(scope){
	scope.xRay_txt = scope.xRay ? buttonTxt[5] : buttonTxt[4];
	getChild("xray").alpha = scope.xRay ? 1 : 0;
	if(scope.xRay){
		resetWatch();
		startWatch(stage);
		scope.xRayOn = true;
		scope.voltage_disabled = true;
		scope.slider_disabled = true;
		adjustVoltage(scope);
	}else{
		pauseWatch();
		scope.xRayOn = false;
		scope.voltage_disabled = false;
		scope.slider_disabled = false;
		adjustVoltage(scope);
	}
	
	scope.xRay = !scope.xRay;
	stage.update();
}

function dropStartAnimation(dropName){
	
	createjs.Tween.get(getDrop(dropName)).to({
        x: Math.random() * 200,y:Math.random() * 20
    }, 500).call(dropAnimation,[dropName]);
	
	
}
var count = 0;
var cont = 0;
function dropAnimation(name){
	if(name == 'drop_99'){
		count++;
	}
	if(count < 10){
		for(i = (count * 10) - 9; i <= (count * 10); i++){
			//getDrop('drop_'+i).alpha = 0;
			createjs.Tween.get(getDrop('drop_'+i))
			.to({alpha:0},700);
		}
		var dropeTween = createjs.Tween.get(getDrop(name))
		.to({x: Math.random() * 200,y:Math.random() * 50}, 7500).call(dropAnimation,[name]);
		
	}else if(count == 10){
		if(name == 'drop_1'){
			
			for(i = 1; i < 100; i++){
	            getDrop('drop_'+i).x = 0;
	            getDrop('drop_'+i).y = 0;
	            getDrop('drop_'+i).alpha = 1;
	        }
	        count = 0;
	        for(i=1; i < 100; i++){
				dropStartAnimation('drop_'+i);
			}
		}

	}
	
}

function zoomAnimation(drop){
	//dropCurrentTime = drop.time;
    _tween = createjs.Tween.get(bgContainer.getChildByName(drop.name), {override:true}).wait(2500).to({y:280},drop.time).call(function(){
        //bgContainer.removeChild(bgContainer.getChildByName(name));
        bgContainer.getChildByName(drop.name).y = 12;
        bgContainer.getChildByName(drop.name).x = Math.floor(Math.random() * 40) - 30;
        
        zoomAnimation(drop);
    });
    if(drop.name == "zoomDrop_1"){
		zoom_drop_tween_1 = _tween;
	}else if(drop.name == "zoomDrop_2"){
		zoom_drop_tween_2 = _tween;
	}else if(drop.name == "zoomDrop_3"){
		zoom_drop_tween_3 = _tween;
	}else if(drop.name == "zoomDrop_4"){
		zoom_drop_tween_4 = _tween;
	}
}

function apparutusAnimation(drop){
	_tween = createjs.Tween.get(container.getChildByName(drop.name), {override:true}).to({y:175},drop.time).call(function(){
      
       container.getChildByName(drop.name).y = 0;
       apparutusAnimation(drop);
     });
    if(drop.name == "zoomDrop_1_apparatus"){
		appar_drop_tween_1 = _tween;
	}else if(drop.name == "zoomDrop_2_apparatus"){
		appar_drop_tween_2 = _tween;
	}else if(drop.name == "zoomDrop_3_apparatus"){
		appar_drop_tween_3 = _tween;
	}else if(drop.name == "zoomDrop_4_apparatus"){
		appar_drop_tween_4 = _tween;
	}
}

function randomRadius(){
	return 2;//Math.floor(Math.random() * 3) + 0.8;
}
const e = 1.6e-19;
function calculaion(radius){
	var _velocity = (radius * radius * 2 * 9.8 * (density - airDensity)) / (9 * viscocity);
	var _mass = 1.33 * 3.14 * Math.pow(radius,3) * (density - airDensity);
	var _time = 0.005 / _velocity;
	var extraTime = (_time / 10) * 4; /** Four extra unit time is added because of four extra unit distance added for drop adding and drop remove */
	_time = (_time + extraTime) * 1000; /** time in seconds */
	var e = 1.6 * Math.pow(10,-19);
	var _voltage = (_mass * 9.8 * 0.016) / (e * 10000000);

	dropValues = {time:_time,voltage:_voltage,radius:radius,realTime:(_time-extraTime)}
	return dropValues;
}