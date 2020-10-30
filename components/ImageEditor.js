import { useRef, useState } from 'react'
import AvatarEditor from 'react-avatar-editor'
import { Modal } from 'react-bootstrap'


const ImageEditor = ({ field, form: { setFieldValue }, ...props }) => {
	const setEditorRef = useRef()
	// const [crop, setCrop] = useState()
	const [scale, setScale] = useState(1)
	const [uploadedImage, setUploadedImage] = useState()
	const [imagePreview, setImagePreview] = useState()
	const [showModal, setShowModal] = useState(false);

	const handleShow = (e) => {
		e.preventDefault()
		setShowModal(true)
	}

	const zoomIn = () => {
		if (scale === 5) return
		setScale(scale + 0.25)
	}

	const zoomOut = () => {
		if (scale === 1) return
		setScale(scale - 0.25)
	}

	const confirmCrop = () => {
		const editor = setEditorRef.current
		setFieldValue(`${field.name}Crop`, JSON.stringify(editor.getCroppingRect()));
		setImagePreview(editor.getImage().toDataURL())
		setShowModal(false)
	}

	const onChange = (e) => {
		setUploadedImage(e.target.files[0])
		setFieldValue(field.name, e.target.files[0]);
	}

	return (
		<React.Fragment>
			<button className="btn btn-outline-primary" type="button" onClick={handleShow}>
				{imagePreview && ( <img src={imagePreview} style={{ maxWidth: '100px', marginRight: '15px'}}/> )}
				Choose Image
			</button>
			<Modal show={showModal} onHide={confirmCrop}>
				<Modal.Header>
					<Modal.Title>Choose Image</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<input type="file" {...props} onChange={onChange}/>
					{uploadedImage && (
						<div className="image-editor">
								<AvatarEditor
									ref={setEditorRef}
									image={uploadedImage}
									width={250}
									height={250}
									border={20}
									color={[255, 255, 255, 0.6]} 
									scale={scale}
									// borderRadius={9999}
								/>
								<button className="btn btn-secondary mr-2 mt-4" type="button" onClick={zoomIn}>+</button>
								<button className="btn btn-secondary mr-2 mt-4" type="button" onClick={zoomOut}>-</button>
								<button className="btn btn-secondary mr-2 mt-4" type="button" onClick={confirmCrop}>Confirm</button>
						</div>
					)}
				</Modal.Body>
			</Modal>
		</React.Fragment>
	)
}

export default ImageEditor
