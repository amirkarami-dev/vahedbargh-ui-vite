// Utility to dynamically load external JS scripts
export function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve(); // Already loaded
      return;
    }
    const script = document.createElement('script');
    script.src = src;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.body.appendChild(script);
  });
}

// Utility to load all Stimulsoft scripts in order
export async function loadStimulsoftScripts() {
  const base = process.env.PUBLIC_URL || '';
  await loadScript(`${base}/stimulsoft/stimulsoft.reports.js`);
  await loadScript(`${base}/stimulsoft/stimulsoft.reports.maps.js`);
  await loadScript(`${base}/stimulsoft/stimulsoft.viewer.js`);
}
