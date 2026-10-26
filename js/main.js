// ---------- Router (hash tokens) ----------
const subOf={baihoc:'kienthuc',bai1:'kienthuc',nhandien:'kienthuc',video:'kienthuc',tinhuong:'kienthuc'};
function route(){
  let h=(location.hash||'#home').slice(1);
  if(!document.querySelector(`[data-view="${h}"]`)) h='home';
  document.querySelectorAll('.view').forEach(v=>v.classList.toggle('on',v.dataset.view===h));
  const navKey=subOf[h]||(h==='khaosat'?'khaosat':h==='home'?'home':h);
  const map={home:'home',kienthuc:'kienthuc',trochoi:'trochoi',bando:'bando',trola:'trola',khaosat:'khaosat',gioithieu:'gioithieu'};
  document.querySelectorAll('#nav a[data-nav]').forEach(a=>a.classList.toggle('on',a.dataset.nav===(subOf[h]||map[h])));
  window.scrollTo({top:0,behavior:'instant'});
  if(h==='bai1')renderTF();
  if(h==='home')countUp();
}
addEventListener('hashchange',route);

// ---------- Counters ----------
let counted=false;
function countUp(){
  if(counted)return;counted=true;
  document.querySelectorAll('[data-count]').forEach(el=>{
    const t=+el.dataset.count;let n=0;const step=()=>{n+=Math.ceil(t/40);if(n>=t){el.textContent=t+'+';return}el.textContent=n;requestAnimationFrame(step)};step();
  });
}

// ---------- Bài 1: infographic + true/false ----------
document.querySelectorAll('#info .part').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('#info .part').forEach(x=>x.classList.remove('open'));
  b.classList.add('open');document.getElementById('infoBox').textContent=b.dataset.i;
});
const TF=[
  {q:'Nước xoáy mạnh là nơi an toàn để bơi.',a:false,e:'Nước xoáy kéo người xuống rất nhanh, tuyệt đối không xuống.'},
  {q:'Mép ao dốc đứng có thể khiến bạn trượt chân xuống nước sâu.',a:true,e:'Đúng, mép dốc rất dễ trượt, nên tránh đứng gần mép.'},
  {q:'Nước đục thì luôn nông nên an toàn.',a:false,e:'Không thể đoán độ sâu khi nước đục. Có thể có hố sâu hoặc vật cản.'}
];
function renderTF(){
  const box=document.getElementById('tf');
  box.innerHTML=TF.map((t,i)=>`<div style="margin-bottom:14px"><p><b>${i+1}. ${t.q}</b></p><div class="quiz-opt"><label><input type="radio" name="tf${i}" value="1">Đúng</label><label><input type="radio" name="tf${i}" value="0">Sai</label></div><div class="result" id="tfr${i}"></div></div>`).join('')+'<button class="btn" onclick="checkTF()">Kiểm tra</button>';
  document.querySelectorAll('#tf input').forEach(inp=>inp.onchange=()=>{});
}
function checkTF(){
  let s=0;TF.forEach((t,i)=>{const v=document.querySelector(`input[name=tf${i}]:checked`);const el=document.getElementById('tfr'+i);
    if(!v){el.textContent='Chưa chọn';el.className='result';return}
    const ok=(v.value==='1')===t.a;if(ok)s++;el.className='result '+(ok?'ok':'bad');el.textContent=(ok?'✔ Đúng. ':'✘ Chưa đúng. ')+t.e;});
  alert(`Bạn đúng ${s}/${TF.length} câu`);
}

