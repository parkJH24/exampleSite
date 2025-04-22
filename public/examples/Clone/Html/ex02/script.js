window.onload = () => {

  const planets = [
    { name: "태양", mark : "☉", class: "sun", distance: 0, diameter: 1392000 },
    { name: "수성", mark : "☿", class: "mercury", distance: 57900000, diameter: 4880 },
    { name: "금성", mark : "♀", class: "venus", distance: 108200000, diameter: 12104 },
    { name: "지구", mark : "⊕", class: "earth", distance: 149600000, diameter: 12742 },
    { name: "화성", mark : "♂", class: "mars", distance: 227900000, diameter: 6779 },
    { name: "목성", mark : "♃", class: "jupiter", distance: 778500000, diameter: 139820 },
    { name: "토성", mark : "♄", class: "saturn", distance: 1434000000, diameter: 116460 },
    { name: "천왕성", mark : "♅", class: "uranus", distance: 2871000000, diameter: 50724 },
    { name: "해왕성", mark : "♆", class: "neptune", distance: 4495000000, diameter: 49244 }
  ];

  const distanceScale = 100000;
  const totalKm = 4495000000;

  createPlanet(planets, distanceScale, totalKm)
  createAsteroidBelt(distanceScale);
  horizontalScroll()
  createRules("ruler", planets, distanceScale, totalKm);
  palnetNav();
  observeActivePlanet(planets)

  document.querySelector(".autoBtn").addEventListener("click", () => {
    autoMove(planets, distanceScale); // planets 배열과 scale은 전역에서 공유되어야 함
  });


}

function createPlanet(planets, distanceScale, totalKm) {
  const solarSystem = document.getElementById("solarSystem");

  planets.forEach(planet => {
    const wrapper = document.createElement("div");
    wrapper.className = "planet";
    wrapper.style.left = `${planet.distance / distanceScale}px`;

    // 👇 현실 크기 + 최소/최대 보정
    const sizeScale = 1000;
    const minSize = 8;
    const maxSize = 120;
    const diameterPx = Math.min(Math.max(planet.diameter / sizeScale, minSize), maxSize);

    // 👇 실제 행성 비주얼 요소
    const core = document.createElement("div");
    core.className = "planet-core";
    core.style.width = `${diameterPx}px`;
    core.style.height = `${diameterPx}px`;

    core.classList.add("planet-core", planet.class);

    // hover 시 효과
    wrapper.addEventListener("mouseenter", e => {
      core.style.transform = "scale(2)";
      const tooltip = document.getElementById("tooltip");
      tooltip.style.display = "block";
      tooltip.innerHTML = `
        <strong>${planet.name}</strong><br>
        거리: ${(planet.distance / 1000000).toFixed(1)} 백만 km<br>
        지름: ${planet.diameter.toLocaleString()} km
      `;
    });

    wrapper.addEventListener("mousemove", e => {
      const tooltip = document.getElementById("tooltip");
      tooltip.style.left = e.clientX + 15 + "px";
      tooltip.style.top = e.clientY + 10 + "px";
    });

    wrapper.addEventListener("mouseleave", () => {
      core.style.transform = "scale(1)";
      const tooltip = document.getElementById("tooltip");
      tooltip.style.display = "none";
    });

    wrapper.appendChild(core);
    solarSystem.appendChild(wrapper);
    solarSystem.style.width = `${(4495000000 / distanceScale) + (window.innerWidth / 2)}px`;
  });


  const mars = 227900000;
  const jupiter = 778500000;
  const asteroidBeltWidth = (jupiter - mars) / distanceScale;

  const asteroidBelt = document.createElement("div");
  asteroidBelt.className = "asteroid-belt";
  asteroidBelt.style.left = `${(227900000 + 778500000) / 2 / distanceScale}px`;
  asteroidBelt.style.width = `${asteroidBeltWidth}px`;
  solarSystem.appendChild(asteroidBelt);


}


function horizontalScroll() {
  window.addEventListener("wheel", function (e) {
    if (e.deltaY !== 0) {
      window.scrollBy({
        left: e.deltaY,
        // behavior: "smooth"
      });
      e.preventDefault();
    }
  }, { passive: false });
}

function createRules(rulerId, planets, distanceScale, totalKm) {
  const ruler = document.getElementById(rulerId);
  const tickIntervalKm = 1_000_000; // 100만 km
  const tickIntervalPx = tickIntervalKm / distanceScale;
  const diameter = 10;
  const distanceSet = new Set(planets.map(p => Math.round(p.distance / tickIntervalKm) * tickIntervalKm));

  for (let i = 0; i <= totalKm; i += tickIntervalKm) {
    const x = i / distanceScale;

    const tick = document.createElement("div");
    tick.className = "tick " + (i % 10_000_000 === 0 ? "large" : "small");
    tick.style.left = `${x}px`;
    ruler.appendChild(tick);

    if (i % 10_000_000 === 0) {
      const label = document.createElement("div");
      label.className = "tick-label";
      label.style.left = `${x}px`;
      label.textContent = `${(i / 1_000_000).toLocaleString()}M km`;
      ruler.appendChild(label);
    }


    const planet = planets.find(p => Math.round(p.distance / tickIntervalKm) * tickIntervalKm === i);
    if (planet) {
      const nameLabel = document.createElement("div");
      nameLabel.className = "planet-label";
      nameLabel.style.left = `${x}px`;
      nameLabel.textContent = `${planet.name} ${planet.mark}`;
      ruler.appendChild(nameLabel);
    }
  }

}

