import { Before, BeforeAll } from "@cucumber/cucumber"
import { Actor, Cast, TakeNotes, actorCalled, engage } from "@serenity-js/core"
import { CallAnApi } from "@serenity-js/rest"
import { EnvironmentVariables } from "../EnvironmentVariables"
import axios from "axios"
import {Utils} from "../../Utils"
import {WalletSdk} from "../WalletSdk"
import {CloudAgentConfiguration} from "../configuration/CloudAgentConfiguration"

export const axiosInstance = axios.create({
  baseURL: EnvironmentVariables.agentUrl,
  timeout: 10000,
  headers: {
    Accept: "application/json,application/xml",
    APIKEY: EnvironmentVariables.apiKey
  }
})

BeforeAll(async() => {
  Utils.prepareNotes()
  await CloudAgentConfiguration.prepare()
})

Before(async() => {
  await Actors.createAndEngageActors()
})

class Actors implements Cast {
  actors = new Map<string, Actor>()

  add(actor: Actor) {
    this.actors.set(actor.name, actor)
  }

  prepare(actor: Actor): Actor {
    if (!this.actors.has(actor.name)) {
      throw new Error(`Unable to find actor ${actor.name}`)
    }
    return this.actors.get(actor.name)!
  }

  static async createAndEngageActors() {
    const actors = new Actors()

    const prismAgent = actorCalled("Cloud Agent").whoCan(
      CallAnApi.using(axiosInstance),
      TakeNotes.usingAnEmptyNotepad()
    )

    const edgeAgent = actorCalled("Edge Agent").whoCan(
      TakeNotes.usingAnEmptyNotepad(),
      await WalletSdk.withANewInstance()
    )

    actors.add(prismAgent)
    actors.add(edgeAgent)

    engage(actors)
  }
}
