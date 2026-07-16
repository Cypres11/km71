document.addEventListener("DOMContentLoaded", () => {
  var container = document.getElementById("photo-slider");
  if (!container || typeof sliderPhotos === "undefined") return;

  if (sliderPhotos.length === 0) {
    container.innerHTML = "<p class=\"photo-slider-empty\">Nog geen foto's toegevoegd.</p>";
    return;
  }

  var index = 0;

  var track = document.createElement("div");
  track.className = "photo-slider-track";
  sliderPhotos.forEach(function (filename) {
    var img = document.createElement("img");
    img.src = "assets/reunie/" + filename;
    img.alt = "Foto van een KM71-huisgenotenreünie";
    img.loading = "lazy";
    track.appendChild(img);
  });
  container.appendChild(track);

  if (sliderPhotos.length > 1) {
    var prevBtn = document.createElement("button");
    prevBtn.className = "photo-slider-btn prev";
    prevBtn.setAttribute("aria-label", "Vorige foto");
    prevBtn.textContent = "‹";

    var nextBtn = document.createElement("button");
    nextBtn.className = "photo-slider-btn next";
    nextBtn.setAttribute("aria-label", "Volgende foto");
    nextBtn.textContent = "›";

    var dots = document.createElement("div");
    dots.className = "photo-slider-dots";
    var dotButtons = sliderPhotos.map(function (_, i) {
      var dot = document.createElement("button");
      dot.setAttribute("aria-label", "Ga naar foto " + (i + 1));
      dot.addEventListener("click", function () {
        goTo(i);
      });
      dots.appendChild(dot);
      return dot;
    });

    function update() {
      track.style.transform = "translateX(-" + index * 100 + "%)";
      dotButtons.forEach(function (dot, i) {
        dot.classList.toggle("active", i === index);
      });
    }

    function goTo(i) {
      index = (i + sliderPhotos.length) % sliderPhotos.length;
      update();
    }

    prevBtn.addEventListener("click", function () {
      goTo(index - 1);
    });
    nextBtn.addEventListener("click", function () {
      goTo(index + 1);
    });

    container.appendChild(prevBtn);
    container.appendChild(nextBtn);
    container.appendChild(dots);
    update();
  }
});
