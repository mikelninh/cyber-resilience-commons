import assert from 'node:assert/strict'
import {test} from 'node:test'
import {TEMPLATES,SCENARIOS} from './data.js'
import {createDrill,startDrill,recordDecision,advanceDrill} from './drill.js'
import {assessDrillRelease,buildDrillAgencyReceipt} from './release-gate.mjs'

const template=TEMPLATES.find(x=>x.id==='city')
const scenario=SCENARIOS.find(x=>x.id==='bulk-exfiltration')

function completeDrill(){
  let state=startDrill(createDrill(scenario))
  state=recordDecision(state,{role:'lead',text:'Appoint incident lead and isolate affected identity.',injectNumber:1})
  state=recordDecision(state,{role:'ops',text:'Protect critical service continuity and manual fallback.',injectNumber:1})
  while(!state.finished) state=advanceDrill(state,scenario.steps.length)
  return state
}

test('complete synthetic drill passes technical gate but cannot pass reality gate',()=>{
  const state=completeDrill()
  const gate=assessDrillRelease({state,totalInjects:scenario.steps.length})
  assert.equal(gate.technical_status,'pass')
  assert.equal(gate.reality_status,'review')
  assert.equal(gate.final_verdict,'REVIEW')
})

test('incomplete drill blocks release',()=>{
  const state=startDrill(createDrill(scenario))
  const gate=assessDrillRelease({state,totalInjects:scenario.steps.length})
  assert.equal(gate.technical_status,'block')
  assert.equal(gate.final_verdict,'BLOCK')
})

test('synthetic receipt preserves the real-world unknown',()=>{
  const receipt=buildDrillAgencyReceipt({
    template,scenario,state:completeDrill(),totalInjects:scenario.steps.length,
    observedAt:'2026-09-30T00:00:00Z'
  })
  assert.equal(receipt.schema,'openaction.agency-receipt.v1')
  assert.equal(receipt.action.external_side_effects,false)
  assert.equal(receipt.outcome.synthetic,true)
  assert.equal(receipt.outcome.status,'measured')
  assert.match(receipt.learning.next_unknown,/Real team learning/)
  assert.equal('next_change' in receipt.learning,false)
})

test('real team evidence creates a next-change receipt but still does not certify security',()=>{
  const receipt=buildDrillAgencyReceipt({
    template,scenario,state:completeDrill(),totalInjects:scenario.steps.length,
    realTeam:true,
    facilitatorEvidence:['team identified unclear incident owner','manual fallback missing'],
    observedAt:'2026-09-30T00:00:00Z'
  })
  assert.equal(receipt.outcome.synthetic,false)
  assert.ok(receipt.learning.next_change)
  assert.equal(receipt.learning.release.reality_status,'pass')
  assert.match(receipt.decision.rationale,/technical validation/)
})
