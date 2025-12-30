function calculate() {
  // Glasses
  const open22 = +document.getElementById("open22").value || 0;
  const open16 = +document.getElementById("open16").value || 0;
  const open12 = +document.getElementById("open12").value || 0;
  const open8  = +document.getElementById("open8").value  || 0;

  const close22 = +document.getElementById("close22").value || 0;
  const close16 = +document.getElementById("close16").value || 0;
  const close12 = +document.getElementById("close12").value || 0;
  const close8  = +document.getElementById("close8").value  || 0;

  const sold22 = open22 - close22;
  const sold16 = open16 - close16;
  const sold12 = open12 - close12;
  const sold8  = open8  - close8;
  const total = sold22 + sold16 + sold12 + sold8;

  // Coffee
  const openCoffee  = +document.getElementById("openCoffee").value || 0;
  const closeCoffee = +document.getElementById("closeCoffee").value || 0;
  const soldCoffee  = openCoffee - closeCoffee;

  // Milk
  const openMilk  = +document.getElementById("openMilk").value || 0;
  const closeMilk = +document.getElementById("closeMilk").value || 0;
  const soldMilk  = openMilk - closeMilk;

  // Update results table
  document.getElementById("rOpen22").textContent = open22;
  document.getElementById("rClose22").textContent = close22;
  document.getElementById("rSold22").textContent = sold22;

  document.getElementById("rOpen16").textContent = open16;
  document.getElementById("rClose16").textContent = close16;
  document.getElementById("rSold16").textContent = sold16;

  document.getElementById("rOpen12").textContent = open12;
  document.getElementById("rClose12").textContent = close12;
  document.getElementById("rSold12").textContent = sold12;

  document.getElementById("rOpen8").textContent = open8;
  document.getElementById("rClose8").textContent = close8;
  document.getElementById("rSold8").textContent = sold8;

  document.getElementById("rOpenCoffee").textContent = openCoffee;
  document.getElementById("rCloseCoffee").textContent = closeCoffee;
  document.getElementById("rSoldCoffee").textContent = soldCoffee;

  document.getElementById("rOpenMilk").textContent = openMilk;
  document.getElementById("rCloseMilk").textContent = closeMilk;
  document.getElementById("rSoldMilk").textContent = soldMilk;

  document.getElementById("rTotal").textContent = total;
}

function sendReport() {
  calculate();

  const data = {
    date: document.getElementById("reportDate").value,
    shift: document.getElementById("shift").value,
    note: document.getElementById("note").value,

    open22: document.getElementById("rOpen22").textContent,
    close22: document.getElementById("rClose22").textContent,
    sold22: document.getElementById("rSold22").textContent,

    open16: document.getElementById("rOpen16").textContent,
    close16: document.getElementById("rClose16").textContent,
    sold16: document.getElementById("rSold16").textContent,

    open12: document.getElementById("rOpen12").textContent,
    close12: document.getElementById("rClose12").textContent,
    sold12: document.getElementById("rSold12").textContent,

    open8: document.getElementById("rOpen8").textContent,
    close8: document.getElementById("rClose8").textContent,
    sold8: document.getElementById("rSold8").textContent,

    openCoffee: document.getElementById("rOpenCoffee").textContent,
    closeCoffee: document.getElementById("rCloseCoffee").textContent,
    soldCoffee: document.getElementById("rSoldCoffee").textContent,

    openMilk: document.getElementById("rOpenMilk").textContent,
    closeMilk: document.getElementById("rCloseMilk").textContent,
    soldMilk: document.getElementById("rSoldMilk").textContent,

    total: document.getElementById("rTotal").textContent
  };

  fetch("/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  })
  .then(res => res.json())
  .then(response => {
    document.getElementById("response").innerHTML = "✅ Report saved & sent!";
  })
  .catch(err => {
    document.getElementById("response").innerHTML = "❌ Error sending report.";
    console.error(err);
  });

  // ❤️ popup animation
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.textContent = "💖💖💖";
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 1500);
}

/* ===========================
   AUTOSAVE DRAFT FUNCTIONS
   =========================== */

// Save draft every 10s
setInterval(() => {
  const data = {
    date: document.getElementById("reportDate").value,
    shift: document.getElementById("shift").value,
    note: document.getElementById("note").value,
    open22: document.getElementById("open22").value,
    close22: document.getElementById("close22").value,
    open16: document.getElementById("open16").value,
    close16: document.getElementById("close16").value,
    open12: document.getElementById("open12").value,
    close12: document.getElementById("close12").value,
    open8: document.getElementById("open8").value,
    close8: document.getElementById("close8").value,
    openCoffee: document.getElementById("openCoffee").value,
    closeCoffee: document.getElementById("closeCoffee").value,
    openMilk: document.getElementById("openMilk").value,
    closeMilk: document.getElementById("closeMilk").value
  };

  fetch("/autosave", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
}, 10000);

// Load draft when page loads
window.addEventListener("DOMContentLoaded", () => {
  fetch("/load_draft")
    .then(res => res.json())
    .then(data => {
      Object.keys(data).forEach(k => {
        if (document.getElementById(k)) {
          document.getElementById(k).value = data[k];
        }
      });
      calculate(); // refresh preview table
    });
});
