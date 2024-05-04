<template>
	<v-dialog v-model="dialog">
		<template v-slot:activator="{ props: activatorProps }">
			<v-btn class="new-request-button" v-bind="activatorProps">New Task</v-btn>
		</template>
		<v-card title="New Task">
			<v-card-text>
				<v-text-field variant="outlined" label="Summary" v-model="summary"></v-text-field>
				<v-textarea variant="outlined" label="Detail" v-model="detail"></v-textarea>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn variant="outlined" @click="onClickReport" :disabled="hasEmptyForm">Add Task</v-btn>
				<v-btn variant="outlined" @click="dialog=false">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<style scoped>
.new-request-button {
	margin: 8px;
}
</style>

<script setup>
import { ref, computed } from "vue";
import http from "@/plugins/http";

const emit = defineEmits([
	"post"
]);

const dialog = ref(false);
const summary = ref("");
const detail = ref("");
const deadline = ref("2000/1/1");
const hasEmptyForm = computed(() => {
	return (summary.value == "" || detail.value == "");
});

async function onClickReport() {
	const data = {
		summary: summary.value,
		detail: detail.value,
		deadline: deadline.value,
		userID: "suzuki"
	};
	await http.postWait("/tasks", data);
	emit("post");
	dialog.value = false;
}
</script>