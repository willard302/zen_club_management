export const reverseMapRole: Record<string, string> = {
  "管理員": "Role.admin",
  "Admin": "Role.admin",
  "師資": "Role.teacher",
  "Teacher": "Role.teacher",
  "輔導員": "Role.counselor",
  "Counselor": "Role.counselor",
  "社長": "Role.president",
  "President": "Role.president",
  "副社長": "Role.vice_president",
  "Vice President": "Role.vice_president",
  "家族長": "Role.team_director",
  "Team Director": "Role.team_director",
  "副家族長": "Role.deputy_team_director",
  "Deputy Team Director": "Role.deputy_team_director",
  "核心幹部": "Role.committee_member",
  "Committee Member": "Role.committee_member",
  "社員": "Role.member",
  "Member": "Role.member",
  "新社員": "Role.new_member",
  "New Member": "Role.new_member",
  "新人": "Role.guest",
  "Guest": "Role.guest",
};

export const reverseMapGrade: Record<string, string> = {
  "大一": "Grade.freshman",
  "Freshman": "Grade.freshman",
  "大二": "Grade.sophomore",
  "Sophomore": "Grade.sophomore",
  "大三": "Grade.junior",
  "Junior": "Grade.junior",
  "大四": "Grade.senior",
  "Senior": "Grade.senior",
  "社青": "Grade.graduate",
  "Graduate": "Grade.graduate"
};

export const reverseMapHierarchy: Record<string, string> = {
  "核心幹部": "Hierarchy.core_officers",
  "Core Officers": "Hierarchy.core_officers",
  "幹部": "Hierarchy.officers",
  "Officers": "Hierarchy.officers",
  "社員": "Hierarchy.members",
  "Members": "Hierarchy.members",
  "外圍社員": "Hierarchy.associate_members",
  "Associate Members": "Hierarchy.associate_members",
};

export const reverseMapAccounting: Record<string, string> = {
  "收入": "income",
  "Income": "income",
  "支出": "expense",
  "Expense": "expense"
}