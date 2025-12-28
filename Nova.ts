export type Skill = {
  name: string;
  status: "pending" | "approved" | "executed";
  source?: string;
};

export class Nova {
  skills: Skill[] = [];

  addOrder(order: string) {
    this.skills.push({ name: order, status: "pending" });
  }

  approveSkill(index: number, source: string) {
    this.skills[index].status = "approved";
    this.skills[index].source = source;
  }

  executeSkill(index: number) {
    this.skills[index].status = "executed";
  }

  getSkills() {
    return this.skills;
  }
}
