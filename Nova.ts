// src/Nova.ts
export type ValidationResult = "approved" | "rejected";

export interface AgentVote {
  agent: string;
  result: ValidationResult;
  note?: string;
  at: number;
}

export type SkillStatus = "pending" | "approved" | "executed";

export interface Skill {
  name: string;
  status: SkillStatus;
  validations: AgentVote[];
  requiredApprovals: number;
  history: string[];
}

const skillsStore: Record<string, Skill> = {};

export function createSkill(name: string, requiredApprovals = 2): Skill {
  const skill: Skill = {
    name,
    status: "pending",
    validations: [],
    requiredApprovals: Math.max(1, Math.floor(requiredApprovals)),
    history: [],
  };
  skillsStore[name] = skill;
  return skill;
}

export function addValidation(
  skillName: string,
  agent: string,
  result: ValidationResult,
  note?: string
): Skill {
  const skill = skillsStore[skillName];
  if (!skill) throw new Error(`Skill "${skillName}" not found`);
  const vote: AgentVote = { agent, result, note, at: Date.now() };
  const idx = skill.validations.findIndex((v) => v.agent === agent);
  if (idx >= 0) skill.validations[idx] = vote;
  else skill.validations.push(vote);

  const approvals = skill.validations.filter(
    (v) => v.result === "approved"
  ).length;
  const rejections = skill.validations.filter(
    (v) => v.result === "rejected"
  ).length;
  skill.status =
    rejections > 0
      ? "pending"
      : approvals >= skill.requiredApprovals
      ? "approved"
      : "pending";

  skill.history.push(`vote:${agent}:${result}@${Date.now()}`);
  return skill;
}

export function getSkills(): Skill[] {
  return Object.values(skillsStore);
}

export function executeSkill(skillName: string): Skill {
  const skill = skillsStore[skillName];
  if (!skill) throw new Error(`Skill "${skillName}" not found`);
  if (skill.status !== "approved")
    throw new Error(`Skill "${skillName}" not approved`);
  skill.status = "executed";
  skill.history.push(`executed@${Date.now()}`);
  return skill;
}

export function manualApprove(skillName: string, actor = "operator"): Skill {
  const skill = skillsStore[skillName];
  if (!skill) throw new Error(`Skill "${skillName}" not found`);
  skill.status = "approved";
  skill.history.push(`manual-approve:${actor}@${Date.now()}`);
  return skill;
}
