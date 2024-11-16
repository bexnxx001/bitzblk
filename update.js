const fs = require('fs');
const pfile = 'ip.txt';

async function main() {
  if (!fs.existsSync(pfile)) return console.error('File not found.');
  const prx = fs.readFileSync(pfile, 'utf-8').split('\n').filter(Boolean);
  const aProxy = [];
  for (let i = 0; i < prx.length; i += 50) {
    const results = await Promise.all(
      prx.slice(i, i + 50).map(async prxy => {
        try {
          const rspn = await fetch(`https://p01--boiling-frame--kw6dd7bjv2nr.code.run/check?ip=${prxy.split(',')[0]}&host=speed.cloudflare.com&port=${prxy.split(',')[1]}&tls=true`);
          const data = await rspn.json();
          if (data.proxyip) {
            console.log('Found active proxy: ' + prxy);
            aProxy.push(prxy.filter(Boolean));
          }
        } catch {}
      }).flat()
    );
  }
  fs.writeFileSync('checked.txt', aProxy.join('\n'), 'utf-8');
  console.log('DONE');
}

main();
