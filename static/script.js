
$.ajax();
var selection;
var game_data;
var currentState;
var next_state_current;
var directionArray=[];
var i=0;
var RT;
var possibleDirections;
jQuery.getJSON("/static/GameMap.json",function(data){
    game_data=data;
    currentState=data["start_state"]
    $('#game_text').html(game_data["states"][currentState]["text"])
})
function startGame(){
    toggle_obj("startUp")
    toggle_obj("controls")
    //toggle_obj("characterSetUp")
    //$('#character').html("Please enter the name of character #"+(i+1)+":");
}
function endCharacterCreation(){
    toggle_obj("characterSetUp")
    toggle_obj("controls")
    next_state("start")
}
function characterCreator(){
    if (i<3){
        characterCreation(i)
        i++;
        $('#character').html("Please enter the name of character #"+(i+1)+":");
    }else{
        endCharacterCreation()
    }
}
function characterCreation(i){
    if (game_data["characters"]["ID"]==i){
        game_data["characters"]["Name"]=document.getElementById("nameInput").value;
        console.log("Name: "+game_data["characters"]["Name"])
    }
}
function displayStats(idValue){
    if (game_data["characters"]["ID"]==idValue){
        for(value in game_data["characters"][idValue]["stats"]){
            $('#game_text').html(value);
        }
    }
}
//sets the next state
function next_state(state){
    console.log(state)
    currentState=state
    text=game_data["states"][currentState]["text"];
    $('#game_text').html(text);
}
//determines what key was pressed and runs next_state function to get the next state in the game.
function key_input(what_key){
    if (game_data["numberOfBossesBeaten"]==5){
        next_state(game_data["states"]["end"])
    }else{
        for (i=0; i<game_data["states"][currentState]["next_state"].length;i++){
            console.log("KeyPressed:"+what_key.id)
            console.log("CurrentState:"+currentState)
            console.log("NextState:"+game_data["states"][currentState]["next_state"][i]["state_name"])
            for(j=0;j<game_data["states"][currentState]["next_state"][i]["key_input"].length;j++){
                if (what_key.id==game_data["states"][currentState]["next_state"][i]["key_input"][j]){
                    next_state(game_data["states"][currentState]["next_state"][i]["state_name"])
                    break;
                }
            }
            if (currentState=="game_play"){
                game_play(what_key)
            }
        }
    }
}
function game_play(what_key){
    RT=setRoomType()
    console.log("RT:"+RT)
    generateRoom(RT)

}
function setDirectionsAvailable(number){
    if (number==null){
        totalWays=randomInt(4);
    }else{
        totalWays=number;
    }
    j=0;
    while(j<totalWays){
        i=0;
        while (i<directionArray.length){
            directionObj=randomInt(1,4);
            if (directionObj!=directionArray[i]){
                console.log("Directions"+game_data["directions"][directionObj])
                directionArray.append(game_data["directions"][directionObj]);
                j++;
                break;
            }
            i++;
        }
    }
    return directionArray;
}
function generateRoom(RT){
    console.log("GenRoom:"+RT)
    if (RT<6){
            var item=randomInt(5)
            console.log(PRD[item])
            console.log(RT+","+RD+","+PRD[item]["Description"])
            $('#game_text').html(PRD[item]["Description"])
            possibleDirections=setDirectionsAvailable()
            for(item in possibleDirections){
                console.log(game_data["directions"][item])
            }
    }else if (RT==6){
        bossFight()
        console.log("Boss Fight")
    }
}
//function gets a room type from the list of 6 types except for 
function setRoomType(){
    selection=randomInt(game_data["roomTypes"].length,3)
    if(game_data["currentDopamine"]<(game_data["numberOfBossesBeaten"]*20+20)){
        if (selection>=6){
            return setRoomType();
        }
            return selection;
    }else{
        return 6;
    }
}
//function calculates stimulus and dopamine calculator
function addRoomStimulusAndDope(roomType){
    game_data["currentStimulus"]+=game_data["roomTypes"][roomType]["stimulusChange"];
    game_data["currentDopamine"]+=game_data["roomTypes"][roomType]["dopamineChange"];
}
//Function Below is Built to Ensure that every playthrough is different.
function randomInt(i){
    return Math.floor(Math.random() * i)+1;
}
function randomInt(i,j){
    return Math.floor(Math.random() * (j-i))+i;
}
//Function Below toggles visibility by menu.
function toggle_obj(idValue){
    hidden=document.getElementById(idValue).hidden
    console.log(idValue+":"+hidden)
    if (hidden){
        document.getElementById(idValue).hidden=false;
    }else{
        document.getElementById(idValue).hidden=true;
    }
}






// needed for later
function shop(){
    for(item in game_data["shop_items"]){
        console.log();
    }
}
function fightControls(){
    toggle_obj("controls")
    toggle_obj("fight")
}
function attack(){
    game_data["characters"]
}
function bossFight(){
    bossID=game_data["bosses"][currentStimulus/20];
    if (bossID<=5){
        $('battle_text_1').html(game_data["bosses"][bossID-1]["Name"]+":"+game_data["bosses"][bossID-1]["Description"])
        $('battle_text_2').html("HP: "+game_data["bosses"][bossID-1]["CurrentHP"])
        $('battle_text_3').html("HP: "+game_data["bosses"][bossID-1]["CurrentMP"])
        return;
    }else{
        next_state(game_data["states"][currentState]["next_state"][1]["state_name"])
    }
}
function enemyFight(){
    startFight()
    
}
function startEnemyFight(){
    enemyId=game_data["enemyTypes"][floor(currentStimulus/20)]
    console.log(enemyId.id)
}
function startBossFight(){
    $('battle_text_1').html(game_data["bosses"][bossID-1]["Name"]+":"+game_data["bosses"][bossID-1]["Description"])
    $('battle_text_2').html("HP: "+game_data["bosses"][bossID-1]["CurrentHP"])
    $('battle_text_3').html("HP: "+game_data["bosses"][bossID-1]["CurrentMP"])
}