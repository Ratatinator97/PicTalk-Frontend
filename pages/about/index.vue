<template>
	<div>
		<body>
			<section class="section">
				<div class="container">
					<figure class="image is-128x128">
						<img
							class="is-rounded"
							src="https://avatars0.githubusercontent.com/u/45072484?s=460&u=319a46de82b5b32ade7afb1807dec076bd6a925f&v=4"
						/>
					</figure>

					<br />
					<h1 class="title is-size-3-mobile">{{ $t("AboutMe") }}</h1>
					<h2 class="subtitle is-size-5-mobile has-text-justified">
						{{ $t("AboutText1") }}
						<a href="https://www.youtube.com/watch?v=aL7PR2x7UlU"
							>videos</a
						>
						{{ $t("AboutText2") }}
					</h2>
					<br />
					<h1 class="title is-size-3-mobile">{{ $t("Backers") }}</h1>
					<div class="columns is-centered">
						<div class="column is-one-fifth">
							<b-image
								lazy
								:srcset="
									require('@/assets/FondationLogo.png').srcSet
								"
								alt="Fondation INSA Lyon logo"
								style="width: 80%"
							></b-image>
						</div>
					</div>
					<h2 class="subtitle is-size-5-mobile has-text-justified">
						{{ $t("AboutText3") }}
						<a href="https://youtu.be/VTbszl_xmN4">video</a>
						{{ $t("AboutText4") }}
					</h2>
				</div>
			</section>
		</body>
	</div>
</template>