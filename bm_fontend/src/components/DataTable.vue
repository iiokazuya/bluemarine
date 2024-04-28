<template>
	<table>
		<tr>
			<th v-for="key in Object.keys(items[0])" :key="key">{{ key }}</th>
		</tr>
		<tr v-for="item in items" :key="item" @click="$emit('click', item)">
			<td v-for="key in Object.keys(items[0])" :key="key">{{ item[key] }}</td>
		</tr>
	</table>
</template>

<style scoped>
table {
	width: 100%;
	border-collapse: collapse;
}
tr {
	background-color: #FFFFFF;
	cursor: pointer;
}
th, td {
	text-align: left;
	padding: 8px;
	border-bottom: 1px solid #EEEEEE;
}
</style>

<script setup>
defineProps({
	"items": { default: [] },
});
defineEmits([
	"click"
]);
</script>