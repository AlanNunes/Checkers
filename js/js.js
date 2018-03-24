//Storage informations of player
var name;
var age;

//Storage events of player
var clicks = 0;
var id_OnDrop = 0;
var idImg;

//Who is playing
var playing = 1;
var canMove = true; //Gonna check if bot can move some piece

//Zero or 0 meaning that haven't piece on this position of board
//One or 1 meaning that have piece of bot on this position of board
//Two or 2 meaning that have piece of player on this position of board

var map = new Array(64);
  map = [
  0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0,
  0, 1, 0, 1, 0, 1, 0, 1,
  1, 0, 1, 0, 1, 0, 1, 0
];

function drawPieces(){
  for( var i = 0; i <= 63; i++ )
  {
    if( map[i] == 9 )
    {
      //Fill with pieces of bot
      document.getElementById(i).innerHTML = "<img src='WhitePiece.png' class='img' id=piece"+i+">";
    }else if ( map[i] == 8 ) {
      //Fill with pieces of player
      document.getElementById(i).innerHTML = "<img src='BlackPiece.png' class='img' draggable='true' ondragstart='drag(event)' id=piece"+i+">";
    }
  }

}

function drawMap(){
  var cont = 0, color ="branca";

  for( var i = 0; i <= 7; i++)
  {
    for( var j = 0; j <= 7; j++ )
    {
      document.getElementById("mesa").innerHTML += "<div class="+color+" id="+cont+" ondrag='getId(this.id)'  ondrop='drop(event, this.id)' ondragover='allowDrop(event)'></div>";

      if( color == "branca")
      {
        color = "preta";
      }else{
        color = "branca";
      }

      console.log(cont);
      cont++;
    }
    document.getElementById("mesa").innerHTML += "<br>";
    if( color == "branca")
    {
      color = "preta";
    }else{
      color = "branca";
    }
  }
}

function clearPieces(){
  for( var i = 0; i <= 64; i++)
  {
    if( map[i] == 1 ) {
      document.getElementById(i).innerHTML = "";
    }
  }
}

function startPosition(){
  drawMap();
  for( var i = 0; i <= 23 ; i++ )
  {
    if( map[i] == 1 )
    {
      map[i] = 9; //Filling the map with pieces of bot
    }
  }
  for( var i = 40; i <= 63 ; i++ )
  {
    if( map[i] == 1 )
    {
      map[i] = 8; //Filling the map with pieces of player
    }
  }

  //Drawing the pieces;
  drawPieces();
}

function checkFire(id){
  //Can fire more
  if( ( map[Number(id)-9] == 9 ) && ( map[Number(id)-18] == 1 ) ) //Up left
  {
    playing = 1;
    canFire = true;
  }else{
    if( ( map[Number(id)-7] == 9 ) && ( map[Number(id)-14] == 1 ) ) //Up right
    {
      playing = 1;
      canFire = true;
    }else{
      if( ( map[Number(id)+7] == 9 ) && ( map[Number(id)+14] == 1 ) ) //Down left
      {
        playing = 1;
        canFire = true;
      }else{
        if( ( map[Number(id)+9] == 9 ) && ( map[Number(id)+18] == 1 ) ) //Down right
        {
          playing = 1;
          canFire = true;
        }else{
          playing = 0;
          canFire = false;
          botCheckCanFire;
        }
      }
    }
  }
  console.log(map[Number(id)+7]);
  //Fire a piece

}

function movePiece(id){
  console.log(id);
}

function getId(id){
  id_OnDrop = id;
}

