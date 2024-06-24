import express, { Request, Response } from 'express';
import { exec } from 'child_process';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.get('/python', (req: Request, res: Response) => {
  exec('python src/index.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      res.status(500).send(`Error executing script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Script error: ${stderr}`);
      res.status(500).send(`Script error: ${stderr}`);
      return;
    }
    res.send(stdout);
  });
});


app.get('/', (req: Request, res: Response) => {
  res.send('hello');
});

app.listen(port, () => {
  console.log(`Развернуто на http://localhost:${port}`);
});
