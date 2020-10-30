import Axios from 'axios';
import { ErrorMessage, Field, Formik } from 'formik';
import dynamic from 'next/dynamic'
import { prepareFormData } from '../utils/helpers';

const ImageEditor = dynamic(() => import('../components/ImageEditor'), { ssr: false })

const Test = () => {
	return (
		<Formik
			initialValues={{
				image: '',
				title: ''
			}}
			validate={values => {
				const errors = {};

				if (!values.image) {
					errors.image = 'Please provide an image'
				}

				return errors;
			}}
			onSubmit={ async (values, { setSubmitting }) => {
				await Axios.post('/api/test', prepareFormData(values))
				setSubmitting(false);
			}}
		>
			{({
				handleSubmit,
				isSubmitting,
			}) => (
				<form onSubmit={handleSubmit}>
					<div className="form-group">
						<Field type="text" name="title" />
						<ErrorMessage name="title" component="div" className="invalid-feedback d-block" placeholder="Image title"/>
					</div>	
					<div className="form-group">
						<Field name="image" component={ImageEditor}/>
						<ErrorMessage name="image" component="div" className="invalid-feedback d-block"/>
					</div>					
					<button className="btn btn-outline-primary ml-auto" type="submit" disabled={isSubmitting}>
						Upload
					</button>
				</form>
				)}
		</Formik>
	)
}


export default Test