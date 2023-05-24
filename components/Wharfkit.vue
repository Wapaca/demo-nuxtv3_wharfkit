<script setup>
import { useSessionKit, useSession } from '../composables/useSession';

const { login, logout, transact } = useSessionKit();
const session = useSession();

</script>
<template>
	<div>
		<div>
			<div v-if="session">
				<span>{{ session.actor }} connected</span>
				<button @click="transact">Transact test</button>
			</div>
			<button v-else @click="login">Login</button>
		</div>
		<hr>
		<div>
			<button @click="logout">Logout</button>
		</div>

	</div>
</template>