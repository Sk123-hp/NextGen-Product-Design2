document.addEventListener("DOMContentLoaded", () => {

    // ------------------------
    // INIT LOCOMOTIVE + GSAP SYNC
    // ------------------------
    function initScroll() {
        const locoScroll = new LocomotiveScroll({
            el: document.querySelector("#main"),
            smooth: true
        });

        locoScroll.on("scroll", ScrollTrigger.update);

        ScrollTrigger.scrollerProxy("#main", {
            scrollTop(value) {
                return arguments.length
                    ? locoScroll.scrollTo(value, 0, 0)
                    : locoScroll.scroll.instance.scroll.y;
            },
            getBoundingClientRect() {
                return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
            }
        });

        ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
        ScrollTrigger.refresh();
    }
    initScroll();

    // ------------------------
    // CUSTOM CURSOR (SMOOTH)
    // ------------------------
    const cursor = document.querySelector("#cursor");
    const blur = document.querySelector("#cursor-blur");
    const cursorText = document.querySelector("#cursor .cursor-text");

    document.addEventListener("mousemove", (e) => {
        gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0.08 });
        gsap.to(blur, { x: e.clientX, y: e.clientY, duration: 0.3 });
    });

    // ------------------------
    // HOVER IMAGE FOLLOW
    // ------------------------
    document.querySelectorAll(".elem").forEach(elem => {
        const img = elem.querySelector("img");
        if (!img) return; // safety check

        let mouseX = 0, mouseY = 0, currentX = 0, currentY = 0, rotation = 0;

        elem.addEventListener("mouseenter", () => {
            img.style.display = "block";
            gsap.to(img, { opacity: 1, scale: 1, duration: 0.4 });
        });

        elem.addEventListener("mouseleave", () => {
            gsap.to(img, {
                opacity: 0,
                scale: 0.8,
                rotation: 0,
                duration: 0.4,
                onComplete: () => img.style.display = "none"
            });
        });

        elem.addEventListener("mousemove", e => {
            mouseX = e.clientX + 30;
            mouseY = e.clientY - 200;
        });

        gsap.ticker.add(() => {
            currentX += (mouseX - currentX) * 0.1;
            currentY += (mouseY - currentY) * 0.1;
            rotation = (mouseX - currentX) * 0.05;

            gsap.set(img, { x: currentX, y: currentY, rotation: rotation });
        });
    });

    // ------------------------
    // LOADER + ENTRY ANIMATION
    // ------------------------
    window.addEventListener("load", () => {
        const tl = gsap.timeline();

        // Progress bar animation
        if (document.querySelector(".progress-bar")) {
            
            tl.to(".progress-bar", { width: "100%", duration: 4, ease: "power1.inOut" });
        }

        // Hide loader elements smoothly
        tl.to(".load-text", { y: -20, opacity: 0, duration: 0.6 }, "-=0.5");
        tl.to("#loader", {
            opacity: 0,
            duration: 0.8,
            onComplete: () => document.getElementById("loader").style.display = "none"
        });

        // Show main content
        tl.to("#main", { opacity: 1, duration: 0.5 });

        // ------------------------
        // HEADER & TEXT ANIMATIONS AFTER LOADING
        // ------------------------
        tl.from("#nav", { y: -80, opacity: 0, duration: 0.8 });
        tl.from("#heading h1", { y: 120, opacity: 0, stagger: 0.2, duration: 1 });
        tl.from(".blocktext h1", { y: 120, opacity: 0, duration: 1 }, "-=0.6");
        tl.from(".blocktext h5, #sheadings h5", { y: 40, opacity: 0, stagger: 0.2, duration: 0.8 }, "-=0.7");
        tl.from("#herofooter", { y: 40, opacity: 0, duration: 0.8 }, "-=0.5");

        // Smooth letter spacing animation for all headings after appearing
        tl.to("#heading h1, .blocktext h1", {
            letterSpacing: "2px",
            duration: 1,
            ease: "power2.out",
            stagger: 0.1
        }, "-=0.5");
    });

    // ------------------------
    // TEXT HOVER ANIMATION
    // ------------------------
    document.querySelectorAll(".elem h1").forEach(text => {
        text.addEventListener("mouseenter", () => {
            gsap.to(text, { opacity: 1, letterSpacing: "3px", duration: 0.3 });
        });

        text.addEventListener("mouseleave", () => {
            gsap.to(text, { opacity: 0.7, letterSpacing: "0px", duration: 0.3 });
        });
    });

});


document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".marquee-track");
  
    // Duplicate logos for seamless scroll
    track.innerHTML += track.innerHTML;
  
    // Get width of one set of logos
    let logos = Array.from(track.children);
    let totalWidth = logos.reduce((sum, el) => sum + el.offsetWidth + 40, 0); // 40px = gap
  
    // Infinite marquee animation
    const marquee = gsap.to(track, {
      x: `-${totalWidth}px`,
      duration: 20,
      ease: "linear",
      repeat: -1
    });
  
    // Hover effect slows down
    logos.forEach(logo => {
      logo.addEventListener("mouseenter", () => marquee.timeScale(0.3));
      logo.addEventListener("mouseleave", () => marquee.timeScale(1));
    });
  
    // Recalculate width on resize
    window.addEventListener("resize", () => {
      marquee.kill();
      totalWidth = logos.reduce((sum, el) => sum + el.offsetWidth + 40, 0);
      gsap.set(track, { x: 0 });
      gsap.to(track, { x: `-${totalWidth}px`, duration: 20, ease: "linear", repeat: -1 });
    });
  });