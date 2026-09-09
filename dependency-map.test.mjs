import assert from 'node:assert/strict'
import {test} from 'node:test'
import {
  cloneMap,validateMap,traceDependencies,dependencyContext,
  addNode,addEdge,removeNode,mapToMarkdown,saveStoredMap,loadStoredMap
} from './dependency-map.js'

test('all seeded dependency maps validate',()=>{
  for(const id of ['city','hospital','school','ngo','business']){
    assert.deepEqual(validateMap(cloneMap(id)),[])
  }
})

test('city staff path reaches services, data and declared vendors but not owner nodes',()=>{
  const map=cloneMap('city')
  const result=traceDependencies(map,'city-staff')
  assert.ok(result.nodeIds.includes('city-portal'))
  assert.ok(result.nodeIds.includes('city-citizen-data'))
  assert.ok(result.nodeIds.includes('city-msp'))
  assert.ok(!result.nodeIds.includes('city-digital'))
  assert.ok(result.ownerIds.includes('city-digital'))
})

test('ownership gaps are surfaced for critical nodes',()=>{
  let map=cloneMap('business')
  map={...map,edges:map.edges.filter(e=>!(e.relation==='owns' && e.to==='business-customer'))}
  const ctx=dependencyContext(map)
  assert.ok(ctx.unownedCritical.includes('Customer & finance records'))
})

test('editing map keeps ids stable and removes dangling relationships',()=>{
  let map=cloneMap('ngo')
  map=addNode(map,{type:'service',label:'Emergency hotline',criticality:'critical'})
  const node=map.nodes.find(n=>n.label==='Emergency hotline')
  map=addEdge(map,{from:'ngo-staff',to:node.id,relation:'uses'})
  assert.ok(map.edges.some(e=>e.to===node.id))
  map=removeNode(map,node.id)
  assert.ok(!map.edges.some(e=>e.to===node.id || e.from===node.id))
  assert.deepEqual(validateMap(map),[])
})

test('browser storage roundtrip preserves a valid custom map',()=>{
  const mem=new Map()
  const storage={getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v),removeItem:k=>mem.delete(k)}
  let map=cloneMap('school')
  map=addNode(map,{type:'vendor',label:'Emergency messaging vendor'})
  const saved=saveStoredMap(map,storage)
  const loaded=loadStoredMap('school',storage)
  assert.equal(loaded.custom,true)
  assert.equal(loaded.updatedAt,saved.updatedAt)
  assert.ok(loaded.nodes.some(n=>n.label==='Emergency messaging vendor'))
})

test('download map states the truth boundary',()=>{
  const md=mapToMarkdown(cloneMap('hospital'))
  assert.match(md,/does not scan infrastructure/i)
  assert.match(md,/not a vulnerability scan/i)
  assert.match(md,/explicitly authorized/i)
})