//Functions Drop end Drag
  function allowDrop(ev) {
    ev.preventDefault();
  }

  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
  }
  function drop(ev, id) {
    var i = id;

    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");

    if( playing == 1 ) {
      if ( (map[i] == 1) && ((id_OnDrop - id == 9) || (id_OnDrop - id == 7))) { //Up
        map[id_OnDrop] = 1;
        map[i] = 8;
        console.log(" mapa: " + map[id_OnDrop] + " j: " + id_OnDrop);
        ev.target.appendChild(document.getElementById(data));
        playing = 0;
        botCheckCanFire;
      }else{
        if ( (map[i] == 1) && ((id_OnDrop - id == 18) && (map[Number(id_OnDrop) - 9] == 9 ) )) { //Up left
          map[id_OnDrop] = 1;
          map[Number(id_OnDrop)-9] = 1;
          map[i] = 8;
          console.log(" mapa: " + map[id_OnDrop] + " j: " + id_OnDrop);
          ev.target.appendChild(document.getElementById(data));
          checkFire(id);
        }else{
          if ( (map[i] == 1) && ((id_OnDrop - id == 14) && (map[Number(id_OnDrop) - 7] == 9 ) )) { //Up right
            map[id_OnDrop] = 1;
            map[Number(id_OnDrop)-7] = 1;
            map[i] = 8;
            console.log(" mapa: " + map[id_OnDrop] + " j: " + id_OnDrop);
            ev.target.appendChild(document.getElementById(data));
            checkFire(id);
          }else{
            if ( (map[i] == 1) && ((id_OnDrop - id == -18) && (map[Number(id_OnDrop) + 9] == 9 ) )) { //Down right
              map[id_OnDrop] = 1;
              map[Number(id_OnDrop)+9] = 1;
              map[i] = 8;
              console.log(" mapa: " + map[id_OnDrop] + " j: " + id_OnDrop);
              ev.target.appendChild(document.getElementById(data));
              checkFire(id);
            }else{
              if ( (map[i] == 1) && ((id_OnDrop - id == -14) && (map[Number(id_OnDrop) + 7] == 9 ) )) { //Down left
                map[id_OnDrop] = 1;
                map[Number(id_OnDrop)+7] = 1;
                map[i] = 8;
                console.log(" mapa: " + map[id_OnDrop] + " j: " + id_OnDrop);
                ev.target.appendChild(document.getElementById(data));
                checkFire(id);
              }
            }
          }
        }
      }

    }
    botCheckCanFire;
    clearPieces();
    console.log(id);
  }
//Actions of Bot
//------------------------------------------------------------------------------

function botFirePiece(i, direction, time){

    if (direction == "downLeft") {
      document.getElementById(i).innerHTML = "";
      document.getElementById(i + 7).innerHTML = "";
      document.getElementById(i + 14).innerHTML = "<img src='WhitePiece.png' class='img' id=piece" + i + ">";
      map[i] = 1;
      map[i + 7] = 1;
      map[i + 14] = 9;
      playing = 1;
      canMove = false; //Don't fire more
    } else {
      if (direction == "downRight") {
        document.getElementById(i).innerHTML = "";
        document.getElementById(i + 9).innerHTML = "";
        document.getElementById(i + 18).innerHTML = "<img src='WhitePiece.png' class='img' id=piece" + i + ">";
        map[i] = 1;
        map[i + 9] = 1;
        map[i + 18] = 9;
        playing = 1;
        canMove = false; //Don't fire more
      } else {
        if (direction == "upLeft") {
          document.getElementById(i).innerHTML = "";
          document.getElementById(i - 9).innerHTML = "";
          document.getElementById(i - 18).innerHTML = "<img src='WhitePiece.png' class='img' id=piece" + i + ">";
          map[i] = 1;
          map[i - 9] = 1;
          map[i - 18] = 9;
          playing = 1;
          canMove = false; //Don't fire more
        } else {
          if (direction == "upRight") {
            document.getElementById(i).innerHTML = "";
            document.getElementById(i - 7).innerHTML = "";
            document.getElementById(i - 14).innerHTML = "<img src='WhitePiece.png' class='img' id=piece" + i + ">";
            map[i] = 1;
            map[i - 7] = 1;
            map[i - 14] = 9;
            playing = 1;
            canMove = false; //Don't fire more
          }
        }
      }
    }

}

