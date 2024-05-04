import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:3000"
});

const httpClient = {
	get: (url, param, callback) => {
		const config = {
			param: param
		};
		instance.get(url, config).then((res)=>{callback(res)});	
	},
	getWait: async (url, param) => {
		const config = {
			param: param
		};
		return await instance.get(url, config);
	},
	post: (url, data, callback) => {
		instance.post(url, data).then((res)=>{callback(res)});
	},
	postWait: async (url, data) => {
		return await instance.post(url, data);
	},
	put: (url, data, callback) => {
		instance.put(url, data).then((res)=>{callback(res)});
	},
	putWait: async (url, data) => {
		return await instance.put(url, data);
	},
	del: (url, callback) => {
		instance.delete(url).then((res)=>{callback(res)});
	},
	delWait: async (url) => {
		return await instance.delete(url);
	},
}

export default httpClient;
