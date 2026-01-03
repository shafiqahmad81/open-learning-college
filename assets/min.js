document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll(".counter");
    counters.forEach(counter => {
        const target = parseFloat(counter.innerText.replace(/,/g, ""));
        let count = 0;

        const duration = 1500;
        const steps = 100;
        const increment = target / steps;
        const intervalTime = duration / steps;

        const updateCounter = () => {
            count += increment;

            if (count < target) {
                counter.innerText = count.toLocaleString(undefined, {
                    minimumFractionDigits: target % 1 !== 0 ? 2 : 0,
                    maximumFractionDigits: 2
                });
                setTimeout(updateCounter, intervalTime);
            } else {
                counter.innerText = target.toLocaleString(undefined, {
                    minimumFractionDigits: target % 1 !== 0 ? 2 : 0,
                    maximumFractionDigits: 2
                });
            }
        };

        updateCounter();
    });
});

// accordion 
function toggleAccordion(index) {
    const content = document.getElementById(`content-${index}`);
    const icon = document.getElementById(`icon-${index}`);

    const downSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" viewBox="0 0 48 48">
        <path d="M36.648 20.761a1 1 0 0 1-1.41-.113L25 8.635V41a1 1 0 0 1-2 0V8.635L12.761 20.648a1 1 0 0 1-1.522-1.296L21.72 7.054a2.993 2.993 0 0 1 4.56 0L36.76 19.352a1 1 0 0 1-.113 1.41z" fill="#008080"/>
      </svg>
    `;

    const upSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 128 128">
        <path d="M64 88a3.988 3.988 0 0 1-2.828-1.172l-40-40c-1.563-1.563-1.563-4.094 0-5.656s4.094-1.563 5.656 0L64 78.344l37.172-37.172c1.563-1.563 4.094-1.563 5.656 0s1.563 4.094 0 5.656l-40 40A3.988 3.988 0 0 1 64 88z" fill="#008080"/>
      </svg>
    `;

    // 🔥 STEP 1: All accordion বন্ধ করা (except current)
    const allContents = document.querySelectorAll('[id^="content-"]');
    allContents.forEach((item) => {
        let itemIndex = item.id.split("-")[1];

        if (parseInt(itemIndex) !== index) {
            item.style.maxHeight = "0px";

            // icon reset
            const singleIcon = document.getElementById(`icon-${itemIndex}`);
            if (singleIcon) singleIcon.innerHTML = upSVG;
        }
    });

    // 🔥 STEP 2: Current accordion toggle
    if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0px";
        icon.innerHTML = upSVG;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.innerHTML = downSVG;
    }
}


// faculty sidebar
  function setupShowToggle({
    listId,
    showMoreId,
    showLessId,
    visibleCount
  }) {
    const list = document.getElementById(listId);
    if (!list) return;

    const items = Array.from(list.children);
    const showMoreBtn = document.getElementById(showMoreId);
    const showLessBtn = document.getElementById(showLessId);

    // show limited items
    function showInitial() {
      items.forEach((item, index) => {
        item.style.display = index < visibleCount ? "list-item" : "none";
      });
    }

    // show all items
    function showAll() {
      items.forEach(item => {
        item.style.display = "list-item";
      });
    }

    // initial state
    showInitial();

    // show more
    showMoreBtn.addEventListener("click", () => {
      showAll();
      showMoreBtn.classList.add("hidden");
      showLessBtn.classList.remove("hidden");
    });

    // show less
    showLessBtn.addEventListener("click", () => {
      showInitial();
      showLessBtn.classList.add("hidden");
      showMoreBtn.classList.remove("hidden");
    });
  }

  // Faculty (7 items)
  setupShowToggle({
    listId: "faculty",
    showMoreId: "show-more",
    showLessId: "show-less",
    visibleCount: 6
  });

  // Departments (5 items)
  setupShowToggle({
    listId: "departments",
    showMoreId: "department-show-more",
    showLessId: "department-show-less",
    visibleCount: 5
  });




// Faq

  const faqBtns = document.querySelectorAll(".faq-btn");
  const defaultActiveIndex = 0;

  faqBtns.forEach((btn, index) => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector(".icon");

    if(index === defaultActiveIndex){
      content.style.maxHeight = content.scrollHeight + "px";
      btn.classList.add("text-[#6EC1E4]");
      btn.classList.remove("text-[#008080]");
      icon.classList.add("text-[#6EC1E4]");
      icon.classList.remove("text-[#008080]");
      icon.textContent = "−";
    } else {
      content.style.maxHeight = "0";
      btn.classList.add("text-[#008080]");
      btn.classList.remove("text-[#6EC1E4]");
      icon.classList.add("text-[#008080]");
      icon.classList.remove("text-[#6EC1E4]");
      icon.textContent = "+";
    }

    btn.addEventListener("click", () => {
      const isOpen = content.style.maxHeight && content.style.maxHeight !== "0px";

      document.querySelectorAll(".faq-content").forEach(c => {
        c.style.maxHeight = "0";
        const b = c.previousElementSibling;
        b.classList.remove("text-[#6EC1E4]");
        b.classList.add("text-[#008080]");
        const i = b.querySelector(".icon");
        i.classList.remove("text-[#6EC1E4]");
        i.classList.add("text-[#008080]");
        i.textContent = "+";
      });

      if(!isOpen){
        content.style.maxHeight = content.scrollHeight + "px";
        btn.classList.remove("text-[#008080]");
        btn.classList.add("text-[#6EC1E4]");
        icon.classList.remove("text-[#008080]");
        icon.classList.add("text-[#6EC1E4]");
        icon.textContent = "−";
      }
    });
  });










  
// Tab


const tabButtons = document.querySelectorAll("#tabs button");
const tabItems = document.querySelectorAll("#tabs .tab-item");
const desktopContents = document.querySelectorAll("#desktop-contents .tab-content");
const mobileContents = document.querySelectorAll(".mobile-content");

const isMobile = () => window.innerWidth < 1024;

activateTab("voice");

tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    activateTab(btn.dataset.tab);
  });
});

function activateTab(tabId) {

  desktopContents.forEach(c => c.classList.add("hidden"));
  mobileContents.forEach(c => c.classList.add("hidden"));

  tabItems.forEach(item => {
    item.classList.remove(
      "border-t",
      "border-l",
      "border-r",
      "border-b",
      "border-[#008080]",
      "border-b-white",
      "bg-[#F7FBFB]",
      "-mb-px"
    );
  });

  tabButtons.forEach(btn => {
    btn.classList.remove("text-[#008080]");
    btn.classList.add("text-[#6EC1E4]");
  });

  const activeBtn = document.querySelector(`[data-tab="${tabId}"]`);
  const activeItem = activeBtn.parentElement;

  activeBtn.classList.add("text-[#008080]");
  activeBtn.classList.remove("text-[#6EC1E4]");

  if (isMobile()) {
    activeItem.classList.add(
      "border-b-white",
      "border-[#008080]",
      "bg-[#F7FBFB]"
    );
  } else {
    activeItem.classList.add(
      "border-t",
      "border-l",
      "border-r",
      "border-[#008080]",
      "border-b-white",
      "bg-[#F7FBFB]",
      "-mb-px"
    );
  }

  if (isMobile()) {
    activeBtn.nextElementSibling.classList.remove("hidden");
  } else {
    document.getElementById(tabId).classList.remove("hidden");
  }
}






