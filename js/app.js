//Variables definidas
var intervalo
var x
var y
var idx
var anc
var alt
var pos
var move
var cantidad=1
var score=0
var eliminados
//Funcion para animar el color de Match Game en Rojo
function color1(titulo){
	$(titulo).animate(
	{
		color: "red"
	},1000,function(){
		color2(titulo)
	}
	)
}
//Funcion para animar el color de Match Game en Amarillo	
function color2(titulo){
	$(titulo).animate(
	{
		color: "yellow"
	},1000,function(){
		color1(titulo)
	}
	)
}

//funcion que realiza la cuenta hacia atras
function cronometro(minutos){
        var min = minutos;
        var seg=0;
		$("#timer").text("0"+min+":0"+seg)
		clearInterval(intervalo)
            intervalo = setInterval(function(){
			
					   
            if(seg == 0&&min==0){
                clearInterval(intervalo)
				reinicio()

            }else if (seg == 0) {
                seg=59
                min=parseInt(min)-1 
            } else{
              seg=parseInt(seg)-1;
            }
				if(min<10){
					min="0"+parseInt(min)
				}
				if(seg<10){
					seg="0"+parseInt(seg)
				}
			  $("#timer").text(min+":"+seg)
          }, 1000);
        
}

//funcion que reinicia el juego, cuando se agota el tiempo
function reinicio(){
	$(".panel-tablero").hide(1000,"linear")
	$(".time").hide(1000,"linear")
	$(".score,.moves").animate(
		{
		marginLeft: "-=66vw",
		width: "90vw"
		},1000,"linear",function(){
			$(".score").css("marginLeft","0")
			$(".moves").css("marginLeft","0")
		}
	)

	$(".buttons").animate(
		{
		marginLeft: "-=33vw",
		},1000,"linear",function(){
			$(".buttons").css("marginLeft","33vw")
	})
}

//funcion que activa el movimiento de los dulces.
function movimiento(){
	$("[id^='dulce']").draggable({
		containment:".panel-tablero",revert:true, scroll:false, grid:[anc,alt],start: function(event,ui){
		$(this).css("z-index","5")
		x=$(this).attr("src")
		idx=$(this).attr("id")
		pos=parseInt($(this).attr("id")[5]+$(this).attr("id")[6])
		$("#dulce"+(pos+1)).addClass("contenedor")
		$("#dulce"+(pos-1)).addClass("contenedor")
		$("#dulce"+(pos+10)).addClass("contenedor")
		$("#dulce"+(pos-10)).addClass("contenedor")
			
		$("[id^='dulce']").droppable({
			drop: function(event,ui){
				if($(this).hasClass("contenedor")){
					y=$(this).attr("src")
					idy=$(this).attr("id")
					$("#"+idx).attr("src",y)
					$(this).attr("src",x)
					$("#"+idy).css("z-index","0")
					move=move+1
					$("#movimientos-text").text(move)
				}
				$("[id^='dulce']").removeClass("contenedor")
				}
			})	
		}, stop:function(){
			checar()
		
		}
	})

		
}

//funcion que determina la altura y ancho de movimiento
function ancho(){
	anc=parseInt($(".col-1").css("width"))
	alt=parseInt($("#dulce11").css("height"))
	movimiento()
}

//funcion que verifica si hay 3 o mas dulces consecutivos
function checar(){
setTimeout(function(){
	for(var i=1;i<8;i++){
		for(var j=10;j<80;j=j+10){
			var d=j+i
			var des=$("#dulce"+d).attr("src")
			$("#dulce"+d).addClass("revision")	
			for(d=d+10; d<78;d=d+10){
				if(des==$("#dulce"+d).attr("src")){
					$("#dulce"+d).addClass("revision")
					cantidad=cantidad+1
					if(d>70&&cantidad>2){
						$(".revision").addClass("eli")
						$(".revision").removeClass("revision")
						cantidad=1
						break
					}
				}else{
						if(cantidad>2){
						$(".revision").addClass("eli")
						$(".revision").removeClass("revision")
					}else{
						$(".revision").removeClass("revision")
					}
					cantidad=1
					break
				}
				
				}
			cantidad=1
			$(".revision").removeClass("revision")
		}
	}
},0)
	
setTimeout(function(){
	for(var i=1;i<8;i++){
		for(var j=10;j<80;j=j+10){
			var d=j+i
			var des=$("#dulce"+d).attr("src")
			var cam=d
			$("#dulce"+d).addClass("revision")
			for(d=d+1; d<cam+10;d=d+1){

				if(des==$("#dulce"+d).attr("src")){
					$("#dulce"+d).addClass("revision")
					cantidad=cantidad+1
					if(d>cam+6&&cantidad>2){
						$(".revision").addClass("eli")
						$(".revision").removeClass("revision")
						cantidad=1
						break
					}
				}else{
						if(cantidad>2){
						$(".revision").addClass("eli")
						$(".revision").removeClass("revision")
					}else{
						$(".revision").removeClass("revision")
					}
					cantidad=1
					break
				}
				
				}
			cantidad=1
			$(".revision").removeClass("revision")
		}
	}
},10)
	setTimeout(function(){
		eliminados=$(".eli").length
	    score=(eliminados*10)*$(".eli").length+score
		$("#score-text").text(score)
	
		$(".eli").animate({
			opacity:"0.1"
		},200,"linear")
		$(".eli").animate({
			opacity:"1.0"
		},200,"linear")
		$(".eli").animate({
			opacity:"0.1"
		},200,"linear")
		$(".eli").animate({
			opacity:"1.0"
		},200,"linear")
	},20)
	setTimeout(function(){
		$(".eli").hide("200","linear",function(){
			$(".eli").remove()
			
				for(var i=1;i<8;i++){
				var hijos=$(".col-"+i)[0].childElementCount
				if(hijos<7){
					dulce=Math.floor(Math.random()*4+1)
					if(hijos==0){
						
						$(".col-"+i).append("<img src='image/"+dulce+".png' height='14%'> ")
					}else{
						
						$(".col-"+i+" img:first-child").before("<img src='image/"+dulce+".png' height='14%'> ")
					}
				}
			}
			console.log(hijos)
			
				for(var i=1;i<8;i++){
					for(var j=1;j<8;j++){
						dulce=Math.floor(Math.random()*4+1)
						$(".col-"+j+" img:nth-of-type("+(i)+")").attr("id","dulce"+j+i)
					}			
				}
		})
	},850)
	setTimeout(function(){	
		if(eliminados>0){
			checar()
		}else{
			movimiento()
		}
	},1300)
}
//funcio para agregar dulces nuevos
function agregarDulces(){
	for(var i=1;i<8;i++){
		for(var j=1;j<8;j++){
			dulce=Math.floor(Math.random()*4+1)
			$(".col-"+j).append("<img src='image/"+dulce+".png' id='dulce"+j+i+"' height='14%'> ")
		}
	}
}

$(document).ready(function(){
	color1($(".main-titulo"))
	$(".btn-reinicio").click(function(){
		move=0
		score=0
		$("#score-text").text(score)
		$("#movimientos-text").text(move)
		$(".btn-reinicio").text("Reiniciar")
		$(".panel-tablero").show(100,"linear")
		$(".score,.moves").css("width","100%")
		$(".time,.score,.move").show(0)
		$(".buttons").css("marginLeft","0px")
		$("[id^='dulce']").remove()
		agregarDulces()
		ancho()
		checar()
		cronometro(2)
	})
	$(window).resize(function(){
		ancho()
	})
})