export const NODE_TYPES = {
  identity: {label:'Identity', order:0},
  service: {label:'Service', order:1},
  data: {label:'Data', order:2},
  vendor: {label:'Vendor', order:3},
  owner: {label:'Owner', order:4}
}

export const RELATION_TYPES = {
  uses: {label:'uses', propagates:true},
  handles: {label:'handles', propagates:true},
  depends_on: {label:'depends on', propagates:true},
  supports: {label:'supports / can access', propagates:true},
  owns: {label:'owns / is accountable for', propagates:false}
}

const SEEDS = {
  city: {
    label:'City / public administration',
    nodes:[
      ['city-staff','identity','Staff SSO identities','high'],
      ['city-admin','identity','Privileged admin identities','critical'],
      ['city-portal','service','Citizen service portal','critical'],
      ['city-cases','service','Document & case management','high'],
      ['city-citizen-data','data','Citizen records','critical'],
      ['city-workforce-data','data','Employee records','high'],
      ['city-msp','vendor','Managed IT provider','high'],
      ['city-saas','vendor','Case-management vendor','high'],
      ['city-digital','owner','Digital services team','high'],
      ['city-privacy','owner','Data protection office','high']
    ],
    edges:[
      ['city-staff','city-portal','uses'],['city-staff','city-cases','uses'],['city-admin','city-portal','uses'],['city-admin','city-cases','uses'],
      ['city-portal','city-citizen-data','handles'],['city-cases','city-citizen-data','handles'],['city-cases','city-workforce-data','handles'],
      ['city-portal','city-msp','depends_on'],['city-cases','city-saas','depends_on'],['city-msp','city-portal','supports'],['city-saas','city-cases','supports'],
      ['city-digital','city-portal','owns'],['city-digital','city-cases','owns'],['city-privacy','city-citizen-data','owns'],['city-privacy','city-workforce-data','owns']
    ]
  },
  hospital: {
    label:'Hospital / care provider',
    nodes:[
      ['hospital-clinician','identity','Clinical staff identities','critical'],
      ['hospital-admin','identity','Admin / privileged identities','high'],
      ['hospital-ehr','service','Electronic health record','critical'],
      ['hospital-lab','service','Scheduling & lab systems','critical'],
      ['hospital-patient','data','Patient clinical records','critical'],
      ['hospital-workforce','data','Workforce records','high'],
      ['hospital-ehr-vendor','vendor','EHR / clinical software vendor','critical'],
      ['hospital-integration','vendor','Medical integration partner','high'],
      ['hospital-clinical-it','owner','Clinical IT operations','critical'],
      ['hospital-privacy','owner','Privacy / data protection','high']
    ],
    edges:[
      ['hospital-clinician','hospital-ehr','uses'],['hospital-clinician','hospital-lab','uses'],['hospital-admin','hospital-ehr','uses'],
      ['hospital-ehr','hospital-patient','handles'],['hospital-lab','hospital-patient','handles'],['hospital-ehr','hospital-workforce','handles'],
      ['hospital-ehr','hospital-ehr-vendor','depends_on'],['hospital-lab','hospital-integration','depends_on'],
      ['hospital-ehr-vendor','hospital-ehr','supports'],['hospital-integration','hospital-lab','supports'],
      ['hospital-clinical-it','hospital-ehr','owns'],['hospital-clinical-it','hospital-lab','owns'],['hospital-privacy','hospital-patient','owns'],['hospital-privacy','hospital-workforce','owns']
    ]
  },
  school: {
    label:'School / education network',
    nodes:[
      ['school-staff','identity','Staff identities','high'],
      ['school-admin','identity','Admin identities','critical'],
      ['school-sis','service','Student information system','critical'],
      ['school-learning','service','Learning & collaboration suite','high'],
      ['school-student-data','data','Student & family records','critical'],
      ['school-staff-data','data','Staff records','high'],
      ['school-saas','vendor','Education SaaS provider','high'],
      ['school-msp','vendor','Managed IT provider','high'],
      ['school-it','owner','School IT','high'],
      ['school-admin-owner','owner','Administration / data owner','high']
    ],
    edges:[
      ['school-staff','school-learning','uses'],['school-admin','school-sis','uses'],['school-admin','school-learning','uses'],
      ['school-sis','school-student-data','handles'],['school-learning','school-student-data','handles'],['school-sis','school-staff-data','handles'],
      ['school-learning','school-saas','depends_on'],['school-sis','school-msp','depends_on'],['school-saas','school-learning','supports'],['school-msp','school-sis','supports'],
      ['school-it','school-sis','owns'],['school-it','school-learning','owns'],['school-admin-owner','school-student-data','owns'],['school-admin-owner','school-staff-data','owns']
    ]
  },
  ngo: {
    label:'NGO / nonprofit',
    nodes:[
      ['ngo-staff','identity','Staff & volunteer identities','high'],
      ['ngo-finance','identity','Finance / admin identities','critical'],
      ['ngo-crm','service','Donor / beneficiary CRM','critical'],
      ['ngo-collab','service','Email & shared drive','high'],
      ['ngo-beneficiary','data','Donor & beneficiary records','critical'],
      ['ngo-finance-data','data','Finance & HR records','high'],
      ['ngo-fundraising','vendor','Fundraising SaaS provider','high'],
      ['ngo-msp','vendor','Managed IT provider','high'],
      ['ngo-ops','owner','Operations / IT owner','high'],
      ['ngo-privacy','owner','Privacy / finance owner','high']
    ],
    edges:[
      ['ngo-staff','ngo-crm','uses'],['ngo-staff','ngo-collab','uses'],['ngo-finance','ngo-crm','uses'],['ngo-finance','ngo-collab','uses'],
      ['ngo-crm','ngo-beneficiary','handles'],['ngo-collab','ngo-beneficiary','handles'],['ngo-collab','ngo-finance-data','handles'],
      ['ngo-crm','ngo-fundraising','depends_on'],['ngo-collab','ngo-msp','depends_on'],['ngo-fundraising','ngo-crm','supports'],['ngo-msp','ngo-collab','supports'],
      ['ngo-ops','ngo-crm','owns'],['ngo-ops','ngo-collab','owns'],['ngo-privacy','ngo-beneficiary','owns'],['ngo-privacy','ngo-finance-data','owns']
    ]
  },
  business: {
    label:'Small business',
    nodes:[
      ['business-staff','identity','Staff identities','high'],
      ['business-finance','identity','Finance admin identity','critical'],
      ['business-payments','service','Accounting / payments','critical'],
      ['business-crm','service','CRM & email','high'],
      ['business-customer','data','Customer & finance records','critical'],
      ['business-hr','data','HR documents','high'],
      ['business-pay-vendor','vendor','Payments / accounting vendor','critical'],
      ['business-msp','vendor','Managed IT / SaaS provider','high'],
      ['business-ops','owner','Business owner / operations','critical'],
      ['business-finance-owner','owner','Finance / data owner','high']
    ],
    edges:[
      ['business-staff','business-crm','uses'],['business-finance','business-payments','uses'],['business-finance','business-crm','uses'],
      ['business-payments','business-customer','handles'],['business-crm','business-customer','handles'],['business-crm','business-hr','handles'],
      ['business-payments','business-pay-vendor','depends_on'],['business-crm','business-msp','depends_on'],['business-pay-vendor','business-payments','supports'],['business-msp','business-crm','supports'],
      ['business-ops','business-payments','owns'],['business-ops','business-crm','owns'],['business-finance-owner','business-customer','owns'],['business-finance-owner','business-hr','owns']
    ]
  }
}

