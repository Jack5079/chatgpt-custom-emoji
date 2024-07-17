"use strict"

const emoji = {
	wavesmiley: "https://wavesmiley.com/wavesmiley.gif",
	funnythumbsup:
		"https://cdn.discordapp.com/emojis/1001766041711554650.webp?size=128&quality=lossless",
	ohno: "https://cdn.discordapp.com/emojis/1219758332676407326.webp?size=56&quality=lossless",
}

function replace(node) {
	const shortcode = node.textContent.trim()
	if (node.nodeName === "CODE" && Object.keys(emoji).includes(shortcode)) {
		const img = document.createElement("img")
		img.src = emoji[shortcode]
		img.style.display = "inline-block"
		img.style.height = "1em"
		img.style.marginBlock = "0"
		node.parentNode.replaceChild(img, node)
	}
}

document.querySelectorAll("main code").forEach(replace)

function handleMutations(mutationsList, observer) {
	mutationsList.forEach((mutation) => {
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach(replace)
		}
	})
}

const observer = new MutationObserver(handleMutations)
observer.observe(document.querySelector("main"), {
	childList: true,
	subtree: true,
})