// ---------- Nhận diện nguy cơ ----------
const SCENES={
  ao:{bg:'linear-gradient(#bfe9f5 0 35%,#2f8fb5 35% 85%,#c9b27c 85%)',spots:[['🧒',20,60,'Trẻ em chơi một mình gần mép ao'],['🪵',60,70,'Khúc gỗ trôi sát mép nước'],['🚫',80,25,'Không có biển cảnh báo'],['🛶',40,45,'Thuyền không có áo phao']]},
  suoi:{bg:'linear-gradient(#cfeee9 0 30%,#1f7fa8 30% 90%,#8c7a55 90%)',spots:[['🌧️',15,20,'Mưa lớn, nước suối đang dâng'],['🪨',50,55,'Đá trơn rêu dưới chân'],['🌀',75,60,'Chỗ nước xoáy'],['🏊',30,70,'Bơi một mình không có người lớn']]},
  truong:{bg:'linear-gradient(#e9f7ff 0 40%,#3ab3d6 40% 85%,#d9c9a3 85%)',spots:[['🏊',25,60,'Bể bơi không có giám sát'],['🚪',70,35,'Cửa bể bơi để mở'],['🧃',50,20,'Vật nổi để không đúng chỗ'],['🏃',85,70,'Chạy nhảy quanh bờ bể']]}
};
const LVL=['Dễ','Vừa','Khó'];
let sceneKey='ao',found=0,score=0,timer=null,left=60,lvl=0;
function setScene(k){sceneKey=k;drawScene();}
function drawScene(){
  const s=SCENES[sceneKey];const sc=document.getElementById('scene');
  sc.style.background=s.bg;sc.innerHTML='';
  s.spots.forEach((p,i)=>{const b=document.createElement('button');b.className='spot';b.style.left=p[1]+'%';b.style.top=p[2]+'%';b.textContent=p[0];b.dataset.i=i;
    b.onclick=()=>{if(b.classList.contains('found')||!timer)return;b.classList.add('found');found++;score+=10*(lvl+1);
      document.getElementById('hint').textContent='✔ '+p[3];document.getElementById('score').textContent=score;
      if(found===s.spots.length)endScene(true);};sc.appendChild(b);});
}
function startScene(){
  clearInterval(timer);found=0;score=0;left=60;lvl=0;
  document.getElementById('score').textContent=0;document.getElementById('lvl').textContent=LVL[0];
  drawScene();clock(60);
  timer=setInterval(()=>{left--;clock(left);if(left<=0)endScene(false)},1000);
  document.getElementById('hint').textContent='Chạm vào điểm nguy hiểm!';
}
function clock(v){document.getElementById('clock').textContent=v;}
function endScene(win){
  clearInterval(timer);timer=null;
  document.getElementById('hint').textContent=win?`Hoàn thành! Điểm: ${score}. Thử lại với độ khó cao hơn nhé.`:'Hết giờ! Hãy thử lại và quan sát kỹ hơn.';
  if(win&&lvl<2){lvl++;document.getElementById('lvl').textContent=LVL[lvl];}
}

// ---------- Em làm cho cảnh an toàn ----------
const FIX={
  items:[{id:'nap',n:'🛟 Phao cứu sinh',ok:'zone1'},{id:'rao',n:'🚧 Rào chắn',ok:'zone2'},{id:'bien',n:'🪧 Biển cảnh báo',ok:'zone3'},{id:'nap2',n:'🧱 Nắp đậy giếng',ok:'zone4'}],
  zones:[{id:'zone1',n:'Gần bể/ao (phao ở bờ)'},{id:'zone2',n:'Mép ao dốc'},{id:'zone3',n:'Lối vào khu nước'},{id:'zone4',n:'Giếng nước'}]
};
let sel=null,placed={},risk=100;
function resetFix(){sel=null;placed={};risk=100;renderFix();}
function renderFix(){
  document.getElementById('items').innerHTML=FIX.items.filter(i=>!Object.values(placed).includes(i.id)).map(i=>`<div class="item ${sel===i.id?'sel':''}" onclick="pick('${i.id}')">${i.n}</div>`).join('');
  document.getElementById('zones').innerHTML=FIX.zones.map(z=>{const it=placed[z.id];const v=it?FIX.items.find(x=>x.id===it).n:'Chạm để đặt';return `<div class="zone ${it?'filled':''}" onclick="drop('${z.id}')">${z.n}<br><b>${v}</b></div>`}).join('');
  document.getElementById('risk').style.width=risk+'%';
}
function pick(id){sel=sel===id?null:id;renderFix();}
function drop(zid){
  if(!sel||placed[zid])return;
  placed[zid]=sel;
  const it=FIX.items.find(i=>i.id===sel);
  if(it.ok===zid){risk-=25;document.getElementById('fixRes').className='result ok';document.getElementById('fixRes').textContent='✔ Đặt đúng! Nguy cơ giảm.';}
  else{risk+=0;document.getElementById('fixRes').className='result bad';document.getElementById('fixRes').textContent='✘ Chưa phù hợp vị trí này, thử vị trí khác.';delete placed[zid];}
  sel=null;renderFix();
  if(risk<=0){document.getElementById('fixRes').textContent='🎉 Cảnh đã an toàn!';}
}
renderFix();

