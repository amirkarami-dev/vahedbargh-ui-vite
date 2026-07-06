/* eslint-disable @typescript-eslint/no-explicit-any */
// Stimulsoft report engine wrapper (old-ui helpers/stimulsoftLoader + initReport).
// The engine is large and loaded from /public on demand, only on report pages.

declare global {
  interface Window {
    Stimulsoft?: any
  }
}

const SCRIPTS = [
  '/stimulsoft/stimulsoft.reports.js',
  '/stimulsoft/stimulsoft.reports.maps.js',
  '/stimulsoft/stimulsoft.viewer.js',
]

const LICENSE =
  '6vJhGtLLLz2GNviWmUTrhSqnOItdDwjBylQzQcAOiHn0s4gy0Fr5YoUZ9V00Y0igCSFQzwEqYBh/N77k4f0fWXTHW5rqeBNLkaurJDenJ9o97TyqHs9HfvINK18Uwzsc/bG01Rq+x3H3Rf+g7AY92gvWmp7VA2Uxa30Q97f61siWz2dE5kdBVcCnSFzC6awE74JzDcJMj8OuxplqB1CYcpoPcOjKy1PiATlC3UsBaLEXsok1xxtRMQ283r282tkh8XQitsxtTczAJBxijuJNfziYhci2jResWXK51ygOOEbVAxmpflujkJ8oEVHkOA/CjX6bGx05pNZ6oSIu9H8deF94MyqIwcdeirCe60GbIQByQtLimfxbIZnO35X3fs/94av0ODfELqrQEpLrpU6FNeHttvlMc5UVrT4K+8lPbqR8Hq0PFWmFrbVIYSi7tAVFMMe2D1C59NWyLu3AkrD3No7YhLVh7LV0Tttr/8FrcZ8xirBPcMZCIGrRIesrHxOsZH2V8t/t0GXCnLLAWX+TNvdNXkB8cF2y9ZXf1enI064yE5dwMs2fQ0yOUG/xornE'

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) return resolve()
    const s = document.createElement('script')
    s.src = src
    s.async = true
    s.onload = () => resolve()
    s.onerror = reject
    document.body.appendChild(s)
  })
}

export async function loadStimulsoft(): Promise<void> {
  for (const src of SCRIPTS) await loadScript(src)
}

// Render a designed .mrt report (by URL) with `data` into the #viewerId element.
export async function renderReport(
  mrtUrl: string,
  data: unknown[],
  localizationUrl: string,
  viewerId = 'viewer',
): Promise<void> {
  await loadStimulsoft()
  const S = window.Stimulsoft
  if (!S) throw new Error('Stimulsoft engine failed to load')

  S.Base.StiLicense.Key = LICENSE
  S.Base.Localization.StiLocalization.setLocalizationFile(localizationUrl, true)

  const report = new S.Report.StiReport()
  report.loadFile(mrtUrl)

  const options = new S.Viewer.StiViewerOptions()
  const viewer = new S.Viewer.StiViewer(options, 'StiViewer', false)

  const dataSet = new S.System.Data.DataSet('Demo')
  dataSet.readJson({ Demo: data })
  report.dictionary.databases.clear()
  report.regData('Demo', 'Demo', dataSet)
  const VData = report.dictionary.variables.getByName('VData')
  if (VData) VData.value = 'test'

  viewer.report = report
  viewer.stiRightToLeftType = true
  viewer.renderHtml(viewerId)
}
