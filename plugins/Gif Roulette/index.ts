import { findProp } from "@revenge-mod/modules/finders";
import { commands } from "@revenge-mod/discord/modules/commands";

const messageActions = findProp("sendMessage", "editMessage");
const frecencyStore = findProp("FrecencyUserSettingsActionCreators")
    ?.FrecencyUserSettingsActionCreators;

function getMessage(): string {
    const store = frecencyStore?.getCurrentValue?.();

    if (!store?.favoriteGifs?.gifs) {
        return "❌ You don't have any favorite GIFs! Add some by favoriting GIFs in Discord first.";
    }

    const gifsArray = Object.keys(store.favoriteGifs.gifs);

    if (gifsArray.length === 0) {
        return "❌ You don't have any favorite GIFs! Add some by favoriting GIFs in Discord first.";
    }

    return gifsArray[Math.floor(Math.random() * gifsArray.length)];
}

let unregisterCommand: (() => void) | undefined;

export function onLoad() {
    unregisterCommand = commands.registerCommand({
        name: "gifroulette",
        displayName: "GIF Roulette",
        description: "Sends a random GIF from your favorites",
        options: [],
        execute: async (_args, ctx) => {
            const content = getMessage();
            messageActions.sendMessage(
                ctx.channel.id,
                { content },
                undefined,
                { nonce: Date.now().toString() },
            );
        },
        applicationId: "-1",
        inputType: 1,
        type: 1,
    });
}

export function onUnload() {
    unregisterCommand?.();
}