function seedToMap(id,seed){
  return {
    id,
    label:seed.label,
    version:1,
    updatedAt:null,
    custom:false,
    nodes:seed.nodes.map(([nodeId,type,label,criticality])=>({id:nodeId,type,label,criticality,notes:''})),
    edges:seed.edges.map(([from,to,relation],i)=>({id:`${id}-edge-${i+1}`,from,to,relation}))
  }
}

export const MAP_TEMPLATES = Object.fromEntries(Object.entries(SEEDS).map(([id,seed])=>[id,seedToMap(id,seed)]))

export function cloneMap(templateId='city'){
  const source=MAP_TEMPLATES[templateId] || MAP_TEMPLATES.city
  return JSON.parse(JSON.stringify(source))
}

export function validateMap(map){
  const errors=[]
  if(!map || !Array.isArray(map.nodes) || !Array.isArray(map.edges)) return ['Map must contain nodes and edges.']
  const ids=new Set()
  for(const node of map.nodes){
    if(!node.id) errors.push('Every node needs an id.')
    if(ids.has(node.id)) errors.push(`Duplicate node id: ${node.id}`)
    ids.add(node.id)
    if(!NODE_TYPES[node.type]) errors.push(`Unknown node type for ${node.id}: ${node.type}`)
    if(!String(node.label||'').trim()) errors.push(`Node ${node.id} needs a label.`)
  }
  const edgeIds=new Set()
  for(const edge of map.edges){
    if(!edge.id) errors.push('Every edge needs an id.')
    if(edgeIds.has(edge.id)) errors.push(`Duplicate edge id: ${edge.id}`)
    edgeIds.add(edge.id)
    if(!ids.has(edge.from) || !ids.has(edge.to)) errors.push(`Edge ${edge.id} references a missing node.`)
    if(!RELATION_TYPES[edge.relation]) errors.push(`Unknown relation for ${edge.id}: ${edge.relation}`)
  }
  return errors
}

