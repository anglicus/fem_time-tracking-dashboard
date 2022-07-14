// index.js

// when DOM content is loaded, load and parse data
window.addEventListener('DOMContentLoaded', (e) => {
  fetch("data/data.json")
    .then(response => {
      if (response.status >= 200 && response.status <=299) {
        return response.json();
      } else {
        throw Error(response.statusText);
      }
    })
    .then(data => parseData(data))
  .catch((error) => {
      console.log("There was an error loading data.");
  })
});

// parseData
    // enter all the hours data into the appropriate places
    // note: by default, "weekly" is selected when the page loads
function parseData(data) {
  data.forEach(element => {
    const selectortext = "[data-title='" + element.title + "']";
    const card = document.querySelector(selectortext);
    card.querySelector(".daily-div")
      .querySelector(".time-card__hours-value")
      .textContent = element.timeframes.daily.current.toString();
    card.querySelector(".daily-div")
      .querySelector(".time-card__previous-hours")
      .textContent = element.timeframes.daily.previous.toString();
    card.querySelector(".weekly-div")
      .querySelector(".time-card__hours-value")
      .textContent = element.timeframes.weekly.current.toString();
    card.querySelector(".weekly-div")
      .querySelector(".time-card__previous-hours")
      .textContent = element.timeframes.weekly.previous.toString();
    card.querySelector(".monthly-div")
      .querySelector(".time-card__hours-value")
      .textContent = element.timeframes.monthly.current.toString();
    card.querySelector(".monthly-div")
      .querySelector(".time-card__previous-hours")
      .textContent = element.timeframes.monthly.previous.toString();
  });
}


// buttons to toggle between daily, weekly, monthly
    // - when a toggle is clicked, cycle through all of them and add ".selected"
    // to the one that was clicked, while removing ".selected" from the others
    // - also, add ".active" to the corresponding divs (daily, weekly, monthly)
    // and remove ".active" from the others
const toggleButtons = document.querySelectorAll(".user-card__btn-toggle").forEach(btn => {
  btn.addEventListener("click", function() {
    document.querySelectorAll(".user-card__btn-toggle").forEach(button => {
      if (button == btn) {
        button.classList.add("selected");
        const divSelector = "." + button.dataset.targetDiv;
        document.querySelectorAll(divSelector).forEach(div => {
          div.classList.add("active");
        })
      } else {
        button.classList.remove("selected");
        const divSelector = "." + button.dataset.targetDiv;
        document.querySelectorAll(divSelector).forEach(div => {
          div.classList.remove("active");
        })
      }
    });
  });
});

// hover states for cards
    // - in order to be able to achieve the hover effects shown in the preview
    // (in which the ellipsis icon brightens without the background of the card
    // changing), a custom class of ".hovered" is added to the card when the 
    // mouse enters the card, but removed when the mouse enters the area of the ellipsis
    // - when the mouse leaves the ellipsis ".hovered" put back on,
    // and when the mouse leaves the card altogether, it is removed again
const timeCards = document.querySelectorAll(".time-card");

timeCards.forEach(card => {
  card.addEventListener("mouseenter", function() {
    card.classList.add("hovered");
  });
  const btn = card.querySelector(".time-card__btn-ellipsis");
  btn.addEventListener("mouseenter", function() {
    card.classList.remove("hovered");
  });
  btn.addEventListener("mouseleave", function() {
    card.classList.add("hovered");
  });
});

timeCards.forEach(card => {
  card.addEventListener("mouseleave", function() {
    card.classList.remove("hovered");
  });
});

