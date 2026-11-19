import { describe, expect, it } from "vitest";
import { profile, project, skills } from "@/lib/portfolio";
describe("Authentic portfolio details", () => {
  it("keeps the supplied contact details", () => {
    expect(profile.email).toBe("tharshnitharshni28@gmail.com");
    expect(profile.phone).toBe("+91 7550362608");
  });
  it("lists only the supplied skills without proficiency percentages", () => {
    expect(skills.map(skill => skill.name)).toEqual(["C", "Java", "Python", "HTML", "CSS", "JavaScript"]);
    expect(skills.every(skill => !("proficiency" in skill))).toBe(true);
  });
  it("identifies the authentic first project and its actual website", () => {
    expect(project.label).toBe("My First Project");
    expect(project.url).toBe("https://tharshini-website.web.app/");
  });
});