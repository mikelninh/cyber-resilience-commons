import assert from 'node:assert/strict'
import {test} from 'node:test'
import {TEMPLATES,SCENARIOS,CONTROL_CATALOG} from './data.js'
import {buildInjects,createDrill,startDrill,recordDecision,advanceDrill,buildAfterAction} from './drill.js'

const city=TEMPLATES.find(x=>x.id==='city')
const scenario=SCENARIOS.find(x=>x.id==='bulk-exfiltration')

test('tabletop injects mirror the synthetic scenario without exposing a real target',()=>{
  const injects=buildInjects(scenario)
  assert.equal(injects.length,scenario.steps.length)
  assert.match(injects[0].question,/first 15 minutes/i)
  assert.ok(injects.every(x=>x.title && x.detail && x.reflection))
})

test('drill reveals one inject at a time and finishes at the end',()=>{
  let state=createDrill(scenario)
  state=startDrill(state)
  assert.equal(state.revealed,1)
  state=advanceDrill(state,scenario.steps.length)
  assert.equal(state.revealed,2)
  while(!state.finished) state=advanceDrill(state,scenario.steps.length)
  assert.equal(state.revealed,scenario.steps.length)
  assert.equal(state.finished,true)
})

test('blank decisions are not recorded',()=>{
  const state=startDrill(createDrill(scenario))
  const next=recordDecision(state,{role:'lead',text:'   ',injectNumber:1})
  assert.equal(next.decisions.length,0)
})

test('after-action report contains team decisions, facilitator review and truth boundary',()=>{
  let state=startDrill(createDrill(scenario))
  state=recordDecision(state,{role:'lead',text:'Isolate the account and appoint an incident lead.',injectNumber:1})
  const report=buildAfterAction({template:city,scenario,state,catalog:CONTROL_CATALOG})
  assert.match(report,/Isolate the account/)
  assert.match(report,/Facilitator review/)
  assert.match(report,/Convert assumptions into evidence/)
  assert.match(report,/not a penetration test/i)
  assert.match(report,/explicitly authorized/i)
})

test('saved dependency context can shape the drill and after-action review',()=>{
  const dependencyContext={
    custom:true,
    critical:['Citizen service portal','Citizen records'],
    services:['Citizen service portal'],
    data:['Citizen records'],
    vendors:['Managed IT provider'],
    owners:['Digital services team'],
    unownedCritical:[]
  }
  const injects=buildInjects(scenario,dependencyContext)
  assert.match(injects[0].question,/Citizen service portal/)
  const state=startDrill(createDrill(scenario))
  const report=buildAfterAction({template:city,scenario,state,catalog:CONTROL_CATALOG,dependencyContext})
  assert.match(report,/Dependency context used in this drill/)
  assert.match(report,/saved browser-local map/)
  assert.match(report,/Managed IT provider/)
})
