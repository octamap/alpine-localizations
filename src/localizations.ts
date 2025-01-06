const responsePromise = fetch("/localizations/" + navigator.language + ".json");

document.addEventListener('alpine:init', async () => {
    window.Alpine.store('localizations', {});

    window.Alpine.magic('t', (el) => {
        return new Proxy(window.Alpine.store('localizations'), {
            get(target, prop) {
                if (prop in target) {
                    return target[prop as keyof typeof target];
                }
                // We should try to use the text already declared on the element 
                // Example
                // if $t is declared in :placeholder, we should then take the text from placeholder 
                if (el.hasAttribute('x-text') && el.getAttribute('x-text')?.includes(`$t.${String(prop)}`)) {
                    return (el as any).textContent || String(prop);
                }

                if (el.hasAttribute('x-bind:placeholder') && el.getAttribute('x-bind:placeholder')?.includes(`$t.${String(prop)}`)) {
                    return (el as any).placeholder || String(prop);
                }

                if (el.hasAttribute(':placeholder') && el.getAttribute(':placeholder')?.includes(`$t.${String(prop)}`)) {
                    return (el as any).placeholder || String(prop);
                }
                return String(prop);
            }
        });
    });

    const response = await responsePromise;
    if (response.status !== 200) return;
    const localizations = await response.json();

    // Update Alpine Store
    window.Alpine.store('localizations', localizations);
});

export {}