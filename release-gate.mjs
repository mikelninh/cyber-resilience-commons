export function assessDrillRelease({state,totalInjects,realTeam=false,facilitatorEvidence=[]}={}){
  const blockers=[]
  const review=[]
  if(!state?.started) blockers.push('drill_not_started')
  if(!state?.finished || Number(state?.revealed||0)!==Number(totalInjects||0)) blockers.push('drill_not_completed')
  if((state?.decisions||[]).length<2) review.push('fewer_than_two_recorded_decisions')
  if(realTeam && (!Array.isArray(facilitatorEvidence)||facilitatorEvidence.length===0)) review.push('real_team_requires_facilitator_evidence')
  return {
    technical_status:blockers.length?'block':review.length?'review':'pass',
    reality_status:realTeam && facilitatorEvidence.length?'pass':'review',
    final_verdict:blockers.length?'BLOCK':'REVIEW',
    blockers,
    review,
    boundary:'Technical completion can pass automatically; usefulness remains REVIEW until a real team/facilitator provides evidence.'
  }
}

export function buildDrillAgencyReceipt({
  template,scenario,state,totalInjects,realTeam=false,facilitatorEvidence=[],
  observedAt=new Date().toISOString()
}={}){
  if(!template?.id||!scenario?.id||!state) throw new TypeError('template, scenario and state are required')
  const release=assessDrillRelease({state,totalInjects,realTeam,facilitatorEvidence})
  return {
    schema:'openaction.agency-receipt.v1',
    mission_id:`cyber-drill-${template.id}-${scenario.id}`,
    project:'Cyber Resilience Commons',
    observed_at:observedAt,
    evidence:[
      {ref:`scenario:${scenario.id}`},
      {ref:`injects_revealed:${state.revealed}/${totalInjects}`},
      {ref:`decisions_recorded:${state.decisions.length}`}
    ],
    decision:{
      owner:'human',
      rationale:'The drill prepares decisions; organization leaders remain responsible for real incident choices and technical validation.'
    },
    action:{
      authority:'prepare',
      external_side_effects:false,
      description:'Run a bounded tabletop exercise and prepare an after-action improvement plan.'
    },
    outcome:{
      status:release.technical_status==='block'?'blocked':'measured',
      evidence:[
        `technical_status=${release.technical_status}`,
        `reality_status=${release.reality_status}`,
        ...facilitatorEvidence
      ],
      synthetic:!realTeam
    },
    learning: realTeam && facilitatorEvidence.length
      ? {next_change:'Implement the highest-priority team improvement and rerun the drill.',release}
      : {next_unknown:'Real team learning, decision clarity and follow-through remain unproven until a facilitated exercise is observed.',release}
  }
}
