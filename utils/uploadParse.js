import formidable from 'formidable';


const uploadParse = async (req, maxSize) => {
	const form = formidable({ uploadDir: './uploads', maxFileSize: Number(maxSize) * 1024 * 1024});
		
	return await new Promise((resolve, reject) => {
		form.parse(req, (err, fields, files) => {
				if (err) return reject(err);
				return resolve({fields, files});
		}); 
	});
}

export default uploadParse