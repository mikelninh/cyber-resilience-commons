import {TEMPLATES} from './data.js'
import {
  NODE_TYPES,RELATION_TYPES,cloneMap,addNode,updateNode,removeNode,addEdge,removeEdge,
  traceDependencies,summarizeMap,mapToMarkdown,loadStoredMap,saveStoredMap,clearStoredMap
} from './dependency-map.js'

const $=s=>document.querySelector(s)
let templateId=new URLSearchParams(location.search).get('template')||'city'
if(!TEMPLATES.some(t=>t.id===templateId)) templateId='city'
let map=loadStoredMap(templateId)||cloneMap(templateId)
let selectedId=null
let traceResult=null

const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]))
const labelFor=id=>map.nodes.find(n=>n.id===id)?.label||id
const typeOrder=Object.keys(NODE_TYPES)

function init(){
  $('#template').innerHTML=TEMPLATES.map(t=>`<option value="${esc(t.id)}">${esc(t.label)}</option>`).join('')
  $('#template').value=templateId
  $('#newType').innerHTML=Object.entries(NODE_TYPES).map(([id,t])=>`<option value="${id}">${esc(t.label)}</option>`).join('')
  $('#edgeRelation').innerHTML=Object.entries(RELATION_TYPES).map(([id,r])=>`<option value="${id}">${esc(r.label)}</option>`).join('')
  $('#template').onchange=()=>switchTemplate($('#template').value)
  $('#trace').onclick=()=>{traceResult=traceDependencies(map,$('#traceStart').value);render()}
  $('#save').onclick=save
  $('#download').onclick=download
  $('#reset').onclick=reset
  $('#addNode').onclick=addNewNode
  $('#addEdge').onclick=addNewEdge
  render()
}

function switchTemplate(id){
  templateId=id
  map=loadStoredMap(id)||cloneMap(id)
  selectedId=null
  traceResult=null
  const u=new URL(location.href);u.searchParams.set('template',id);history.replaceState({},'',u)
  render()
}

function render(){
  summarizeMap(map)
  $('#mapTitle').textContent=map.label
  $('#nodeCount').textContent=map.nodes.length
  $('#edgeCount').textContent=map.edges.length
  $('#saveState').textContent=map.updatedAt?`Saved locally · ${new Date(map.updatedAt).toLocaleString()}`:map.custom?'Edited locally · save to keep changes':'Template baseline · not saved'
  fillNodeSelects()
  renderGraph()
  renderEditor()
  renderRelations()
  renderTrace()
}

function fillNodeSelects(){
  const sorted=[...map.nodes].sort((a,b)=>NODE_TYPES[a.type].order-NODE_TYPES[b.type].order || a.label.localeCompare(b.label))
  const opts=sorted.map(n=>`<option value="${esc(n.id)}">${esc(NODE_TYPES[n.type].label)} · ${esc(n.label)}</option>`).join('')
  for(const id of ['traceStart','edgeFrom','edgeTo']){
    const prev=$(`#${id}`).value
    $(`#${id}`).innerHTML=opts
    if(sorted.some(n=>n.id===prev)) $(`#${id}`).value=prev
  }
}

function positions(){
  const groups=Object.fromEntries(typeOrder.map(t=>[t,map.nodes.filter(n=>n.type===t)]))
  const max=Math.max(1,...Object.values(groups).map(g=>g.length))
  const height=Math.max(500,135+max*118)
  const out={}
  const xs={identity:110,service:340,data:570,vendor:800,owner:1030}
  for(const type of typeOrder){
    groups[type].forEach((node,i)=>{out[node.id]={x:xs[type],y:92+i*112,w:180,h:74}})
  }
  return {out,height}
}

function splitLabel(value,max=22){
  const words=String(value).split(/\s+/);const lines=[];let line=''
  for(const word of words){
    const next=line?`${line} ${word}`:word
    if(next.length>max && line){lines.push(line);line=word}else line=next
  }
  if(line) lines.push(line)
  return lines.slice(0,2)
}

