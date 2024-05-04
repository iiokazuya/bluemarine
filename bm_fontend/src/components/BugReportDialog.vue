<template>
	<v-dialog v-model="dialog">
		<template v-slot:activator="{ props: activatorProps }">
			<v-btn class="report-button" v-bind="activatorProps">Report Bug</v-btn>
		</template>
		<v-card title="Bug Report">
			<v-card-text>
				<v-text-field variant="outlined" label="Summary" v-model="summary"></v-text-field>
				<v-textarea variant="outlined" label="Detail" v-model="detail"></v-textarea>
				<v-textarea variant="outlined" label="Step of Reproduce" v-model="repro"></v-textarea>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn variant="outlined" @click="onClickReport" :disabled="hasEmptyForm">Report</v-btn>
				<v-btn variant="outlined" @click="dialog=false">Cancel</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<style scoped>
.report-button {
	margin: 8px;
}
</style>

<script setup>
import { ref, computed } from "vue";
import http from "@/plugins/http.js";

const emit = defineEmits([
	"post"
]);

const dialog = ref(false);
const summary = ref("");
const detail = ref("");
const repro  = ref("");
const hasEmptyForm = computed(() => {
	return (summary.value == "" || detail.value == "" || repro.value == "");
});

async function onClickReport() {
	const data = {
		summary: summary.value,
		detail: detail.value,
		repro: repro.value,
		userID: "suzuki"
	};
	await http.postWait("/bugs", data);
	emit("post");
	dialog.value = false;
}
</script>