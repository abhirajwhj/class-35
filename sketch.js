var ball;
var database;
var ballPos;
function setup(){
    createCanvas(500,500);
    database=firebase.database();
    console.log("connective to database");
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";
    ballPos=database.ref("ball/pos");
    ballPos.on("value",readPos,showError)
}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(offsetx,offsety){
    console.log("changePos");
    database.ref("ball/pos").set({
    x:ball.x+offsetx,
    y:ball.y+offsety  
    });
}
function readPos(data){
    console.log("readPos"+data.val());
    var pos=data.val();
    ball.x=pos.x;
    ball.y=pos.y;
}
function showError(){
    console.log("error in reading data");
}
