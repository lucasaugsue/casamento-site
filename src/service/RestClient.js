import axios from 'axios'

const modifyError = (err) => {
	try {
		if (err?.response?.data?.error) {
			throw new Error(err.response.data.error);

		} else if (err.message) {
			throw new Error(err.message);

		} else {
			throw new Error("Error!");
		}

	} catch (error) {
	  	return error;
	}
};

const extractFileName = (contentDispositionValue) => {
	var filename = null;
	if (contentDispositionValue && contentDispositionValue.indexOf('attachment') !== -1) {
		var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
		var matches = filenameRegex.exec(contentDispositionValue);
		if (matches != null && matches[1]) {
			filename = matches[1].replace(/['"]/g, '');
		}
	}
	return filename;
}

const serverRequest = ({method, url, params, user, downloadFile, contentType}) => {
	return new Promise((resolve, reject) => {
		try{
			method = (method || "get").toLowerCase()
			let requestInfo = {
				method: method,
				url: url,
				baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8181",
				headers: {
					'Accept': '*',
					'Language': "pt",
					"Content-Type": 'application/json',
					"Access-Control-Expose-Headers": "*",
					"Access-Control-Allow-Headers": "*",
					// Authorization: "Bearer " + (user && (user.oauth || user.oauth_token)),
				}
			}

			if(method === "get") requestInfo.params = params
			else requestInfo.data = params

			if(!downloadFile){
				axios(requestInfo)
				.then(res => { 
					if(res.data.error) reject(new Error(res.data.error))
					else resolve(res.data) 
				})
				.catch((err) => {
					reject(modifyError(err));
				});
			}else{
				fetch(`${requestInfo.baseURL}${requestInfo.url}`, { 
				  method,
				  responseType: 'blob',
				  headers: {
					'Accept': '*',
					'Language': "pt",
					'Authorization': "Bearer " + (user && (user.oauth || user.oauth_token)),
					"Content-Type": "application/json",
					"Access-Control-Expose-Headers": "*",
					"Access-Control-Allow-Headers": "*",
				  },
				  body: JSON.stringify({...requestInfo.data}),
				})
				.then(response => {
				  response.blob()
				  .then(blob => {
					resolve({data: blob, filename: extractFileName(response.headers.get('content-disposition'))})
				  })
				  .catch(reject)
				})
				.catch(err => reject(modifyError(err)))
			}

		}catch(err){
			reject(err)
		}
	})
}

export default serverRequest;
