# Instrucciones de Migración - Tobias App

## Configuración Completada ✅

He actualizado la configuración del proyecto para que coincida con tu proyecto anterior de React Native nativo:

### Cambios realizados:

1. **app.json**:
   - `package`: `co.com.tmsolutions.segetis.tobias`
   - `versionCode`: 20
   - `versionName`: "1.2.0"

2. **android/app/build.gradle**:
   - `namespace`: `co.com.tmsolutions.segetis.tobias`
   - `applicationId`: `co.com.tmsolutions.segetis.tobias`
   - `versionCode`: 20
   - `versionName`: "1.2.0"
   - Configuración de signing para release con `tobias_key.keystore`

3. **Estructura de carpetas generada automáticamente**:
   - `android/app/src/main/java/co/com/tmsolutions/segetis/tobias/`
   - `MainActivity.kt` y `MainApplication.kt` con el package correcto

4. **Compilación Debug**: ✅ Exitosa - La app se ejecuta correctamente

## Pasos pendientes:

### 1. Copiar el archivo de keystore
Necesitas copiar el archivo `tobias_key.keystore` de tu proyecto anterior a:
```
android/app/tobias_key.keystore
```

### 2. Verificar la configuración
Ejecuta estos comandos para verificar que todo esté correcto:

```bash
# Limpiar el proyecto
cd android
./gradlew clean

# Verificar la configuración
./gradlew assembleRelease --dry-run
```

### 3. Generar el APK de release
```bash
# Desde la raíz del proyecto
expo run:android --variant release
```

O desde el directorio android:
```bash
cd android
./gradlew assembleRelease
```

### 4. Verificar el APK generado
El APK se generará en:
```
android/app/build/outputs/apk/release/app-release.apk
```

## Notas importantes:

- **Version Code**: 20 (debe ser mayor que la versión actual en Google Play)
- **Version Name**: "1.2.0"
- **Package Name**: `co.com.tmsolutions.segetis.tobias` (debe coincidir exactamente con el de Google Play)

## Para futuras actualizaciones:

1. Incrementa el `versionCode` en ambos archivos:
   - `app.json` (android.versionCode)
   - `android/app/build.gradle` (versionCode)

2. Actualiza el `versionName` si es necesario

3. Genera el nuevo APK con:
   ```bash
   expo run:android --variant release
   ```

## Troubleshooting:

Si encuentras errores relacionados con el keystore:
1. Verifica que el archivo `tobias_key.keystore` esté en `android/app/`
2. Verifica que las contraseñas en `build.gradle` sean correctas
3. Asegúrate de que el alias de la clave sea `tobias_key` 