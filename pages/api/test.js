import uploadParse from '../../utils/uploadParse'


export const config = {
  api: {
    bodyParser: false,
  },
}

export default async (req, res) => {
  if (req.method === 'POST') {
		// const { db } = await connectToDatabase()

		const { fields, files }  = await uploadParse(req, 5)
		const { title, imageCrop } = fields;
		const { image } = files

		res.json(image.path, image.type)
    

    // res.status(200).end()
  }
}