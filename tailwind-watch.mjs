import { watch } from "fs";
import { join, basename } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

// Directorios de origen
const COMPONENTS_DIR = join(__dirname, "src", "stories");
let isProcessingFile = false;

async function deleteFile(filePath) {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    console.error(`Error eliminando el archivo: ${err.message}`);
  }
}

// Función para compilar Tailwind para cada archivo CSS encontrado
async function compileTailwind(pathFileModified) {
  const outputDir = join(pathFileModified, "../");
  const componentName = basename(pathFileModified, ".css");

  if (componentName.includes("-output.css")) {
    await deleteFile(`${outputDir}${componentName}-output.css`);
  }

  const outputFile = join(outputDir, `${componentName}-output.css`);

  console.log(`🔹 Procesando ${componentName}...`);

  try {
    execSync(`npx tailwindcss -i ${pathFileModified} -o ${outputFile}`, {
      stdio: "inherit",
    });
    console.log(`✅ Estilos generados para ${componentName}: File ${outputFile}`);
  } catch (error) {
    console.error(`❌ Error procesando ${componentName}:`, error);
  }
  setTimeout(() => (isProcessingFile = false), 2000);
}

// Activar `watch` para detectar cambios en los archivos CSS
console.log("👀 Observando cambios en los componentes...");

watch(COMPONENTS_DIR, { recursive: true }, async (eventType, filename) => {
  if (
    filename &&
    filename.endsWith(".css") &&
    !filename.includes("-output.css")
  ) {
    const pathFileModified = join(COMPONENTS_DIR, filename);

    if (isProcessingFile) return;
    isProcessingFile = true;

    console.log(`\n\n🔄 Cambio detectado en: ${filename}`);
    await compileTailwind(pathFileModified);
  }
});
