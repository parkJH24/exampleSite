const loadIncludes = async (root = document) => {
  const targets = root.querySelectorAll("[data-include]");
  for (const el of targets) {
    const file = el.getAttribute("data-include");
    try {
      const res = await fetch(file);
      const html = await res.text();
      el.innerHTML = html;
      el.removeAttribute("data-include");

      // 하위 컴포넌트 안에도 data-include가 또 있으면 재귀적으로 실행
      await loadIncludes(el);
    } catch (err) {
      console.warn("Component load failed:", err);
    }
  }
};

const loadHTML = async (id, path) => {
  const res = await fetch(path);
  const html = await res.text();
  const target = document.getElementById(id);
  if (!target) return;
  target.innerHTML = html;

  // 로드된 컴포넌트 내부도 다시 탐색
  await loadIncludes(target);
};

const observeGnbList = () => {
  const gnbList = document.querySelector('.gnbList');
  if (!gnbList) return;

  const observer = new MutationObserver((mutations, obs) => {
    if (gnbList.children.length > 0) {
      gnb(); // gnbList 안에 자식이 생기면 gnb 실행
      obs.disconnect(); // 관찰 종료
    }
  });

  observer.observe(gnbList, { childList: true });
};

export let allModels = [];
export let allAwards = [];
export async function fetchModels() {
  const res = await fetch('../data/model.json');
  const data = await res.json();
  allModels = data;
}

export async function fetchAwards(){
  const res = await fetch('../data/award.json')
  const data =await res.json();
  allAwards = data;
  console.log(allAwards)

}


export async function initLoader(){
  await loadHTML("header", "/components/header.html");
  await loadIncludes(document.getElementById("header"));


  await loadHTML("footer", "/components/footer.html");

  // 처음부터 있는 data-include도 탐색
  await loadIncludes();

  observeGnbList();
  // gnb()
}




