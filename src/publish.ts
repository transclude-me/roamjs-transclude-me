import {PullBlock} from "roamjs-components"
import {setCloudState} from "@compose-run/client"

export const publishBlock = (block: PullBlock) => {
    const name = `transclude-me/roam/graph-name-todo/${block[":block/uid"]}`
    console.log("publishing", name, block)
    setCloudState({name: name, state: block})
}
