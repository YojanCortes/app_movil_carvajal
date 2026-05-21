/* ══════════════════════════════════════════════
   Buses Carvajal Bugueno · Download Page
   app.js
══════════════════════════════════════════════ */

// ── Configuración ──────────────────────────────────────────────────────
const CONFIG = {
  // URL del version.json en el repositorio público de GitHub
  versionUrl: 'https://raw.githubusercontent.com/YojanCortes/app_movil_carvajal/main/version.json',

  // URL de esta página de descarga (para el QR)
  pageUrl: 'https://yojancortes.github.io/app_movil_carvajal/',

  // Fallback: URL directa del APK si version.json no responde
  apkFallback: 'https://raw.githubusercontent.com/YojanCortes/app_movil_carvajal/main/app-carvajal.apk',
};

// ── Estado global ──────────────────────────────────────────────────────
let apkUrl = CONFIG.apkFallback;
let versionData = null;

// ── DOM Ready ──────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  cargarVersionInfo();
  actualizarUrlQR();
});

// ── Actualizar texto URL del QR ────────────────────────────────────────
function actualizarUrlQR() {
  const el = document.getElementById('qrUrl');
  if (el) el.textContent = CONFIG.pageUrl;
}

// ── Cargar info de versión desde GitHub ────────────────────────────────
async function cargarVersionInfo() {
  try {
    const res = await fetch(CONFIG.versionUrl + '?t=' + Date.now());
    if (!res.ok) throw new Error('HTTP ' + res.status);

    const data = await res.json();
    versionData = data;

    // Actualiza URL del APK con la del JSON
    if (data.apk_url) apkUrl = data.apk_url;

    // Actualiza badge de versión
    mostrarVersionBadge(data.version);

    // Actualiza tarjeta de versión
    mostrarVersionCard(data);

  } catch (err) {
    console.warn('No se pudo cargar version.json:', err);
    mostrarVersionBadge('N/A', true);
    mostrarVersionCardError();
  }
}

// ── Badge de versión (hero) ────────────────────────────────────────────
function mostrarVersionBadge(version, error = false) {
  const el = document.getElementById('versionBadge');
  if (!el) return;

  if (error) {
    el.innerHTML = '<span>⚠️ Sin conexión · Versión no disponible</span>';
    el.style.borderColor = 'rgba(239,68,68,0.4)';
    el.style.color = '#f87171';
    el.style.background = 'rgba(239,68,68,0.08)';
    return;
  }

  el.innerHTML = `
    <span style="font-size:16px">🚀</span>
    <span>Versión actual: <strong>v${version}</strong></span>
    <span style="
      background: rgba(255,107,53,0.25);
      border-radius: 6px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
    ">LATEST</span>
  `;
  el.classList.add('fade-in');
}

// ── Tarjeta de versión ─────────────────────────────────────────────────
function mostrarVersionCard(data) {
  const el = document.getElementById('versionCard');
  if (!el) return;

  const fecha = data.fecha
    ? new Date(data.fecha + 'T00:00:00').toLocaleDateString('es-CL', {
        day: 'numeric', month: 'long', year: 'numeric'
      })
    : 'Fecha no disponible';

  el.innerHTML = `
    <div class="v-header fade-in">
      <div class="v-number">v${data.version || '?'}</div>
      <div class="v-meta">
        <div class="v-title">Última versión disponible</div>
        <div class="v-date">📅 Publicada el ${fecha}</div>
      </div>
    </div>
    ${data.notas ? `
    <div class="v-notes fade-in">
      <div class="v-notes-label">📋 Notas de la versión</div>
      ${data.notas}
    </div>
    ` : ''}
    <div style="margin-top:20px;" class="fade-in">
      <button
        class="btn-download"
        style="width:100%; justify-content:center;"
        onclick="descargarApk(event)"
        id="btnDescargar2"
      >
        <span class="btn-icon">⬇️</span>
        <span class="btn-label">
          <strong>Descargar APK v${data.version}</strong>
          <small>Android · Instalación directa</small>
        </span>
      </button>
    </div>
  `;
}

function mostrarVersionCardError() {
  const el = document.getElementById('versionCard');
  if (!el) return;
  el.innerHTML = `
    <div style="text-align:center; padding: 20px 0;" class="fade-in">
      <div style="font-size:40px; margin-bottom:12px;">⚠️</div>
      <p style="color:#f87171; font-weight:600; margin-bottom:6px;">No se pudo cargar la información</p>
      <p style="color:#8B949E; font-size:13px; margin-bottom:20px;">
        Verifica tu conexión a internet. El APK de respaldo sigue disponible.
      </p>
      <button
        class="btn-download"
        style="margin:0 auto; display:flex; justify-content:center;"
        onclick="descargarApk(event)"
      >
        <span class="btn-icon">⬇️</span>
        <span class="btn-label">
          <strong>Descargar APK</strong>
          <small>Usando versión de respaldo</small>
        </span>
      </button>
    </div>
  `;
}

// ── Descarga APK ───────────────────────────────────────────────────────
function descargarApk(event) {
  event.preventDefault();

  const url = apkUrl;
  mostrarStatus('⏳ Iniciando descarga...', 'info');

  // Crear enlace temporal para forzar descarga
  const a = document.createElement('a');
  a.href = url;
  a.download = 'app-carvajal.apk';
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  // Mensaje de éxito tras un momento
  setTimeout(() => {
    mostrarStatus('✅ Descarga iniciada · Busca el archivo en tu carpeta de Descargas', 'success');
    setTimeout(() => ocultarStatus(), 6000);
  }, 1200);
}

// ── Copiar URL al portapapeles ─────────────────────────────────────────
function copiarUrl() {
  const url = CONFIG.pageUrl;
  const btn = document.getElementById('btnCopyUrl');
  const icon = document.getElementById('copyIcon');

  navigator.clipboard.writeText(url).then(() => {
    btn.classList.add('copied');
    if (icon) icon.textContent = '✅';
    btn.lastChild.textContent = ' ¡Copiado!';

    setTimeout(() => {
      btn.classList.remove('copied');
      if (icon) icon.textContent = '📋';
      btn.lastChild.textContent = ' Copiar enlace';
    }, 2500);
  }).catch(() => {
    // Fallback para navegadores sin clipboard API
    const ta = document.createElement('textarea');
    ta.value = url;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);

    if (icon) icon.textContent = '✅';
    setTimeout(() => { if (icon) icon.textContent = '📋'; }, 2500);
  });
}

// ── Scroll al QR ───────────────────────────────────────────────────────
function scrollToQR() {
  const el = document.getElementById('qrSection');
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Status helpers ─────────────────────────────────────────────────────
function mostrarStatus(msg, tipo = 'info') {
  const el = document.getElementById('statusMsg');
  if (!el) return;
  el.textContent = msg;
  el.className = `status-msg ${tipo}`;
}

function ocultarStatus() {
  const el = document.getElementById('statusMsg');
  if (!el) return;
  el.classList.add('hidden');
}
