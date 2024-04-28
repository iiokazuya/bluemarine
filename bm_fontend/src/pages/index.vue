<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<h1>Dashboard</h1>
		<h2>Bugs</h2>
		<DataTable :items="bugs" />
		<BugReportDialog />
		<h2>Requests</h2>
		<DataTable :items="requests" />
		<NewRequestDialog />
		<h2>Tasks</h2>
		<DataTable :items="tasks" />
		<NewTaskDialog />
	</div>
</template>

<style sooped>
h1, h2 {
	margin: 8px;
	color: #0099CC;
}
</style>

<script setup>
const bugs = [
	{ id: 0, summary: "any buttons dont work", reporter: "ken", reported: "2000/01/01 00:00:00", updated: "2000/01/01 00:00:00", assignee: "john", progress: "not yet" },
	{ id: 1, summary: "any forms dont work", reporter: "ken", reported: "2000/01/01 00:00:00", updated: "2000/01/01 00:00:00", assignee: "john", progress: "not yet" },
	{ id: 2, summary: "any employees dont work", reporter: "ken", reported: "2000/01/01 00:00:00", updated: "2000/01/01 00:00:00", assignee: "john", progress: "not yet" },
];
const requests = [
	{ id: 0, summary: "make all buttons work", reporter: "ken", reported: "2000/01/01 00:00:00", updated: "2000/01/01 00:00:00", assignee: "john", progress: "not yet" },
	{ id: 1, summary: "make all forms work", reporter: "ken", reported: "2000/01/01 00:00:00", updated: "2000/01/01 00:00:00", assignee: "john", progress: "not yet" },
	{ id: 2, summary: "make all employees work harder!", reporter: "ken", reported: "2000/01/01 00:00:00", updated: "2000/01/01 00:00:00", assignee: "john", progress: "not yet" },
];
const tasks = [
	{},
];
</script>
