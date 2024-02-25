var objects = []

function preload(){
    dog = loadImage("dog_cat.jpg")
    supplies = loadImage("school_supplies.jpg")
    playground = loadImage("playground.webp")
    soccer = loadImage("soccer.jpg")
    alarm = loadSound("loudalarm.mp3")
}

function setup(){
    canvas = createCanvas(700,500)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
}

function modelLoaded(){
    console.log("Model Loaded!")
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function gotResults(error, results){
    if(error){
        console.log(error)
    }else{
        console.log(results)
        //console.log(results[2].label, results[2].width, results[2].height, results[2].x, results[2].y)
        objects = results
    }
}

function draw(){
    objectDetector.detect(video, gotResults)
    image(video, 0, 0, 700, 500)
    r = random(255)
    g = random(255)
    b = random(255)

    for(var i=0; i < objects.length; i++){
        if(objects[i].label == "person"){
            document.getElementById("personCount").innerHTML = "Person: Found"
            alarm.stop()
        }else if(objects[i].label != "person"){
            document.getElementById("personCount").innerHTML = "Person: Not Found"
            alarm.play()
        }else if(objects.length == 0){
            document.getElementById("personCount").innerHTML = "Person: Not Found"
            alarm.play()
        }

        document.getElementById("status").innerHTML = "Status: Objects Detected"
        noFill()
        stroke(r,g,b)
        var confidence = Math.floor(objects[i].confidence * 100) + "%"
        text(objects[i].label + " " + confidence, objects[i].x + 20, objects[i].y + 20)
        rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height)
    }
}