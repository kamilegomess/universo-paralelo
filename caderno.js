(function(){
  const path=location.pathname;
  const m=path.match(/fase([1-6])\.html/); const fase=m?Number(m[1]):0;
  if(!fase) return;
  const esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const style=document.createElement('style');
  style.textContent=`#up-home{position:fixed;left:22px;top:16px;display:flex;align-items:center;gap:11px;color:#eee7e4;text-decoration:none;z-index:10000;font:bold 18px Arial,sans-serif;letter-spacing:-.2px}#up-home .logo{width:50px;height:50px;border:1px solid #a884d2;border-radius:50%;position:relative;display:grid;place-items:center;box-sizing:border-box;background:#080710;box-shadow:0 0 0 1px #2b2331 inset}#up-home .logo:before{content:'';width:30px;height:30px;border:1px solid #a884d2;transform:rotate(45deg);position:absolute;box-sizing:border-box}#up-home .logo:after{content:'✦';color:#eea9c8;font-size:20px;line-height:1;position:relative;transform:translateY(-1px)}#up-home:hover{color:#eea9c8}#up-home:hover .logo{border-color:#eea9c8;box-shadow:0 0 16px #a884d255}#up-home span{white-space:nowrap}.up-main-with-home{padding-top:85px!important}#up-caderno{position:fixed;right:22px;top:90px;width:265px;max-height:calc(100vh - 115px);overflow:auto;background:#100b18;border:1px solid #3a3040;box-shadow:0 14px 35px #0008;z-index:9999;color:#eee7e4;font:13px Arial,sans-serif}#up-caderno .head{padding:15px 16px;border-bottom:1px solid #3a3040;background:#171021;position:sticky;top:0}#up-caderno .head strong{display:block;color:#eea9c8;font:20px Georgia,serif}#up-caderno .head span{color:#a884d2;font-size:10px;letter-spacing:1.5px}#up-caderno .body{padding:14px 16px}#up-caderno h4{margin:12px 0 7px;color:#eea9c8;font-size:10px;letter-spacing:1.5px;text-transform:uppercase}#up-caderno ul{margin:0;padding-left:18px;line-height:1.6}#up-caderno li{margin:4px 0}#up-caderno .note{border-left:2px solid #a884d2;padding:8px 10px;margin-top:7px;background:#0d0912;line-height:1.55}@media(max-width:1050px){#up-caderno{position:relative;right:auto;top:auto;width:auto;max-height:none;margin:0 0 25px}body>main{max-width:900px!important}.up-main-with-home{padding-top:85px!important}}@media(max-width:600px){#up-home{left:14px;top:12px;gap:8px;font-size:16px}#up-home .logo{width:42px;height:42px}#up-home .logo:before{width:25px;height:25px}#up-home .logo:after{font-size:17px}main{padding-left:5%!important;padding-right:5%!important}}`;
  document.head.appendChild(style);

  const home=document.createElement('a');
  home.id='up-home';
  home.href='index.html';
  home.title='Voltar para o início — Universo Paralelo';
  home.setAttribute('aria-label','Voltar para o início — Universo Paralelo');
  home.innerHTML='<div class="logo" aria-hidden="true"></div><span>Universo Paralelo</span>';
  document.body.appendChild(home);
  const main=document.querySelector('main');
  if(main) main.classList.add('up-main-with-home');

  const facts={
    1:['Luciano e Marisa morreram por envenenamento.','O veneno foi ingerido durante o jantar.','As taças encontradas no apartamento estavam limpas.','O casal chegou em casa por volta das 23h.','Ana comunicou à polícia que Luciano não havia aparecido para os compromissos.'],
    2:['Luciano e Marisa morreram por envenenamento.','O veneno foi ingerido durante o jantar.','As taças encontradas no apartamento estavam limpas.','Ana organizou a reserva do jantar.','Ana recebia ligações silenciosas havia cerca de um mês.'],
    3:['O veneno foi ingerido durante o jantar.','As taças do apartamento não foram a fonte do veneno.','Ana, Hortência, Maristela e Marcos estão entre os suspeitos.','Luana foi descoberta como uma pessoa importante para a investigação.'],
    4:['O jantar aconteceu antes do retorno ao apartamento.','Luciano e Marisa chegaram por volta das 23h.','Eles tomaram banho e depois beberam vinho no apartamento.','A morte foi estimada por volta das 4h.','Não houve sinais de invasão ou violência física.'],
    5:['O veneno foi ingerido durante o jantar.','O crime foi direcionado a uma pessoa específica.','A investigação está tentando reconstruir quem planejou, quem tornou o plano possível e quem executou.'],
    6:['Marisa era o alvo original.','Maristela planejou o crime.','Ana forneceu informação e acesso.','Hortência executou a parte prática.','Luciano morreu junto porque também bebeu o vinho.']
  };
  const panel=document.createElement('aside'); panel.id='up-caderno';
  function render(){
    let html=`<div class="head"><strong>📓 Caderno</strong><span>DO INVESTIGADOR · FASE ${String(fase).padStart(2,'0')}</span></div><div class="body">`;
    html+='<h4>Fatos confirmados</h4><ul>'+facts[fase].map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>';
    const sus=localStorage.getItem('up001_suspect');
    if(sus){html+='<h4>Linha investigada</h4><div class="note">'+esc(sus)+'</div>'}
    const domLog=[...document.querySelectorAll('#log .entry')].map(x=>x.innerText.split('\n')[0]).filter(Boolean);
    const stored=JSON.parse(sessionStorage.getItem('up001_conn_log')||'[]');
    const logs=domLog.length?domLog:stored.map(x=>x.pair||x);
    if(logs.length){html+='<h4>Conexões investigadas</h4>'+logs.map(x=>'<div class="note">'+esc(x)+'</div>').join('')}
    const alvo=localStorage.getItem('up001_alvo');
    if(alvo){html+='<h4>Hipótese</h4><div class="note">🎯 Alvo escolhido: <b>'+esc(alvo)+'</b></div>'}
    let t={}; try{t=JSON.parse(localStorage.getItem('up001_teoria')||'{}')}catch(e){}
    if(Object.keys(t).length){html+='<h4>Minha teoria</h4><div class="note">🎯 Alvo: '+esc(t.alvo||'—')+'<br>🧠 Planejamento: '+esc(t.planejou||'—')+'<br>🔗 Informação/acesso: '+esc(t.ponte||'—')+'<br>🍷 Execução: '+esc(t.executou||'—')+'</div>'}
    if(fase===6){html+='<h4>Estrutura revelada</h4><div class="note">Maristela → Ana → Hortência → Marisa<br><span style="color:#a99cac">Luciano: vítima não planejada.</span></div>'}
    html+='</div>'; panel.innerHTML=html;
  }
  render();
  document.body.appendChild(panel);
  window.addEventListener('storage',render);
  setInterval(render,700);
})();
