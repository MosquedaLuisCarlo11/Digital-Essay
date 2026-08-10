document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const heroTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".hero-scroll-section",
            start: "top top",      
            end: "+=150%",         
            scrub: 1,              
            pin: true,             
        }
    });

    // 1. Scale the mask massive enough to guarantee it clears the screen
    heroTimeline.to(".mask-wrapper", {
        webkitMaskSize: "20000%", 
        maskSize: "20000%",
        ease: "power2.in"
    }, 0); 

    // 2. Fade out Phase 1 and move it up slightly
    heroTimeline.to(".phase-1", {
        opacity: 0,
        y: "-=50", // Moves up 50px from its current position
        ease: "power1.inOut"
    }, 0);

    // 3. Fade in Phase 2
    heroTimeline.fromTo(".phase-2", 
        { 
            opacity: 0, 
            y: "+=50", // Starts 50px lower
            autoAlpha: 0 
        }, 
        { 
            opacity: 1, 
            y: "-=50", // Moves to its natural center position
            autoAlpha: 1,
            ease: "power2.out" 
        }, 
        0.2 // Starts slightly after the timeline begins
    );
});


document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const path = document.querySelector('#scroll-line');
    
    // 1. Get the total length of the SVG path
    const pathLength = path.getTotalLength();

    // 2. Set the stroke-dasharray and dashoffset to hide the line initially
    gsap.set(path, { 
        strokeDasharray: pathLength, 
        strokeDashoffset: pathLength 
    });

    // 3. Animate the dashoffset to 0 based on scroll position
    gsap.to(path, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
            trigger: ".journey_wrapper", // The container watching the scroll
            start: "top 60%",            // Start drawing when wrapper hits 60% down the viewport
            end: "bottom 80%",           // Finish drawing near the bottom
            scrub: 1,                    // Smooth scrubbing with a 1-second catch-up delay
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const statsContent = document.querySelector('.stats-content');

    // The Parallax Text Reveal
    gsap.to(statsContent, {
        y: -150, // Moves the text upward on the Y-axis
        ease: "none", // Linear scrub feels best for scroll-linked animations
        scrollTrigger: {
            trigger: ".mountain-parallax-section",
            // Animation starts when the top of the section hits the bottom of the viewport
            start: "top bottom", 
            // Animation ends when the bottom of the section hits the top of the viewport
            end: "bottom top",   
            scrub: 0.5 // Adds a tiny bit of smoothing (half a second) to the scroll catch-up
        }
    });
});

