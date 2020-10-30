export const prepareFormData = (values) => {
	const data = new FormData()
	for (var key in values) {
		data.append(key, values[key])
	}
	return data
}