const fs = require('fs/promises');
const uuid = require('uuid').v4;
const path = require('path');

const uploadFile = async (file, folder) => {
    try{
        await fs.fileExists(`./public/${folder}`);
    } catch (err) {
        await fs.mkdir(`./public/${folder}`); 
    }finally{
        const fileName = `${folder}/${uuid()}.${file.mimetype.split('/')[1]}`;
        await file.mv(path.join(__dirname, '../../..' ,'public', fileName));
        return fileName;
    }
}

module.exports = {
    uploadFile
}