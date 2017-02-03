window.onload = function() {
 

var pic = document.getElementById("profilepng");
var context = new AudioContext(); 
pic.addEventListener("mouseover", play);
//console.log("the time is..." + context.currentTime);
pic.addEventListener("mouseout", stop);

function play(e){
oscillator1 = context.createOscillator(); // Create sound source 1
oscillator1.frequency.setTargetAtTime(getFrequency(e.clientX), context.currentTime, 0.01);
//oscillator1.detune.value = 100;
oscillator1.connect(context.destination); // Connect cscillator 1 to output
oscillator1.start(0); // Play oscillator
};


pic.addEventListener('mousemove', function (e) {
  if (play) {
      oscillator1.frequency.setTargetAtTime(getFrequency(e.clientX), context.currentTime, 0.01);
      
      pic.style.opacity =  0.5;
  }
});

function stop(){
	oscillator1.stop(0);
	oscillator1.disconnect();

	//var pic = document.getElementById("profilepng");
      pic.style.opacity =  1;
}

function getFrequency(mouseX){

var min = 20;
var max = 2000;
//return((mouseX/pic)*max)+ min);
return ((mouseX / pic.clientWidth -3 ) * max) + min;
}


}