// ==========================================================================
// MOTOR DINÁMICO DE SCROLL Y PINNING / Filosofia - Main Page
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const spacers = document.querySelectorAll('.pin-spacer');
    const track = document.querySelector('.vo-stack-track');

    if (spacers.length === 0 || !track) return;

    const collapsedCardHeight = window.innerWidth > 768 ? 65 : 45;
    const baseTopOffset = 130; 

    const handleScrollPinning = () => {
        const trackRect = track.getBoundingClientRect();
        
        spacers.forEach((spacer, index) => {
            const cardContent = spacer.querySelector('.vo-card-content');
            const targetTop = baseTopOffset + (index * collapsedCardHeight);
            
            const spacerRect = spacer.getBoundingClientRect();

            if (spacerRect.top <= targetTop) {
                spacer.classList.add('pinned-state');
                
                if (cardContent) {
                    cardContent.style.position = 'fixed';
                    cardContent.style.top = `${targetTop}px`;
                }
                
                spacer.style.height = `${spacerRect.height}px`;
            } else {
                spacer.classList.remove('pinned-state');
                
                if (cardContent) {
                    cardContent.style.position = 'relative';
                    cardContent.style.top = 'auto';
                }
                spacer.style.height = 'auto';
            }
        });
    };

    window.addEventListener('scroll', handleScrollPinning, { passive: true });
    window.addEventListener('resize', handleScrollPinning);
    handleScrollPinning();
});

    document.addEventListener('DOMContentLoaded', () => {
        const updateItems = document.querySelectorAll('.update-item');
        
        // Desktop Hover Elements
        const floatingContainer = document.getElementById('floating-image-container');
        const floatingImage = document.getElementById('floating-image');
        
        // Modal Elements
        const modal = document.getElementById('article-modal');
        const closeModalBtn = document.getElementById('close-modal');
        const modalHeroImg = document.getElementById('modal-hero-image');
        const modalTitle = document.getElementById('modal-title');
        const modalAuthor = document.getElementById('modal-author');
        const modalDate = document.getElementById('modal-date');
        const modalText = document.getElementById('modal-text');
        const modalLink = document.getElementById('modal-link');

        const isMobile = window.matchMedia("(max-width: 768px)").matches;

        updateItems.forEach(item => {
            // --- 1. DESKTOP HOVER LOGIC ---
            if (!isMobile) {
                item.addEventListener('mouseenter', () => {
                    const hoverImgSrc = item.getAttribute('data-hover');
                    if (hoverImgSrc) {
                        floatingImage.src = hoverImgSrc;
                        floatingContainer.classList.add('visible');
                    }
                });

                item.addEventListener('mouseleave', () => {
                    floatingContainer.classList.remove('visible');
                });

                item.addEventListener('mousemove', (e) => {
                    floatingContainer.style.left = `${e.clientX}px`;
                    floatingContainer.style.top = `${e.clientY}px`;
                });
            }

            // --- 2. CLICK MODAL LOGIC ---
            item.addEventListener('click', (e) => {
                e.preventDefault(); // Stop the <a> tag from redirecting

                // Hide the floating cursor image so it doesn't overlap the modal
                if(floatingContainer) floatingContainer.classList.remove('visible');

                // Pull data from the clicked item
                const heroSrc = item.getAttribute('data-hero');
                const title = item.getAttribute('data-title');
                const author = item.getAttribute('data-author');
                const date = item.getAttribute('data-date');
                const text = item.getAttribute('data-text');
                const link = item.getAttribute('data-link');

                // Inject data into the modal
                modalHeroImg.src = heroSrc;
                modalTitle.innerHTML = title; // Using innerHTML in case you want line breaks
                modalAuthor.textContent = author;
                modalDate.textContent = date;
                modalText.textContent = text;

                // Handle link visibility
                if (link && link !== "#") {
                    modalLink.href = link;
                    modalLink.style.display = 'inline-block';
                } else {
                    modalLink.style.display = 'none';
                }

                // Show modal and lock background scrolling
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; 
            });
        });

        // --- 3. CLOSE MODAL LOGIC ---
        closeModalBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Unlock background scrolling
        });

        // Optional: Close modal if user clicks outside the content (on the dark background)
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ====================================================================
// Formulary Page
// ====================================================================
const initMultiStepForm = () => {
  const form = document.getElementById("multi-step-form");
  if (!form) return; 

  const steps = Array.from(form.querySelectorAll(".form-step"));
  const tabs = Array.from(document.querySelectorAll(".step-tab"));
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const footerNav = document.getElementById("wizard-footer-nav");
  const successScreen = document.getElementById("success-screen");
  let currentStepIndex = 0;

  function updateFormWizardView() {
    steps.forEach((step, idx) => step.classList.toggle("active", idx === currentStepIndex));
    tabs.forEach((tab, idx) => tab.classList.toggle("active", idx === currentStepIndex));
    
    if (currentStepIndex === 0) {
      prevBtn.classList.add("invisible");
    } else {
      prevBtn.classList.remove("invisible");
    }

    if (currentStepIndex === steps.length - 1) {
      nextBtn.textContent = "Enviar Formulario";
    } else {
      nextBtn.textContent = "Siguiente Paso ›";
    }
  }

  function validateCurrentStep() {
    const activeStep = steps[currentStepIndex];
    let isStepValid = true;

    const requiredInputs = activeStep.querySelectorAll("input[required], textarea[required]");
    requiredInputs.forEach(input => {
      if (input.closest(".hidden")) return;
      
      let isValidInput = true;
      
      if (input.id === "contact-phone") {
        if (input.value.trim().length < 7) {
          isValidInput = false;
        }
      } else if (!input.value.trim()) {
        isValidInput = false;
      }

      if (!isValidInput) {
        input.closest(".input-group").classList.add("invalid");
        isStepValid = false;
      } else {
        input.closest(".input-group").classList.remove("invalid");
      }
    });

    const emailInputs = activeStep.querySelectorAll("input[type='email']");
    emailInputs.forEach(email => {
      if (email.closest(".hidden")) return;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value.trim())) {
        email.closest(".input-group").classList.add("invalid");
        isStepValid = false;
      } else {
        email.closest(".input-group").classList.remove("invalid");
      }
    });

    return isStepValid;
  }

  form.addEventListener("input", (e) => {
    const group = e.target.closest(".input-group");
    if (group && group.classList.contains("invalid")) {
      group.classList.remove("invalid");
    }
  });

  nextBtn.addEventListener("click", () => {
    if (!validateCurrentStep()) return;

    if (currentStepIndex < steps.length - 1) {
      currentStepIndex++;
      updateFormWizardView();
    } else {
      steps.forEach(step => step.classList.remove("active"));
      footerNav.classList.add("hidden");
      successScreen.classList.remove("hidden");
      
      form.reset();
      currentStepIndex = 0;
    }
  });

  prevBtn.addEventListener("click", () => {
    if (currentStepIndex > 0) {
      currentStepIndex--;
      updateFormWizardView();
    }
  });

  const radioMethods = form.querySelectorAll('input[name="contact-method"]');
  const emailFieldGroup = document.getElementById("email-field-group");
  const phoneFieldGroup = document.getElementById("phone-field-group");
  const emailInput = document.getElementById("contact-email");
  const phoneInput = document.getElementById("contact-phone");

  radioMethods.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "email") {
        emailFieldGroup.classList.remove("hidden");
        phoneFieldGroup.classList.add("hidden");
        emailInput.setAttribute("required", "true");
        phoneInput.removeAttribute("required");
      } else {
        emailFieldGroup.classList.add("hidden");
        phoneFieldGroup.classList.remove("hidden");
        phoneInput.setAttribute("required", "true");
        emailInput.removeAttribute("required");
      }
    });
  });

  if (emailInput) emailInput.setAttribute("required", "true");

  const categoryButtons = form.querySelectorAll(".cat-btn");
  const hiddenCategoryInput = document.getElementById("selected-category");

  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      categoryButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      if (hiddenCategoryInput) hiddenCategoryInput.value = button.getAttribute("data-category");
    });
  });
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMultiStepForm);
} else {
  initMultiStepForm();
}