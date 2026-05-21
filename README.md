# 🚌 App Buses Carvajal Bugueno — Página de Descarga

Este repositorio sirve como **host de la APK** y **página de descarga pública** para la app móvil de conductores de Buses Carvajal Bugueno.

## 📁 Estructura del repositorio

```
app_movil_carvajal/
├── index.html          ← Página de descarga (GitHub Pages)
├── style.css           ← Estilos de la página
├── app.js              ← Lógica: QR, descarga, versión dinámica
├── version.json        ← Info de versión actual (leído por el app Flutter)
├── app-carvajal.apk    ← APK más reciente ← SUBIR AQUÍ
└── README.md
```

## 🔄 Cómo publicar una nueva versión

### 1. Compilar el APK en el proyecto Flutter
```bash
cd ruta/al/proyecto/flutter
flutter build apk --release
```
El APK queda en: `build/app/outputs/flutter-apk/app-release.apk`

### 2. Copiar el APK a este repositorio
Renombrar y copiar:
```
app-release.apk  →  app-carvajal.apk
```

### 3. Actualizar `version.json`
```json
{
  "version": "1.0.1",
  "apk_url": "https://raw.githubusercontent.com/YojanCortes/app_movil_carvajal/main/app-carvajal.apk",
  "notas": "- Corrección de errores en venta de pasajes\n- Mejoras de rendimiento",
  "fecha": "2026-05-20",
  "pagina_descarga": "https://yojancortes.github.io/app_movil_carvajal/"
}
```

### 4. Hacer push al repositorio
```bash
git add .
git commit -m "release: v1.0.1"
git push
```

El app Flutter detectará automáticamente la nueva versión y notificará al conductor.

---

## 🌐 Página de descarga (GitHub Pages)

La página de descarga está disponible en:  
**https://yojancortes.github.io/app_movil_carvajal/**

Para habilitar GitHub Pages:
1. Ir a **Settings → Pages** del repositorio
2. Seleccionar **Branch: main** y carpeta **/ (root)**
3. Guardar

---

## 📱 Cómo funciona la actualización automática

1. El app Flutter consulta `version.json` al iniciar o en la pantalla de "Actualización"
2. Compara la versión instalada con la `version` en el JSON
3. Si hay nueva versión, muestra botón para descargar e instalar automáticamente
4. También se puede descargar manualmente desde la página web o escaneando el QR

---

## 📲 QR de descarga

El QR en la página apunta a:  
`https://yojancortes.github.io/app_movil_carvajal/`
