var XValue = parseFloat(prompt("valor de X"))
var YValue = parseFloat(prompt("valor de Y"))
var HSteps = parseFloat(prompt("val(or del paso"))
var Button = document.getElementById("button")

document.getElementById("number3").innerHTML = "Step = " +HSteps
document.getElementById("number1").innerHTML = "Intervalo {"+XValue+","+YValue+"}"
document.getElementById("number2").innerHTML = " Punto de valor inicial [Y{0} = 1]" 





// var XValue = parseFloat(document.getElementById("number1").value)
// var YValue = parseFloat(document.getElementById("number2").value)
// var HSteps = parseFloat(document.getElementById("number3").value)
// var Button = document.getElementById("button")

var X = []
var Y = []
var analiticalY = []
var Err = []
var dtaa= []


var morris = new Morris.Line({
            
    // ID of the element in which to draw the chart.
    element: 'myfirstchart',
    // Chart data records -- each entry in this array corresponds to a point on
    // the chart.
    data: [],
    // The name of the data record attribute that contains x-values.
    xkey: 'EjeX',
    // A list of names of data record attributes that contain y-values.
    ykeys: ['value','value2'],
    // Labels for the ykeys -- will be displayed when you hover over the
    // chart.
    labels: ['Numerical solution', 'Analitical solution'],
    resize: true
  })




class M_Euler {
    
    constructor(Down, up, h){ 
        this.Down = Down
        this.up = up
        this.h = h
            
    }   
    
    Main(){ 
        this.GetX()       
        this.GetY()
        this.AnaliticResult()        
        this.Display()
        this.charts() 
    }
    fi(x){       
      return  this.OriginalEquation(x)
    }

    OriginalEquation(x){ 
       let ResultOriginal =-(Math.exp(3*x))
       Y.push(ResultOriginal)
        return ResultOriginal
    }

    AnaliticResult(){  
        for (let i = 0; i < X.length; i++) {
            let RAnaliticalY = ((-1/3)*Math.exp(3*X[i]))+(4/3)
            analiticalY[i] = this.RoundNumber(RAnaliticalY) 
            this.LocalError(analiticalY[i], Y[i])          
        }      
    }

    GetY(){
        Y[0] = this.up
        for (let i = 0; i < X.length; i++) {
            Y[i+1] = this.RoundNumber((Y[i]+ (this.fi(X[i])*this.h)))
                     
        }
    }

    GetX(){  
        this.Htotal = (this.up-this.Down)/this.h             
         var sumX = this.Down
         console.log(sumX)
         X[0] = sumX         
         for (let i = 1; i <= this.Htotal; i++) {         
         sumX = (sumX + this.h)
         X[i] = this.RoundNumber(sumX)             
        }    
    
    }

    Display(){
            console.log(` Steps ${this.h} |  Experimental Ye  |       Analitical Yt     | Percentage Error`)
            document.write(` Steps ${this.h}   |    Experimental Ye  |         Analitical Yt        |      Percentage Error %` +"<br>")
        for (let i = 0; i < X.length; i++) {            
            console.log(` X = ${X[i]} | Ye = ${Y[i]} | Yt = ${ analiticalY[i]} | Err = ${Err[i]}% `)
            document.write(` X = ${X[i]} | Ye = ${Y[i]} | Yt = ${ analiticalY[i]} | Err = ${Err[i]}%`+"<br>") 
        }       
    }

    LocalError(Yt, Ye){
        var error = this.RoundNumber(((Yt-Ye)/Yt)*100)
         Err.push(error)
    }

    RoundNumber(num){        
        return Math.round(num*1000)/1000;           
    }

    CargaData(){
        
        for (let i = 0; i < X.length; i++) {             
             dtaa[i] = { EjeX: X[i], value: Y[i], value2: analiticalY[i] }           
        }

        // establecer nueva data a la grafica morris
        morris.setData(dtaa)      

        //convertir array a JSON
        // var dta = JSON.stringify(dtaa)

        //almacenar JSON en localStorage
        // localStorage.setItem("testJSON", dta)
    } 

    charts(){
        this.CargaData() 
    } 
}    



    var Total = new M_Euler( XValue, YValue, HSteps)   
    Total.Main();




//obtener el JSON del local Storage
//var NData =  localStorage.getItem("testJSON")

//Convertir de JSON a array
//var JSONArray = JSON.parse(NData)

//console.log(NData)