export function addNode(map,{type='service',label='New node',criticality='medium',notes=''}={}){
  if(!NODE_TYPES[type]) throw new Error(`Unknown node type: ${type}`)
  const slug=String(label||type).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || type
  let id=slug, n=2
  const ids=new Set(map.nodes.map(x=>x.id))
  while(ids.has(id)) id=`${slug}-${n++}`
  return {...map,custom:true,nodes:[...map.nodes,{id,type,label:String(label).trim()||'New node',criticality,notes}]}
}

export function updateNode(map,nodeId,patch){
  return {...map,custom:true,nodes:map.nodes.map(n=>n.id===nodeId?{...n,...patch,id:n.id}:n)}
}

export function removeNode(map,nodeId){
  return {...map,custom:true,nodes:map.nodes.filter(n=>n.id!==nodeId),edges:map.edges.filter(e=>e.from!==nodeId && e.to!==nodeId)}
}

export function addEdge(map,{from,to,relation='uses'}){
  if(!map.nodes.some(n=>n.id===from) || !map.nodes.some(n=>n.id===to)) throw new Error('Relationship endpoints must exist.')
  if(!RELATION_TYPES[relation]) throw new Error(`Unknown relation: ${relation}`)
  if(from===to) throw new Error('A node cannot relate to itself.')
  const duplicate=map.edges.some(e=>e.from===from && e.to===to && e.relation===relation)
  if(duplicate) return map
  let i=1,id
  const ids=new Set(map.edges.map(e=>e.id))
  do{id=`${map.id||'map'}-edge-custom-${i++}`}while(ids.has(id))
  return {...map,custom:true,edges:[...map.edges,{id,from,to,relation}]}
}

export function removeEdge(map,edgeId){
  return {...map,custom:true,edges:map.edges.filter(e=>e.id!==edgeId)}
}

export function traceDependencies(map,startId){
  const nodesById=new Map(map.nodes.map(n=>[n.id,n]))
  if(!nodesById.has(startId)) return {startId:null,nodeIds:[],edgeIds:[],ownerIds:[],criticalIds:[],unownedCriticalIds:[],counts:{}}
  const outgoing=new Map()
  for(const edge of map.edges){
    if(!RELATION_TYPES[edge.relation]?.propagates) continue
    if(!outgoing.has(edge.from)) outgoing.set(edge.from,[])
    outgoing.get(edge.from).push(edge)
  }
  const visited=new Set([startId])
  const edgeIds=new Set()
  const queue=[startId]
  while(queue.length){
    const current=queue.shift()
    for(const edge of outgoing.get(current)||[]){
      edgeIds.add(edge.id)
      if(!visited.has(edge.to)){
        visited.add(edge.to)
        queue.push(edge.to)
      }
    }
  }
  const reached=[...visited].map(id=>nodesById.get(id)).filter(Boolean)
  const counts={}
  for(const node of reached) counts[node.type]=(counts[node.type]||0)+1
  const criticalIds=reached.filter(n=>n.criticality==='critical').map(n=>n.id)
  const ownerIds=new Set()
  const ownedTargets=new Set()
  for(const edge of map.edges){
    if(edge.relation==='owns'){
      if(visited.has(edge.to)){
        ownerIds.add(edge.from)
        ownedTargets.add(edge.to)
      }
    }
  }
  const unownedCriticalIds=criticalIds.filter(id=>!ownedTargets.has(id))
  return {startId,nodeIds:[...visited],edgeIds:[...edgeIds],ownerIds:[...ownerIds],criticalIds,unownedCriticalIds,counts}
}

