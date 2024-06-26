## Unregulated casino stocks

This repo simulates how unregulated gasino stocks work.

Clone the repository
```bash
  git clone https://github.com/jannwildelgado/stock-sims.git
  cd stocks-sims
```

Install dependencies
```
  npm install
```

Change file permissions
```
  chmod +x index.js bar.js line.js
```

run the sims
```
  ./index.js | tee >(./bar.js) | ./line.js // or node index.js | tee >(node bar.js) | node line.js
```

