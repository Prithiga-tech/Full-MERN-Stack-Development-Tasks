function getNumbers(){

    var a=Number(document.getElementById("num1").value);
    var b=Number(document.getElementById("num2").value);

    return [a,b];
}

function add(){

    var numbers=getNumbers();

    document.getElementById("result").innerHTML="Answer = "+(numbers[0]+numbers[1]);

}

function subtract(){

    var numbers=getNumbers();

    document.getElementById("result").innerHTML="Answer = "+(numbers[0]-numbers[1]);

}

function multiply(){

    var numbers=getNumbers();

    document.getElementById("result").innerHTML="Answer = "+(numbers[0]*numbers[1]);

}

function divide(){

    var numbers=getNumbers();

    if(numbers[1]==0){

        document.getElementById("result").innerHTML="Cannot divide by zero";

    }

    else{

        document.getElementById("result").innerHTML="Answer = "+(numbers[0]/numbers[1]);

    }

}