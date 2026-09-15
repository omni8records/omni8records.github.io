const stack = document.querySelector(".card-stack");

if (stack) {
  let busy = false;

  stack.addEventListener("click", rotateStack);

  function rotateStack() {
    if (busy) return;

    const cards = stack.querySelectorAll(".stack-card");

    if (cards.length < 2) return;

    busy = true;

    // Siste element ligger visuelt øverst.
    const topCard = cards[cards.length - 1];

    topCard.classList.add("leaving");

    topCard.addEventListener(
      "transitionend",
      () => {
        // Flytt det øverste kortet bakerst i bunken.
        stack.prepend(topCard);

        // Nullstill alle kort.
        const newCards = stack.querySelectorAll(".stack-card");

        newCards.forEach((card) => {
          card.classList.remove("front", "back", "leaving");
          card.classList.add("back");
        });

        // Siste element blir nytt toppkort.
        newCards[newCards.length - 1].classList.remove("back");
        newCards[newCards.length - 1].classList.add("front");

        busy = false;
      },
      { once: true }
    );
  }
}