export function dependencyContext(map){
  const byType=type=>map.nodes.filter(n=>n.type===type).map(n=>n.label)
  const critical=map.nodes.filter(n=>n.criticality==='critical').map(n=>n.label)
  const ownedTargets=new Set(map.edges.filter(e=>e.relation==='owns').map(e=>e.to))
  const unownedCritical=map.nodes.filter(n=>n.criticality==='critical' && !ownedTargets.has(n.id)).map(n=>n.label)
  return {
    label:map.label,
    custom:Boolean(map.custom),
    identities:byType('identity'),
    services:byType('service'),
    data:byType('data'),
    vendors:byType('vendor'),
    owners:byType('owner'),
    critical,
    unownedCritical
  }
}

export function summarizeMap(map){
  const context=dependencyContext(map)
  const counts=Object.fromEntries(Object.keys(NODE_TYPES).map(type=>[type,map.nodes.filter(n=>n.type===type).length]))
  return {...context,counts,relationships:map.edges.length}
}

export function mapToMarkdown(map){
  const errors=validateMap(map)
  const context=dependencyContext(map)
  const lines=[
    `# Cyber Resilience Dependency Map — ${map.label}`,'',
    '> Browser-local planning artifact. It models declared organizational dependencies; it does not scan infrastructure or prove real access paths.','',
    '## Inventory','',
    ...Object.entries(NODE_TYPES).flatMap(([type,meta])=>[
      `### ${meta.label}`,
      ...map.nodes.filter(n=>n.type===type).map(n=>`- **${n.label}** — ${n.criticality||'medium'}${n.notes?` — ${n.notes}`:''}`),
      ''
    ]),
    '## Relationships',''
  ]
  const byId=new Map(map.nodes.map(n=>[n.id,n]))
  for(const edge of map.edges){
    lines.push(`- ${byId.get(edge.from)?.label||edge.from} — ${RELATION_TYPES[edge.relation]?.label||edge.relation} → ${byId.get(edge.to)?.label||edge.to}`)
  }
  lines.push('','## Planning gaps','')
  lines.push(context.unownedCritical.length?`- Critical nodes without an explicit owner: ${context.unownedCritical.join(', ')}`:'- Every critical node has an explicit owner relationship.')
  if(errors.length) lines.push(`- Map validation warnings: ${errors.join('; ')}`)
  lines.push('','## Truth boundary','',
    'This map is only as accurate as the dependencies people declare. It is not a vulnerability scan, asset-discovery tool, penetration test, or evidence that an attack can traverse any relationship. Validate real controls only in systems you own or are explicitly authorized to assess.','')
  return lines.join('\n')
}

export function storageKey(templateId){ return `crc:dependency-map:${templateId}` }

export function loadStoredMap(templateId,storage=globalThis.localStorage){
  try{
    if(!storage) return null
    const raw=storage.getItem(storageKey(templateId))
    if(!raw) return null
    const parsed=JSON.parse(raw)
    return validateMap(parsed).length?null:parsed
  }catch{return null}
}

export function saveStoredMap(map,storage=globalThis.localStorage){
  const errors=validateMap(map)
  if(errors.length) throw new Error(errors.join(' '))
  const saved={...map,custom:true,updatedAt:new Date().toISOString()}
  if(!storage) return saved
  storage.setItem(storageKey(map.id),JSON.stringify(saved))
  return saved
}

export function clearStoredMap(templateId,storage=globalThis.localStorage){
  try{ storage?.removeItem(storageKey(templateId)) }catch{}
}
