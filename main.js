var canvas = document.getElementById("c");
canvas.width = screen.width - 100;
canvas.height = screen.height - 300;

var ctx = canvas.getContext("2d"), lastEC=false, lpx, lpy, color, needToDraw = false, cpx, cpy;

var my_mousedown = function(e){
    lastEC = true;
    lpx = e.clientX - canvas.offsetLeft;
    lpy = e.clientY - canvas.offsetTop;
    color = document.getElementById("colorI").value;
}
var my_mouseup = function(){
    lastEC = false;
    if(needToDraw){
        switch(document.getElementById("dr").value){
            case "rect":
                ctx.beginPath();
                ctx.strokeRect(lpx, lpy, cpx-lpx, cpy-lpy);
                ctx.stroke();
                break;
            case "fillRect":
                ctx.beginPath();
                ctx.fillRect(lpx, lpy, cpx-lpx, cpy-lpy);
                ctx.stroke();
                break;
            case "circ":
                ctx.beginPath();
                ctx.ellipse(lpx, lpy, cpx-lpx, cpy-lpy, 0, 0, 2*Math.PI);
                ctx.stroke();
                break;
            case "fillCirc":
                ctx.beginPath();
                ctx.ellipse(lpx+(cpx/2), lpy+(cpy/2), cpx-lpx, cpy-lpy, 0, 0, 2*Math.PI);
                ctx.fill();
                break;
            default:
                console.log("up error");
                break;
        }
    }
}
var my_mouseleave = function(){
    lastEC = false;
}
var my_mousemove = function(e){
    cpx = e.clientX - canvas.offsetLeft;
    cpy = e.clientY - canvas.offsetTop;
    if(lastEC){
        switch(document.getElementById("dr").value){
            case "brush":
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                ctx.moveTo(lpx, lpy);
                ctx.lineTo(cpx, cpy);
                ctx.stroke();
                lpx = cpx;
                lpy = cpy;
                break;
            case "rect":
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.lineWidth = 3;
                needToDraw = true;
                ctx.stroke();
                break;
            case "fillRect":
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.lineWidth = 3;
                needToDraw = true;
                ctx.stroke();
                break;
            case "circ":
                ctx.beginPath();
                ctx.strokeStyle = color;
                ctx.fillStyle = "rgba(0, 0, 0, 1)"
                ctx.lineWidth = 3;
                needToDraw = true;
                ctx.stroke();
                break;
            case "fillCirc":
                ctx.beginPath();
                ctx.fillStyle = color;
                ctx.lineWidth = 3;
                needToDraw = true;
                ctx.stroke();
                break;
            default:
                console.log("error");
                break;
        }
    }
}

canvas.addEventListener("mousedown", my_mousedown);
canvas.addEventListener("mouseup", my_mouseup);
canvas.addEventListener("mouseleave", my_mouseleave);
canvas.addEventListener("mousemove", my_mousemove);