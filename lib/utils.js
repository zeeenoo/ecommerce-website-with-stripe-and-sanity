import confetti from 'canvas-confetti'; // eslint-disable-line no-unused-vars 

export const runFireworks = () => { //this function will run the fireworks animation
  var duration = 5 * 1000; //duration of the animation in milliseconds
  var animationEnd = Date.now() + duration; //get the current time and add the duration to it
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }; //defaults for the confetti animation 

  function randomInRange(min, max) { //this function will return a random number between the min and max
    return Math.random() * (max - min) + min;
  }

  var interval = setInterval(function() { //set the interval for the animation
    var timeLeft = animationEnd - Date.now(); //get the time left for the animation to run

    if (timeLeft <= 0) { //if the time left is less than 0 then clear the interval and stop the animation
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration); //get the particle count for the animation based on the time left
    // since particles fall down, start a bit higher than random
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } })); //run the confetti animation with the defaults and the particle count and origin 
    confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
  }, 250);
}