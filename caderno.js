(function(){
  const path=location.pathname;
  const m=path.match(/fase([1-6])\.html/); const fase=m?Number(m[1]):0;
  if(!fase) return;
  const esc=s=>String(s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',"'":'&#39;'}[c]));
  const style=document.createElement('style');
  style.textContent=`#up-caderno{position:fixed;right:22px;top:90px;width:265px;max-height:calc(100vh - 115px);overflow:auto;background:#100b18;border:1px solid #3a3040;box-shadow:0 14px 35px #0008;z-index:9999;color:#eee7e4;font:13px Arial,sans-serif}#up-caderno .head{padding:15px 16px;border-bottom:1px solid #3a3040;background:#171021;position:sticky;top:0}#up-caderno .head strong{display:block;color:#eea9c8;font:20px Georgia,serif}#up-caderno .head span{color:#a884d2;font-size:10px;letter-spacing:1.5px}#up-caderno .body{padding:14px 16px}#up-caderno h4{margin:12px 0 7px;color:#eea9c8;font-size:10px;letter-spacing:1.5px;text-transform:uppercase}#up-caderno ul{margin:0;padding-left:18px;line-height:1.6}#up-caderno li{margin:4px 0}#up-caderno .note{border-left:2px solid #a884d2;padding:8px 10px;margin-top:7px;background:#0d0912;line-height:1.55}#up-caderno .empty{color:#a99cac;font-style:italic;line-height:1.5}@media(max-width:1050px){#up-caderno{position:relative;right:auto;top:auto;width:auto;max-height:none;margin:0 0 25px}body>main{max-width:900px!important}}`;
  document.head.appendChild(style);
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
    const logs=JSON.parse(sessionStorage.getItem('up001_conn_log')||'[]');
    if(logs.length){html+='<h4>Conexões investigadas</h4>'+logs.map(x=>'<div class="note">'+esc(x.pair||x)+'</div>').join('')}
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
