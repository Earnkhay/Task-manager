<!-- <template>
<div class="component1">
	<h1>You have clicked {{ labeltext }} times</h1>
</div>
</template>

<script>
import EventBus from '../eventbus';

export default {
	name: "component1",
	data() {
	return {
		labeltext: 0,
	};
	},
	methods: {
	change_n(n) {
		this.labeltext = n;
	},
	},
	created() {
		// Sets up the Event Bus listener using
		// the custom event name and assosciates
		// it with a component method.
		EventBus.$on("change_n", this.change_n);
	},
	unmounted() {
		// Removes Event Bus listener upon removal
		// of template from DOM.
		EventBus.$off("change_n", this.change_n);
	},
};
</script>

<style scoped>
.component1 {
	display: block;
	background-color: green;
	height: 15em;
	text-align: center;
	color: white;
	padding-top: 5em;
}
</style> -->
