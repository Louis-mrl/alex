const nb_image = 20
const track = document.getElementById("image-track");
const svgElement = document.querySelector('#cursor');
const images = []
const compteur_container = document.getElementById("compteur_container")
const compteur_right = document.getElementById("compteur_right")
compteur_right.innerText = nb_image-1
for (let i = 1; i < nb_image; i++) {
    var img = new Image();
    img.src = `pics/${i}.jpeg`;

    track.appendChild(img)
    img.classList.add("image");
    img.dataset.number = i
    images.push(img)
    var div = compteur_container.appendChild(document.createElement("div"))
    div.innerText = i
}



setInterval(() => {
    images.forEach((image) => {
        var x = image.getBoundingClientRect().x
        
        if(x + image.getBoundingClientRect().width < svgElement.getBoundingClientRect().x || x > svgElement.getBoundingClientRect().x){
          image.classList.remove("hover")
          
        }
        else if(x < svgElement.getBoundingClientRect().x){
            image.classList.add("hover")
            compteur_container.style.transform = `translate3d(0px, ${10}px, 0px);`
        }

    if(image.classList.contains("hover")){
        gsap.to(compteur_container, {
          duration : .5,
          y : -(image.dataset.number-1) * 20,
        })
        console.log((image.dataset.number-1) * 20);
    }

    })
}, 10);


const handleOnDown = e => track.dataset.mouseDownAt = e.clientX;

const handleOnUp = () => {
  track.dataset.mouseDownAt = "0";  
  track.dataset.prevPercentage = track.dataset.percentage;
}

const handleOnMove = e => {
  if(track.dataset.mouseDownAt === "0") return;
  
  const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 2;
  
  const percentage = (mouseDelta / maxDelta) * -100

  var nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage
  var nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
  

  track.dataset.percentage = nextPercentage;
  
  
  track.animate({
    transform: `translate(${nextPercentage}%, -50%)`
  }, { duration: 1200, fill: "forwards" });
}



window.onmousedown = e => handleOnDown(e);

window.ontouchstart = e => handleOnDown(e.touches[0]);

window.onmouseup = e => handleOnUp(e);

window.ontouchend = e => handleOnUp(e.touches[0]);

window.onmousemove = e => handleOnMove(e);

window.ontouchmove = e => handleOnMove(e.touches[0]);