// ---------- Video quiz ----------
const VQ=[
  [{q:'Khi thấy khu vực nước sâu chưa có biển cảnh báo, em nên làm gì?',o:['Xuống thử','Tránh xa và báo người lớn','Chụp ảnh đăng mạng'],a:1}],
  [{q:'Khi bị trượt chân xuống nước, việc đầu tiên là gì?',o:['Giữ bình tĩnh, thả lỏng, nổi lên','Vùng vẫy mạnh','Kêu cứu liên tục rồi chìm'],a:0}],
  [{q:'Sau khi cứu người lên bờ, nếu nạn nhân không thở, em nên làm gì?',o:['Để nằm yên','Gọi cấp cứu và hô hấp nhân tạo nếu được đào tạo','Đấm vào lưng'],a:1}]
];
function openQuiz(i){
  const box=document.getElementById('vquiz');box.style.display='block';
  box.innerHTML=`<h3>Trắc nghiệm video ${i+1}</h3>`+VQ[i].map((t,j)=>`<p><b>${t.q}</b></p>`+t.o.map((o,k)=>`<div class="quiz-opt"><label><input type="radio" name="vq${j}" value="${k}">${o}</label></div>`).join('')+`<div class="result" id="vqr${j}"></div>`).join('')+`<button class="btn" onclick="checkV(${i})">Nộp bài</button>`;
  box.scrollIntoView({behavior:'smooth'});
}
function checkV(i){
  VQ[i].forEach((t,j)=>{const v=document.querySelector(`input[name=vq${j}]:checked`);const el=document.getElementById('vqr'+j);
    if(!v){el.textContent='Chưa chọn';return}el.className='result '+(+v.value===t.a?'ok':'bad');el.textContent=+v.value===t.a?'✔ Chính xác':'✘ Xem lại video nhé';});
}

// ---------- Khảo sát ----------
function submitSurvey(k){
  const ids=k==='pre'?['p1','p2','p3']:['s1','s2','s3','s4'];
  const vals=ids.map(i=>document.querySelector(`input[name="${i}"]:checked`)?.value||'');
  const el=document.getElementById(k+'Res');
  const form=el.closest('.survey-card');
  if(vals.some(v=>!v)){el.className='result bad';el.textContent='🌱 Còn câu chưa chọn, thử trả lời nốt nhé!';form.classList.remove('survey-complete');return}
  el.className='result ok';el.textContent='🎉 Tuyệt vời! Cảm ơn bạn đã chia sẻ nhé! (Bản xem trước: chưa lưu dữ liệu)';
  form.classList.add('survey-complete');
}

// ---------- Trợ lý AI ----------
const KB=[
  {k:['cứu','đuối','giúp'],a:'Nhìn – Gọi – Ném – Chèo: hô người lớn, ném phao hoặc vật nổi, chèo bằng gậy/cành cây. Không nhảy xuống nếu không được đào tạo.',m:'alert'},
  {k:['trẻ em','bơi ở đâu','bể bơi'],a:'Trẻ em chỉ nên bơi ở bể có cứu hộ và người lớn giám sát, luôn mặc áo phao đúng cỡ.',m:'happy'},
  {k:['sặc'],a:'Đặt người bị sặc nằm nghiêng, vỗ nhẹ lưng. Nếu không thở hoặc tím tái, gọi cấp cứu ngay.',m:'alert'},
  {k:['chuột rút'],a:'Giữ bình tĩnh, thả lỏng, kéo nhẹ cơ bị chuột rút và nổi lên. Gọi người gần đó hỗ trợ.',m:'worried'},
];
let lastAns='Xin chào! Hỏi mình bất cứ điều gì về phòng chống đuối nước nhé.';
function setMood(m){const el=document.getElementById('mascot');el.className='mascot '+(m||'');el.textContent={alert:'😨',happy:'😄',worried:'😟'}[m]||'🙂';}
function addMsg(t,who){const c=document.getElementById('chat');const d=document.createElement('div');d.className='msg '+who;d.textContent=t;c.appendChild(d);c.scrollTop=c.scrollHeight;}
function ask(text){
  const q=(text||document.getElementById('q').value).trim();if(!q)return;
  document.getElementById('q').value='';addMsg(q,'me');
  const low=q.toLowerCase();
  const hit=KB.find(x=>x.k.some(k=>low.includes(k)));
  const ans=hit?hit.a:'Mình chưa có thông tin cho câu hỏi này. Bạn hãy thử hỏi về cứu người, trẻ em bơi, sơ cứu sặc nước hoặc chuột rút. Khẩn cấp, gọi 113 hoặc 115.';
  setTimeout(()=>{addMsg(ans,'bot');lastAns=ans;document.getElementById('mood').textContent=ans.slice(0,60)+'…';setMood(hit?hit.m:'worried');},300);
}
function speakLast(){
  if(!('speechSynthesis' in window)){alert('Trình duyệt không hỗ trợ đọc to.');return}
  speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(lastAns);u.lang='vi-VN';speechSynthesis.speak(u);
}
function listen(){
  const R=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!R){alert('Trình duyệt không hỗ trợ nhập bằng giọng nói. Hãy gõ câu hỏi.');return}
  const r=new R();r.lang='vi-VN';document.getElementById('mic').textContent='●';
  r.onresult=e=>{document.getElementById('q').value=e.results[0][0].transcript;ask()};
  r.onend=()=>document.getElementById('mic').textContent='🎤';
  r.start();
}
addMsg(lastAns,'bot');

// ---------- Init ----------
route();
