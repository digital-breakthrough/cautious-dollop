import {js as beautify} from "js-beautify";
import fs from "fs";

const readFile = fs.promises.readFile;

export async function compare (req, res) {
    const files = req.body.files;
    const fileData1 = beautify(await readFile(files[0].path, 'utf8'));
    const fileData2 = beautify(await readFile(files[1].path, 'utf8'));

    let equalRows = 0;
    for (const row_1 of fileData1.split("\n")) {
        for (const row_2 of fileData2.split("\n")) {
            if (row_1 == row_2) {
                equalRows += 1;
                break;
            }
        }
    }

    console.log(equalRows)
    
    const percent = fileData1.split("\n").length > fileData2.split("\n").length
        ? equalRows/fileData2.split("\n").length * 100
        : equalRows/fileData1.split("\n").length * 100;
    
    const params = [{
        id: 0,
        name: "Количество строк",
        value_1: fileData1.split("\n").length,
        value_2: fileData2.split("\n").length
    }, {
        id: 1,
        name: "Количество слов",
        value_1: fileData1.split(" ").length,
        value_2: fileData2.split(" ").length
    }]


    return res.json({
        success: true,
        percent,
        params
    });
}