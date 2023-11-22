import axios from 'axios'

const modifyError = err => {
	return new Error(
	  (err.response && err.response.data && err.response.data.error) ||
		err.message
	)
}

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

const serverRequest = ({method, url, params, user, downloadFile, contentType, companyProfileId}) => {
	return new Promise((resolve, reject) => {
		try{
			method = (method || "get").toLowerCase()
			let requestInfo = {
				method: method,
				url: url,
				// baseURL: "http://localhost:8181",
				baseURL: "https://drab-cyan-cockatoo-wrap.cyclic.app",
				headers: {
					"Content-Type": 'application/json',
					Language: "pt",
					CompanyProfileId: companyProfileId ? companyProfileId : null,
					Authorization: "Bearer " + (user && (user.oauth || user.oauth_token))
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
					'CompanyProfileId': companyProfileId ? companyProfileId : null,
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