function renderGraph(){
  const {out:pos,height}=positions()
  const svg=$('#graph')
  svg.setAttribute('viewBox',`0 0 1160 ${height}`)
  svg.setAttribute('height',height)
  const highlightedNodes=new Set(traceResult?.nodeIds||[])
  const highlightedEdges=new Set(traceResult?.edgeIds||[])
  const xs={identity:110,service:340,data:570,vendor:800,owner:1030}
  const laneLabels=typeOrder.map(type=>`<text class="laneLabel" x="${xs[type]}" y="38" text-anchor="middle">${esc(NODE_TYPES[type].label)}</text>`).join('')
  const edges=map.edges.map(edge=>{
    const a=pos[edge.from],b=pos[edge.to];if(!a||!b) return ''
    const x1=a.x+a.w/2,y1=a.y+a.h/2,x2=b.x-b.w/2,y2=b.y+b.h/2
    const dx=Math.max(55,Math.abs(x2-x1)*.42)
    const path=`M ${x1} ${y1} C ${x1+Math.sign(x2-x1||1)*dx} ${y1}, ${x2-Math.sign(x2-x1||1)*dx} ${y2}, ${x2} ${y2}`
    const classes=['edge',edge.relation==='owns'?'ownership':'',highlightedEdges.has(edge.id)?'trace':''].filter(Boolean).join(' ')
    return `<path class="${classes}" d="${path}" marker-end="url(#arrow)"><title>${esc(labelFor(edge.from))} — ${esc(RELATION_TYPES[edge.relation]?.label||edge.relation)} → ${esc(labelFor(edge.to))}</title></path>`
  }).join('')
  const nodes=map.nodes.map(node=>{
    const p=pos[node.id]; const lines=splitLabel(node.label)
    const classes=['node',selectedId===node.id?'selected':'',highlightedNodes.has(node.id)?'trace':'',node.criticality==='critical'?'critical':''].filter(Boolean).join(' ')
    return `<g class="${classes}" data-node="${esc(node.id)}" transform="translate(${p.x-p.w/2} ${p.y})" tabindex="0" role="button" aria-label="${esc(node.label)}">
      <rect width="${p.w}" height="${p.h}" rx="12"></rect>
      <text class="type" x="12" y="17">${esc(NODE_TYPES[node.type].label)}</text>
      <text class="label" x="12" y="36">${esc(lines[0]||'')}</text>
      ${lines[1]?`<text class="label" x="12" y="49">${esc(lines[1])}</text>`:''}
      <text class="crit" x="12" y="65">${esc(node.criticality||'medium')}</text>
    </g>`
  }).join('')
  svg.innerHTML=`<defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#9aa69f"></path></marker></defs>${laneLabels}${edges}${nodes}`
  svg.querySelectorAll('[data-node]').forEach(el=>{
    el.onclick=()=>{selectedId=el.dataset.node;render()}
    el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();selectedId=el.dataset.node;render()}}
  })
}

function renderEditor(){
  const node=map.nodes.find(n=>n.id===selectedId)
  if(!node){
    $('#nodeEditor').className='emptyInspector'
    $('#nodeEditor').innerHTML='Click any node in the graph to rename it, change criticality, add planning notes or remove it.'
    return
  }
  $('#nodeEditor').className=''
  $('#nodeEditor').innerHTML=`<h3>${esc(node.label)}</h3>
    <div class="field"><label>Label<input id="editLabel" value="${esc(node.label)}"></label></div>
    <div class="fieldRow"><div class="field"><label>Type<select id="editType">${Object.entries(NODE_TYPES).map(([id,t])=>`<option value="${id}" ${id===node.type?'selected':''}>${esc(t.label)}</option>`).join('')}</select></label></div>
    <div class="field"><label>Criticality<select id="editCriticality">${['low','medium','high','critical'].map(v=>`<option ${v===node.criticality?'selected':''}>${v}</option>`).join('')}</select></label></div></div>
    <div class="field"><label>Planning notes<textarea id="editNotes" placeholder="No secrets — just planning context.">${esc(node.notes||'')}</textarea></label></div>
    <div class="buttonRow"><button id="applyNode" class="primary">Apply changes</button><button id="deleteNode" class="danger">Delete node</button></div>`
  $('#applyNode').onclick=()=>{
    map=updateNode(map,node.id,{label:$('#editLabel').value.trim()||node.label,type:$('#editType').value,criticality:$('#editCriticality').value,notes:$('#editNotes').value.trim()})
    traceResult=null;render()
  }
  $('#deleteNode').onclick=()=>{map=removeNode(map,node.id);selectedId=null;traceResult=null;render()}
}

