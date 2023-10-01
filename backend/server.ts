import express from 'express';
import multer from 'multer';
import cors from 'cors';

const app: express.Express = express();
const port = 8000;
const FRONT = ['http://localhost:3000'];

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploadData')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})
const upload = multer({ storage: storage });

app.use(
    cors({
        origin: FRONT,
        credentials: true
    })
);

app.use(express.json());

app.post('/upload', upload.single('file'), (req: express.Request, res: express.Response) => {
    if (!req.file) {
        return res.status(400).send('アップロードに失敗しました。');
    }
    console.log('成功');
    res.send(200).send();
});

app.listen(port, () => {
    console.log(`サーバーがポート ${port} で起動しました。`);
});