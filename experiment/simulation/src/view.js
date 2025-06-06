(function(){
  angular
       .module('users')
	   .directive("experiment",directiveFunction)
})();

var millikan_stage, exp_canvas, stage_width, stage_height;

var bgContainer,container,dropsContainer;

var buttonTxt,zoomMask;

var density,airDensity,oilDensities,viscocity,oilViscocity;

var dropDB,dropCurrentTime,appar_dropDB;

var zoom_drop_tween_1,zoom_drop_tween_2,zoom_drop_tween_3,zoom_drop_tween_4;

var appar_drop_tween_1,appar_drop_tween_2,appar_drop_tween_3,appar_drop_tween_4;

function directiveFunction(){
	return {
		restrict: "A",
		link: function(scope, element,attrs){
			/** Variable that decides if something should be drawn on mouse move */
			var experiment = true;
			if ( element[0].width > element[0].height ) {
				element[0].width = element[0].height;
				element[0].height = element[0].height;
			} else {
				element[0].width = element[0].width;
				element[0].height = element[0].width;
			}  
			if ( element[0].offsetWidth > element[0].offsetHeight ) {
				element[0].offsetWidth = element[0].offsetHeight;			
			} else {
				element[0].offsetWidth = element[0].offsetWidth;
				element[0].offsetHeight = element[0].offsetWidth;
			}
			 /** Array to store all file name of images used in experiment and it used to create each image objects */
            images_array = ['BG',"cross_section","xray",];
            exp_canvas=document.getElementById("demoCanvas");
			exp_canvas.width=element[0].width;
			exp_canvas.height=element[0].height;            
    		stage = new createjs.Stage("demoCanvas");
			queue = new createjs.LoadQueue(true);
			loadingProgress(queue, stage, exp_canvas.width);
			queue.on("complete", handleComplete, this);
			var queue_obj = [];/** Array to store object of each images */
            for ( i = 0; i < images_array.length; i++ ) {/** Creating object of each element */
                queue_obj[i] = {id: images_array[i],src: "././images/"+images_array[i]+".svg",type: createjs.LoadQueue.IMAGE};
            }
			queue.loadManifest(queue_obj);			
			stage.enableDOMEvents(true);
            stage.enableMouseOver();
            createjs.Touch.enable(stage);
            tick = setInterval(updateTimer, 100); /** Stage update function in a timer */
            bgContainer = new createjs.Container(); /** Creating the circular coil container */
            bgContainer.name = "bgContainer";
            stage.addChild(bgContainer); /** Append it in the stage */
            zoomMask = new createjs.Shape();
            zoomMask.graphics.setStrokeStyle(1).beginStroke("").drawCircle(548, 149, 126);
            
            container = new createjs.Container(); /** Main container of experiment */
            container.name = "container";
            stage.addChild(container); /** Append it in the stage */
            dropsContainer = new createjs.Container(); /** Main container of experiment */
            dropsContainer.name = "dropsContainer";
            dropMask = new createjs.Shape();
            dropMask.graphics.setStrokeStyle(1).beginStroke("").drawRect(211, 335, 230,65);
            dropsContainer.addChild(dropMask);
            
            line =  new createjs.Shape();
            line.graphics.setStrokeStyle(1).beginStroke("red").moveTo(549,52).lineTo(549,252 );
            
			function handleComplete(){
                initialisationOfVariables(); /** Initializing the variables */			
                loadImages(queue.getResult("BG"),"background",0,0,"",0,bgContainer,1);                     
                bgContainer.addChild(zoomMask);
                loadImages(queue.getResult("cross_section"),"cross_section",0,0,"",0,container,1);                    
                loadImages(queue.getResult("xray"),"xray",0,0,"",0,container,1);                    
				container.addChild(dropsContainer); /** Append it in the stage */
                for(i = 1; i < 100; i++){
                    var _radius = i % 10 == 0 ? 1.6 : 1;
                    dropFactory(215,340,_radius,'drop_'+i);
                }
                container.addChild(line);
                setText("distance",500, 520,_("Plate Distance(m) = 0.016"),"white",.8,bgContainer);
                translationLabels(); /** Translation of strings using gettext */
				initialisationOfControls(scope); /** Function call for initialisation of control side variables */
				initialisationOfImages(); /** Function call for images used in the apparatus visibility */
				createStopwatch(stage, 440, 520, 1); /** To load and generate stop watch */
                stage.update();
			}
            
			/** Add all the strings used for the language translation here. '_' is the short cut for calling the gettext function defined in the gettext-definition.js */	
			function translationLabels(){
                /** This help array shows the hints for this experiment */
				helpArray=[_("help1"),_("help2"),_("help3"),_("help4"),_("help5"),_("Next"),_("Close")];
                scope.heading=_("Millikan's Oil Drop Experiment");
				scope.variables=_("Variables");                 
				scope.result=_("Result");  
				scope.copyright=_("copyright");
                buttonTxt = [_("Start"),_("Reset"),_("Voltage On"),_("Voltage Off"), _("X Ray On"), _("X Ray Off")];
                scope.start_txt = buttonTxt[0];
                scope.oil_type_txt = _("Choose Oil Type");
                scope.voltageOnOff_txt = buttonTxt[2];
                scope.adjustVoltage_txt = _("Adjust Voltage(KV): ");
                scope.xRay_txt = buttonTxt[4];
                scope.reset_txt = buttonTxt[1];
                scope.voltApplied_txt = _("Voltage Applied (v)");
				scope.oilDensity_txt = _("Oil Density (kg/m");
                scope.oil_type = [{
                        oil:_("Olive Oil"),
                        index:0
                    },{
                        oil:_("Glycerin"),
                        index:1
                    }];
                scope.$apply();				
			}
		}
	}
}
function updateTimer() {
    stage.update();
}

