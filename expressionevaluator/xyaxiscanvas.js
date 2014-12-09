function drawCanvas(eq){
    /*se supone que debe pintar los ejes y definir los limites del grafico
    asi como tambien dibujar la funcion*/
    var xbound=-50;
    var ybound=-50;
    var centery=350;
    var centerx=350;
    var height= 700;
    var width= 700;
    var ctx=document.getElementsByTagName('canvas')[0].getContext('2d');
	ctx.fillStyle = '#EEEEEE';
	ctx.fillRect(0, 0, width, height);
    ctx.fillStyle ='#000000'
    ctx.fillRect(0,0,700,700);
    drawX();
    drawY();
    function drawX(){
        ctx.save();
        ctx.beginPath();
        ctx.strokeStyle = 'white';
        ctx.moveTo(0, centery);
        ctx.lineTo(width, centery);
        ctx.stroke();
        ctx.restore();
    }
   function drawY(){
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(centerx,0);
        ctx.lineTo(centerx, height);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
    }
    ctx.translate(centerx,centery);
    ctx.moveTo(0,0);
    drawEquation();
    function drawEquation(){
        var exp = new EvaluadorExpresionAlgebraica();
        var equation = eq;
        exp.Analizar(eq);
        ctx.strokeStyle= 'yellow';
        for(var i=-35;i<=35;i+=0.1){
             exp.DarValorVariable('x', i);
            var valor = exp.Evaluar();
            if(i==-35){
                ctx.moveTo(i*10,(-valor)*10);
            }
            ctx.lineTo(i*10,(-valor)*10);
            ctx.stroke();
        }
    }
}