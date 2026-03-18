//pull the inputs from the field
const form = document.getElementById("form");
const cnvWidth = document.getElementById("imageWidth");
const cnvHeight = document.getElementById("imageHeight");
const numColors = document.getElementById("numColors");
const submitButton = document.getElementById("submit");
const gap = document.getElementById("gap");

document.addEventListener("DOMContentLoaded", generateField);
numColors.addEventListener("change", generateField);
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
- JS iterates through and creates new input fields with color and number (for percentage)
- JS iterates through the new fields and adds the percentages together (error if not 100)
^ add a default value if percentage not specified. should be a base variable outside of function
*/

let inputArray =[];
function removeField(){
    console.log("Remove Field entered");
    let extraBreaks = document.getElementsByTagName("br");
    for (i = 0; i < inputArray.length; i++){
        let inputField = document.getElementById("" + (i + 1));
        form.removeChild(inputField);
        console.log("input removed")

        let label = document.getElementById("l" + (i + 1))
        form.removeChild(label);
        console.log("label removed");

        console.log(i);
    }
    
    for (j = 0; j < extraBreaks.length; j++){
          if (extraBreaks[j].class != "default"){
            form.removeChild(extraBreaks[j]);
          }  
    }
    inputArray = [];
}
function generateField(event){
    let numToMake = numColors.value;
    if (inputArray.length > 0){
        removeField();
    }
    for (i = 0; i < numToMake; i++){
        let input = document.createElement("input");
        input.type = "color";
        input.id = "" + (i + 1);
        console.log("Input ID:" + input.id);
        let label = document.createElement("label");
        label.for = input.id;
        label.id = "l" + (i + 1);
        label.innerHTML = "Color " + input.id;
        inputArray.push(i + 1);
        
        let br = document.createElement("br");

        form.insertBefore(label, gap);
        form.insertBefore(input, gap);
        form.insertBefore(br, gap);
    }
    console.log("Array Length:" + inputArray.length);
}

//creating the gradient using the existing canvas and the entered values 
function changeGradientColor(event){
    event.preventDefault();
    console.log("submitted");
    if (submitBool == true){
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    } 
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
    
    for (i = 0; i < inputArray.length; i++){
        let color = document.getElementById("" + (i+1));
        if (inputArray.length > 2){
            gradient.addColorStop(((i+1) / inputArray.length), color.value);
        }
        else{
            gradient.addColorStop(i, color.value);
        }
    }
    ctx.fillStyle = gradient; 
    
    ctx.fillRect(0, 0, width, height);
    
    checkSubmit(true);
}

//updates submit bool from the function call
function checkSubmit(bool){
    if (bool){ 
        submitBool = bool;
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