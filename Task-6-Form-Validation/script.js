function validateForm(){

    var name=document.getElementById("name").value;
    var email=document.getElementById("email").value;
    var password=document.getElementById("password").value;

    if(name==""){
        alert("Enter your name");
        return false;
    }

    if(email==""){
        alert("Enter your email");
        return false;
    }

    if(email.indexOf("@")==-1){
        alert("Enter a valid email");
        return false;
    }

    if(password.length<6){
        alert("Password must contain at least 6 characters");
        return false;
    }

    alert("Registration Successful!");

    return true;

}