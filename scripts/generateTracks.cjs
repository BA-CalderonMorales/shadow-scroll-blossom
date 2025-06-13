const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const vibes = ['chill', 'upbeat', 'ambient'];
const projectRoot = path.resolve(__dirname, '..');
const audioDir = path.join(projectRoot, 'public', 'audio');

if (!fs.existsSync(audioDir)) fs.mkdirSync(audioDir, { recursive: true });

for (const vibe of vibes) {
  console.log(`Generating ${vibe} track...`);
  const scd = path.join(__dirname, `${vibe}.scd`);
  try {
    execSync(`sclang ${scd}`, {
      stdio: 'inherit',
      env: {
        ...process.env,
        QT_QPA_PLATFORM: 'offscreen',
        QTWEBENGINE_DISABLE_SANDBOX: '1'
      }
    });
    const wav = path.join(audioDir, `${vibe}.wav`);
    const mp3 = path.join(audioDir, `${vibe}.mp3`);
    execSync(`ffmpeg -y -i ${wav} -codec:a libmp3lame -qscale:a 2 ${mp3}`, { stdio: 'inherit' });
    fs.unlinkSync(wav);
  } catch (err) {
    console.error(`Error generating ${vibe}:`, err);
  }
}
