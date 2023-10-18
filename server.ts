import * as express from 'express';
import * as mysql from 'mysql';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { MysqlError } from 'mysql';


const app = express();
app.use(cors());
app.use(bodyParser.json());

//create a connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'anime_metrics_password',
    database: 'anime_metrics'
});

//connect to db
db.connect((err: Error) => {
    if (err) throw err;
    console.log('Connected to the database');
  });

  //define interface of table
  interface AnimeMetrics{
    anime: string;
    viewerCount: number;
    averageWatchTime: number;
  }
  //insert into MySQL db
  app.post('/insert', (req: Request, res: Response) => {
    const { anime, viewerCount, averageWatchTime } = req.body;
    const sql = 'INSERT INTO anime_metrics.metrics (anime, viewerCount, averageWatchTime) VALUES (?, ?, ?)';
    db.query(sql, [anime, viewerCount, averageWatchTime], (err: MysqlError | null, result: any) => {
      if (err) throw err;
      res.send('Data inserted');
    });
  });

  app.listen(4000, () => {
    console.log('Server running on port 4000');
  });