/** All the texts loading and added to the stage */
function setText(name, textX, textY, value, color, fontSize, container){
    var text = new createjs.Text(value, "bold " + fontSize + "em Tahoma, Geneva, sans-serif", color);
    text.x = textX;
    text.y = textY;
    text.textBaseline = "alphabetic";
    text.name = name;
    text.text = value;
    text.color = color;
    container.addChild(text); /** Adding text to the container */
    stage.update();
}

/** All the images loading and added to the stage */
function loadImages(image, name, xPos, yPos, cursor, rot, container,scale){
    var _bitmap = new createjs.Bitmap(image).set({});
    if (name == 'grating_table' || name == 'vernier_table') {
       
        _bitmap.regX = _bitmap.image.width/2;
        _bitmap.regY = _bitmap.image.height/2;
             
    }
    _bitmap.x = xPos;
    _bitmap.y = yPos;
    _bitmap.scaleX=_bitmap.scaleY=scale;
    _bitmap.name = name;
    _bitmap.alpha = 1;
    _bitmap.rotation = rot;   
    _bitmap.cursor = cursor;    
    container.addChild(_bitmap); /** Adding bitmap to the container */ 
    stage.update();
}

/** function to return chiled element of container */
function getChild(chldName){
    return container.getChildByName(chldName);
}
/** function to return child element of dropContainer */
function getDrop(chldName){
    return dropsContainer.getChildByName(chldName);
}