function renderRelations(){
  if(!map.edges.length){$('#relations').innerHTML='<div class="emptyInspector">No relationships yet.</div>';return}
  $('#relations').innerHTML=map.edges.map(edge=>`<div class="relationRow"><span><b>${esc(labelFor(edge.from))}</b><br>${esc(RELATION_TYPES[edge.relation]?.label||edge.relation)} → ${esc(labelFor(edge.to))}</span><button data-edge="${esc(edge.id)}">×</button></div>`).join('')
  $('#relations').querySelectorAll('[data-edge]').forEach(btn=>btn.onclick=()=>{map=removeEdge(map,btn.dataset.edge);traceResult=null;render()})
}

function renderTrace(){
  if(!traceResult){
    $('#traceBox').innerHTML='<h3>Choose a starting node.</h3><p>The trace shows downstream declared dependencies, not a claim that an attacker can traverse them.</p>'
    return
  }
  const ownerLabels=traceResult.ownerIds.map(labelFor)
  const gapLabels=traceResult.unownedCriticalIds.map(labelFor)
  const c=traceResult.counts
  $('#traceBox').innerHTML=`<h3>Connected planning scope from ${esc(labelFor(traceResult.startId))}</h3>
    <p>${traceResult.nodeIds.length} declared nodes sit downstream or at the starting point. Use this as a discussion prompt for containment, continuity and ownership.</p>
    <div class="traceStats">
      <div class="traceStat"><b>${c.identity||0}</b><span>identities</span></div><div class="traceStat"><b>${c.service||0}</b><span>services</span></div><div class="traceStat"><b>${c.data||0}</b><span>data sets</span></div><div class="traceStat"><b>${c.vendor||0}</b><span>vendors</span></div><div class="traceStat"><b>${traceResult.criticalIds.length}</b><span>critical nodes</span></div>
    </div>
    <div class="ownerStrip"><b>Accountable owners in scope:</b> ${ownerLabels.length?ownerLabels.map(esc).join(', '):'none declared'}.</div>
    <div class="ownerStrip"><b>Critical ownership gaps:</b> ${gapLabels.length?gapLabels.map(esc).join(', '):'none in this trace'}.</div>`
}

function addNewNode(){
  const label=$('#newLabel').value.trim()
  if(!label){$('#newLabel').focus();return}
  map=addNode(map,{type:$('#newType').value,label,criticality:$('#newCriticality').value})
  selectedId=map.nodes.at(-1).id
  $('#newLabel').value=''
  traceResult=null
  render()
}

function addNewEdge(){
  try{
    const before=map
    map=addEdge(map,{from:$('#edgeFrom').value,to:$('#edgeTo').value,relation:$('#edgeRelation').value})
    if(map!==before) traceResult=null
    render()
  }catch(error){alert(error.message)}
}

function save(){
  map=saveStoredMap(map)
  render()
}

function reset(){
  clearStoredMap(templateId)
  map=cloneMap(templateId)
  selectedId=null;traceResult=null
  render()
}

function download(){
  const body=mapToMarkdown(map)
  const blob=new Blob([body],{type:'text/markdown;charset=utf-8'})
  const url=URL.createObjectURL(blob)
  const a=document.createElement('a');a.href=url;a.download='cyber-resilience-dependency-map.md';a.click()
  setTimeout(()=>URL.revokeObjectURL(url),500)
}

init()
