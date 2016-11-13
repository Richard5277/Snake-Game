$(document).ready(function(){
    //Canvas stuff
    var canvas = $("#canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $("#canvas").width();
    var h = $("#canvas").height();

    //Lets save the cell width in a variable for easy control
    var snakeCellWidth = 10;
    var direction;
    var food;
    var score;

    //Lets create the snake now
    var snake; //an array of cells to make up the snake

    function init()
    {
        direction = "right"; //default direction
        create_snake();
        create_food(); //Now we can see the food particle
        //finally lets display the score
        score = 0;

        //Lets move the snake now using a timer which will trigger the paint function
        //every 60ms
        // if(typeof game_loop != "undefined") clearInterval(game_loop);
        // game_loop = setInterval(paint, 60);
        paint();
    }
    init();

    function create_snake()
    {
        var length = 5; //Length of the snake
        snake = []; //Empty array to start with
        for(var i = length-1; i>=0; i--)
        {
            //This will create a horizontal snake starting from the top left
            snake.push({x: i, y:0});
        }
        console.log(snake);
    }

    //Lets create the food now
    function create_food()
    {
        food = {
            x: Math.round(Math.random()*(w-snakeCellWidth)/snakeCellWidth),
            y: Math.round(Math.random()*(h-snakeCellWidth)/snakeCellWidth),
        };
        //This will create a cell with x/y between 0-44
        //Because there are 45(450/10) positions accross the rows and columns
    }

    //Lets paint the snake now
    function paint()
    {
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
        if(nx == -1 || nx == w/snakeCellWidth || ny == -1 || ny == h/snakeCellWidth || check_collision(nx, ny, snake))
        {
            //restart game
            init();
            //Lets organize the code a bit now.
            return;
        }

        //Lets write the code to make the snake eat the food
        //The logic is simple
        //If the new head position matches with that of the food,
        //Create a new head instead of moving the tail
        if(nx == food.x && ny == food.y)
        {
            var tail = {x: nx, y: ny};
            score++;
            //Create new food
            create_food();
        }
        else
        {
            var tail = snake.pop(); //pops out the last cell
            tail.x = nx; tail.y = ny;
        }
        //The snake can now eat the food.

        snake.unshift(tail); //puts back the tail as the first cell

        for(var i = 0; i < snake.length; i++)
        {
            var c = snake[i];
            //Lets paint 10px wide cells
            paint_cell(c.x, c.y);
        }

        //Lets paint the food
        paint_cell(food.x, food.y);
        //Lets paint the score
        var score_text = "Score: " + score;
        ctx.fillText(score_text, 5, h-5);
    }

    //Lets first create a generic function to paint cells
    function paint_cell(x, y)
    {
        ctx.fillStyle = "#FFFB0E";
        ctx.fillRect(x*snakeCellWidth, y*snakeCellWidth, snakeCellWidth, snakeCellWidth);
        ctx.strokeStyle = "#21CEFF";
        ctx.strokeRect(x*snakeCellWidth, y*snakeCellWidth, snakeCellWidth, snakeCellWidth);
    }

    function check_collision(x, y, array)
    {
        //This function will check if the provided x/y coordinates exist
        //in an array of cells or not
        for(var i = 0; i < array.length; i++)
        {
            if(array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    //Lets add the keyboard controls now
    $(document).keydown(function(e){
        var key = e.which;
        //We will add another clause to prevent reverse gear
        if(key == "37" && direction != "right") direction = "left";
        else if(key == "38" && direction != "down") direction = "up";
        else if(key == "39" && direction != "left") direction = "right";
        else if(key == "40" && direction != "up") direction = "down";
        //The snake is now keyboard controllable
    })
    
})