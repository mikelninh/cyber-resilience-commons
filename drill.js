export const DRILL_ROLES = [
  {id:'lead',label:'Incident lead',prompt:'Coordinate priorities, owners and decisions.'},
  {id:'it',label:'IT / security',prompt:'Contain access, systems, sessions and technical spread.'},
  {id:'ops',label:'Operations',prompt:'Protect critical services and workable fallbacks.'},
  {id:'comms',label:'Communications',prompt:'Keep staff, partners and affected people informed without guessing.'},
  {id:'privacy',label:'Privacy / legal',prompt:'Track sensitive-data exposure, obligations and evidence.'}
]

export function buildInjects(scenario){
  return scenario.steps.map((step,index)=>({
    id:`${scenario.id}-${index+1}`,
    number:index+1,
    title:step.title,
    detail:step.detail,
    question:index===0
      ? 'What do you do in the first 15 minutes, and who owns each action?'
      : 'What changed? What do you contain now, what must keep running, and who needs to know?',
    reflection:step.blockedBy
      ? `After the team responds, discuss whether a real ${step.blockedBy} control would stop or reduce this step — and what evidence would prove it.`
      : 'This inject is an assumed foothold. Discuss how quickly the team could detect, isolate and work around it.'
  }))
}

export function createDrill(scenario){
  return {scenarioId:scenario.id,revealed:0,decisions:[],started:false,finished:false}
}

export function startDrill(state){
  return {...state,started:true,revealed:Math.max(1,state.revealed)}
}

export function recordDecision(state,{role,text,injectNumber}){
  const clean=String(text||'').trim()
  if(!clean) return state
  return {...state,decisions:[...state.decisions,{role:role||'team',text:clean,injectNumber:Number(injectNumber)||state.revealed}]}
}

export function advanceDrill(state,totalInjects){
  if(!state.started) return state
  if(state.revealed>=totalInjects) return {...state,finished:true}
  return {...state,revealed:state.revealed+1}
}

export function restartDrill(scenario){ return createDrill(scenario) }

export function buildAfterAction({template,scenario,state,catalog}){
  const injects=buildInjects(scenario)
  const lines=[
    '# Cyber Resilience Commons — Tabletop After-Action Review','',
    `**Organization model:** ${template.label}`,
    `**Scenario:** ${scenario.label}`,
    `**Injects revealed:** ${state.revealed}/${injects.length}`,
    '',
    '> This report comes from a synthetic tabletop exercise. It is not a penetration test, audit, certification, or evidence that a real organization is secure or vulnerable.','',
    '## Decisions and observations',''
  ]
  if(!state.decisions.length) lines.push('- No decisions were recorded.')
  for(const d of state.decisions){
    const inject=injects[Math.max(0,d.injectNumber-1)]
    lines.push(`### Inject ${d.injectNumber}: ${inject?.title||'Incident update'}`,'',`**${roleLabel(d.role)}:** ${d.text}`,'')
  }
  lines.push('## Facilitator review','')
  for(const inject of injects.slice(0,state.revealed)){
    lines.push(`- **${inject.title}:** ${inject.reflection}`)
  }
  lines.push('','## Convert assumptions into evidence','')
  const controls=[...new Set(scenario.steps.map(x=>x.blockedBy).filter(Boolean))]
  for(const key of controls){
    const c=catalog[key]
    if(c) lines.push(`- **${c.label}:** ${c.prove||c.why}`)
  }
  lines.push('','## After-action questions','',
    '- Which decision took too long or had no clear owner?',
    '- Which critical service needs a documented manual fallback?',
    '- Which access or session could not be revoked quickly?',
    '- Which control is claimed but not recently proven?',
    '- What one improvement will we implement and retest first?',
    '',
    'Real-world technical validation must only be performed in systems the tester owns or is explicitly authorized to assess.',''
  )
  return lines.join('\n')
}

function roleLabel(id){ return DRILL_ROLES.find(x=>x.id===id)?.label||'Team' }
