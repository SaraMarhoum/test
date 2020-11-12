
// ***************************************************************************************Navbar
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const navMenu = document.querySelector(".navbar__content_menu-list");
const navMenuBtn = document.querySelector(".menu-btn");
const navCancelBtn = document.querySelector(".cancel-btn");

navMenuBtn.onclick = ()=>{
    navMenu.classList.add("active");
    navMenuBtn.classList.add("hide");
    body.classList.add("disabledScroll");
}

navCancelBtn.onclick = ()=>{
    navMenu.classList.remove("active");
    navMenuBtn.classList.remove("hide");
    body.classList.remove("disabledScroll");
}

window.onscroll = ()=>{
    this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
}


// GSAP ANIMATION
//NAV
gsap.from('.navbar__content_logo, .menu-btn', {opacity: 0, duration: 1, delay: 1, y:10})
gsap.from('.navbar__content_menu-list', {opacity: 0, duration: 1, delay: 0.5, y: 30, stagger: 0.2})

//HERO
gsap.from('.hero__title_1', {opacity: 0, duration: 1, delay: 1.6, y:30})
gsap.from('.hero__title_2', {opacity: 0, duration: 1, delay: 1.8, y:30})
gsap.from('.hero__title_3, .txt-rotate', {opacity: 0, duration: 1, delay: 2.5, y:30})
gsap.from('.hero__btn_container', {opacity: 0, duration: 0.5, delay: 2.5, y:30})



// *************************************************************************************** Title animation 

var TxtRotate = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  
  TxtRotate.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
  
    var that = this;
    var delta = 300 - Math.random() * 100;
  
    if (this.isDeleting) { delta /= 2; }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName('txt-rotate');
    for (var i=0; i<elements.length; i++) {
      var toRotate = elements[i].getAttribute('data-rotate');
      var period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new TxtRotate(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
    document.body.appendChild(css);
  };


  document.addEventListener('mousemove', move);
  function move(e){
    this.querySelectorAll('.move').forEach(layer =>{
      const speed = layer.getAttribute('data-speed')

      const x = (window.innerWidth - e.pageX*speed)/120
      const y = (window.innerHeight - e.pageY*speed)/120

      layer.style.transform = `translateX(${x}px) translateY(${y}px)`
    })
  }




// ***************************************************************************************Testomonials

// vars
'use strict'
var	testim = document.getElementById("testim"),
		testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
    testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
    testimLeftArrow = document.getElementById("left-arrow"),
    testimRightArrow = document.getElementById("right-arrow"),
    testimSpeed = 80000,
    currentSlide = 0,
    currentActiv = 0,
    testimTimer,
		touchStartPos,
		touchEndPos,
		touchPosDiff,
		ignoreTouch = 30;
;



    // Testim Script
    function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
            testimContent[k].classList.remove("activ");
            testimContent[k].classList.remove("inactiv");
            testimDots[k].classList.remove("activ");
        }

        if (slide < 0) {
            slide = currentSlide = testimContent.length-1;
        }

        if (slide > testimContent.length - 1) {
            slide = currentSlide = 0;
        }

        if (currentActiv != currentSlide) {
            testimContent[currentActiv].classList.add("inactiv");            
        }
        testimContent[slide].classList.add("activ");
        testimDots[slide].classList.add("activ");

        currentActiv = currentSlide;
    
        clearTimeout(testimTimer);
        testimTimer = setTimeout(function() {
            playSlide(currentSlide += 1);
        }, testimSpeed)
    }

    testimLeftArrow.addEventListener("click", function() {
        playSlide(currentSlide -= 1);
    })

    testimRightArrow.addEventListener("click", function() {
        playSlide(currentSlide += 1);
    })    

    for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function() {
            playSlide(currentSlide = testimDots.indexOf(this));
        })
    }

    playSlide(currentSlide);

    // keyboard shortcuts
    document.addEventListener("keyup", function(e) {
        switch (e.keyCode) {
            case 37:
                testimLeftArrow.click();
                break;
                
            case 39:
                testimRightArrow.click();
                break;

            case 39:
                testimRightArrow.click();
                break;

            default:
                break;
        }
    })
		
		testim.addEventListener("touchstart", function(e) {
				touchStartPos = e.changedTouches[0].clientX;
		})
	
		testim.addEventListener("touchend", function(e) {
				touchEndPos = e.changedTouches[0].clientX;
			
				touchPosDiff = touchStartPos - touchEndPos;
			
				console.log(touchPosDiff);
				console.log(touchStartPos);	
				console.log(touchEndPos);	

			
				if (touchPosDiff > 0 + ignoreTouch) {
						testimLeftArrow.click();
				} else if (touchPosDiff < 0 - ignoreTouch) {
						testimRightArrow.click();
				} else {
					return;
				}
			
		})
