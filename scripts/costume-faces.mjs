'use strict'

import fs from 'fs'
import path from 'path'
import axios from 'axios'

async function downloadImage(num) {
    const url = `https://img.gamewith.jp/article_tools/nierreincarnation/gacha/c_i_${num}.png`
    const destination = path.resolve('public', 'costume-faces', `${num}.png`)
    if (fs.existsSync(destination)) {
        return
    }

    const response = await axios({
        url,
        method: "GET",
        responseType: "stream"
    })

    const writer = fs.createWriteStream(destination)
    response.data.pipe(writer)

    return new Promise((res, rej) => {
        writer.on('finish', res)
        writer.on('error', rej)
    })
}

(async () => {
    let num = 1
    while (true) {
        try {
            await downloadImage(num)
        } catch (e) {
            break
        }
        console.log(`image #${num} downloaded`)
        num++
    }
})()