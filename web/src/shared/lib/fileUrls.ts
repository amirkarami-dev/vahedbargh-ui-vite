// File URL builders — ported from old-ui common/global.js.
const base = import.meta.env.VITE_API_URL

export function getApiUrlUserFiles(fileName: string): string {
  return `${base}/Users/GetPhysicalFileS3?path=Upload/UserFiles/${fileName}`
}

export function getApiUrlSupportFiles(fileName: string): string {
  return `${base}/Users/GetPhysicalFileS3?path=Upload/Supports/${fileName}`
}

export function getApiUrlElectProjectFiles(fileName: string): string {
  return `${base}/Users/GetPhysicalFileS3?path=Upload/ElectProjects/${fileName}`
}
