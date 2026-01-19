import fs from "fs";
import path from "path";

export type ProfileType = "senior-eng" | "em";

export interface Profile {
  id: ProfileType;
  label: string;
  content: string;
}

let cachedProfiles: Map<ProfileType, string> | null = null;

function loadProfiles(): Map<ProfileType, string> {
  if (cachedProfiles) {
    return cachedProfiles;
  }

  cachedProfiles = new Map();

  const seniorEngPath = path.join(
    process.cwd(),
    "src/lib/candidate.senior-eng.md"
  );
  const emPath = path.join(process.cwd(), "src/lib/candidate.em.md");

  cachedProfiles.set("senior-eng", fs.readFileSync(seniorEngPath, "utf8"));
  cachedProfiles.set("em", fs.readFileSync(emPath, "utf8"));

  return cachedProfiles;
}

export function getProfile(profileId: ProfileType): string {
  const profiles = loadProfiles();
  const content = profiles.get(profileId);

  if (!content) {
    throw new Error(`Profile not found: ${profileId}`);
  }

  return content;
}

export function getAllProfiles(): Profile[] {
  const profiles = loadProfiles();
  return [
    {
      id: "senior-eng",
      label: "Senior Engineer",
      content: profiles.get("senior-eng")!,
    },
    {
      id: "em",
      label: "Engineering Manager",
      content: profiles.get("em")!,
    },
  ];
}