var botCheckCanFire = setInterval(function botCheckCanFire(){ //Gonna check if can fire some piece
  if( playing == 0 ) //Bot is playing
  {
  for( var i = 0; i <= 63; i++ )
  {
    if( ( map[i] == 9 )) //Found some piece
    {
      if( ( map[i+7] == 8 ) && ( map[i+14] == 1 ) ) //Down left
      {
        botFirePiece(i, "downLeft");
      }else{
        if( ( map[i+9] == 8 ) && ( map[i+18] == 1 ) ) //Down right
        {
          botFirePiece(i, "downRight");
        }else{
          if( ( map[i-9] == 8 ) && ( map[i-18] == 1 ) ) //Up left
          {
            botFirePiece(i, "upLeft");
          }else{
            if( ( map[i-7] == 8 ) && ( map[i-14] == 1 ) ) //Up right
            {
              botFirePiece(i, "upRight");
            }else{ //Can't fire.

            }
          }
        }
      }
    }
  }
    if( playing == 0 ) {
      botCanMove();
    }
}
}, 1000);

function botCanMove(){
  var condition = true;
  var cont = 0;
  var piece = 0;
  console.log("HUMMMMMMMMMMMMMMM");
  do{
    piece = Math.floor(Math.random() * 64); //Generate a random piece to move


    if( map[piece] == 9 ) //Simple movement
    {
      var direction = Math.floor(Math.random() * 2);
      console.log("direction --->"+direction);
      if( direction == 0 ) //Left
      {

        if( (map[piece+7] == 1) && ( (map[piece+14] == 8) && map[piece+21] == 8 ) )
        {
          document.getElementById(piece).innerHTML = "";
          document.getElementById(piece+7).innerHTML = "<img src='WhitePiece.png' class='img' id=piece"+piece+">";
          map[piece] = 1
          map[piece+7] = 9;
          playing = 1;
          console.log("can down left-->"+piece);
          condition = false;
          break;
        }

        if( map[piece+7] == 1 ) //Down left
        {
          document.getElementById(piece).innerHTML = "";
          document.getElementById(piece+7).innerHTML = "<img src='WhitePiece.png' class='img' id=piece"+piece+">";
          map[piece] = 1
          map[piece+7] = 9;
          playing = 1;
          console.log("can down left-->"+piece);
          condition = false;
          break;
        }else {
          if (map[piece + 9] == 1) //Down right
          {
            document.getElementById(piece).innerHTML = "";
            document.getElementById(piece + 9).innerHTML = "<img src='WhitePiece.png' class='img' id=piece" + piece + ">";
            map[piece] = 1
            map[piece + 9] = 9;
            playing = 1;
            console.log("can down right-->" + piece);
            condition = false;
            break;
          }
        }
      }else{

        if( (map[piece+9] == 1) && ( (map[piece+18] == 8) && map[piece+27] == 8 ) )
        {
          document.getElementById(piece).innerHTML = "";
          document.getElementById(piece+9).innerHTML = "<img src='WhitePiece.png' class='img' id=piece"+piece+">";
          map[piece] = 1
          map[piece+9] = 9;
          playing = 1;
          console.log("can down right 1-->"+piece);
          condition = false;
          break;
        }


        if( map[piece+9] == 1 ) //Down left
        {
          document.getElementById(piece).innerHTML = "";
          document.getElementById(piece+9).innerHTML = "<img src='WhitePiece.png' class='img' id=piece"+piece+">";
          map[piece] = 1
          map[piece+9] = 9;
          playing = 1;
          console.log("can down right 2-->"+piece);
          condition = false;
          break;
        }else {
          if (map[piece + 7] == 1) //Down right
          {
            document.getElementById(piece).innerHTML = "";
            document.getElementById(piece + 7).innerHTML = "<img src='WhitePiece.png' class='img' id=piece" + piece + ">";
            map[piece] = 1
            map[piece + 7] = 9;
            playing = 1;
            console.log("can down right 3-->" + piece);
            condition = false;
            break;
          }
        }
      }

    }//End Simple Movement
  }while( condition );
}