function palnetNav() {
  const buttons = document.querySelectorAll(".planet-nav button");

  buttons.forEach(button => {
    button.addEventListener("click", () => {

      buttons.forEach(btn => btn.classList.remove("on"));

      button.classList.add("on");


      const className = button.dataset.target;
      const target = document.querySelector(`.planet-core.${className}`);
      if (target) {
        const x = target.getBoundingClientRect().left + window.scrollX;
        const offset = window.innerWidth / 2 - target.offsetWidth / 2;
        window.scrollTo({ left: x - offset, behavior: "smooth" });
      }
    });
  });
}

function createAsteroidBelt(distanceScale) {
  const belt = document.querySelector('.asteroid-belt')

  const asteroidCenterX = (227900000 + 778500000) / 2 / distanceScale;


  const asteroidCount = 100;
  const spreadX = 200;
  const spreadY = 80;

  for (let i = 0; i < asteroidCount; i++) {
    const dot = document.createElement("div");
    dot.className = "asteroid-dot";

    const randomX = Math.random() * belt.offsetWidth;
    const randomY = Math.random() * belt.offsetHeight;

    dot.style.position = "absolute";
    dot.style.left = `${randomX}px`;
    dot.style.top = `${randomY}%`;

    belt.appendChild(dot);
  }
}
function autoMove(planets, distanceScale) {
  const endPlanet = planets[planets.length - 1];
  const endX = endPlanet.distance / distanceScale;
  const offset = window.innerWidth / 2 - 60;
  const targetX = endX - offset;

  const duration = 50000;
  const slowRadius = 100000;      // 감속 반경 (px)
  const slowFactor = 0.005;       // 최소 속도 비율

  const startTime = performance.now();
  let lastScrollX = window.scrollX;


  function getSlowdownRatio(centerX) {
    let closestDist = Infinity;
  
    planets.forEach(planet => {
      const el = document.querySelector(`.planet-core.${planet.class}`);
      if (!el) return;
  
      const rect = el.getBoundingClientRect();
      const planetCenter = window.scrollX + rect.left + rect.width / 2;
      const dist = Math.abs(centerX - planetCenter);
      if (dist < closestDist) closestDist = dist;
    });
  
    if (closestDist > slowRadius) return 1;
  
    const ratio = closestDist / slowRadius;
  
    // 기존: easeOutQuad → 변경: easeOutCubic
    const eased = 1 - Math.pow(1 - ratio, 3);
    return slowFactor + (1 - slowFactor) * eased;
  }

  function animate(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    const easeInOut = progress < 0.5
      ? 2 * progress * progress
      : -1 + (4 - 2 * progress) * progress;

    const intendedX = targetX * easeInOut;

    const centerX = lastScrollX + window.innerWidth / 2;
    const slowdownRatio = getSlowdownRatio(centerX);

    const delta = (intendedX - lastScrollX) * slowdownRatio;
    const nextScrollX = lastScrollX + delta;

    window.scrollTo({ left: nextScrollX });
    lastScrollX = nextScrollX;


    if (progress < 1 && Math.abs(targetX - lastScrollX) > 1) {
      requestAnimationFrame(animate);
    } else {
      window.scrollTo({ left: targetX }); 
    }


    // console.log({
    //   delta: delta.toFixed(2),
    //   slowdownRatio: slowdownRatio.toFixed(2),
    //   centerX: Math.round(centerX)
    // });
  }

  requestAnimationFrame(animate);
}



function observeActivePlanet(planets) {
  const buttons = document.querySelectorAll(".planet-nav button");

  window.addEventListener("scroll", () => {
    const centerX = window.scrollX + window.innerWidth / 2;
    const MAX_VALID_DISTANCE = 300

    let closest = null;
    let closestDistance = Infinity;

    planets.forEach(planet => {
      const target = document.querySelector(`.planet-core.${planet.class}`);
      if (!target) return;

      const targetX = target.getBoundingClientRect().left + window.scrollX + target.offsetWidth / 2;
      const distance = Math.abs(centerX - targetX);

      if (distance < closestDistance && distance < MAX_VALID_DISTANCE) {
        closest = planet.class;
        closestDistance = distance;
      }
    });

    buttons.forEach(btn => {
      btn.classList.toggle("on", btn.dataset.target === closest);
    });
  });
}





