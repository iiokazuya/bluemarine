<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<h1>Dashboard</h1>
		<h2>Bugs</h2>
		<DataTable :items="bugs" />
		<BugReportDialog @post="refleshBugs" />
		<h2>Requests</h2>
		<DataTable :items="requests" />
		<NewRequestDialog @post="refleshReports" />
		<h2>Tasks</h2>
		<DataTable :items="tasks" />
		<NewTaskDialog @post="refleshTasks" />
	</div>
</template>

<style scoped>
h1, h2 {
	margin: 8px;
	color: #0099CC;
}
</style>

<script setup>
import { onMounted, reactive } from 'vue';
import http from "@/plugins/http.js";

const bugs = reactive([]);
const requests = reactive([]);
const tasks = reactive([]);

onMounted(async () => {
	await getBugs();
	await getReports();
	await getTasks();
});

async function getBugs() {
	bugs.splice(0);
	const response = await http.getWait("/bugs", {});
	response.data.forEach(bug => {
		bugs.push({
			id: bug.id,
			summary: bug.summary,
			reported: new Date(bug.created).toLocaleString(),
			updated: new Date(bug.updated).toLocaleString(),
			assignee: bug.assignee,
			progress: bug.progress
		});
	});
}

async function getReports() {
	requests.splice(0);
	const resRequest = await http.getWait("/requests", {});
	resRequest.data.forEach(request => {
		requests.push({
			id: request.id,
			summary: request.summary,
			reported: new Date(request.created).toLocaleString(),
			updated: new Date(request.updated).toLocaleString(),
			assignee: request.assignee,
			progress: request.progress
		});
	});
}

async function getTasks() {
	tasks.splice(0);
	const resTask = await http.getWait("/tasks", {});
	resTask.data.forEach(task => {
		tasks.push({
			id: task.id,
			summary: task.summary,
			deadline: new Date(task.deadline).toLocaleDateString(),
			reported: new Date(task.created).toLocaleString(),
			updated: new Date(task.updated).toLocaleString(),
			assignee: task.assignee,
			progress: task.progress
		});
	});
}

function refleshBugs() {
	setTimeout(getBugs, 1000);
}

function refleshReports() {
	setTimeout(getReports, 1000);
}

function refleshTasks() {
	setTimeout(getTasks, 1000);
}
</script>
