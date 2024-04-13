/* ********** Menu ********** */

((d) => {
  const $btnMenu = d.querySelector(".menu-btn"),
    $menu = d.querySelector(".menu");

  $btnMenu.addEventListener("click", (e) => {
    $btnMenu.firstElementChild.classList.toggle("none");
    $btnMenu.lastElementChild.classList.toggle("none");
    $menu.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!e.target.matches(".menu a")) return false;

    $btnMenu.firstElementChild.classList.remove("none");
    $btnMenu.lastElementChild.classList.add("none");
    $menu.classList.remove("is-active");
  });
})(document);

/* ********** ContactForm ********** */
((d) => {
  const $form = d.querySelector(".contact-form"),
    $loader = d.querySelector(".contact-form-loader"),
    $response = d.querySelector(".contact-form-response");

  $form.addEventListener("submit", (e) => {
    e.preventDefault();
    $loader.classList.remove("none");
    fetch("https://formsubmit.co/ajax/alejandrodev1769@gmail.com", {
      method: "POST",
      body: new FormData(e.target),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        location.hash = "#gracias";
        $form.reset();
      })
      .catch((err) => {
        console.log(err);
        let message =
          err.statusText || "Ocurrió un error al enviar, intenta nuevamente";
        $response.querySelector(
          "h3"
        ).innerHTML = `Error ${err.status}: ${message}`;
      })
      .finally(() => {
        $loader.classList.add("none");
        setTimeout(() => {
          location.hash = "#close";
        }, 3000);
      });
  });
})(document);

/* ********** Cambiar Idioma ********** */
((d) => {
  const userLanguage = navigator.language;
  const languageCode = userLanguage.split("-")[0];

  const language = d.documentElement.lang;

  const $langBtn = d.querySelector(".idioma-btn");
  const $langsList = d.querySelector(".langs-list");

  if (language === "es") {
    $langsList.firstElementChild.classList.add("lang-active");
  } else {
    $langsList.lastElementChild.classList.add("lang-active");
  }
  $langBtn.addEventListener("click", (e) => {
    $langBtn.firstElementChild.classList.toggle("none");
    $langBtn.lastElementChild.classList.toggle("none");
    $langsList.classList.toggle("is-active");
  });

  d.addEventListener("click", (e) => {
    if (!$langBtn.contains(e.target)) {
      $langsList.classList.remove("is-active");
    }
  });
})(document);

/* ********** onScroll ********** */
((d) => {
  const $arrowUp = d.querySelector(".up");

  const onScroll = () => {
    if (window.scrollY > 700) {
      $arrowUp.classList.add("up-active");
    } else $arrowUp.classList.remove("up-active");
  };

  const onArrowUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  window.addEventListener("scroll", onScroll);

  $arrowUp.addEventListener("click", onArrowUp);
})(document);

/* ********** Modal********** */
((d) => {
  const $portfolioCards = d.querySelectorAll('[id^="trabajo"]');
  const $shakingTexts = d.querySelectorAll("[id^=card-helper]");
  const shakingTexts = (show) => {
    !show
      ? $shakingTexts.forEach((text) => {
          text.style.display = "none";
        })
      : $shakingTexts.forEach((text) => {
          text.style.display = "flex";
        });
  };

  for (let i = 0; i < $portfolioCards.length; i++) {
    const $portfolioCard = $portfolioCards[i];
    const $modal = d.querySelector(`#modal-${i + 1}`);
    const $btnCloseModal = d.querySelector(`#modal-close-${i + 1}`);
    const $shakingText = d.querySelector(`#card-helper-${i+1}`)

    $portfolioCard.addEventListener("click", () => {
      $modal.classList.add("modal-open");
      shakingTexts(false);
      d.documentElement.style.overflowX = "hidden";
      d.documentElement.style.overflowY = "hidden";
    });


    const closeModal = () => {
      $modal.classList.remove("modal-open");
      shakingTexts(true)
      d.documentElement.style.overflowY = "scroll";
    };

    $btnCloseModal.addEventListener("click", closeModal);

    $modal.addEventListener("click", (e) => {
      if (e.target.matches(".modal")) {
        shakingTexts(true)
        $modal.classList.remove("modal-open");
        d.documentElement.style.overflowY = "scroll";
      }
    });
  }
})(document);
