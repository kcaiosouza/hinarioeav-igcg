export function parseSemver(version: string): [number, number, number] | null {
  if (!version || typeof version !== 'string') return null;
  const match = version.trim().match(/^v?(\d+)\.(\d+)\.(\d+)$/);
  if (!match) return null;
  return [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10)];
}

export function isNewerVersion(remoteVersion: string, localVersion: string): boolean {
  const remote = parseSemver(remoteVersion);
  const local = parseSemver(localVersion);
  if (!remote || !local) return false;

  for (let i = 0; i < 3; i++) {
    if (remote[i] > local[i]) return true;
    if (remote[i] < local[i]) return false;
  }
  return false;
}

export function validateCatalogJson(content: string | object): boolean {
  try {
    let parsed: any = content;
    if (typeof content === 'string') {
      if (!content.trim()) return false;
      parsed = JSON.parse(content);
    }

    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return false;
    }

    const requiredKeys = ['hinos', 'canticos', 'suplemento', 'novo', 'diversos'];
    for (const key of requiredKeys) {
      if (!(key in parsed) || typeof parsed[key] !== 'object' || parsed[key] === null || Array.isArray(parsed[key])) {
        return false;
      }
    }

    return true;
  } catch {
    return false;
  }
}
