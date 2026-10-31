import { spawn } from "node:child_process";
import {
  mkdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);

const reportDirectory = path.join(projectRoot, "reports");
mkdirSync(reportDirectory, { recursive: true });

const now = new Date();
const timezone = "Asia/Jakarta";

const dateParts = new Intl.DateTimeFormat("en-GB", {
  timeZone: timezone,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hourCycle: "h23",
})
  .formatToParts(now)
  .reduce((result, part) => {
    result[part.type] = part.value;
    return result;
  }, {});

const timestamp =
  `${dateParts.year}-${dateParts.month}-${dateParts.day}` +
  `_${dateParts.hour}-${dateParts.minute}-${dateParts.second}`;

const jsonPath = path.join(
  reportDirectory,
  `vitest-results-${timestamp}.json`,
);

const textPath = path.join(
  reportDirectory,
  `vitest-report-${timestamp}.txt`,
);

const hour = Number(dateParts.hour);

let greeting;

if (hour >= 5 && hour < 11) {
  greeting = "selamat pagi";
} else if (hour >= 11 && hour < 15) {
  greeting = "selamat siang";
} else if (hour >= 15 && hour < 18) {
  greeting = "selamat sore";
} else {
  greeting = "selamat malam";
}

const vitestCli = path.join(
  projectRoot,
  "node_modules",
  "vitest",
  "vitest.mjs",
);

const args = [
  vitestCli,
  "run",
  "--reporter=default",
  "--reporter=json",
  `--outputFile=${jsonPath}`,
  ...process.argv.slice(2),
];

const startedAt = Date.now();

const child = spawn(process.execPath, args, {
  cwd: projectRoot,
  stdio: "inherit",
  shell: false,
});

child.on("error", (error) => {
  console.error("Gagal menjalankan Vitest:", error.message);
  process.exitCode = 1;
});

child.on("close", (exitCode) => {
  const durationMs = Date.now() - startedAt;

  let results = {};
  let readError = null;

  try {
    results = JSON.parse(readFileSync(jsonPath, "utf8"));
  } catch (error) {
    readError = error.message;
  }

  const testFiles = Array.isArray(results.testResults)
    ? results.testResults
    : [];

  const total = Number(results.numTotalTests ?? 0);
  const passed = Number(results.numPassedTests ?? 0);
  const failed = Number(results.numFailedTests ?? 0);
  const pending = Number(results.numPendingTests ?? 0);
  const todo = Number(results.numTodoTests ?? 0);
  const success = exitCode === 0 && !readError;

  const date = now.toLocaleDateString("id-ID", {
    timeZone: timezone,
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const time = now.toLocaleTimeString("id-ID", {
    timeZone: timezone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  });

  const lines = [
    "====================================================",
    "             AVSS LITE - VITEST REPORT",
    "====================================================",
    "",
    `Halo, ${greeting} Rakha!`,
    "",
    `Ini adalah Report Vitest tanggal ${date} pukul ${time} WIB.`,
    "",
    `Project          : AVSS Lite`,
    `Framework        : Vitest`,
    `Status           : ${success ? "PASSED" : "FAILED"}`,
    `Total test       : ${total}`,
    `Passed           : ${passed}`,
    `Failed           : ${failed}`,
    `Skipped/Pending  : ${pending}`,
    `Todo             : ${todo}`,
    `File test        : ${testFiles.length}`,
    `Durasi           : ${(durationMs / 1000).toFixed(2)} detik`,
    "",
    "---------------- DAFTAR FILE TEST ------------------",
    ...(
      testFiles.length
        ? testFiles.map((file, index) => {
            const status = String(file.status ?? "unknown").toUpperCase();
            return `${index + 1}. [${status}] ${file.name ?? "Unknown file"}`;
          })
        : ["Tidak ada hasil file test yang berhasil dibaca."]
    ),
    "",
    "---------------- KESIMPULAN ------------------------",
    success
      ? "Pengujian Vitest selesai tanpa kegagalan."
      : "Pengujian gagal atau laporan hasil test tidak dapat dibaca.",
    ...(readError ? [`Detail laporan: ${readError}`] : []),
    "",
    `Laporan TXT : ${textPath}`,
    `Laporan JSON: ${jsonPath}`,
    "====================================================",
    "",
  ];

  const report = lines.join("\n");

  writeFileSync(textPath, report, "utf8");

  console.log("\n");
  console.log(report);
  console.log("Report berhasil disimpan.");

  if (exitCode !== 0 || readError) {
    process.exitCode = exitCode || 1;
  }
});
