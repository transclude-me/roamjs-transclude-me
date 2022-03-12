import toConfigPageName from "roamjs-components/util/toConfigPageName"
import runExtension from "roamjs-components/util/runExtension"
import {createConfigObserver} from "roamjs-components/components/ConfigPage"
import {watchTree} from "./watch"
import {publishBlock, transclusionId} from "./publish"

const ID = "transclude-me"
const CONFIG = toConfigPageName(ID)
const appUrl = `http://localhost:1234`
// const appUrl = `https://transclude.me/`


runExtension(ID, () => {
    createConfigObserver({title: CONFIG, config: {tabs: []}})

    window.roamAlphaAPI.ui
        .commandPalette
        .addCommand({
            label: 'Create a public transclusion of a block',
            callback: async () => {
                const currentBlock = await window.roamAlphaAPI.ui.getFocusedBlock()
                const currentBlockId = currentBlock["block-uid"]

                //@ts-ignore
                publishBlock(await window.roamAlphaAPI.data.pull("[*]", [":block/uid", currentBlockId]))

                await navigator.clipboard.writeText(`${appUrl}/roam/${await transclusionId(currentBlockId)}`)

                watchTree(currentBlockId, (_, block) => {
                    publishBlock(block)
                })
            },
        })
})
