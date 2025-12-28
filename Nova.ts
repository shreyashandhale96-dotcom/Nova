type Skill = {
  name: string;
  status: "pending" | "approved" | "executed";
  source?: string;
};

class Nova {
  skills: Skill[] = [];
  history: any[] = [];

  // Add new order
  addOrder(order: string) {
    this.skills.push({ name: order, status: "pending" });
    this.history.push({ action: "add", order });
  }

  // Approve skill
  approveSkill(index: number, source: string) {
    if (this.skills[index]) {
      this.skills[index].status = "approved";
      this.skills[index].source = source;
      this.history.push({ action: "approve", index, source });
    }
  }

  // Execute skill
  executeSkill(index: number) {
    if (this.skills[index]) {
      this.skills[index].status = "executed";
      this.history.push({ action: "execute", index });
    }
  }

  // Rollback / Undo last action
  undoSkill(index: number) {
    const lastAction = this.history.pop();
    if (!lastAction) return;

    if (lastAction.action === "execute") {
      this.skills[index].status = "approved";
    } else if (lastAction.action === "approve") {
      this.skills[index].status = "pending";
    } else if (lastAction.action === "add") {
      this.skills.splice(index, 1);
    }
  }

  // Get all skills
  getSkills() {
    return this.skills;
  }
}

export default Nova;