function initialisationOfControls(scope){
    document.getElementById("site-sidenav").style.display = "block";
    scope.voltage = 0;
    scope.startExp = true;
    scope.voltageOnOff = true;
    scope.xRay = true;
    scope.btn_disabled = true;
    scope.voltage_disabled = true;
    scope.slider_disabled = true;
    scope.density_rslt = oilDensities[0];
}
/** All variables initialising in this function */
function initialisationOfVariables() {
   oilDensities = [920,1260]; /** Density value of olive oil and glycerin */
   density = oilDensities[0]; /** Density of olive oil assign to density variable */ 
   oilViscocity = [0.081,1.49]; /** Viscocity of olive oil and glycerin */
   viscocity = oilViscocity[0]; /** Viscocity of olive oil assign to density variable */ 
   airDensity = 1; /** Density of aire */
   dropDB = []; /** Array to store data related to each drop */
   appar_dropDB = []; /** Array to store data related to each drop in apparatus that move vertically */
   currentTime = 0;
}
/** Set the initial status of the bitmap and text depends on its visibility and initial values */
function initialisationOfImages() {
   stage.getChildByName("container").alpha = 0; /** To hide the cross section view of apparatus at initial state */
   getChild("xray").alpha = 0; /** To hide the x-ray at initial state */
}

function dropFactory(x,y,radius,name){
    drop = new createjs.Shape();
    drop.graphics.setStrokeStyle(1).beginStroke("").beginRadialGradientFill(["#f1d803","#863f2d"], [0, 1], x, y, (radius/7), x, y, radius).drawCircle(x, y, radius);
    drop.name = name;
    dropsContainer.addChild(drop);
    
}
function zoomDropFactory(name,rad){
    var radius = rad;//randomRadius();
    var x = Math.floor(Math.random() * 40) + 530;
    
    var y = 12; /** 52 - 40 */
    drop = new createjs.Shape();
    drop.graphics.setStrokeStyle(1).beginStroke("").beginRadialGradientFill(["#f1d803","#863f2d"], [0, 1], x, y, (radius/7), x, y, radius * 4).drawCircle(x, y, radius * 4);/** 0.01cm = 4px, so radius multiply by 4 */ 
    drop.name = name;
    drop.mask = zoomMask;
    bgContainer.addChild(drop);
    x = Math.floor(Math.random() * 30) + 315;
    y = 360;
    var radius_appara = radius / 4;
    drop_apparatus = new createjs.Shape();
    drop_apparatus.graphics.setStrokeStyle(1).beginStroke("").beginRadialGradientFill(["#f1d803","#863f2d"], [0, 1], x, y, (radius_appara/7), x, y, radius_appara * 4).drawCircle(x, y, radius_appara * 4);
    drop_apparatus.name = name + "_apparatus";
  //  drop_apparatus.mask = zoomMask;
    container.addChild(drop_apparatus);
    dropval = calculaion(radius/10000);
    appar_dropval = calculaion(radius/10000);
   
    dropval.name = name;
    appar_dropval.name = name + "_apparatus";
    dropDB[name] = dropval;
    appar_dropDB[name + "_apparatus"] = appar_dropval;
  
    
    /*createjs.Tween.get(container.getChildByName(name + "apparatus")).to({y:175},dropval.time * 11000).call(function(){
        container.removeChild(container.getChildByName(name + "apparatus"));
    });*/
    
}
/** Resetting the experiment */
function resetExperiment(scope){
    scope.oilType = 0;
    scope.voltage = 0;
    scope.voltageOnOff = true;
    scope.xRay = true;
    scope.btn_disabled = true;
    scope.voltage_disabled = true;
    scope.slider_disabled = true;
    scope.density_rslt = oilDensities[0];
    initialisationOfVariables();
    initialisationOfImages();
    createjs.Tween.removeAllTweens();
    bgContainer.removeChild(bgContainer.getChildByName("zoomDrop_1"));
    bgContainer.removeChild(bgContainer.getChildByName("zoomDrop_2"));
    bgContainer.removeChild(bgContainer.getChildByName("zoomDrop_3"));
    bgContainer.removeChild(bgContainer.getChildByName("zoomDrop_4"));
    container.removeChild(container.getChildByName("zoomDrop_1_apparatus"));
    container.removeChild(container.getChildByName("zoomDrop_2_apparatus"));
    container.removeChild(container.getChildByName("zoomDrop_3_apparatus"));
    container.removeChild(container.getChildByName("zoomDrop_4_apparatus"));
    //dropsContainer.removeAllChildren();
    
}
