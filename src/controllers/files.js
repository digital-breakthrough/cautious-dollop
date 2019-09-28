import {js as beautify} from "js-beautify";
import fs from "fs";

const readFile = fs.promises.readFile;

export async function compare (req, res) {
    const fileForChecking = req.body.fileForChecking;
    const existingCodeBase = req.body.existingCodeBase;
    const fileDataForChecking = beautify(await readFile(fileForChecking.path, 'utf8')).replace(/(\n\n)/gm, "\n");
    const existingFileData = beautify(await readFile(existingCodeBase.path, 'utf8')).replace(/(\n\n)/gm, "\n");

    let equalRows = 0;
    for (const row_1 of fileDataForChecking.split("\n")) {
        for (const row_2 of existingFileData.split("\n")) {
            if (row_1 == row_2) {
                equalRows += 1;
                break;
            }
        }
    }
    
    const percent = 100 - equalRows/fileDataForChecking.split("\n").length * 100;
    const columns = [{
        title: 'Тип файл',
        dataIndex: "file_type",
        key: "file_type"
    }, {
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
        file_type: "Проверяемый файл",
        count_row: fileDataForChecking.split("\n").length,
        count_word: fileDataForChecking.split(" ").length,
    }, {
        id: 1,
        file_type: "Кодовая база",
        count_row: existingFileData.split("\n").length,
        count_word: existingFileData.split(" ").length,
    }];


    return res.json({
        success: true,
        percent,
        docs,
        columns
    });
}