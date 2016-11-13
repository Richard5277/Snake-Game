$(document).ready(function () {

    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var canvasWidth = $("#canvas").width();
    var canvasHeight = $("#canvas").height();

    var snakeCellWidth = 10;
    var direction;
    var snake;
    var score;

    $("#canvas").on('click',function(){
        drawSnake();
    });

    $(document).keydown(function(e){
        var key = e.which;
        if(key == "37" && direction != "right") direction = "left";
        else if(key == "38" && direction != "down") direction = "up";
        else if(key == "39" && direction != "left") direction = "right";
        else if(key == "40" && direction != "up") direction = "down";
    });

    function gameInit(){
        direction = "right";
        createSnake();
        score = 0;

        // if(typeof game_loop != "undefined") clearInterval(game_loop);
        // game_loop = setInterval(drawSnake, 160);
        drawSnake();
    }

    function createSnake(){
        var length = 5;
        snake = [];
        for(var i = length-1; i>=0; i--){
            snake.push({x: i, y:0});
        }
    }

    // function drawSnake(){
    //
    //     var headX = snake[0].x;
    //     var headY = snake[0].y;
    //
    //     if(direction == "right") headX++;
    //     else if(direction == "left") headX--;
    //     else if(direction == "up") headY--;
    //     else if(direction == "down") headY++;
    //
    //     if(headX == -1 || headX == canvasWidth/snakeCellWidth || headY == -1 || headY == canvasHeight/snakeCellWidth){
    //         gameInit();
    //         return;
    //     }else {
    //         var tail = snake.pop();
    //         tail.x = headX;
    //         tail.y = headY;
    //         snake.unshift(tail);
    //     }
    //
    //     for(var i = 0; i < snake.length; i++) {
    //         var newSnake = snake[i];
    //         drawSnakeCell(newSnake.x, newSnake.y);
    //     }
    //
    // }

    function drawSnake(){

        var nx = snake[0].x;
        var ny = snake[0].y;
        //These were the position of the head cell.
        //We will increment it to get the new head position
        //Lets add proper direction based movement now
        if(direction == "right") nx++;
        else if(direction == "left") nx--;
        else if(direction == "up") ny--;
        else if(direction == "down") ny++;

        //Lets add the game over clauses now
        //This will restart the game if the snake hits the wall
        //Lets add the code for body collision
        //Now if the head of the snake bumps into its body, the game will restart
        if(nx == -1 || nx == canvasWidth/snakeCellWidth || ny == -1 || ny == canvasHeight/snakeCellWidth )
        {
            //restart game
            gameInit();
            //Lets organize the code a bit now.
            return;
        }

        //Lets write the code to make the snake eat the food
        //The logic is simple
        //If the new head position matches with that of the food,
        //Create a new head instead of moving the tail


        var tail = snake.pop(); //pops out the last cell
        tail.x = nx; tail.y = ny;

        //The snake can now eat the food.

        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++)
        {
            var c = snake[i];
            //Lets paint 10px wide cells
            drawSnakeCell(c.x, c.y);
        }

        // //Lets paint the food
        // paint_cell(food.x, food.y);
        // //Lets paint the score
        // var score_text = "Score: " + score;
        // ctx.fillText(score_text, 5, h-5);
    }

    function drawSnakeCell(x, y){
        ctx.fillStyle = "#21CEFF";
        ctx.fillRect(x*snakeCellWidth, y*snakeCellWidth, snakeCellWidth, snakeCellWidth);
        ctx.strokeStyle = "#FFFB0E";
        ctx.strokeRect(x*snakeCellWidth, y*snakeCellWidth, snakeCellWidth, snakeCellWidth);
    }

    gameInit();
});