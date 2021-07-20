const init = () => {
  const slides = document.querySelectorAll(".slide")
  const pages = document.querySelectorAll(".page")
  const backgrounds = [
    `radial-gradient(rgba(43, 55, 96, 1), rgba(11, 16, 35, 1))`, 
    `radial-gradient(#4e3022, #161616)`, 
    `radial-gradient(#4e4342, #161616)`,
  ]

  // Tracker
  let current = 0, scrollSlide = 0


  function changeDots(dot) {
    slides.forEach(slide => {
      slide.classList.remove("active")
    })
    dot.classList.add("active")
  }

  slides.forEach((slide, index) => {
    slide.addEventListener("click", function() {
      changeDots(this)
      nextSlide(index)
      scrollSlide = index
    })
  })


  // Next slide
  const nextSlide = pageNumber => {
    const nextPage = pages[pageNumber]
    const currentPage = pages[current]
    const nextLeft = nextPage.querySelector(".hero .image-left")
    const nextRight = nextPage.querySelector(".hero .image-right")
    const currentLeft = currentPage.querySelector(".hero .image-left")
    const currentRight = currentPage.querySelector(".hero .image-right")
    const nextText = nextPage.querySelector(".details")
    const portfolio = document.querySelector(".portfolio")


    const slideTl = gsap.timeline({
      onStart: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "none"
        })
      },
      onComplete: function() {
        slides.forEach(slide => {
          slide.style.pointerEvents = "all"
        })
      },
    })

    slideTl
    .fromTo(currentLeft, 0.3, {y: "-10%"}, {y: "-100%"})
    .fromTo(currentRight, 0.3, {y: "-10%"}, {y: "-100%"}, "-=0.2")
    .to(portfolio, 0.3, {backgroundImage: backgrounds[pageNumber]})
    .fromTo(currentPage, 0.3, {opacity: 1, pointerEvents: "all"}, {opacity: 0, pointerEvents: "none"})
    .fromTo(nextPage, 0.3, {opacity: 0, pointerEvents: "none"}, {opacity: 1, pointerEvents: "all"}, "-=0.6")
    .fromTo(nextLeft, 0.3, {y: "-100%"}, {y: "-10%"}, "-=0.6")
    .fromTo(nextRight, 0.3, {y: "-100%"}, {y: "10%"}, "-=0.8")
    .fromTo(nextText, 0.3, {opacity: 0}, {opacity: 1})
    .set(nextLeft, {clearProps: "all"})
    .set(nextRight, {clearProps: "all"})

    current = pageNumber
  }

  // Optional

  const throttle = (func, limit) => {
    let inThrottle
    return function() {
      const args = arguments
      const context = this
      if(!inThrottle) {
        func.apply(context, args)
        inThrottle = true
        setTimeout(() => (inThrottle = false), limit)
      }
    }
  }

  const switchDots = dotNumber => {
    const activeDot = document.querySelectorAll(".slide")[dotNumber]
    slides.forEach(slide => slide.classList.remove("active"))
    activeDot.classList.add("active")
  }

  const scrollChange = e => {
    if(e.deltaY > 0) {
      scrollSlide += 1
    }
    else {
      scrollSlide -= 1
    }

    if(scrollSlide > 2) {
      scrollSlide = 0
    }
    if(scrollSlide < 0) {
      scrollSlide = 2
    }
    switchDots(scrollSlide)
    nextSlide(scrollSlide)
    console.log(scrollSlide)
  }

  document.addEventListener("wheel", throttle(scrollChange, 1500))
  document.addEventListener("touchmove", throttle(scrollChange, 1500))

  // End of Optional

  const hamburger = document.querySelector(".menu")
  const hamLines = document.querySelectorAll(".menu line")
  const navOpen = document.querySelector(".nav-open")
  const contact = document.querySelector(".contact")
  const social = document.querySelector(".social")
  const logo = document.querySelector(".logo")

  const tl = gsap.timeline({paused: true, reversed: true})

  tl
    .to(navOpen, 0.5, {y:0})
    .fromTo(contact, 0.5, {opacity: 0, y: 10}, {opacity: 1, y: 0}, "-=0.1")
    .fromTo(social, 0.5, {opacity: 0, y: 10}, {opacity: 1, y: 0}, "-=0.5")
    .fromTo(logo, 0.2, {color: "white"}, {color: "black"}, "-=1")
    .fromTo(hamLines, 0.2, {stroke: "white"}, {stroke: "black"}, "-=1")
  
    hamburger.addEventListener("click", () => {
      tl.reversed() ? tl.play() : tl.reverse()
    })
}

init()