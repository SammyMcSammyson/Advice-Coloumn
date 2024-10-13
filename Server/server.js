import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import pg from 'pg';

const app = express();

app.use(express.json());

app.use(cors());

dotenv.config();

const dbConnectionString = process.env.DATABASE_URL;
export const db = new pg.Pool({ connectionString: dbConnectionString });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Running on PORT ${PORT}`);
});

app.get('/', (req, res) => {
  res.json({
    message: 'Checking in boiiiiiiii',
  });
});

app.get('/Advice', async (req, res) => {
  try {
    const adviceData = await db.query(
      `SELECT id, age, advice, upvotes, downvotes FROM advice`
    );

    console.log(adviceData);

    res.status(200).json(adviceData.rows);
  } catch (error) {
    //our server will give us this error, if there is a problem with the code in try
    console.error('You fucked it', error);
    res.status(500).json({ success: false });
  }
});

app.post('/addAdvice', async (req, res) => {
  try {
    const { age, advice } = req.body;
    const newAdvice = await db.query(
      `
        INSERT INTO advice (age, advice)
        VALUES ($1, $2) RETURNING *;
        `,
      [age, advice]
    );
    console.log('Parameters:', age, advice);

    res.status(200).json(newAdvice.rows);
  } catch (error) {
    console.error('You have fucked adding advice. You idiot', error);
    res.status(500).json({ success: false });
  }
});

app.post('/advice/upvote/:id', async (req, res) => {
  let { id } = req.params;
  try {
    let upvoteAdvice = await db.query(
      `UPDATE advice SET upvotes = upvotes + 1 WHERE id = $1 RETURNING *`,
      [id]
    );
    res.status(200).json(upvoteAdvice.rows[0]);
  } catch (error) {
    console.error('You can not even upvote', error);
    res.status(500).json({ success: false });
  }
});

app.post('/advice/downvote/:id', async (req, res) => {
  let { id } = req.params;
  try {
    const downvoteAdvice = await db.query(
      `UPDATE advice SET downvotes = downvotes + 1 WHERE id = $1 RETURNING *`,
      [id]
    );
    res.status(200).json(downvoteAdvice.rows[0]);
  } catch (error) {
    console.error(
      'Stop being so negative your downvote did not go through',
      error
    );
    res.status(500).json({ success: false });
  }
});

app.delete('/advice/delete:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteAdvice = await db.query(
      `DELETE FROM advice WHERE id = $1 RETURNING *`,
      [id]
    );
    res.status(200).json(deleteBiscuit.rows);
  } catch (error) {
    console.error('You cannot delete this hahahahaha', error);
    res.status(500).json({ success: false });
  }
});
