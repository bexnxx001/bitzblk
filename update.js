const fs = require('fs');
const pfile = 'ip.txt';

async function main() {
  if (!fs.existsSync(pfile)) return console.error('File not found.');
  const prx = fs.readFileSync(pfile, 'utf-8').split('\n').filter(Boolean);
  const aProxy = [];
  for (let i = 0; i < prx.length; i += 50) {
    const batch = prx.slice(i, i + 50);
    await Promise.all(
      batch.map(async (prxy) => {
        try {
          const [ip, port] = prxy.split(',');
          const response = await fetch(`https://p01--boiling-frame--kw6dd7bjv2nr.code.run/check?ip=${ip}&host=speed.cloudflare.com&port=${port}&tls=true`);
          const data = await response.json();
          if (data.proxyip) {
            aProxy.push(prxy);
          }
        } catch {
        }
      })
    );
  }

  fs.writeFileSync('checked.txt', aProxy.join('\n'), 'utf-8');
  console.log('DONE');
}

main();
