
const language = navigator?.language?.split("-")?.[0]
if (language != null) {
    const responsePromise = fetch("/localizations/" + language + ".json");
    document.addEventListener('alpine:init', async () => {
        window.Alpine.store('localizations', {});

        window.Alpine.magic('t', (el) => {
            return new Proxy(window.Alpine.store('localizations'), {
                get(target, prop) {
                    if (prop in target) {
                        return target[prop as keyof typeof target];
                    }
                    const remappers: Record<string, (el: any) => string | undefined | null> = {
                        "x-text": el => el?.textContent,
                        "x-bind:placeholder": el => el?.placeholder,
                        ":placeholder": el => el?.placeholder,
                        "x-html": el => el.innerHTML
                    }
                    const invocation = `$t.${String(prop)}`
                    for (const [key, takeValue] of Object.entries(remappers)) {
                        if (el.getAttribute(key)?.includes(invocation)) {
                            return takeValue(el) || String(prop)
                        }
                    }
                    return String(prop);
                }
            });
        });

        const response = await responsePromise;
        if (response.status !== 200) return;
        try {
            const localizations = await response.json();
            window.Alpine.store('localizations', localizations);
        } catch {

        }
    });

    (String.prototype as any).set = function (...args: any[]) {
        function replace(text: string, texts: string[]): string {
            let index = 0;
            return text.replace(/\r/g, () => {
                return index < texts.length ? texts[index++] : '';
            });
        }

        const originalString = String(this);
        return replace(originalString, args);
    };
} 

export { }