import toConfigPageName from "roamjs-components/util/toConfigPageName"
import runExtension from "roamjs-components/util/runExtension"
import {createConfigObserver} from "roamjs-components/components/ConfigPage"
import {watchTree} from "./watch"
import {publishBlock, transclusionId} from "./publish"
import {getSubTree, setInputSetting} from "roamjs-components"

const ID = "transclude-me"
const CONFIG = toConfigPageName(ID)
// const appUrl = `http://localhost:1234`
const appUrl = `https://transclude.me/`


const observedBlocksConfig = "blocksToTransclude"

function saveTranscluded(configPageUid: string, currentBlockId: string) {
    const {uid: idsUid} = getSubTree({key: observedBlocksConfig, parentUid: configPageUid})
    return setInputSetting({blockUid: idsUid, key: `((${currentBlockId}))`, value: "raw"})
}

const transclude = (currentBlockId: string) =>
    watchTree(currentBlockId, (_, block) => {
        publishBlock(block)
    })

function startTrascludingSavedBlocks(configPageUid: string) {
    const {children: idsChildren} = getSubTree({
        parentUid: configPageUid,
        key: observedBlocksConfig,
    })
    idsChildren.map((t) => t.text.slice(2, -2)).forEach(transclude)
}

runExtension(ID, async () => {
    const {pageUid: configPageUid} = await createConfigObserver({title: CONFIG, config: {tabs: []}})

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

                saveTranscluded(configPageUid, currentBlockId)
                transclude(currentBlockId)
            },
        })

    startTrascludingSavedBlocks(configPageUid)
})
