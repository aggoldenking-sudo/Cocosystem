import { SYSTEM_HOURS, DRAW_TIMES, LOTTERIES, ANIMALS, EXTRA_GAMES, DEFAULTS } from "./data.js";
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

let selectedLottery = null, selectedDraw = null, sales = {};

// Mensaje de confirmación
function showMessage(msg, type="success") {
  let el = document.getElementById("pos-message");
  if(!el) {
    el = document.createElement("div");
    el.id = "pos-message";
    el.style.position = "fixed";
    el.style.top = "20px";
    el.style.right = "20px";
    el.style.padding = "15px 20px";
    el.style.borderRadius = "8px";
    el.style.zIndex = "999";
    el.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    el.style.color="#fff";
    el.style.fontWeight="bold";
    el.style.minWidth="150px";
    document.body.appendChild(el);
  }
  el.style.background = type==="success" ? "#4CAF50" : "#f44336";
  el.innerText = msg;
  el.style.opacity = "1";
  setTimeout(()=>{ el.style.opacity="0"; }, 2500);
}

// Funciones existentes
function getCurrentHour(){return new Date().getHours();}
function isSalesAllowed(){const h=getCurrentHour();return h>=SYSTEM_HOURS.salesStart && h<=SYSTEM_HOURS.drawEnd;}
function getAvailableDraws(){const h=getCurrentHour();if(h<SYSTEM_HOURS.salesStart)return[]; if(h<SYSTEM_HOURS.drawStart)return DRAW_TIMES.filter(d=>d.hour24===SYSTEM_HOURS.drawStart); return DRAW_TIMES.filter(d=>d.hour24>=h);}

export function initApp(){
  if(!isSalesAllowed()){alert("⛔ El sistema está cerrado. Ventas desde las 6:00 AM."); return;}
  renderLotteries(); renderDraws(); renderAnimals();
}

// LOTERÍAS
function renderLotteries(){ const container=document.getElementById("lotteries"); if(!container)return; container.innerHTML="";
  LOTTERIES.filter(l=>l.active).forEach(lottery=>{const btn=document.createElement("button"); btn.textContent=lottery.name; btn.className="lottery-btn"; btn.onclick=()=>selectLottery(lottery.id); container.appendChild(btn);});}

function selectLottery(lotteryId){selectedLottery=lotteryId; if(!sales[selectedLottery])sales[selectedLottery]={}; selectedDraw=null; renderDraws(); clearAnimalAmounts();}

// SORTEOS
function renderDraws(){const container=document.getElementById("draws"); if(!container)return; container.innerHTML="";
  if(!selectedLottery){container.innerHTML="<p>Seleccione una lotería</p>"; return;}
  getAvailableDraws().forEach(draw=>{const btn=document.createElement("button"); btn.textContent=draw.label; btn.className="draw-btn"; btn.onclick=()=>selectDraw(draw.hour24); container.appendChild(btn);});}

function selectDraw(hour24){selectedDraw=hour24; if(!sales[selectedLottery][selectedDraw])sales[selectedLottery][selectedDraw]={}; loadAnimalAmounts();}

// ANIMALES / POLLA HÍPICA
function renderAnimals(){ const container=document.getElementById("animals"); if(!container)return; container.innerHTML="";
  let items=[]; if(selectedLottery==="polla_hipica"){const game=EXTRA_GAMES.find(g=>g.id==="polla_hipica"); items=game?game.horses:[];} else items=ANIMALS;

  items.forEach(item=>{ 
    const card=document.createElement("div"); card.className="animal-card"; 
    card.innerHTML=`<div class="animal-number">${item.number}</div><div class="animal-name">${item.name}</div><input type="number" min="${DEFAULTS.minBet}" placeholder="Monto" data-animal="${item.number}" />`;
    const input=card.querySelector("input");
    input.addEventListener("input", e=>{
      if(!selectedLottery || !selectedDraw){e.target.value=""; return;}
      const value=Number(e.target.value); if(value<DEFAULTS.minBet) return;
      if(!sales[selectedLottery][selectedDraw]) sales[selectedLottery][selectedDraw]={};
      sales[selectedLottery][selectedDraw][item.number]=value;

      // Guardar en Firebase
      addDoc(collection(db,"sales"),{lotteryId:selectedLottery, drawHour:selectedDraw, animalNumber:item.number, amount:value, timestamp:serverTimestamp()})
        .then(()=>showMessage(`✅ ${item.name} guardado: ${value} Bs`))
        .catch(err=>showMessage(`❌ Error: ${err.message}`,"error"));
    });
    container.appendChild(card);
  });
}

function clearAnimalAmounts(){document.querySelectorAll("#animals input").forEach(i=>i.value="");}
function loadAnimalAmounts(){document.querySelectorAll("#animals input").forEach(input=>{const num=input.dataset.animal; const value=sales[selectedLottery]?.[selectedDraw]?.[num]||""; input.value=value;});}
window._salesDebug=()=>console.log(sales);
