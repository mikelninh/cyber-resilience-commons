import {TEMPLATES,SCENARIOS,CONTROL_CATALOG} from './data.js'
import {DRILL_ROLES,buildInjects,createDrill,startDrill,recordDecision,advanceDrill,restartDrill,buildAfterAction} from './drill.js'
import {cloneMap,loadStoredMap,dependencyContext} from './dependency-map.js'

const $=s=>document.querySelector(s)
const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]))
let template=TEMPLATES[0]
let scenario=SCENARIOS[0]
let state=createDrill(scenario)
let dependencyMap=resolveMap()
let mapContext=dependencyContext(dependencyMap)

function options(items,label){ return items.map(x=>`<option value="${x.id}">${esc(x[label])}</option>`).join('') }

function resolveMap(){
  return loadStoredMap(template.id)||cloneMap(template.id)
}

function refreshMapContext(){
  dependencyMap=resolveMap()
  mapContext=dependencyContext(dependencyMap)
}

function init(){
  $('#template').innerHTML=options(TEMPLATES,'label')
  $('#scenario').innerHTML=options(SCENARIOS,'label')
  $('#role').innerHTML=DRILL_ROLES.map(r=>`<option value="${r.id}">${esc(r.label)}</option>`).join('')
  $('#roles').innerHTML=DRILL_ROLES.map(r=>`<div class="roleCard"><b>${esc(r.label)}</b><small>${esc(r.prompt)}</small></div>`).join('')
  $('#template').onchange=()=>{template=TEMPLATES.find(x=>x.id===$('#template').value)||TEMPLATES[0];refreshMapContext();resetState()}
  $('#scenario').onchange=()=>{scenario=SCENARIOS.find(x=>x.id===$('#scenario').value)||SCENARIOS[0];resetState()}
  $('#start').onclick=()=>{refreshMapContext();state=startDrill(state);render()}
  $('#next').onclick=()=>{
    state=recordDecision(state,{role:$('#role').value,text:$('#decision').value,injectNumber:state.revealed})
    $('#decision').value=''
    state=advanceDrill(state,scenario.steps.length)
    render()
  }
  $('#skip').onclick=()=>{state=advanceDrill(state,scenario.steps.length);render()}
  $('#restart').onclick=()=>{refreshMapContext();resetState();state=startDrill(state);render()}
  $('#downloadReport').onclick=downloadReport
  addEventListener('storage',event=>{if(event.key?.startsWith('crc:dependency-map:')){refreshMapContext();render()}})
  render()
}

function resetState(){ state=restartDrill(scenario);render() }

function render(){
  const injects=buildInjects(scenario,mapContext)
  renderMapContext()
  $('#waiting').hidden=state.started
  $('#active').hidden=!state.started
  if(!state.started){
    $('#finish').classList.remove('show')
    renderLog(injects)
    return
  }

  const index=Math.min(Math.max(state.revealed-1,0),injects.length-1)
  const inject=injects[index]
  $('#progress').textContent=`Inject ${Math.min(state.revealed,injects.length)} of ${injects.length}`
  $('#orgName').textContent=template.label
  $('#injectTitle').textContent=inject.title
  $('#injectDetail').textContent=inject.detail
  $('#injectQuestion').textContent=inject.question

  const done=state.finished
  $('#finish').classList.toggle('show',done)
  $('#next').disabled=done
  $('#skip').disabled=done
  $('#decision').disabled=done
  $('#role').disabled=done
  if(done){
    $('#progress').textContent=`Complete · ${injects.length}/${injects.length} injects`
  }
  renderLog(injects)
}

function renderMapContext(){
  const source=mapContext.custom?'Saved local map':'Template map'
  $('#mapContext').innerHTML=`<div class="contextHead"><div><small>${esc(source)}</small><b>Dependency context</b></div><a href="./map.html?template=${encodeURIComponent(template.id)}">Edit map ↗</a></div>
    <div class="contextRows">
      <div><span>Critical</span><b>${esc(mapContext.critical.slice(0,3).join(' · ')||'None declared')}</b></div>
      <div><span>Vendors</span><b>${esc(mapContext.vendors.slice(0,2).join(' · ')||'None declared')}</b></div>
      <div><span>Owners</span><b>${esc(mapContext.owners.slice(0,2).join(' · ')||'None declared')}</b></div>
    </div>
    ${mapContext.unownedCritical.length?`<div class="contextGap">Ownership gap: ${esc(mapContext.unownedCritical.join(', '))}</div>`:''}`
}

function renderLog(injects){
  if(!state.decisions.length){
    $('#log').innerHTML='<div class="emptyLog">Decisions you record during the exercise stay in this browser session and appear here.</div>'
    return
  }
  $('#log').innerHTML=state.decisions.map((d,i)=>{
    const role=DRILL_ROLES.find(r=>r.id===d.role)?.label||'Team'
    const inject=injects[Math.max(0,d.injectNumber-1)]
    return `<div class="logEntry"><small>Decision ${i+1} · inject ${d.injectNumber}</small><b>${esc(role)}</b><p>${esc(d.text)}</p><small>${esc(inject?.title||'')}</small></div>`
  }).join('')
}

function downloadReport(){
  const body=buildAfterAction({template,scenario,state,catalog:CONTROL_CATALOG,dependencyContext:mapContext})
  const blob=new Blob([body],{type:'text/markdown;charset=utf-8'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a')
  a.href=url
  a.download='cyber-resilience-tabletop-after-action.md'
  a.click()
  setTimeout(()=>URL.revokeObjectURL(url),500)
}

init()
