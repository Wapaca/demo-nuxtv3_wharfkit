<template>
	<div>

		<div>
			<div v-if="session">
				<span>{{ session.actor }} connected</span>
			</div>
			<button v-else @click="login">Login</button>
		</div>
		<hr>
		<div>
			<button @click="logout">Logout</button>
		</div>

	</div>
</template>
<script setup>
import { useSessionKit, useSession } from '../composables/useSession';

const { login, logout } = useSessionKit();
const session = useSession();

</script>