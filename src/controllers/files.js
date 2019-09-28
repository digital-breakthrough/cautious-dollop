import {js as beautify} from "js-beautify";
import fs from "fs";

const readFile = fs.promises.readFile;

export async function compare (req, res) {
    const files = req.body.files;
    const fileData1 = beautify(await readFile(files[0].path, 'utf8')).replace(/(\n\n)/gm, "\n");
    const fileData2 = beautify(await readFile(files[1].path, 'utf8')).replace(/(\n\n)/gm, "\n");

    let equalRows = 0;
    for (const row_1 of fileData1.split("\n")) {
        for (const row_2 of fileData2.split("\n")) {
            if (row_1 == row_2) {
                equalRows += 1;
                break;
            }
        }
    }
    
    const percent = equalRows/fileData1.split("\n").length * 100;
    const columns = [{
        title: 'Количество строк',
        dataIndex: "count_row",
        key: "count_row"
    }, {
        title: "Количество слов",
        dataIndex: "count_word",
        key: "count_word"
    }];

    const docs = [{
        id: 0,
        count_row: fileData1.split("\n").length,
        count_word: fileData1.split(" ").length,
    }, {
        id: 1,
        count_row: fileData2.split("\n").length,
        count_word: fileData2.split(" ").length,
    }];


    return res.json({
        success: true,
        percent,
        docs,
        columns
    });
}