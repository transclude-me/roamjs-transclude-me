import {PullBlock} from "roamjs-components"
import {setCloudState} from "@compose-run/client"

export const publishBlock = async (block: PullBlock) => {
    const name = `transclude-me/roam/${await transclusionId(block[":block/uid"])}`
    console.log("publishing", getGraphName(), name, block)
    setCloudState({name: name, state: block})
}

const getGraphName = () => {
    const currentUrl = new URL(window.location.href)
    return currentUrl.hash.split('/')[2]
}

export const transclusionId = (currentBlockId: string) => sha256(`${getGraphName()}/${currentBlockId}`)

async function sha256(message: string) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message)

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer))

    // convert bytes to hex string
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}
