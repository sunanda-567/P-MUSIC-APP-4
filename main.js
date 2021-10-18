scoreLeft_wrist=0;
leftWristY=0;
leftWristX=0;
rightWristY=0;
rightWristX=0;
song="";

function preload()
{

}

function setup()
{
canvas=createCanvas(600, 500);
canvas.center();
video=createCapture(VIDEO);
video.hide();

poseNet=ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotposes);
}

function modelLoaded()
{
    console.log("poseNet is intialized");
}

function gotposes(results)
{
if(results.length > 0)
{
    console.log(results);

    scoreLeft_wrist=results[0].pose.keypoints[9].score;
    console.log("scoreLeft_wrist = " + scoreLeft_wrist);
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("leftWristX="+ leftWristX + " leftWristY=" + leftWristY);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("rightWristX="+ rightWristX + " rightWristY=" + rightWristY);
}
}

function draw()
{
image(video, 0, 0, 600, 500);
fill("#006963");
stroke("#00fff0");
if(scoreLeft_wrist > 0.2)
{
circle(leftWristX, leftWristY, 20);
leftWristNo =Number(leftWristY);
removeDecimal= floor(leftWristNo);
volume=removeDecimal/500;
document.getElementById("volume_of_song").innerHTML="volume = " + volume;
song.setVolume(volume);
}
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
    
}