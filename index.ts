'use strict';

// Element to display application errors.
const error = document.getElementById('error')!;

// Main element containing the app UI.
const app = document.getElementById('app')!;

// Main function containing application logic.
async function main() {
    // // Check for Safe support in this browser.
    // if ('requestSafe' in window === false) {
    //     app.innerHTML = ''; // Make app unusable.
    //     throw new Error('Safe not supported');
    // }

    const form = document.forms.namedItem('url')!;

    // Allow form to be submitted.
    const fieldset = form.getElementsByTagName('fieldset')[0];
    fieldset.disabled = false;

    // Await form submit (by turning event into Promise).
    const e: Event = await new Promise(r => form.addEventListener('submit', r, { once: true }));
    // Prevent form to be sent by browser.
    e.preventDefault();
    
    // Grab the form data.
    const data = new FormData(form);

    // Now that we have grabbed the data, disable the form (fields) to prevent double submit.
    fieldset.disabled = true;

    // Fetch Safe URL.
    const url = data.get('safe-url')! as string;
    const safe = await (<any>window).requestSafe();
    const result = await safe.fetch(url);

    // Display fetched result.
    const output = document.getElementById('output')!;
    output.innerText = JSON.stringify(result);
}

// Start application and catch possible Error.
(async () => {
    try {
        await main();
    } catch (e) {
        if (e instanceof Error) {
            error.innerText = e.toString();
        } else {
            error.innerText = "unknown error ocurred";
        }

        // Re-throw to log in console and signify the app failed.
        throw e;
    }
})();
