<template>
	<div class="notification columns is-mobile" :style="cssVars">
		<div class="column is-narrow">
			<b-button
				type="is-danger"
				icon-right="delete"
				@click="eraseSpeech()"
			/>
		</div>
		<div class="column is-narrow">
			<b-button
				type="is-danger"
				icon-right="backspace"
				@click="removeSpeech()"
			/>
		</div>
		<div class="column" style="padding: 0">
			<div class="content">
				<miniPicto
					class
					v-for="picto in pictos"
					:key="picto.meaning"
					:path="picto.path"
					:meaning="picto.meaning"
				/>
			</div>
		</div>
		<div class="column is-narrow">
			<b-button
				type="is-success"
				icon-right="message"
				@click="pictalk(pictos)"
			/>
		</div>
		<div class="column is-narrow">
			<b-button
				type="is-info"
				icon-right="content-copy"
				@click="copyPictosToClipboardBase(pictos)"
			/>
		</div>
	</div>
</template>
<script>
import miniPicto from "@/components/pictos/miniPicto";
import mergeImages from "merge-images-horizontally-with-text";
export default {
	created() {
		const allVoicesObtained = new Promise(function (resolve, reject) {
			let voices = window.speechSynthesis.getVoices();
			if (voices.length !== 0) {
				resolve(voices);
			} else {
				window.speechSynthesis.addEventListener(
					"voiceschanged",
					function () {
						voices = window.speechSynthesis.getVoices();
						resolve(voices);
					}
				);
			}
		});
		allVoicesObtained.then((voices) => (this.languages = voices));
	},
	methods: {
		async copyPictosToClipboardLegacy(pictos) {
			const message = pictos.reduce(
				(acc, curr_val) => acc + " " + curr_val.speech,
				""
			);
			try {
				await this.$copyText(message);
				const notif = this.$buefy.notification.open({
					duration: 5000,
					message: this.$t("CopySucces"),
					position: "is-top-right",
					type: "is-success",
					hasIcon: true,
				});
			} catch (e) {
				const notif = this.$buefy.notification.open({
					duration: 5000,
					message: this.$t("CopyError"),
					position: "is-top-right",
					type: "is-danger",
					hasIcon: true,
				});
			}
		},
		async copyPictosToClipboardBase(pictos) {
			const canWriteToClipboard = await this.askWritePermission();
			if (canWriteToClipboard) {
				await this.copyPictosToClipboardV2(pictos);
			} else {
				await this.copyPictosToClipboardLegacy(pictos);
			}
		},
		async copyPictosToClipboardV2(pictos) {
			const paths = pictos.map((picto) => picto.path);
			const text = pictos.reduce(
				(acc, curr_val) => acc + " " + curr_val.speech,
				""
			);
			const b64 = await mergeImages(paths, {
				crossOrigin: "Anonymous",
				text: text,
				color: "white",
			});
			try {
				const blob = this.b64toBlob(b64);
				const data = [new ClipboardItem({ [blob.type]: blob })];
				await navigator.clipboard.write(data);
				const notif = this.$buefy.notification.open({
					duration: 5000,
					message: this.$t("CopySucces"),
					position: "is-top-right",
					type: "is-success",
					hasIcon: true,
				});
			} catch (e) {
				console.log(e);
				await this.$copyText(b64);
				const notif = this.$buefy.notification.open({
					duration: 5000,
					message: this.$t("CopyError"),
					position: "is-top-right",
					type: "is-danger",
					hasIcon: true,
				});
			}
		},
		async pictalk(pictos_obs) {
			var pictos = JSON.parse(JSON.stringify(pictos_obs));
			if ("speechSynthesis" in window) {
				var msg = new SpeechSynthesisUtterance();
				const message = pictos.reduce(
					(acc, curr_val) => acc + " " + curr_val.speech,
					""
				);
				msg.text = message;
				let voice = this.languages.filter(
					(voice) => voice.lang == this.getUserLang
				);
				if (voice.length !== 0) {
					msg.voice = voice[0];
				}
				window.speechSynthesis.speak(msg);
			} else {
				const notif = this.$buefy.notification.open({
					duration: 5000,
					message: this.$t("NoVoicesFound"),
					position: "is-top-right",
					type: "is-warning",
					hasIcon: true,
				});
			}
		},
		removeSpeech() {
			const pictoSpeech = this.$store.getters.getSpeech;
			if (pictoSpeech.length >= 1) {
				let adminMode = "";
				if (this.$route.query.isAdmin) {
					adminMode = "?isAdmin=true";
				}
				this.$router.push(
					"/pictalk/" +
						this.$route.params.collectionId +
						"/" +
						pictoSpeech[pictoSpeech.length - 1].fatherId +
						adminMode
				);
			}
			this.$store.commit("removeSpeech");
		},
		eraseSpeech() {
			this.$store.commit("eraseSpeech");
			let adminMode = "";
			if (this.$route.query.isAdmin) {
				adminMode = "?isAdmin=true";
			}
			this.$router.push("/pictalk" + adminMode);
		},
		async askWritePermission() {
			try {
				// The clipboard-write permission is granted automatically to pages
				// when they are the active tab. So it's not required, but it's more safe.
				const { state } = await navigator.permissions.query({
					name: "clipboard-write",
				});
				return state === "granted";
			} catch (error) {
				// Browser compatibility / Security error (ONLY HTTPS) ...
				return false;
			}
		},
		b64toBlob(dataURI) {
			const byteString = atob(dataURI.split(",")[1]);
			const ab = new ArrayBuffer(byteString.length);
			let ia = new Uint8Array(ab);

			for (var i = 0; i < byteString.length; i++) {
				ia[i] = byteString.charCodeAt(i);
			}
			return new Blob([ab], { type: "image/png" });
		},
	},
	computed: {
		cssVars() {
			return {
				"--bg-color": this.collectionColor,
			};
		},
		getUserLang() {
			const user = this.$store.getters.getUser;
			return user.language;
		},
	},
	components: {
		miniPicto: miniPicto,
	},
	props: {
		pictos: {
			type: Array,
			required: true,
		},
		collectionColor: {
			type: String,
			required: true,
		},
	},
	data() {
		return {
			adminMode: false,
			languages: [],
		};
	},
};
</script>
<style scoped>
.content {
	display: flex;
	align-items: flex-start;
	justify-content: space-evenly;
}
.notification {
	background-color: var(--bg-color);
	position: relative;
	overflow: auto;
	padding: 0.25rem;
}
.nopadding {
	padding: 0.25rem;
}
</style>
