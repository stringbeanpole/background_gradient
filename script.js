//pull the inputs from the field
const form = document.getElementById("form");
const colorStart = document.getElementById("colorStart");
const colorEnd = document.getElementById("colorEnd");
const cnvWidth = document.getElementById("imageWidth");
const cnvHeight = document.getElementById("imageHeight");

form.addEventListener("submit", changeGradientColor);

//this variable checks if the form has already been submitted
let submitBool = false;

//used later for the download name
let timestamp = new Date();

//create the canvas
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

//create new function
/*TO DO:
- New drop down field on the website for # of colors
- New drop down for direction of gradient
- JS iterates through and creates new input fields with color and number (for percentage)
- JS iterates through the new fields and adds the percentages together (error if not 100)
- JS iterates through all the fields and adds the color stops to create the gradient
*/

//creating the gradient using the existing canvas and the entered values 
function changeGradientColor(event){
    event.preventDefault();
    console.log("submitted");
    if (submitBool == true){
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } 

    let color1 = colorStart.value;
    let color2 = colorEnd.value;
    console.log(color1);
    console.log(color2);

    let width = cnvWidth.value;
    let height = cnvHeight.value;
    
    

    if (!width){
        width = 480;
        cnvWidth.value = width;
    }
    if (!height){
        height = 240;
        cnvHeight.value = height;
    }
    
    canvas.width = width;
    canvas.height = height;

    console.log(width);
    console.log(height);

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;

    ctx.fillRect(0,0,width, height);

    checkSubmit(true);
}

//updates submit bool from the function call
function checkSubmit(bool){
    if (bool){ 
        submitBool = true;
        console.log(submitBool);
    }
}

//download button linking
const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", downloadCanvas);

//create a download link of the canvas on button press
function downloadCanvas(event){ 
    console.log("download func entered"); 
    let link = document.createElement("a");
    link.href = canvas.toDataURL(); //converts the canvas to an image
    link.download = `${canvas.width}x${canvas.height}_gradient_${timestamp.getFullYear()}_${timestamp.getMonth() + 1}-${timestamp.getDate()}_${timestamp.getHours()}-${timestamp.getMinutes()}`;
    link.click();
}