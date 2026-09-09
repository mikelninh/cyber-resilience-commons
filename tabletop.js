import {TEMPLATES,SCENARIOS,CONTROL_CATALOG} from './data.js'
import {DRILL_ROLES,buildInjects,createDrill,startDrill,recordDecision,advanceDrill,restartDrill,buildAfterAction} from './drill.js'

const $=s=>document.querySelector(s)
let template=TEMPLATES[0]
let scenario=SCENARIOS[0]
let state=createDrill(scenario)

function options(items,label){ return items.map(x=>`<option value="${x.id}">${x[label]}</option>`).join('') }

function init(){
  $('#template').innerHTML=options(TEMPLATES,'label')
  $('#scenario').innerHTML=options(SCENARIOS,'label')
  $('#role').innerHTML=DRILL_ROLES.map(r=>`<option value="${r.id}">${r.label}</option>`).join('')
  $('#roles').innerHTML=DRILL_ROLES.map(r=>`<div class="roleCard"><b>${r.label}</b><small>${r.prompt}</small></div>`).join('')
  $('#template').onchange=()=>{template=TEMPLATES.find(x=>x.id===$('#template').value)||TEMPLATES[0];resetState()}
  $('#scenario').onchange=()=>{scenario=SCENARIOS.find(x=>x.id===$('#scenario').value)||SCENARIOS[0];resetState()}
  $('#start').onclick=()=>{state=startDrill(state);render()}
  $('#next').onclick=()=>{
    state=recordDecision(state,{role:$('#role').value,text:$('#decision').value,injectNumber:state.revealed})
    $('#decision').value=''
    state=advanceDrill(state,scenario.steps.length)
    render()
  }
  $('#skip').onclick=()=>{state=advanceDrill(state,scenario.steps.length);render()}
  $('#restart').onclick=()=>{resetState();state=startDrill(state);render()}
  $('#downloadReport').onclick=downloadReport
  render()
}

function resetState(){ state=restartDrill(scenario);render() }

function render(){
  const injects=buildInjects(scenario)
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

function renderLog(injects){
  if(!state.decisions.length){
    $('#log').innerHTML='<div class="emptyLog">Decisions you record during the exercise stay in this browser session and appear here.</div>'
    return
  }
  $('#log').innerHTML=state.decisions.map((d,i)=>{
    const role=DRILL_ROLES.find(r=>r.id===d.role)?.label||'Team'
    const inject=injects[Math.max(0,d.injectNumber-1)]
    return `<div class="logEntry"><small>Decision ${i+1} · inject ${d.injectNumber}</small><b>${role}</b><p>${escapeHtml(d.text)}</p><small>${inject?.title||''}</small></div>`
  }).join('')
}

function downloadReport(){
  const body=buildAfterAction({template,scenario,state,catalog:CONTROL_CATALOG})
  const blob=new Blob([body],{type:'text/markdown;charset=utf-8'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a')
  a.href=url
  a.download='cyber-resilience-tabletop-after-action.md'
  a.click()
  setTimeout(()=>URL.revokeObjectURL(url),500)
}

function escapeHtml(value){
  return String(value).replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]))
}

init()
