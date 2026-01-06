import { SYSTEM_HOURS, DRAW_TIMES, LOTTERIES, ANIMALS, EXTRA_GAMES, DEFAULTS } from "./data.js";
import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

let selectedLottery=null, selectedDraw=null, sales={};

function getCurrentHour(){return new Date().getHours();}
function isSalesAllowed(){const h=getCurrentHour();return h>=SYSTEM_HOURS.salesStart && h<=SYSTEM_HOURS.drawEnd;}
function getAvailableDraws(){const h=getCurrentHour();if(h<SYSTEM_HOURS.salesStart)return[]; if(h<SYSTEM_HOURS.drawStart)return DRAW_TIMES.filter(d=>d.hour24===SYSTEM_HOURS.drawStart); return DRAW_TIMES.filter(d=>d.hour24>=h);}

export function initApp(){
  if(!isSalesAllowed()){alert("⛔ El sistema está cerrado. Ventas desde las 6:00 AM."); return;}
  renderLotteries(); renderDraws(); renderAnimals();
}

function renderLotteries(){
  const container=document.getElementById("lotteries"); if(!container)return; container.innerHTML="";
  LOTTERIES.filter(l=>l.active).forEach(lottery=>{
    const btn=document.createElement("button"); btn.textContent=lottery.name; btn.className="lottery-btn"; btn.onclick=()=>selectLottery(lottery.id); container.appendChild(btn);
  });
}

function selectLottery(lotteryId){selectedLottery=lotteryId; if(!sales[selectedLottery])sales[selectedLottery]={}; selectedDraw=null; renderDraws(); clearAnimalAmounts();}

function renderDraws(){
  const container=document.getElementById("draws"); if(!container)return; container.innerHTML="";
  if(!selectedLottery){container.innerHTML="<p>Seleccione una lotería</p>"; return;}
  getAvailableDraws().forEach(draw=>{
    const btn=document.createElement("button"); btn.textContent=draw.label; btn.className="draw-btn"; btn.onclick=()=>selectDraw(draw.hour24); container.appendChild(btn);
  });
}

function selectDraw(hour24){selectedDraw=hour24; if(!sales[selectedLottery][selectedDraw])sales[selectedLottery][selectedDraw]={}; loadAnimalAmounts();}

function renderAnimals(){
  const container=document.getElementById("animals"); if(!container)return; container.innerHTML="";
  let items=[]; if(selectedLottery==="polla_hipica"){const game=EXTRA_GAMES.find(g=>g.id==="polla_hipica"); items=game?game.horses:[];} else items=ANIMALS;

  items.forEach(item=>{
    const card=document.createElement("div"); card.className="animal-card"; card.innerHTML=`
      <div class="animal-number">${item.number}</div>
      <div class="animal-name">${item.name}</div>
      <input type="number" min="${DEFAULTS.minBet}" placeholder="Monto" data-animal="${item.number}" />
    `;
    const input=card.querySelector("input");
    input.addEventListener("input",e=>{
      if(!selectedLottery || !selectedDraw){e.target.value=""; return;}
      const value=Number(e.target.value); if(value<DEFAULTS.minBet)return;
      if(!sales[selectedLottery][selectedDraw])sales[selectedLottery][selectedDraw]={};
      sales[selectedLottery][selectedDraw][item.number]=value;

      addDoc(collection(db,"sales"),{lotteryId:selectedLottery, drawHour:selectedDraw, animalNumber:item.number, amount:value, timestamp:serverTimestamp()})
        .then(()=>console.log("✅ Venta guardada en Firebase"))
        .catch(err=>console.error("❌ Error al guardar:",err));
    });
    container.appendChild(card);
  });
}

function clearAnimalAmounts(){document.querySelectorAll("#animals input").forEach(i=>i.value="");}
function loadAnimalAmounts(){document.querySelectorAll("#animals input").forEach(input=>{const num=input.dataset.animal; const value=sales[selectedLottery]?.[selectedDraw]?.[num]||""; input.value=value;});}
window._salesDebug=()=>console.log(sales);
